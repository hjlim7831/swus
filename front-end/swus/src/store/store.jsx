import { configureStore } from "@reduxjs/toolkit";
import checkedSlice from "./CheckedSlice";
import questions from "./pwquestions";

const store = configureStore({
  reducer: {
    checkDays: checkedSlice.reducer,
    questions: questions.reducer,
  },
});

export default store;
