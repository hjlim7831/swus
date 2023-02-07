import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

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
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    const hoursTen = ("0" + this.state.d.getHours()).slice(-2, -1); //시간 10의자리
    const hoursOne = ("0" + this.state.d.getHours()).slice(-1); //시간 1의자리
    const minutesTen = ("0" + this.state.d.getMinutes()).slice(-2, -1);
    const minutesOne = ("0" + this.state.d.getMinutes()).slice(-1);
    const secondsTen = ("0" + this.state.d.getSeconds()).slice(-2, -1);
    const secondsOne = ("0" + this.state.d.getSeconds()).slice(-1);

    return (
      <>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <Grid
              container
              sx={{
                borderBottomRightRadius: "10px",
                borderBottomLeftRadius: "10px",
                marginTop: "-3px",
              }}
            >
              <Grid
                item
                xs={5}
                sx={{
                  backgroundColor: "red",
                  padding: "2%",
                  paddingX: "auto",

                  borderBottomLeftRadius: "10px",
                }}
              >
                <div className="nameTag">{this.getNicknameTag()}</div>
              </Grid>
              <Grid
                item
                xs={5}
                sx={{
                  backgroundColor: "pink",
                  padding: "2%",
                  paddingX: "auto",
                }}
              >
                <Box sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      width: "14.5%",
                      height: "90%",
                      mr: "1%",
                      borderRadius: 1,
                      backgroundColor: "#E8E8E8",
                    }}
                  >
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      {hoursTen}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "inline-block",
                      width: "14.5%",
                      height: "90%",
                      mr: "0.3%",
                      borderRadius: 1,
                      backgroundColor: "#E8E8E8",
                    }}
                  >
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
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
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      :
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "inline-block",
                      width: "14.5%",
                      mr: "1%",
                      height: "90%",
                      borderRadius: 1,
                      backgroundColor: "#E8E8E8",
                    }}
                  >
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      {minutesTen}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "inline-block",
                      width: "14.5%",
                      height: "90%",
                      mr: "0.3%",
                      borderRadius: 1,
                      backgroundColor: "#E8E8E8",
                    }}
                  >
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
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
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      :
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "inline-block",
                      width: "14.5%",
                      height: "90%",
                      mr: "1%",
                      borderRadius: 1,
                      backgroundColor: "#E8E8E8",
                    }}
                  >
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      {secondsTen}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "inline-block",
                      width: "14.5%",
                      height: "90%",
                      borderRadius: 1,
                      backgroundColor: "#E8E8E8",
                    }}
                  >
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      {secondsOne}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  backgroundColor: "brown",
                  padding: "2%",
                  paddingX: "auto",
                  borderBottomRightRadius: "10px",
                }}
              >
                <Grid item xs={11} sx={{ marginX: "auto" }}>
                  0/10
                </Grid>
              </Grid>
            </Grid>
            <div></div>
          </div>
        ) : null}
      </>
    );
  }
}
