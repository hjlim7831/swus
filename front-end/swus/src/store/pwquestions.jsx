import { createSlice } from "@reduxjs/toolkit";

const questions = createSlice({
  name: "questions",
  initialState : [
    {
      value: 1,
      label: "기억에 남는 추억의 장소는?",
    },
    {
      value: 2,
      label: "자신의 인생 좌우명은?",
    },
    {
      value: 3,
      label: "자신의 보물 제1호는?",
    },
    {
      value: 4,
      label: "가장 기억에 남는 선생님 성함은?",
    },
    {
      value: 5,
      label: "내가 좋아하는 캐릭터는?",
    },
    {
      value: 6,
      label: "다녔던 초등학교 이름은?",
    },
  ]
})

export default questions;