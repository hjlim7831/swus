import { configureStore } from "@reduxjs/toolkit";
import groupBoardSlice from "./GroupBoardSlice";
import questions from "./PwQuestions";
import myGroupListSlice from "./MyGroupListSlice";
import loungeurl from "./LoungeUrl";

const store = configureStore({
  reducer: {
    myGroupList: myGroupListSlice.reducer, 
    groupBoard: groupBoardSlice.reducer,
    questions: questions.reducer,
    loungeurl: loungeurl.reducer,
  },
});

export default store;
