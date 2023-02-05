import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

import Grid from "@mui/material/Grid";

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <p className="videotag">{this.getNicknameTag()}</p>
            <div></div>
          </div>
        ) : null}
      </div>
    );
  }
}
