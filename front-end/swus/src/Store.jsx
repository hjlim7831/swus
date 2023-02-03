import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './CounterSlice';

const store = configureStore({
  reducer: {
    // counterSlice에 생성된 reducer 전부를 counter로 선언해줌
    counter: counterSlice.reducer
  }
});

export default store;