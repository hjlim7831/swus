import { createSlice } from "@reduxjs/toolkit";

const checkedSlice = createSlice({
	name: "checked",
	initialState: { 
		days: [false, false, false, false, false, false, false], 
		day: "", 
		category: "--", 
		data: "", 
		title: "", 
		content: "", 
		recruitmentNumber: 0,
		beginAt: "",
		endAt: "",
		startTime: "",
		finishTime: "",
		writedAt: "",
	},
	reducers: {
		// mon: (state, action) => {
		// 	state.value[action.payload] = !state.value[action.payload];
		// 	state.day = "";
		// 	for (let i = 0; i < state.value.length; i++) {
		// 		if (state.value[i] === true) {
		// 			state.day = state.day + "1";
		// 		} else if (state.value[i] === false) {
		// 			state.day = state.day + "0";
    //     }
		// 	}
		// },
		// typePick: (state, action) => {
		// 	state.category = action.payload;
		// },
		// getData: (state, action) => {
		// 	state.data = action.payload;
		// },
		// getStartDate: (state, action) => {
		// 	state.startDate = action.payload;
		// },
		// getFinishDate: (state, action) => {
		// 	state.finishDate = action.payload;
		// },
		// getStartTIme: (state, action) => {
		// 	state.startTime = action.payload;
		// },
		// getFinishTime: (state, action) => {
		// 	state.finishTime = action.payload;
		// },
		// getTitle: (state, action) => {
		// 	state.title = action.payload;
		// },
		// getContent: (state, action) => {
		// 	state.content = action.payload;
		// },
		// getRecruitmentNumber: (state, action) => {
		// 	state.recruitmentNumber = action.payload;
		// },
		writeArticle: (state, action) => {
			const time = new Date().toISOString().slice(0, 10)
			state.writedAt = time
			state.category = action.payload.category;
			if (state.category === "study") {
				state.category = "스터디";
			}	else if (state.category === "mate")	{
				state.category = "메이트";
			}
			state.title = action.payload.title;
			state.content = action.payload.content;
			state.recruitmentNumber = action.payload.recruitmentNumber;
			state.beginAt = action.payload.beginAt;
			state.endAt = action.payload.endAt;
			state.startTime = action.payload.startTime;
			state.finishTime = action.payload.finishTime;
			state.days = action.payload.days;
			state.day = "";
			for (let i = 0; i < state.days.length; i++)	{
				if (state.days[i] === true) {
          state.day = state.day + "1";
        } else if (state.days[i] === false) {
          state.day = state.day + "0";
        }
			}
		},
	}
});

export default checkedSlice;