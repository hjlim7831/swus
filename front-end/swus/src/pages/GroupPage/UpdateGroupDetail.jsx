import React, { useEffect, useState } from 'react'
import { Container } from "@mui/system";
import { Button, Grid, Divider, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from '@mui/material/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import axios from "../../Utils/index";
import myGroupListSlice from "../../store/MyGroupListSlice";

function GroupDetailUpdate() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
  const filterCategory = /S/;

	const [inputs, setInputs] = useState();
	const [todoList, setTodoList] = useState([])
	const teamId = useSelector(state => {
		return state.myGroupList.groupId
	})

	const [studyDays, setStudyDays] = useState([false, false, false, false, false, false, false])

	useEffect(() => {
		const config = {
			url: `/users/my-groups/${teamId}`,
			method: "GET",
		};

		axios(config)
			.then((response) => {
				setInputs(response.data)
				const newDays = [...studyDays]
				for (let i = 0; i < 7; i++) {
					if (response.data.day[i] === "1")	{
						newDays[i] = !newDays[i]
					}
				}
				setStudyDays(newDays)
				let newTodos = []
				const plannedTodos = response.data.todolist
				for (let i = 0; i < plannedTodos.length; i++)	{
					console.log("반복문 출력")
					newTodos.push({ round: plannedTodos[i].id_round, content: plannedTodos[i].content })
					setTodoList(newTodos)
				}
			})
	}, [])


	function getWeekTopics() {
		if (Array.isArray(todoList) && todoList.length > 0) {
			return todoList.map((round, index) => {
				return (
					<>
						<Grid item xs={2} sx={{ marginBlock: 1 }}>
							<div style={{ fontWeight: "bold", margineInline: 5, padding: 5, textAlign: "center", alignItems: "center", height: "40px", justifyContent: "center", display: "flex", marginTop: 5}}>
								<span style={{ marginRight: 30, display: "inline-block"}}>{round.round}주차</span>
							</div>
						</Grid>
						<Grid item xs={9} sx={{ marginBlock: 1, marginLeft: 1.5 }}>
							<TextField
								variant='outlined'
								name={"todolist" + String(index)}
								value={round.content}
								fullWidth
								onChange={onHandleInput}
							/>
						</Grid>
					</>
				)
			});
		}	else {
			return
		}
	}

	const onHandleInput = (event) => {
		const name = event.target.name
		const value = event.target.value
		if (name.slice(0, 3) === "day") {
			const num = Number(name.slice(3, 4))
			const date = "days"
			const newDay = [...studyDays]
			for (let i = 0; i < 7; i++) {
				if (i === num) {
					newDay[num] = !newDay[num]
				}
			}
			setStudyDays(newDay)
		}	else if (name.slice(0, 8) === "todolist") {
			const idx = Number(name.slice(8, 9))
			const newTodoList = [...todoList]
			const round = newTodoList[idx].round
			newTodoList[idx] = { round: round, content: value }
			console.log(todoList)
			setTodoList(newTodoList)
		}	else	{
			setInputs({...inputs, [name] : value})
		}
	};

	const blank = /^\s+|\s+$/g;

	const onHandleSubmit = (event) => {
		event.preventDefault();

		let selectedDays = "";
		for (let i = 0; i < 7; i++) {
			if (studyDays[i]) {
				selectedDays += "1"
			}	else {
				selectedDays += "0"
			}
		}

		const today = new Date();
		const year = today.getFullYear();
		let month = today.getMonth + 1;
		if (month < 10) {
			month = "0" + `${month}`;
		}
		let day = today.getDate();
		if (day < 10)	{ 
			day = "0" + `${day}`;
		}
		const nowDate = `${year}` + `${month}` + `${day}`;

		if (!inputs.team_name.replace(blank, "")) {
			alert("팀 이름을 입력해주세요.")
      return
		}	else if (!inputs.start_time.replace(blank, "")) {
			alert("시작 시간을 입력해주세요.")
      return
		}	else if (!inputs.finish_time.replace(blank, "")) {
			alert("종료 시간을 입력해주세요.")
			return
		}	else if (!selectedDays.replace(/0/gi, ""))	{
			alert("요일을 선택해주세요.")
			return
		}	else if (inputs.board_number < 2) {
			alert("2명 이상의 모집인원을 선택해주세요.")
			return
		}	else if (Number(inputs.start_time.replace(/:/gi, "") > Number(inputs.finish_time.replace(/:/gi, "")))) {
			alert("시작 시간이 종료 시간보다 늦습니다!")
			return
		}	else if (Number(inputs.begin_at.replace(/-/gi, "") > Number(inputs.end_at.replace(/-/gi, "")))) {
			alert("스터디 시작 날짜가 종료 날짜보다 늦습니다!")
			return
		}	else if (Number(nowDate) > Number(inputs.begin_at.replace(/-/gi,""))) {
			alert("스터디 시작 날짜가 이미 지났습니다!")
			return
		}

		const payload = {
			team_name: inputs.team_name,
			begin_at: inputs.begin_at,
			end_at: inputs.end_at,
			day: selectedDays,
			start_time: inputs.start_time,
			finish_time: inputs.finish_time,
			team_info: inputs.team_info,
			todolist: todoList,
		};

		const config = {
			url: `/my-teams/${teamId}`,
			method: "PUT",
			data: payload
		};

		const config2 = {
			url: `/my-teams/${teamId}/team-todos`,
			method: "PUT",
			data: {
				team_todo_list: todoList
			},
		}

		console.log("여기다!!")
		console.log(payload)

		axios(config)
			.then((response) => {
				console.log(teamId)
				axios(config2)
					// .then((response) => {
					// 	dispatch(myGroupListSlice.actions.getGroupDetails(response.data))
					// })
					.then((response) => {
						navigate(`/group/mystudy/group/${teamId}`);
					})
			})
			.catch((error) => {
				console.log(error)
			})
	};

	const addTopic = () => {
		if (!todoList) {
			setTodoList([{ round: 1, content: "" }])
		}	else	{
			setTodoList([...todoList, { round: todoList.length + 1, content: ""}])
		}
	};

	const dayItems = [
		{ name: "day0", label: "월" },
		{ name: "day1", label: "화" },
		{ name: "day2", label: "수" },
		{ name: "day3", label: "목" },
		{ name: "day4", label: "금" },
		{ name: "day5", label: "토" },
		{ name: "day6", label: "일" }
	]


  return (
    <>
		{(inputs && todoList) ? (
			<>
				<Container sx={{ border: "1px solid gray", borderRadius: "10px", minHeight: "500px", marginTop: "20px", background: "white" }}>
					<form>
						<Grid container style={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}>
							<p style={{ marginInline: 20, display: "flex", alignContent: "center", fontWeight: "bold", fontSize: "30px", textAlign: "center" }}>
									그룹 정보 수정
								</p>
								<div style={{ display: "flex", alignContent: "center"}}>
									<Button 
										type="submit" 
										variant='contained' 
										sx={{ backgroundColor: "green", m: 3, height: "40px" }}
										size="small"
										onClick={onHandleSubmit}>수정하기</Button>
							</div>
						</Grid>
							<Divider orientation='horizontal' flexItem sx={{ borderBottomWidth: 3, backgroundColor: "gray"}}/>
						<Grid container sx={{ alignItems: "center", display: "flex",  textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>팀 이름</p>
							</Grid>
							<Divider orientation="vertical" flexItem sx={{ mr: 3 }} />
							<div style={{ display: "flex", alignItems: "center" }}>
								<TextField
									id="team_name"
									name="team_name"
									value={inputs.team_name}
									variant="outlined"
									size="small"
									fullWidth
									onChange={onHandleInput}
								/>
							</div>
						</Grid>
							<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>스터디 일정 </p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3 }}/>
							<div style={{ display: "flex", alignItems: "center"}}>
								<TextField
									name="begin_at"
									value={inputs.begin_at}
									type="date"
									InputLabelProps={{
										shrink: true,
									}}
									onChange={onHandleInput}
									size="small"
									sx={{ marginRight: 1 }}
								/>
								~ 
								<TextField
									name="end_at"
									value={inputs.end_at}
									type="date"
									InputLabelProps={{
										shrink: true,
									}}
									onChange={onHandleInput}
									size="small"
									sx={{ marginLeft: 1 }}
								/>
							</div>
						</Grid>
							<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>스터디 시간 </p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<div style={{ display: "flex", alignItems: "center"}}>
								<TextField
									name="start_time"
									value={inputs.start_time}
									type="time"
									InputLabelProps={{
										shrink: true,
									}}
									onChange={onHandleInput}
									size="small"
									sx={{ marginRight: 1 }}
								/>
								~
								<TextField
									name="finish_time"
									value={inputs.finish_time}
									type="time"
									InputLabelProps={{
										shrink: true,
									}}
									onChange={onHandleInput}
									size="small"
									sx={{ marginLeft: 1 }}
								/>
							</div>
						</Grid>
							<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>스터디 요일</p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<div style={{ display: "flex", alignItems: "center"}}>
									{dayItems.map((item, index) => {
										return (
											<FormControlLabel
											key={uuidv4()}
											name={item.name}
											label={item.label}
											value={
												[index]}
											control={<Checkbox checked={studyDays[index]} onChange={onHandleInput} />}
											/>
										)
									})}
								</div>
						</Grid>
							<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2} sx={{ justifyContent: "center", alignContent: "center", alignItems: "center", justifyItems: "center" }}>
								<p>팀 정보</p>
							</Grid>
								<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<Grid item xs={9}>
								<TextField  
									variant='outlined' 
									name="team_info"
									value={inputs.team_info}
									sx={{ my: "14px" }} 
									size="small"
									multiline
									rows={10}
									fullWidth
									margin='dense'
									onChange={onHandleInput}
								/>
							</Grid>
								<Divider orientation='horizontal' flexItem />
						</Grid>
							<Divider orientation='horizontal' flexItem />
						<Container style={{ overflowY: "scroll", height: "200px", marginBottom: 10 }}>
							<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
								{getWeekTopics()}
							</Grid>
							<Grid container sx={{ justifyContent: "center", display: "flex", marginBlock: 3 }}>
								<Icon
									color="primary"
									sx={{ cursor: "pointer"}}
									onClick={addTopic}
								>add_circle</Icon>
							</Grid>
						</Container>
					</form>
				</Container>
			</>
		) 
		: <div>loading</div>}
    </>
  )
}

export default GroupDetailUpdate