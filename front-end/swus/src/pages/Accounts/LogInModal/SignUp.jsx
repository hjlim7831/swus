import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../Utils/index";
import Swal from 'sweetalert2';

export default function SignUpSide() {
  const navigate = useNavigate();
  // 비밀번호 찾기용 질문 -> store에서 가져오기
  const favorite_questions = useSelector((state) => state.questions);

  // 입력데이터 저장 변수
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    question_id: "",
    answer: "",
  });

  const inputSubmit = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputData({ ...inputData, [name]: value });
  };

  const Alert = ({title, icon}) => {
    Swal.fire({
      icon,
      title,
    })
  };

  // 이메일, 비밀번호 유효성 검사 변수
  const [emailCheck, setEmailCheck] = useState(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z\-]+/);
  const [passwordCheck, setPasswordCheck] = useState(/^[a-zA-Z0-9]+$/);

  // 아이디 중복검사
  const idCheck = (event) => {
    event.preventDefault(); // 재렌더링 막아주는...
    // 이메일 가져오기
    const email = inputData.email;

    if (email) {
      if (!emailCheck.test(email)) {
        const title = "이메일 형식으로 작성해주세요.";
        const icon = "error";
        Alert({title, icon});

      } else {

        const config = {
          url: `/auth/check-email?email=${email}`,
          method: "GET",
        };

        axios(config)
          .then((response) => {
            if (response.data.msg === "Y") {
              const title = "존재하는 아이디입니다.";
              const icon = "error";
              Alert({title, icon});
            } else {
              const title = "사용가능한 아이디입니다.";
              const icon = "success";
              Alert({title, icon});
            }
          });
      }
    } else {
      const title = "이메일을 작성해주세요.";
      const icon = "error";
      Alert({title, icon});
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      email: inputData.email,
      password: inputData.password,
      nickname: inputData.nickname,
      question_id: inputData.question_id,
      answer: inputData.answer,
    };

    const passwordConfirm = inputData.passwordConfirm;
    let icon = "error";
    // 유효성검사
    if (
      payload.password &&
      payload.nickname &&
      payload.question_id &&
      payload.answer
    ) {
      if (payload.password.length < 8) {
        const title = "비밀번호는 8자 이상이여야 합니다."
        Alert({title, icon})
      } else if (!passwordCheck.test(payload.password)) {
        const title = "비밀번호는 문자, 숫자를 최소 1번 사용해야 합니다."
        Alert({title, icon})
      } else if (payload.password != passwordConfirm) {
        const title = "비밀번호와 비밀번호 확인이 서로 다릅니다."
        Alert({title, icon})
      } else if (
        !(2 <= payload.nickname.length && payload.nickname.length <= 10)
      ) {
        const title = "닉네임은 2글자 이상, 10글자 이하만 가능합니다."
        Alert({title, icon})
      } else {
        console.log({
          payload,
        });

        const config = {
          url: "/auth/sign-up",
          method: "POST",
          data: payload,
        };

        axios(config)
          .then((response) => {
            navigate("/account/login");
          })
          .catch((error) => {
            const title = "존재하는 회원입니다.";
            Alert({title, icon});
          });
      }
    } else {
      const title = "정보를 다시 입력해주세요.";
      Alert({title, icon});
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "white",
          borderRadius: "3%",
          border: "1px solid",
        }}
      >
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
          Sign Up
          <Link
            href="login"
            variant="h5"
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: 100,
              fontSize: 17,
              color: "#5F3A42",
            }}
          >
            Sign In
          </Link>
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, overflowY: "scroll" }}>
          아이디 (이메일)
          <Button
            type="submit"
            sx={{ bgcolor: "#E2B9B3", color: "#5F3A42",
              '&:hover': {
                backgroundColor: '#E2B9B3'
              },
            }}
            onClick={idCheck}
          >
            중복검사
          </Button>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            variant="standard"
            error={inputData.email && !emailCheck.test(inputData.email)}
            onChange={inputSubmit}
          />
          닉네임
          <TextField
            margin="normal"
            required
            fullWidth
            id="nickname"
            name="nickname"
            autoComplete="nickname"
            autoFocus
            variant="standard"
            error={inputData.nickname && inputData.nickname.length > 10 | inputData.nickname.length < 2}
            helperText="닉네임은 2 ~ 10자여야 합니다."
            onChange={inputSubmit}
          />
          비밀번호
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="standard"
            onChange={inputSubmit}
            error={inputData.password && 
              (inputData.password.length < 8 | 
                !(passwordCheck.test(inputData.password)))}
            helperText="비밀번호는 문자, 숫자 포함한 8자 이상이어야 합니다."
          />
          비밀번호 확인
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            type="password"
            id="passwordConfirm"
            onChange={inputSubmit}
            autoComplete="current-password"
            variant="standard"
            error={inputData.password && 
              (inputData.password.length < 8 | 
                !(passwordCheck.test(inputData.password)))}
          />
          질문
          <TextField
            margin="normal"
            select
            fullWidth
            id="passwordQuestion"
            onChange={inputSubmit}
            label="Choose a question"
            defaultValue=""
            name="question_id"
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
            name="answer"
            onChange={inputSubmit}
            autoComplete="answer"
            autoFocus
            variant="standard"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, 
              backgroundColor: "#E2B9B3", 
              color: "#5F3A42",
              '&:hover': {
                backgroundColor: '#E2B9B3'
              } 
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </>
  );
}
