import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

function MyInfo() {
  const [name, setName] = useState("김싸피");
  const [email, setEmail] = useState("ksf@gmail.com");
  const [pw, setPw] = useState("123456");

  //각각 개인정보 수정 모달/탈퇴 확인 모달 열고 닫는 상태 useState
  const [infoUpdateMOpen, setInfoUpdateMOpen] = useState(false);
  const [quitMOpen, setQuitMOpen] = useState(false);

  //개인정보 수정 모달 열고 닫는 함수
  const iumClickOpen = () => {
    setInfoUpdateMOpen(true);
  };

  const iumClose = () => {
    setInfoUpdateMOpen(false);
  };

  //탈퇴 모달 열고 닫는 함수
  const qmClickOpen = () => {
    setQuitMOpen(true);
  };

  const qmClose = () => {
    setQuitMOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: "primary.light",
        }}
      >
        <h3 style={{ display: "inline-block" }}>내 정보</h3>
        <button style={{ display: "inline-block" }} onClick={iumClickOpen}>
          정보 수정
        </button>
        <hr />
        <div style={{ display: "inline-block" }}>닉네임</div>
        <div style={{ display: "inline-block" }}>{name}</div>
        <div></div>
        <div style={{ display: "inline-block" }}>이메일</div>
        <div style={{ display: "inline-block" }}>{email}</div>
        <div></div>
        <button onClick={qmClickOpen}>탈퇴하기</button>
      </Box>

      <Dialog open={infoUpdateMOpen} onClose={iumClose}>
        <DialogTitle>내 정보 수정</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="outlined-helperText"
            label="닉네임"
            defaultValue={name}
          />
          <TextField
            autoFocus
            fullWidth
            id="outlined-disabled"
            label="email"
            defaultValue={email}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            autoFocus
            fullWidth
            id="outlined-required"
            label="현재 비밀번호"
            defaultValue=""
          />
          <TextField id="outlined-helperText" label="Helper text" defaultValue="Default Value" />
          <TextField id="outlined-helperText" label="비밀번호 확인" defaultValue="" />
        </DialogContent>
        <DialogActions>
          <Button onClick={iumClose}>Save</Button>
          <Button onClick={iumClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={quitMOpen}
        onClose={qmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"정말 탈퇴하시겠습니까?"}</DialogTitle>
        <DialogActions>
          <Button onClick={qmClose}>Disagree</Button>
          <Button onClick={qmClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyInfo;
