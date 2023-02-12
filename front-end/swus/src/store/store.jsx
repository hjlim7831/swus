import { configureStore } from "@reduxjs/toolkit";
import groupBoardSlice from "./GroupBoardSlice";
import questions from "./pwquestions";
import myGroupListSlice from "./MyGroupListSlice";

const store = configureStore({
  reducer: {
    myGroupList: myGroupListSlice.reducer, 
    groupBoard: groupBoardSlice.reducer,
    questions: questions.reducer,
  },
});

export default store;
