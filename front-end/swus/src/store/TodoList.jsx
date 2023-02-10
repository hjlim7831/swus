import { createSlice } from "@reduxjs/toolkit";

const todolist = createSlice({
  name: "todolist",
  initialState: [],
  reducers: {
    addTodoList(state, action) {
      state.push(action.payload);
    },
  },
});

export default todolist;

export let { addTodoList } = todolist.actions;
