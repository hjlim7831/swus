import { configureStore } from "@reduxjs/toolkit";
import checkedSlice from "./CheckedSlice";


const store = configureStore({
    reducer: {
        checkDays: checkedSlice.reducer,
    }
})

export default store;