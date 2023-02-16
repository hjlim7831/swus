import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "../../App.css";
import axios from "./../../Utils/index";
import Swal from "sweetalert2";

export default function SignInSide() {
  // 이메일 기억하는 변수
  const remember = localStorage.getItem("remember");
  let check = remember && remember === "true" ? true : false;
  const [rememberCheck, setRememberCheck] = useState(check);

  // remember me 체크하면, 값 저장하는 함수.
  const saveRemember = () => {
    check = !check;
    setRememberCheck(check);
    check
      ? localStorage.setItem("remember", "true")
      : localStorage.removeItem("remember");
  };

  // 알림 창 함수
  const Alert = ({ title, icon }) => {
    Swal.fire({
      icon,
      title,
    });
  };

  // 이메일, 비밀번호 저장 변수
  const [inputData, setInputData] = useState({
    email: check ? localStorage.getItem("id") : "",
    password: "",
  });

  // 이메일, 비밀번호 반응형 함수 (사용자 입력하는 순간순간 체크?)
  const inputSubmit = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputData({ ...inputData, [name]: value });
  };

  // 이메일, 비밀번호 유효성 검사 변수
  const [emailCheck, setEmailCheck] = useState(
    /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z\-]+/
  );
  const [passwordCheck, setPasswordCheck] = useState(/^[a-zA-Z0-9]+$/);

  // 이메일, 비밀번호 제출 함수
  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      email: inputData.email,
      password: inputData.password,
    };

    // 유효성검사
    if (payload.email && payload.password) {
      let icon = "error";
      if (!emailCheck.test(payload.email)) {
        const title = "이메일 형식을 지켜주세요";
        Alert({ title, icon });
      } else {
        const config = {
          url: "/auth/login",
          method: "POST",
          data: payload,
        };

        axios(config)
          .then((response) => {
            sessionStorage.setItem("token", response.data.access_token);
            // token은 sessionStorage에 저장
            // sessionStorage는 브라우저를 닫으면 clear됨.

            // 로컬스토리지에 저장    localStorage.setItem
            // 로컬스토리지 출력     localStorage.getItem
            // 로컬스토리지에 삭제   localStorage.removeItem
            localStorage.setItem("id", response.data.email);
            //rememberme를 위해 이메일은 => localStorage에 저장
            localStorage.setItem("nickname", response.data.nickname);

            //열람실에서 공부시간 띄워주기 위해 저장하는 누적공부시간
            localStorage.setItem("totalH", 0);
            localStorage.setItem("totalM", 0);
          })
          .then(() => {
            window.location = `${window.location.origin}/studyroom`;
          })
          .catch((error) => {
            const title = "아이디(이메일)나 비밀번호를 잘못 입력했습니다.";
            Alert({ title, icon });
          });
      }
    } else {
      const title = "정보를 다시 입력해주세요.";
      let icon = "error";
      Alert({ title, icon });
    }
  };

  return (
    <>
      <Typography
        component="h2"
        variant="h5"
        sx={{
          mb: 3,
          mt: 1,
          color: "#5F3A42",
          fontFamily: "Cafe24",
        }}
      >
        Sign in
        <Link
          href="signup"
          variant="h5"
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: 17,
            color: "#5F3A42",
            marginLeft: "10rem",
          }}
        >
          Sign Up
        </Link>
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        아이디 (이메일)
        {rememberCheck ? (
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={inputSubmit}
            error={!emailCheck.test(inputData.email)}
            defaultValue={localStorage.getItem("id")}
          />
        ) : (
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{ mb: 3 }}
            error={inputData.email && !emailCheck.test(inputData.email)}
            onChange={inputSubmit}
          />
        )}
        비밀번호
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={inputSubmit}
          error={
            inputData.password &&
            (inputData.password.length < 8) |
              !passwordCheck.test(inputData.password)
          }
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          checked={rememberCheck}
          onClick={saveRemember}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#E2B9B3",
            color: "#5F3A42",
            "&:hover": {
              backgroundColor: "#E2B9B3",
            },
          }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="findpassword" variant="body2">
              아이디/비밀번호 찾기
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
