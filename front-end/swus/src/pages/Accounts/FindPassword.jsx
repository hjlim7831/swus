import React, { useState } from "react";
// import Avatar from '@mui/material/Avatar';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { indigo } from "@mui/material/colors";

import logo from "./../../logo.png";

import { useSelector } from "react-redux";
import axios from "axios";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function FindPassword() {
  // 비밀번호 찾기용 질문 -> store에서 가져오기
  const favorite_questions = useSelector((state) => state.questions);

  const [inputData, setInputData] = useState({
    email: "",
    question_id: "",
    answer: "",
  });

  const inputSubmit = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputData({ ...inputData, [name]: value });
  };

  const idSubmit = (event) => {
    event.preventDefault();

    const email = inputData.email;

    const emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z\-]+/;

    if (email) {
      if (!emailCheck.test(email)) {
        alert("이메일 형식을 지켜주세요.");
      } else {
        console.log(email);
        axios
          .get(`http://localhost:8081/auth/check-email?email=${email}`)
          .then((response) => {
            console.log(response.data.msg);
            if (response.data.msg === "Y") {
              alert("가입된 아이디입니다.");
            } else {
              alert("가입되지 않은 아이디입니다.");
            }
          });
      }
    } else {
      alert("정보를 다시 입력해주세요.");
    }
  };

  const passwordSubmit = (event) => {
    event.preventDefault();

    const payload = {
      email: inputData.email,
      question_id: inputData.question_id,
      answer: inputData.answer,
    };

    // 유효성검사
    if (payload.question_id && payload.answer) {
      console.log(payload);

      axios
        .post("http://localhost:8081/auth/check-pwd", payload)
        .then(() => {
          // console.log(response.data.msg);
          alert("입력하신 메일로 비밀번호를 전송했습니다.");
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 400") {
            alert("질문이나 답이 틀렸습니다.");
          } else {
            alert("이메일 전송을 실패했습니다.");
          }
        });
    } else {
      alert("정보를 다시 입력해주세요.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: { logo },
            backgroundRepeat: "no-repeat",
            backgroundColor: indigo[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 10,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              아이디/비밀번호 찾기
            </Typography>
            <Box component="form" noValidate onSubmit={idSubmit} sx={{ mt: 1 }}>
              아이디 (이메일)
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                // label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="standard"
                onChange={inputSubmit}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                아이디 확인
              </Button>
            </Box>
            <Box
              component="form"
              noValidate
              onSubmit={passwordSubmit}
              sx={{ mt: 1 }}
            >
              질문
              <TextField
                margin="normal"
                select
                fullWidth
                id="passwordQuestion"
                label="Choose a question"
                defaultValue=""
                name="question_id"
                onChange={inputSubmit}
              >
                {favorite_questions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              답
              <TextField
                margin="normal"
                required
                fullWidth
                id="answer"
                // label="answer"
                name="answer"
                autoComplete="answer"
                autoFocus
                variant="standard"
                onChange={inputSubmit}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                비밀번호 찾기
              </Button>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
