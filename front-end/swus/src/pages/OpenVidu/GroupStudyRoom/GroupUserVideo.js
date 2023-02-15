import React, { Component } from "react";
import OpenViduVideoComponent from "../OvVideo";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

import "./GroupVideo.css";

import Grid from "@mui/material/Grid";

export default class GroupUserVideo extends Component {
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
