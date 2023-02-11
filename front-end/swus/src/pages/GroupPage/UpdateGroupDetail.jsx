import React, { useState } from 'react'
import { Container } from "@mui/system";
import { Button, Grid, Divider, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from '@mui/material/Icon';
import { useDispatch, useSelector } from 'react-redux';





function GroupDetailUpdate() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const teamDetails = useSelector(state => {
		return state.myGroupList.info
	});
  const filterCategory = /S/;

	const [inputs, setInputs] = useState(teamDetails);

	function getWeekTopics() {
		return inputs.todolist.map((todo, index) => {
			return (
				<>
					<Grid item xs={2} sx={{ marginBlock: 1 }}>
						<div style={{ fontWeight: "bold", margineInline: 5, padding: 5, textAlign: "center", alignItems: "center", height: "40px", justifyContent: "center", display: "flex", marginTop: 5}}>
							<span style={{ marginRight: 30, display: "inline-block"}}>{index + 1}주차</span>
						</div>
					</Grid>
					<Grid item xs={9} sx={{ marginBlock: 1, marginLeft: 1.5 }}>
						<TextField
							variant='outlined'
							name={"todolist" + String(index)}
							value={inputs.todolist[index]}
							fullWidth
							onChange={onHandleInput}
						/>
					</Grid>
					<Divider orientation='horizontal' flexItem />
				</>
			)
		})
	}

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
		}	else if (name.slice(0, 8) === "todolist") {
			const idx = Number(name.slice(8, 9))
			const newTodoList = [...inputs.todolist]
			newTodoList[idx] = value
			setInputs({...inputs, ["todolist"] : newTodoList })
		}	else	{
			setInputs({...inputs, [name] : value})
		}
	}

	const onHandleSubmit = (event) => {
		event.preventDefault();
		navigate("/mypage/group/:groupId");
	}

	const addTopic = () => {
		setInputs({...inputs, todolist: [...inputs.todolist, ""]})
	}


  return (
    <>
      <Container sx={{ border: "1px solid gray", borderRadius: "10px", minHeight: "500px" }}>
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
							<p>제목</p>
						</Grid>
						<Divider orientation="vertical" flexItem sx={{ mr: 3 }} />
						<div style={{ display: "flex", alignItems: "center" }}>
							<TextField
								id="title"
								name="title"
								value={inputs.title}
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
								name="beginAt"
								value={inputs.beginAt}
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
								name="endAt"
								value={inputs.endAt}
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
								name="startTime"
								value={inputs.startTime}
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
								name="finishTime"
								value={inputs.finishTime}
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
						<Grid item xs={2} sx={{ justifyContent: "center", alignContent: "center", alignItems: "center", justifyItems: "center" }}>
							<p>상세 내용 </p>
						</Grid>
							<Divider orientation='vertical' flexItem sx={{ mr: 3}}/>
						<Grid item xs={9}>
							<TextField  
								variant='outlined' 
								name="groupInfo"
								value={inputs.groupInfo}
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
					<Container style={{ overflowY: "scroll", height: "250px" }}>
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
}

export default GroupDetailUpdate