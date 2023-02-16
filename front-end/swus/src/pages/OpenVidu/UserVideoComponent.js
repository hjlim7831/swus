import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";
import Grid from "@mui/material/Grid";

export default class UserVideoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      d: new Date(),
    };
  }

  componentDidMount() {
    this.timeId = setInterval(() => this.change(), 1000);
  }

  conponentWillUnmout() {
    clearInterval(this.timeId);
  }

  change = () => {
    this.setState({
      d: new Date(),
    });
  };

  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    //누적된 총 시간
    const totalH = parseInt(localStorage.getItem("totalH"));
    const totalM = parseInt(localStorage.getItem("totalM"));

    //입장 시간
    const inH = parseInt(localStorage.getItem("inHour"));
    const inM = parseInt(localStorage.getItem("inMin"));

    //현재 시간
    const nowH = parseInt(this.state.d.getHours());
    const nowM = parseInt(this.state.d.getMinutes());

    //계산한 시간 (시+분)
    let cal = 0;

    //계산한 시간 sumH, sumM
    let sumH = 0;
    let sumM = 0;

    if (inH <= nowH) {
      //시간이 뒷 시간이 더 큰 숫자일 경우 ex 18시~20시
      const cal = nowH * 60 + nowM - (inH * 60 + inM);
      sumH = parseInt(cal / 60);
      sumM = cal % 60;
    } else {
      //앞시간이 더 큰 숫자일 경우 ex 18시~1시
      const cal = 24 * 60 - (inH * 60 + inM) + (nowH * 60 + nowM);
      sumH = parseInt(cal / 60);
      sumM = cal % 60;
    }

    let hours = sumH + totalH;
    let minutes = sumM + totalM;
    if (minutes > 59) {
      hours += 1;
      minutes -= 60;
    }

    const hoursTen = ("0" + hours).slice(-2, -1); //시간 10의자리
    const hoursOne = ("0" + hours).slice(-1); //시간 1의자리
    const minutesTen = ("0" + minutes).slice(-2, -1);
    const minutesOne = ("0" + minutes).slice(-1);

    return (
      <>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent" style={{ width: "100%", padding: "3px" }}>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <Grid
              container
              sx={{
                borderBottomRightRadius: "10px",
                borderBottomLeftRadius: "10px",
                marginTop: "-5px",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  padding: "2%",
                  paddingX: "auto",

                  borderBottomLeftRadius: "10px",
                }}
              >
                <div className="nameTag" style={{ textAlign: "center" }}>
                  {this.getNicknameTag()}
                </div>
              </Grid>
            </Grid>
          </div>
        ) : null}
      </>
    );
  }
}
