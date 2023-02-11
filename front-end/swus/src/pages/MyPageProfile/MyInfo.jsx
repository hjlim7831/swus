import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import axios from "../../Utils/index";

export default function MyInfo() {
  const [nickname, setNickName] = useState(localStorage.getItem("nickname"));
  const [email, setEmail] = useState(localStorage.getItem("id"));
  const [passwordCheck, setPasswordCheck] = useState(/[A-Za-z]+[0-9]/);

  useEffect(() => {
    const config = {
      method: "get",
      url: "/users/my-info",
    };

    axios(config).then((response) => {
      setEmail(response.data.email);
      setNickName(response.data.nickname);
      // console.log(response.data);
    });
  });

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

  const deleteUser = () => {
    const config = {
      method: "delete",
      url: "/users/my-info",
    };

    axios(config).then(() => {
      // console.log(response.data);
      localStorage.clear();
      sessionStorage.clear();
      window.location = window.location.origin;
    });
  };

  // 입력데이터 저장 변수
  const [inputData, setInputData] = useState({
    nickname: nickname,
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  })

  const inputSubmit = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputData({ ...inputData, [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      nickname: inputData.nickname,
      password: inputData.password,
      newPassword: inputData.newPassword,
    }

    // const newPasswordConfirm = inputData.newPasswordConfirm;

    const config = {
      method: "put",
      url: "/users/my-info",
      data: payload,
    }

    axios(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <Box
        sx={{
          width: 420,
          height: 350,
          backgroundColor: "white",
          borderRadius: 2,
          padding: "10px",
          boxShadow: "2px 2px 7px 1px grey",
        }}
      >
        <Grid container>
          <Grid item xs={3}>
            <h3 style={{ marginLeft: "15px" }}>내 정보</h3>
          </Grid>
          <Grid item xs={3} sx={{ marginLeft: "50%" }}>
            <IconButton
              color="#3A3A3A"
              aria-label="modify"
              onClick={iumClickOpen}
              sx={{ marginLeft: "50%", marginTop: "10px" }}
            >
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <hr />
        <Grid container sx={{ marginLeft: "10%", marginTop: "5%" }}>
          <Grid container sx={{ marginY: "10%" }}>
            <Grid item xs={3}>
              <Typography variant="body1">닉네임</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{nickname}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="body1">이메일</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{email}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Button
            variant="text"
            sx={{ color: "#A9A9A9", marginLeft: "80%", marginTop: "17%" }}
            onClick={qmClickOpen}
          >
            탈퇴하기
          </Button>
        </Grid>
      </Box>

      <Dialog open={infoUpdateMOpen} onClose={iumClose}>
        <DialogTitle>내 정보 수정</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            id="outlined-disabled"
            label="email"
            defaultValue={email}
            disabled
            sx= {{ mt: 2}}
          />
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="outlined-helperText"
            label="닉네임"
            name="nickname"
            defaultValue={nickname}
            sx= {{ mt: 2}}
            onChange={inputSubmit}
            error={inputData.nickname.length > 10 | inputData.nickname.length < 2}
            helperText="닉네임은 2글자 이상, 10글자 이하로만 수정가능합니다."
          />
          
          <TextField
            autoFocus
            fullWidth
            id="outlined-required"
            label="현재 비밀번호"
            name="password"
            sx= {{ mt: 2}}
            onChange={inputSubmit}
            error={inputData.password && 
              (inputData.password.length < 8 | 
                !(passwordCheck.test(inputData.password)))}
            helperText="비밀번호는 문자, 숫자 포함한 8자 이상이어야 합니다."
          />
          {/* <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
          /> */}
          <Box>
            <TextField
              id="outlined-helperText"
              label="새 비밀번호"
              name="newPassword"
              onChange={inputSubmit}
              error={inputData.newPassword && 
                (inputData.newPassword.length < 8 | 
                  !(passwordCheck.test(inputData.newPassword)))
                }
              sx= {{ mt: 2, width: 260}}
            />
            <TextField
              id="outlined-helperText"
              label="비밀번호 확인"
              name="newPasswordConfirm"
              onChange={inputSubmit}
              error={inputData.newPasswordConfirm && 
                (inputData.newPasswordConfirm.length < 8 | 
                  !(passwordCheck.test(inputData.newPasswordConfirm)))
                }
              helperText = {inputData.newPassword != inputData.newPasswordConfirm ? "입력하신 비밀번호와 다릅니다." : ""} 
              sx= {{ mt: 2, marginLeft: 3, width: 260}}
            />
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Save</Button>
          <Button onClick={iumClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={quitMOpen}
        onClose={qmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"정말 탈퇴하시겠습니까?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={deleteUser}>Agree</Button>
          <Button onClick={qmClose} autoFocus>
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
