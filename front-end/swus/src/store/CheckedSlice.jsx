import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

const BASE_URL = "http://localhost:8080"


const getStudyRoom = createAsyncThunk(
	"checkedSlice/getStudyRoom",
	async () => {
		try {
			console.log("res:");
			const res =  await fetch(`${BASE_URL}/studyrooms`);
			const data = await res.json();
			console.log("res:" + res);
			return data
		}	catch (err) {
			console.log(err);
		}
	}
)


const checkedSlice = createSlice({
	name: "checked",
	initialState: { 
		days: [false, false, false, false, false, false, false], 
		day: "", 
		category: "", 
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
	},
	extraReducers: (builder) => {
		builder.addCase(getStudyRoom.fulfilled, (state, action) => {
			// action.payload 에 위에서 선언한 thunk에서 return된 값이 저장
			console.log("연결 성공적" + action.payload)
		})
	}
});

export default checkedSlice;
export { getStudyRoom };