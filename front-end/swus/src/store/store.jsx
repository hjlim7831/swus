import { configureStore, createSlice } from "@reduxjs/toolkit";
import questions from "./pwquestions.jsx";

createSlice({})

export default configureStore({
  reducer: {
    questions : questions.reducer,
  },
});
