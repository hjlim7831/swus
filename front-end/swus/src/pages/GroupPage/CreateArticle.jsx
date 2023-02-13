import React, { useState } from 'react';
import { Checkbox, FormControlLabel, TextField, Divider, Grid, OutlinedInput } from '@mui/material';
import { MenuItem, Select, Button, InputLabel, FormControl } from '@mui/material';
import { Container } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "../../Utils/index";
import { v4 as uuidv4 } from 'uuid';
import groupBoardSlice from '../../store/GroupBoardSlice';



function CreateArticleForm() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		category: "",
		title: "",
		content: "",
		day: "",
		days: [false, false, false, false, false, false, false],
		board_number: 0,
		begin_at: "",
		end_at: "",
		start_time: "",
		finish_time: "",
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
			console.log(newDay)
			setInputs({...inputs, [date] : newDay})
		}	else	{
			setInputs({...inputs, [name] : value})
		}
	}

	const handleupdateField = (e) => {
		setInputs({...inputs, [e.target.name] : e.target.value})
  };
	
	const blank = /^\s+|\s+$/g;

	const onHandleSubmit = (event) => {
		event.preventDefault();
		let selectedDays = "";

		for (let i = 0; i < inputs.days.length; i++)	{
			if (inputs.days[i]) {
				selectedDays += "1"
      }	else {
				selectedDays += "0"
			}
		}
		const today = new Date();

		const year = today.getFullYear();
		const month = today.getMonth() + 1;
		let day = today.getDate();
		if (day < 10) {
			day = "0" + `${day}`;
    }
		const nowDate = `${year}` + `0${month}` + `${day}`;


		if (!inputs.category.replace(blank, "")) {
			alert("스터디 유형을 선택해주세요.")
			return
		}	else if (!inputs.title.replace(blank, "")) {
			alert("제목을 입력해주세요.")
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
			category: inputs.category,
			title: inputs.title,
			content: inputs.content,
			day: selectedDays,
			board_number: inputs.board_number,
			begin_at: inputs.begin_at,
			end_at: inputs.end_at,
			start_time: inputs.start_time,
			finish_time: inputs.finish_time,
		}

		const config = {
			url: `/boards`,
			method: "POST",
			data: payload,
		};

		
		axios(config)
		.then((response) => {

			const boardId = response.data.board_id
			const config2 = {
				url: `/boards/${boardId}`,
				method: "GET",
			};

			axios(config2)
				.then((response) => {
					dispatch(groupBoardSlice.actions.saveBoardId(boardId))
					dispatch(groupBoardSlice.actions.getArticleDetails(response.data))
				})
				.then((response) => {
					navigate(`/group/board/${boardId}`);
				})
		})
		.catch((error) => {
			console.log(error);
		})
	}

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
			<Container sx={{ border: "1px gray solid", borderRadius: "10px", marginTop: 3, background: "white" }}>
				<form>
						<Grid container style={{ justifyContent: "space-between", display: "flex", alignContent: "center"}}>
							<p style={{ paddingLeft: 10, display: "flex", alignItems: "center", fontWeight: "bold", fontSize: "30px", textAlign: "center" }}>
								게시글 작성
							</p>
							<div style={{ display: "flex", alignItems: "center" }}>
								<Button 
									type="submit" 
									variant='contained' 
									sx={{ backgroundColor: "green", m: 3, height: "40px", "&:hover": { backgroundColor: "green" } }}
									size="small"
									disabled={!true}
									onClick={onHandleSubmit}>글 작성</Button>
							</div>
						</Grid>
					<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>유형 <span style={{ color: "red" }}>*</span></p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<Grid item xs={4} style={{ display: "flex", alignItems: "center"}}>
								<div>
									<TextField
										label="유형"
										name="category"
										select
										required
										value={inputs.category}
										onChange={onHandleInput}
										fullWidth
										size="small"
										error={!inputs.category.replace(blank, "")}
										style={{ width: "100px"}}
									>
										{inputs.category? '' : <MenuItem value=""> -- </MenuItem>}
                    <MenuItem value="S">스터디</MenuItem>
                    <MenuItem value="M">메이트</MenuItem>
									</TextField>
								</div>
							</Grid>
						</Grid>
					<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignItems: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>제목 <span style={{ color: "red" }}>*</span></p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<Grid item xs={6}>
								<div style={{ display: "flex", alignItems: "center" }}>
									<TextField 
										id='title' 
										name='title' 
										label="제목"
										value={inputs.title}
										variant='outlined' 
										size="small" 
										fullWidth
										required
										onChange={onHandleInput}
										margin="dense"
										placeholder="제목을 입력해주세요."
										error={!inputs.title.replace(blank, "")}
									/>
								</div>
							</Grid>
						</Grid>
					<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>스터디 일정 </p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<div style={{ display: "flex", alignItems: "center"}}>
								<TextField
									name="begin_at"
									value={inputs.begin_at}
									type="date"
									InputLabelProps={{
										shrink: true,
										style: {
											fontSize: 15,
											marginTop: 3
										}
									}}
									label="시작일자"
									onChange={onHandleInput}
									size="small"
									style={{ marginRight: 10 }}
								/>
								~
								<TextField
									name="end_at"
									value={inputs.end_at}
									type="date"
									InputLabelProps={{
										shrink: true,
										style: {
											fontSize: 15,
											marginTop: 3
										}
									}}
									label="종료일자"
									onChange={onHandleInput}
									size="small"
									style={{ marginInline: 10 }}
								/>
							</div>
						</Grid>
					<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
								<Grid item xs={2}>
									<p>스터디 시간 <span style={{ color: "red" }}>*</span></p>
								</Grid>
								<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
								<div style={{ display: "flex", alignItems: "center"}}>
									<TextField
										name="start_time"
										value={inputs.start_time}
										type="time"
										label="시작시간"
										error={!inputs.start_time.replace(blank, "")}
										InputLabelProps={{
											shrink: true,
											style: {
												fontSize: 15,
												marginTop: 3
											}
										}}
										onChange={onHandleInput}
										size="small"
										style={{ marginRight: 10 }}
									/>
									~
									<TextField
										name="finish_time"
										value={inputs.finish_time}
										type="time"
										label="종료시간"
										InputLabelProps={{
											shrink: true,
											style: {
												fontSize: 15,
												marginTop: 3
											}
										}}
										error={!inputs.finish_time.replace(blank, "")}
										variant="outlined"
										onChange={onHandleInput}
										size="small"
										style={{ marginInline: 10 }}
									/>
								</div>
						</Grid>
					<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>스터디 요일 <span style={{ color: "red" }}>*</span></p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
							<div style={{ display: "flex", alignItems: "center"}}>
								{dayItems.map((item, index) => {
									return (
										<FormControlLabel
										 key={uuidv4()}
										 name={item.name}
										 label={item.label}
										 value={inputs.days[index]}
										 control={<Checkbox checked={inputs.days[index]} onChange={onHandleInput} />}
										/>
									)
								})}
							</div>
						</Grid>
					<Divider orientation='horizontal' flexItem />
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold" }}>
							<Grid item xs={2}>
								<p>모집인원 <span style={{ color: "red" }}>*</span></p>
							</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3 }}/>
							<div style={{ display: "flex", alignItems: "center" }}>
								<Select
									name="board_number"
									value={inputs.board_number}
									onChange={onHandleInput}
									size="small"
									error={inputs.board_number < 2}
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
						<Grid container style={{ alignContent: "center", display: "flex", textAlign: "center", fontWeight: "bold", height: "40vh"}}>
							<Grid item xs={2} sx={{ justifyContent: "center", alignContent: "center", alignItems: "center", justifyItems: "center" }}>
								<p style={{ marginTop: "25px" }}>상세 내용 </p>
							</Grid>
							<Divider orientation='vertical' sx={{ mr: 3, mt: 0 }}/>
							<Grid item xs={9}>
								<TextField  
									id="content"
									label="상세 내용"
									variant='outlined' 
									name="content"
									value={inputs.content}
									sx={{ mt: "20px"}} 
									size="small"
									margin="normal"
									multiline
									rows={14}
									inputProps={{
										resize: "both"
									}}
									fullWidth
									placeholder="세부 진행 계획에 대해 작성해주세요."
									onChange={handleupdateField}
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
