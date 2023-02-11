import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { Component } from "react";
// import "./App.css";
import UserVideoComponent from "./UserVideoComponent";

//열람실 내부 컴포넌트용
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";

import MyTodoPublicIn from "./TodoList/MyTodoPublicIn";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

//HOC 사용용

const APPLICATION_SERVER_URL = "http://localhost:5000/";
// const APPLICATION_SERVER_URL = "http://localhost:5000/";

class OpenViduApp extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigate);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      roomType: props.roomType,
      mySessionId: props.sessionId,
      myUserName: localStorage.getItem("nickname"),
      roomId: props.roomId,
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers' //자체 로컬 웹캠 스트림(본인)
      publisher: undefined,
      subscribers: [], //다른 사람들의 활성 스트림 저장
      d: new Date(), //시계
      open: false, //모달
    };
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  componentDidMount() {
    //lifecycle 메서드
    //컴포넌트의 출력물이 dom에 렌더링 된 후 한번만 실행
    //네트워크 호출, 구독 등 기능 수행
    window.addEventListener("beforeunload", this.onbeforeunload);

    //시계 구현 1 컴포넌트가 불러올 때마다 1초씩 this.Change()를 부른다.
    this.timeID = setInterval(() => this.change(), 1000);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);

    //시계 구현 2 반복되는것 clear
    clearInterval(this.timeID);
  }

  //시계 구현 3
  change = () => {
    this.setState({
      d: new Date(),
    });
  };

  getTodayLabel = () => {
    const dayLabel = this.state.d.getDay();
    const week = new Array("일", "월", "화", "수", "목", "금", "토");
    const todayLabel = week[dayLabel];
    return todayLabel;
  };

  //쉬는시간 모달 열고 닫아주는함수
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setOpen(false);
  };

  ////
  // getTodoCount = (todoProps, doneProps) => {
  //   this.setState({
  //     todo: todoProps,
  //     done: doneProps,
  //   });
  // };

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---
    //오픈비두 객체 생성
    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
          console.log(subscribers);
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        //토큰 생성
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName, enterTime: this.state.enterTime })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "1200x600", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter((device) => device.kind === "videoinput");
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
    localStorage.setItem("inHour", this.state.d.getHours());
    localStorage.setItem("inMin", this.state.d.getMinutes());
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;
    console.log("check post");
    console.log(this.state.roomId);
    if (mySession) {
      mySession.disconnect(); //연결 끊고
    }

    const Token = sessionStorage.getItem("token");
    console.log("방 퇴장");
    console.log(this.state.roomId);
    axios({
      method: "post",
      url: "http://i8a302.p.ssafy.io:8081/studyrooms/exit",
      headers: { Authorization: `Bearer ${Token}` },
      data: {
        member_id: 0,
        room_id: this.state.roomId,
      },
    }).then((response) => {
      console.log(response.data.message);
    });

    // Empty all properties... 초기화
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });

    //현재 시간과 기존 입장 시간 비교해서 공부시간 측정
    //기존 입장 시간
    const inH = parseInt(localStorage.getItem("inHour"));
    const inM = parseInt(localStorage.getItem("inMin"));

    //현재 시간
    const nowH = parseInt(this.state.d.getHours());
    const nowM = parseInt(this.state.d.getMinutes());

    //누적된 총 시간
    const totalH = parseInt(localStorage.getItem("totalH"));
    const totalM = parseInt(localStorage.getItem("totalM"));

    if (inH <= nowH) {
      //시간이 뒷 시간이 더 큰 숫자일 경우 ex 18시~20시
      const cal = nowH * 60 + nowM - (inH * 60 + inM);
      //시간 저장
      axios({
        method: "put",
        url: "http://i8a302.p.ssafy.io:8081/my-studies/now-total-time",

        headers: { Authorization: `Bearer ${Token}` },
        data: {
          now_total_time: totalH * 60 + totalM + cal,
        },
      }).then((res) => {
        console.log(res);
      });

      localStorage.setItem("totalH", totalH + parseInt(cal / 60));
      localStorage.setItem("totalM", totalM + (cal % 60));
    } else {
      //앞시간이 더 큰 숫자일 경우 ex 18시~1시
      const cal = 24 * 60 - (inH * 60 + inM) + (nowH * 60 + nowM);
      //시간 저장
      axios({
        method: "put",
        url: "http://i8a302.p.ssafy.io:8081/my-studies/now-total-time",

        headers: { Authorization: `Bearer ${Token}` },
        data: {
          now_total_time: totalH * 60 + totalM + cal,
        },
      }).then((res) => {
        console.log(res);
      });

      localStorage.setItem("totalH", totalH + parseInt(cal / 60));
      localStorage.setItem("totalM", totalM + (cal % 60));
    }

    window.location.href = "/studyroom";
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    const year = this.state.d.getFullYear();
    const month = ("0" + (this.state.d.getMonth() + 1)).slice(-2); //getMonth는 0-11 반환하므로 +1, 05월처럼 두자리 맞추기(뒤에서 두자리 자름)
    const day = ("0" + this.state.d.getDate()).slice(-2);

    const hoursTen = ("0" + this.state.d.getHours()).slice(-2, -1); //시간 10의자리
    const hoursOne = ("0" + this.state.d.getHours()).slice(-1); //시간 1의자리
    const minutesTen = ("0" + this.state.d.getMinutes()).slice(-2, -1);
    const minutesOne = ("0" + this.state.d.getMinutes()).slice(-1);
    const secondsTen = ("0" + this.state.d.getSeconds()).slice(-2, -1);
    const secondsOne = ("0" + this.state.d.getSeconds()).slice(-1);

    return (
      <>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#1A1E33",
            height: "100vh",
            marginTop: "8px",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={2.4}>
              <Grid item xs={10} sx={{ marginX: "auto" }}>
                {this.state.mySessionId.substr(6, 1) === "Y" ? ( //채팅방 Y면
                  <Stack direction="row">
                    {/**justifyContent="flex-end"오른쪽 끝으로 밀어줌 */}
                    <IconButton aria-label="record" color="primary">
                      <PlayCircleOutlineIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="add an alarm">
                      <MusicNoteOutlinedIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="quit">
                      <HighlightOffIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="quit"
                      onClick={() => {
                        this.leaveSession(); //연결 끊어주고
                        //열람실 메인으로 이동
                      }}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Stack> //채팅방 버튼 없는 상위 버튼
                ) : (
                  <Stack direction="row">
                    {/**justifyContent="flex-end"오른쪽 끝으로 밀어줌 */}
                    <IconButton aria-label="record" color="primary">
                      <PlayCircleOutlineIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="add an alarm">
                      <MusicNoteOutlinedIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="quit"
                      onClick={() => {
                        this.leaveSession(); //연결 끊어주고
                        //열람실 메인으로 이동
                      }}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Stack> //채팅방용 상위 버튼
                )}
                <h1 style={{ color: "white", paddingTop: "20px" }}>공용 열람실{mySessionId}</h1>
                <div style={{ height: 100, paddingTop: "20px" }}>
                  <div style={{ height: "50%" }}>
                    <p style={{ color: "white" }}>
                      {year}. {month}. {day} {this.getTodayLabel()}요일
                    </p>
                    <Box sx={{ height: "100%", mt: "5px" }}>
                      <Box
                        sx={{
                          display: "inline-block",
                          width: "15%",
                          height: "100%",
                          mr: "1%",
                          borderRadius: 2,
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
                          {hoursTen}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "inline-block",
                          width: "15%",
                          height: "100%",
                          mr: "0.3%",
                          borderRadius: 2,
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
                          {hoursOne}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "inline-block",
                          color: "white",
                          mr: "0.3%",
                        }}
                      >
                        <Typography variant="h4" sx={{ textAlign: "center" }}>
                          :
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "inline-block",
                          width: "15%",
                          mr: "1%",
                          height: "100%",
                          borderRadius: 2,
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
                          {minutesTen}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "inline-block",
                          width: "15%",
                          height: "100%",
                          mr: "0.3%",
                          borderRadius: 2,
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
                          {minutesOne}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "inline-block",
                          color: "white",
                          mr: "0.3%",
                        }}
                      >
                        <Typography variant="h4" sx={{ textAlign: "center" }}>
                          :
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "inline-block",
                          width: "15%",
                          height: "100%",
                          mr: "1%",
                          borderRadius: 2,
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
                          {secondsTen}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "inline-block",
                          width: "15%",
                          height: "100%",
                          borderRadius: 2,
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
                          {secondsOne}
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                </div>
                <h4 style={{ color: "white", paddingTop: "20px" }}>To-do list</h4>
                <div
                  style={{
                    backgroundColor: "#F4EFE6",
                    height: "100%",
                    padding: 5,
                  }}
                >
                  <MyTodoPublicIn />
                  {/* <MyTodoPublicIn parentFunction={this.getTodoCount} /> */}
                </div>
                <div>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 4,
                      pt: 2,
                      pb: 1.5,
                      backgroundColor: "#DEDCEE",
                      height: "50px",
                      color: "#1A1E33",
                      fontSize: "20px",
                    }}
                  >
                    휴게실 바로가기
                  </Button>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={9.6}>
              <div className="container" styled={{ paddingLeft: "10%" }}>
                {this.state.session === undefined ? (
                  <div id="join">{this.joinSession()}</div>
                ) : null}
                {/* <Grid container sx={{ border: 1 }}> */}
                {this.state.session !== undefined ? (
                  <div id="session">
                    <div
                      id="video-container"
                      style={
                        {
                          /*marginLeft: "5%"*/
                        }
                      }
                    >
                      {this.state.publisher !== undefined ? (
                        <div
                          className="stream-container"
                          onClick={() => this.handleMainVideoStream(this.state.publisher)}
                        >
                          <UserVideoComponent
                            streamManager={this.state.publisher}
                            // todoTodo={this.state.todo}
                            // todoDone={this.state.done}
                          />
                        </div>
                      ) : null}
                      {this.state.subscribers.map((sub, i) => (
                        <div
                          key={i}
                          className="stream-container"
                          onClick={() => this.handleMainVideoStream(sub)}
                        >
                          <UserVideoComponent
                            streamManager={sub}
                            // todoTodo={this.state.todo}
                            // todoDone={this.state.done}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </Grid>
          </Grid>
          {/*정각이 되었을때 알림을 주는 모달창 */}
          {this.state.d.getMinutes() === 22 && this.state.d.getSeconds() === 30 ? (
            <div></div>
          ) : null}

          {/*정각이 되었을때 알림을 주는 모달창 */}
          {this.state.d.getMinutes() === 0 && this.state.d.getSeconds() === 0 ? <div></div> : null}
        </Box>
      </>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}

export default OpenViduApp;
