import { configureStore } from "@reduxjs/toolkit";
import groupBoardSlice from "./GroupBoardSlice";
import questions from "./pwquestions";
import todolist from "./TodoList";
import myGroupListSlice from "./MyGroupListSlice";

const store = configureStore({
  reducer: {
    myGroupList: myGroupListSlice.reducer, 
    groupBoard: groupBoardSlice.reducer,
    questions: questions.reducer,
    todolist: todolist.reducer,
  },
});

export default store;
