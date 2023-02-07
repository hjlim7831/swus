import { configureStore } from "@reduxjs/toolkit";
import checkedSlice from "./CheckedSlice";
import questions from "./pwquestions";
import todolist from "./TodoList";

const store = configureStore({
  reducer: {
    checkDays: checkedSlice.reducer,
    questions: questions.reducer,
    todolist: todolist.reducer,
  },
});

export default store;
