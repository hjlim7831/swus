import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import styled from "styled-components";
import "./UserVideo.css";

import Grid from "@mui/material/Grid";

// const streamcomponent = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const NickName = styled.div`
//   text-align: center;
//   position: absoute;
//   width: auto;
//   height: 20px;
//   background-color: pink;
//   display: block;
// `;

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    return (
      <>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />

            <div className="nameTag">{this.getNicknameTag()}</div>
          </div>
        ) : null}
      </>
    );
  }
}
