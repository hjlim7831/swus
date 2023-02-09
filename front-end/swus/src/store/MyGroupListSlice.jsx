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
    },
  },
  reducers: {

  }
})

export default myGroupListSlice;