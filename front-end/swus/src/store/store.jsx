import { configureStore } from "@reduxjs/toolkit";
import groupBoardSlice from "./GroupBoardSlice";
import questions from "./pwquestions";
import todolist from "./TodoList";

const store = configureStore({
  reducer: {
    groupBoard: groupBoardSlice.reducer,
    questions: questions.reducer,
    todolist: todolist.reducer,
  },
});

export default store;
