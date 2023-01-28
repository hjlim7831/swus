import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    // toolkit 사용전에 나누었던 if 문을 대체
    up: (state, action) => {
      state.value = state.value + action.payload;
    }
  }
});

export default counterSlice;