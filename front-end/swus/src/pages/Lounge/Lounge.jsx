import React, { useCallback, useRef, useState, useEffect } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { Container } from "@mui/system";

// import reset from 'styled-reset';

export default function Chat() {
  
  return (
    <>
      <Container sx={{ border: "1px grey solid", borderRadius: "10px" }}>
        <div id="chatWrap">
          <div id="chatHeader">휴게실 채팅</div>
          <div id="chatLog">
            <div class="anotherMsg">
              <span class="anotherName">Jo</span>
              <span class="msg">Hello, Nice to meet you.</span>
            </div>
            <div class="myMsg">
              <span class="msg">Nice to meet you, too.</span>
            </div>
          </div>
          <form id="chatForm">
            <input type="text" autocomplete="off" size="30" id="message" placeholder="메시지를 입력하세요" />
            <input type="submit" value="보내기" />
          </form>
        </div>
        {/* <div id="memberWrap">
          <div id="memberList">
            <div id="memberHeader">사람</div>
            <div id="memberSelect"></div>
          </div>
        </div> */}
      </Container>
    </>
  );
}