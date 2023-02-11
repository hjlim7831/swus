import { createSlice } from "@reduxjs/toolkit";


const myGroupListSlice = createSlice({
  name: "myGroupList",
  initialState: {
    groupId: 0,
    info: {
      category: "",
      day: "",
      begin_at: "",
      end_at: "",
      leader: "",
      leader_email: "",
      member_list: [],
      recruitment_number: 0,
      team_name: "",
      team_number: 0,
      team_info: "",
      team_done: "",
      start_time: "",
      finish_time: "",
      days: [false, false, false, false, false, false, false],
    },
  },
  reducers: {
    getGroupDetails: (state, action) => {
      state.info.category = action.payload.category;
      state.info.team_name = action.payload.team_name;
      state.info.team_info = action.payload.team_info;
      state.info.leader = action.payload.leader;
      state.info.leader_email = action.payload.leader_email;
      state.info.begin_at = action.payload.begin_at;
      state.info.end_at = action.payload.end_at;
      state.info.start_time = action.payload.start_time.slice(0, 5);
      state.info.finish_time = action.payload.finish_time.slice(0, 5);
      state.info.member_list = action.payload.member_list;
      state.info.recruitment_number = action.payload.recruitment_number;
      state.info.team_number = action.payload.team_number;
      state.info.team_done = action.payload.team_done;

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
    saveGroupId: (state, action) => {
      state.groupId = action.payload;
    },
  }
})

export default myGroupListSlice;