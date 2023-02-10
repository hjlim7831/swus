import React, { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";

import axios from "../../../Utils/index";
import { Navigate } from "react-router";

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

        const config = {
          url: `/auth/check-email?email=${email}`,
          method: "GET",
        };

        axios(config)
          // .get(`http://localhost:8081/auth/check-email?email=${email}`)
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

      const config = {
        url: "/auth/check-pwd",
        method: "POST",
        data: payload,
      };

      axios(config)
        // axios
        //   .post("http://localhost:8081/auth/check-pwd", payload)
        .then(() => {
          // console.log(response.data.msg);
          alert("입력하신 메일로 비밀번호를 전송했습니다.");
          Navigate("/accounts/login");
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
    <>
      <Typography
        component="h1"
        variant="h5"
        sx={{ mb: 2, mt: 1, color: "#5F3A42" }}
      >
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
          sx={{ mt: 2, mb: 2, backgroundColor: "#E2B9B3", color: "#5F3A42" }}
        >
          아이디 확인
        </Button>
      </Box>
      <Box component="form" noValidate onSubmit={passwordSubmit} sx={{ mt: 1 }}>
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
          sx={{ mt: 2, mb: 2, backgroundColor: "#E2B9B3", color: "#5F3A42" }}
        >
          비밀번호 찾기
        </Button>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Box>
    </>
  );
}
