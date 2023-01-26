import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";

function MyInfo() {
  const [name, setName] = useState("김싸피");
  const [email, setEmail] = useState("ksf@gmail.com");
  const [pw, setPw] = useState("123456");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <h3>내 정보</h3>
        <button onClick={handleClickOpen}>정보 수정</button>
        <hr />
        <div>닉네임</div>
        <div>{name}</div>
        <div>이메일</div>
        <div>{email}</div>
        <button>탈퇴하기</button>
      </div>

      <Dialog open={open} onClose={handleClose}>
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
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
          />
          <TextField
            id="outlined-helperText"
            label="비밀번호 확인"
            defaultValue=""
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyInfo;
