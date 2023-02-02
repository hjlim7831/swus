import { configureStore, createSlice } from "@reduxjs/toolkit";
import questions from "./pwquestions.jsx";

export default configureStore({
  reducer: {
    questions : questions.reducer,
  },
});
