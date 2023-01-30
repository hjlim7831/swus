import { createSlice } from "@reduxjs/toolkit";

const checkedSlice = createSlice({
	name: "checked",
	initialState: { 
		value: [false, true, false, false, false, false, false], 
		day: "", 
		category: "--", 
		data: "", 
		title: "", 
		content: "", 
		recruitmentNumber: 0,
		startDate: "",
		finishDate: "",
		startTime: "",
		finishTime: "",
	},
	reducers: {
		mon: (state, action) => {
			state.value[action.payload] = !state.value[action.payload];
			state.day = "";
			for (let i = 0; i < state.value.length; i++) {
				if (state.value[i] === true) {
					state.day = state.day + "1";
				} else if (state.value[i] === false) {
					state.day = state.day + "0";
        }
			}
		},
		typePick: (state, action) => {
			state.category = action.payload;
		},
		getData: (state, action) => {
			state.data = action.payload;
		},
		getStartDate: (state, action) => {
			state.startDate = action.payload;
		},
		getFinishDate: (state, action) => {
			state.finishDate = action.payload;
		},
		getStartTIme: (state, action) => {
			state.startTime = action.payload;
		},
		getFinishTime: (state, action) => {
			state.finishTime = action.payload;
		},
		getTitle: (state, action) => {
			state.title = action.payload;
		},
		getContent: (state, action) => {
			state.content = action.payload;
		},
		getRecruitmentNumber: (state, action) => {
			state.recruitmentNumber = action.payload;
		},
	}
});

export default checkedSlice;