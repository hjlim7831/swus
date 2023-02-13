import { createSlice } from "@reduxjs/toolkit";



const groupBoardSlice = createSlice({
	name: "groupBoard",
	initialState: { 
		boardId: 0,
		info: {
			day: "",
			category: "",
			title: "",
			content: "",
			board_number: 0,
			email: "",
			nickname: "",
			views: 0,
			write_at: "",
			begin_at: "",
			end_at: "",
			start_time: "",
			finish_time: "",
			team_number: "",
			days: [false, false, false, false, false, false, false],
		},
		todoLists: ""
	},
	reducers: {
		getArticleDetails: (state, action) => {
			state.info.category = action.payload.category;
			state.info.title = action.payload.title;
			state.info.content = action.payload.content;
			state.info.board_number = action.payload.board_number;
			state.info.email = action.payload.email;
			state.info.nickname = action.payload.nickname;
			state.info.views = action.payload.views;
			state.info.write_at = action.payload.write_at;
			state.info.begin_at = action.payload.begin_at;
			state.info.end_at = action.payload.end_at;
			state.info.start_time = action.payload.start_time.slice(0, 5);
			state.info.finish_time = action.payload.finish_time.slice(0, 5);
			state.info.team_number = action.payload.team_number;

			let date = "";
			for (let i = 0; i < 7; i++) {
				if (action.payload.day[i] === "1")	{
					if (i === 0)	{
						date = date + "월"
					}	else if (i === 1)	{
						date = date + "화"
					}	else if (i === 2)	{
						date = date + "수"
					}	else if (i === 3)	{
						date = date + "목"
					}	else if (i === 4) {
						date = date + "금"
					}	else if (i === 5) {
						date = date + "토"
					}  else if (i === 6) {
						date = date + "일"
					}
					state.info.days[i] = true
				}
			};

			state.info.day = date;
		},
		saveBoardId: (state, action) => {
			state.boardId = action.payload;
		},
		saveTodoLists: (state, action) => {
			state.todoLists = action.payload;
		}
	},
	extraReducers: (builder) => {
	}
});

export default groupBoardSlice;