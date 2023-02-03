import React, { useState } from 'react';
import { Checkbox, FormControlLabel, TextField, Divider, Grid } from '@mui/material';
import { MenuItem, Select, Button } from '@mui/material';
import { Container } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import checkedSlice from '../../store/CheckedSlice';
import { useNavigate } from 'react-router-dom';
import { createStudyRoom } from '../../store/CheckedSlice';


function CreateArticleForm() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const articleDetail = useSelector(state => {
		return state.checkDays
	});

	const [inputs, setInputs] = useState({
		category: "",
		title: "",
		content: "",
		day: "",
		days: [false, false, false, false, false, false, false],
		recruitmentNumber: 0,
		beginAt: "",
		endAt: "",
		startTime: "",
		finishTime: "",
		writedAt: "",
	})

	const onHandleInput = (event) => {
		const name = event.target.name
		const value = event.target.value
		if (name.slice(0, 3) === "day") {
			const num = Number(name.slice(3, 4))
			const date = "days"
			const newDay = [...inputs.days]
			for (let i = 0; i < inputs.days.length; i++) {
				if (i === num) {
					newDay[num] = !newDay[num]
				}
			}
			setInputs({...inputs, [date] : newDay})
		}	else	{
			setInputs({...inputs, [name] : value})
		}
	}

	const onHandleSubmit = (event) => {
		event.preventDefault();
		const blank = /^\s+|\s+$/g;
		let selectedDays = "";

		for (let i = 0; i < inputs.days.length; i++)	{
			if (inputs.days[i]) {
				selectedDays += "1"
      }	else {
				selectedDays += "0"
			}
		}

		if (!inputs.category.replace(blank, "")) {
			alert("스터디 유형을 선택해주세요.")
			return
		}	else if (!inputs.title.replace(blank, "")) {
			alert("제목을 입력해주세요.")
      return
		}	else if (!inputs.startTime.replace(blank, "")) {
			alert("시작 시간을 입력해주세요.")
      return
		}	else if (!inputs.finishTime.replace(blank, "")) {
			alert("종료 시간을 입력해주세요.")
			return
		}	else if (!selectedDays.replace(/0/gi, ""))	{
			alert("요일을 선택해주세요.")
			return
		}	else if (inputs.recruitmentNumber === 0) {
			alert("모집 인원을 정해주세요.")
			return
		}	else if (Number(inputs.startTime.replace(/:/gi, "") > Number(inputs.finishTime.replace(/:/gi, "")))) {
			alert("시작 시간이 종료 시간보다 늦습니다!")
			return
		}	else if (Number(inputs.beginAt.replace(/-/gi, "") > Number(inputs.endAt.replace(/-/gi, "")))) {
			alert("스터디 시작 날짜가 종료 날짜보다 늦습니다!")
			return
		}

		const payload = {
			category: inputs.category,
			title: inputs.title,
			content: inputs.content,
			day: inputs.day,
			recruitmentNumber: inputs.recruitmentNumber,
			beginAt: inputs.beginAt,
			endAt: inputs.endAt,
			startTime: inputs.startTime,
			finishTime: inputs.finishTime,
		}
		dispatch(checkedSlice.actions.writeArticle(inputs))
		dispatch(createStudyRoom(payload))
		navigate("/group/detail");
	}



	return (
		<>
			<Container sx={{ border: "1px gray solid", borderRadius: "10px"}}>
				<form>
						<Grid container style={{ justifyContent: "space-between", display: "flex", alignContent: "center"}}>
							<p style={{ display: "flex", alignContent: "center", fontWeight: "bold", fontSize: "30px", textAlign: "center" }}>
								게시글 작성
							</p>
							<div style={{ display: "flex", alignContent: "center"}}>
								<Button 
									type="submit" 
									variant='contained' 
									sx={{ backgroundColor: "green", m: 3 }}
									size="small"
									disabled={!true}
									onClick={onHandleSubmit}>글 작성</Button>
							</div>
						</Grid>
					<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>유형 </p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<div style={{ display: "flex", alignItems: "center"}}>
								<Select
									name="category"
									value={inputs.category}
									onChange={onHandleInput}
									size="small"
								>
									<MenuItem value="study">스터디</MenuItem>
									<MenuItem value="mate">메이트</MenuItem>
								</Select>
							</div>
						</Grid>
					<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>제목 </p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<div style={{ display: "flex", alignItems: "center"}}>
								<TextField 
									id='title' 
									name='title' 
									value={inputs.title}
									placeholder="title" 
									variant='standard' 
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
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<div style={{ display: "flex", alignItems: "center"}}>
								<TextField
									name="beginAt"
									value={inputs.beginAt}
									type="date"
									InputLabelProps={{
										shrink: true,
									}}
									onChange={onHandleInput}
									size="small"
								/>
								-
								<TextField
									name="endAt"
									value={inputs.endAt}
									type="date"
									InputLabelProps={{
										shrink: true,
									}}
									onChange={onHandleInput}
									size="small"
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
										name="startTime"
										value={inputs.startTime}
										type="time"
										InputLabelProps={{
											shrink: true,
										}}
										onChange={onHandleInput}
										size="small"
									/>
									-
									<TextField
										name="finishTime"
										value={inputs.finishTime}
										type="time"
										InputLabelProps={{
											shrink: true,
										}}
										onChange={onHandleInput}
										size="small"
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
								<FormControlLabel
									name="day0"
									label="월"
									value={inputs.days[0]}
									control={<Checkbox checked={inputs.days[0]} onChange={onHandleInput}/>}
								/>
								<FormControlLabel
									name="day1"
									label="화"
									value={inputs.days[1]}
									control={<Checkbox checked={inputs.days[1]} onChange={onHandleInput}/>}
								/>
								<FormControlLabel
									name="day2"
									label="수"
									value={inputs.days[2]}
									control={<Checkbox checked={inputs.days[2]} onChange={onHandleInput}/>}
								/>
								<FormControlLabel
									name="day3"
									label="목"
									value={inputs.days[3]}
									control={<Checkbox checked={inputs.days[3]} onChange={onHandleInput}/>}
								/>
								<FormControlLabel
									name="day4"
									label="금"
									value={inputs.days[4]}
									control={<Checkbox checked={inputs.days[4]} onChange={onHandleInput}/>}
								/>
								<FormControlLabel
									name="day5"
									label="토"
									value={inputs.days[5]}
									control={<Checkbox checked={inputs.days[5]} onChange={onHandleInput}/>}
								/>
								<FormControlLabel
									name="day6"
									label="일"
									value={inputs.days[6]}
									control={<Checkbox checked={inputs.days[6]} onChange={onHandleInput}/>}
								/>
							</div>
						</Grid>
					<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>모집인원 </p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<div style={{ display: "flex", alignItems: "center"}}>
								<Select
									name="recruitmentNumber"
									value={inputs.recruitmentNumber}
									onChange={onHandleInput}
									size="small"
								>
									<MenuItem value={0}>0</MenuItem>
									<MenuItem value="1">1</MenuItem>
									<MenuItem value="2">2</MenuItem>
									<MenuItem value="3">3</MenuItem>
									<MenuItem value="4">4</MenuItem>
									<MenuItem value="5">5</MenuItem>
									<MenuItem value="6">6</MenuItem>
								</Select>
							</div>
						</Grid>
					<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2} sx={{ justifyContent: "center", alignContent: "center", alignItems: "center", justifyItems: "center" }}>
								<p>상세 내용 </p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<Grid item xs={9}>
								<TextField  
									variant='standard' 
									name="content"
									value={inputs.content}
									sx={{ ml: 1, mt: "14px"}} 
									size="small"
									multiline
									rows={3}
									fullWidth
									onChange={onHandleInput}
								/>
							</Grid>
						<Divider orientation='horizontal' flexItem />
					</Grid>
				</form>
			</Container>
		</>
	)
}


function CreateArticle() {


  return (
    <>
			<div>
				<CreateArticleForm />
			</div>
    </>
  )
}

export default CreateArticle