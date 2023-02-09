import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import axios from "../../Utils/index";

export default function SignInSide() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const inputSubmit = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      email: inputData.email,
      password: inputData.password,
    };

    const emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z\-]+/;
    const passwordCheck = /[A-Za-z]+[0-9]/;

    // 유효성검사
    if (payload.email && payload.password) {
      if (!emailCheck.test(payload.email)) {
        alert("이메일 형식을 지켜주세요.");
      } else if (payload.password.length < 8) {
        alert("비밀번호는 8자 이상이여야 합니다.");
      } else if (!passwordCheck.test(payload.password)) {
        alert("비밀번호는 문자, 숫자를 최소 1번 사용해야 합니다.");
      } else {
        console.log({ payload });

        const config = {
          url: "/auth/login",
          method: "POST",
          data: payload,
        };

        axios(config)
          // .post("http://localhost:8081/auth/login", payload)
          .then((response) => {
            console.log(response.data.access_token);

            // 로컬스토리지에 저장    localStorage.setItem
            // 로컬스토리지 출력     localStorage.getItem
            // 로컬스토리지에 삭제   localStorage.removeItem
            localStorage.setItem("id", payload.email);
            //rememberme를 위해 이메일은 => localStorage에 저장
            localStorage.setItem("nickName", response.data.nickname);

            sessionStorage.setItem("token", response.data.access_token);
            // token은 sessionStorage에 저장
            // sessionStorage는 브라우저를 닫으면 clear됨.
          })
          .catch((error) => {
            alert("존재하는 아이디가 아닙니다.");
          });
      }
    } else {
      alert("정보를 다시 입력해주세요.");
    }
  };

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        sx={{
          mb: 3,
          mt: 1,
          display: "flex",
          alignContent: "space-between",
          color: "#5F3A42",
        }}
      >
        Sign in
        <Link
          href="signup"
          variant="h5"
          style={{
            textDecoration: "none",
            color: "black",
            marginLeft: 100,
            fontSize: 17,
            color: "#5F3A42",
          }}
        >
          Sign Up
        </Link>
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        아이디 (이메일)
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
        />
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
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: "#E2B9B3", color: "#5F3A42" }}
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
