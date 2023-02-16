import { OpenVidu } from "openvidu-browser";
import { Base64 } from "js-base64";
import axios from "axios";
import axiosUtils from "./../../../Utils/index";
import React, { Component } from "react";
import GroupUserVideo from "./GroupUserVideo";
//열람실 내부 컴포넌트용
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GroupTodoBlock from "../../GroupPage/Todolist/GroupTodoBlock";
import "../../../App.css";

const OPENVIDU_SERVER_URL = "https://i8a302.p.ssafy.io:8443";
const OPENVIDU_SERVER_SECRET = "SWUS";

class OpenViduApp extends Component {
  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      roomType: props.category,
      mySessionId: props.sessionId,
      myUserName: localStorage.getItem("nickname"),
      teamId: props.teamId,
      round: props.round,
      teamName: props.teamName,
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers' //자체 로컬 웹캠 스트림(본인)
      publisher: undefined,
      audiostate: false,
      content: props.content,
      subscribers: [], //다른 사람들의 활성 스트림 저장
      d: new Date(), //시계
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.leaveCheck = this.leaveCheck.bind(this);
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

  leaveCheck() {
    const config = {
      method: "get",
      url: `/my-reports/${this.state.teamId}/rounds/${this.state.round}`,
    };

    axiosUtils(config).then((res) => {
      console.log(res.data.message);
    });
  }

  moveToLounge() {
    this.leaveCheck();
    window.location = `${window.location.origin}/lounge`;
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---
    //오픈비두 객체 생성
    this.OV = new OpenVidu();

    // --- 2) Init a session ---
    //세션 객체 초기화
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        //세션에서 생성되는 스트림 구독
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          //구독자 업데이트 setState
          this.setState({
            subscribers: subscribers,
          });
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
        //토큰 사용하여 세션에 연결
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              let audioControl = false;
              if (this.state.roomType === "S") {
                audioControl = true;
              }

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: audioControl, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "1200x350", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
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
    if (mySession) {
      mySession.disconnect(); //연결 끊고
    }

    this.leaveCheck();

    // Empty all properties... 초기화
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mainStreamManager: undefined,
      publisher: undefined,
    });

    // window.location.replace("http://localhost:3000/group/mystudy");
    window.location = `${window.location.origin}/group/mystudy`;
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
                <Stack direction="row"></Stack>{" "}
                <h1
                  style={{
                    color: "white",
                    paddingTop: "5px",
                    fontFamily: "Cafe24",
                  }}
                >
                  {this.state.teamName}
                </h1>
                <h5
                  style={{
                    color: "white",
                    fontFamily: "Cafe24",
                    fontSize: "20px",
                  }}
                >
                  {this.state.round}회차
                </h5>
                <h4
                  style={{
                    color: "white",
                    marginTop: "-20px",
                    fontFamily: "Cafe24",
                    fontSize: "30px",
                  }}
                >
                  {this.state.content}
                </h4>
                <div style={{ height: 100 }}>
                  <div style={{ height: "50%" }}>
                    <p
                      style={{
                        color: "white",
                        fontFamily: "Cafe24",
                        fontSize: "20px",
                      }}
                    >
                      {year}. {month}. {day} {this.getTodayLabel()}요일
                    </p>
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
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
                        <Typography
                          variant="h4"
                          sx={{ textAlign: "center", mt: "5px" }}
                        >
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
                        <Typography
                          variant="h4"
                          sx={{ textAlign: "center", mt: "5px" }}
                        >
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
                        <Typography
                          variant="h4"
                          sx={{ textAlign: "center", mt: "5px" }}
                        >
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
                        <Typography
                          variant="h4"
                          sx={{ textAlign: "center", mt: "5px" }}
                        >
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
                        <Typography
                          variant="h4"
                          sx={{ textAlign: "center", mt: "5px" }}
                        >
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
                        <Typography
                          variant="h4"
                          sx={{ textAlign: "center", mt: "5px" }}
                        >
                          {secondsOne}
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                </div>
                <h4
                  style={{
                    color: "white",
                    paddingTop: "20px",
                    fontFamily: "Cafe24",
                    fontSize: "20px",
                  }}
                >
                  To-do list
                </h4>
                <div
                  style={{
                    backgroundColor: "#F4EFE6",
                    height: "100%",
                    padding: 5,
                    borderRadius: "5px",
                  }}
                >
                  <GroupTodoBlock
                    groupId={this.state.teamId}
                    round={this.state.round}
                  />
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
                      fontFamily: "Cafe24",
                    }}
                    onClick={() => {
                      this.leaveSession();
                    }}
                  >
                    스터디 종료하기
                  </Button>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={9.6}>
              <div className="container" styled={{ paddingLeft: "5%" }}>
                {this.state.session === undefined ? (
                  <div id="join">{this.joinSession()}</div>
                ) : null}
                {/* <Grid container sx={{ border: 1 }}> */}
                {this.state.session !== undefined ? (
                  <div id="session">
                    <div
                      id="video-container"
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(31%, auto))",
                        gridTemplateRows: "repeat(auto-fit, minmax(50%, auto))",
                        placeItems: "center",
                        padding: "5px",
                        paddingRight: "20px",
                        gridGap: "10px",
                      }}
                    >
                      {this.state.publisher !== undefined ? (
                        <div
                          className="stream-container"
                          onClick={() =>
                            this.handleMainVideoStream(this.state.publisher)
                          }
                          style={{ width: "100%", height: "100%" }}
                        >
                          <GroupUserVideo
                            streamManager={this.state.publisher}
                            style={{ width: "100%", paddingBottom: "20%" }}
                          />
                        </div>
                      ) : null}
                      {this.state.subscribers.map((sub, i) => (
                        <div
                          key={i}
                          className="stream-container"
                          style={{ width: "100%", height: "100%" }}
                          onClick={() => this.handleMainVideoStream(sub)}
                        >
                          <GroupUserVideo
                            streamManager={sub}
                            style={{ width: "100%", paddingBottom: "20%" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }

  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
          headers: {
            Authorization: `Basic ${Base64.encode(
              `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
            )}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          resolve(response.data.id);
        })
        .catch((response) => {
          let error = { ...response };
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else if (
            window.confirm(
              `No connection to OpenVidu Server. This may be a certificate error at "${OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it. ` +
                `If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`
            )
          ) {
            window.location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`);
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      let data = {};
      axios
        .post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
          data,
          {
            headers: {
              Authorization: `Basic ${Base64.encode(
                `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
              )}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

export default OpenViduApp;
