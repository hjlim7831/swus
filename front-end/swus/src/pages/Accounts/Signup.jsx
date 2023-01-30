import * as React from "react";
// import Avatar from '@mui/material/Avatar';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { indigo } from "@mui/material/colors";

import logo from "./assets/logo.png";

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

export default function SignUpSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const favorite_questions = [
    {
      value: "que 1",
      label: "기억에 남는 추억의 장소는?",
    },
    {
      value: "que 2",
      label: "자신의 인생 좌우명은?",
    },
    {
      value: "que 3",
      label: "자신의 보물 제1호는?",
    },
    {
      value: "que 4",
      label: "가장 기억에 남는 선생님 성함은?",
    },
    {
      value: "que 5",
      label: "내가 좋아하는 캐릭터는?",
    },
    {
      value: "que 6",
      label: "다녔던 초등학교 이름은?",
    },
  ];

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
              my: 8,
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
              Sign Up
              <Link
                href="#"
                variant="h5"
                style={{ textDecoration: "none", color: "black" }}
              >
                Sign In
              </Link>
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              아이디 (이메일)
              <Button>중복검사</Button>
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
              />
              비밀번호
              <TextField
                margin="normal"
                required
                fullWidth
                name="password "
                // label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
              />
              비밀번호 확인
              <TextField
                margin="normal"
                required
                fullWidth
                name="password Confirm"
                // label="Password Confirm"
                type="password"
                id="password Confirm"
                autoComplete="current-password"
                variant="standard"
              />
              질문
              <TextField
                margin="normal"
                select
                fullWidth
                id="password Question"
                label="Choose a question"
                // defaultValue="que 1"
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
