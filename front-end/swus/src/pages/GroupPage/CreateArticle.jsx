import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import Input from '@mui/joy/Input';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from '../../store/Store';
import checkedSlice from '../../store/CheckedSlice';




function CheckDays() {
	const dispatch = useDispatch();
	const checked = useSelector(state => {
		return state.checkDays.value;
	});
	const day = useSelector(state => {
		return state.checkDays.day
	});
	const category = useSelector(state => {
		return state.checkDays.category
	});
	const data = useSelector(state => {
		return state.checkDays.data
	});
	const startDate = useSelector(state => {
		return state.checkDays.startDate
	});
	const finishDate = useSelector(state => {
		return state.checkDays.finishDate
	});
	const startTime = useSelector(state => {
		return state.checkDays.startTime
	});
	const finishTime = useSelector(state => {
		return state.checkDays.finishTime
	});
	const title = useSelector(state => {
		return state.checkDays.title
	});
	const content = useSelector(state => {
    return state.checkDays.content
	});
	const recruitmentNumber = useSelector(state => {
		return state.checkDays.recruitmentNumber
	});



	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<span>제목: </span> 
				<Input placeholder="TItle" variant="outlined" onChange={(event) => dispatch(checkedSlice.actions.getTitle(event.target.value))}/>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<span>내용: </span> 
				<Input placeholder="Content" variant="outlined" onChange={(event) => dispatch(checkedSlice.actions.getContent(event.target.value))}/>
			</Box>
			<TextField
        label="시작일자"
        type="date"
				onChange={(event) => {dispatch(checkedSlice.actions.getStartDate(event.target.value))}}
        InputLabelProps={{
          shrink: true,
        }}
      />
			<TextField
        label="종료일자"
        type="date"
				onChange={(event) => {dispatch(checkedSlice.actions.getFinishDate(event.target.value))}}
        InputLabelProps={{
          shrink: true,
        }}
      />
			<TextField
        id="time"
        label="시작 시간"
        type="time"
        defaultValue={startTime}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
				onChange={(event) => {dispatch(checkedSlice.actions.getStartTIme(event.target.value))}}
      />
			<TextField
        id="time"
        label="종료 시간"
        type="time"
        defaultValue={finishTime}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
				onChange={(event) => {dispatch(checkedSlice.actions.getFinishTime(event.target.value))}}
      />
			<FormControl size='large'>
				<InputLabel id="demo-simple-select-label">유형</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={category}
						label="category"
						onChange={(event) => {dispatch(checkedSlice.actions.typePick(event.target.value))}}
					>	
					
            <MenuItem value="--">--</MenuItem>
						<MenuItem value="study">스터디</MenuItem>
						<MenuItem value="mate">메이트</MenuItem>
					</Select>
			</FormControl>
			<FormControl size='large'>
				<InputLabel id="demo-simple-select-label">모집인원</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={recruitmentNumber}
						label="recruitmentNumber"
						onChange={(event) => {dispatch(checkedSlice.actions.getRecruitmentNumber(event.target.value))}}
					>
						<MenuItem value={0}>0</MenuItem>
						<MenuItem value="1">1</MenuItem>
						<MenuItem value="2">2</MenuItem>
						<MenuItem value="3">3</MenuItem>
						<MenuItem value="4">4</MenuItem>
						<MenuItem value="5">5</MenuItem>
						<MenuItem value="6">6</MenuItem>
					</Select>
			</FormControl>
			<Box>
				<FormControlLabel
					label="Monday"
					control={<Checkbox checked={checked[0]} onChange={() => dispatch(checkedSlice.actions.mon(0))}/>}
				/>
				<FormControlLabel
					label="Tuesday"
					control={<Checkbox checked={checked[1]} onChange={() => dispatch(checkedSlice.actions.mon(1))}/>}
				/>
				<FormControlLabel
					label="Wednesday"
					control={<Checkbox checked={checked[2]} onChange={() => dispatch(checkedSlice.actions.mon(2))}/>}
				/>
				<FormControlLabel
					label="Thursday"
					control={<Checkbox checked={checked[3]} onChange={() => dispatch(checkedSlice.actions.mon(3))}/>}
				/>
				<FormControlLabel
					label="Friday"
					control={<Checkbox checked={checked[4]} onChange={() => dispatch(checkedSlice.actions.mon(4))}/>}
				/>
				<FormControlLabel
					label="Saturday"
					control={<Checkbox checked={checked[5]} onChange={() => dispatch(checkedSlice.actions.mon(5))}/>}
				/>
				<FormControlLabel
					label="Sunday"
					control={<Checkbox checked={checked[6]} onChange={() => dispatch(checkedSlice.actions.mon(6))}/>}
				/>
			</Box>
			{title}
			{content}
			{category}
			{day}
			{startDate}
			{finishDate}
			{startTime}
			{finishTime}
			<Button onClick={() =>{
				const dataToSubmit = { 
					category: category, 
					day: day, 
					startDate: startDate,
					finishDate: finishDate,
				};
				dispatch(checkedSlice.actions.getData(dataToSubmit));
				console.log(data);
			}}
			variant="contained">글 작성하기</Button>
		</>
	)
}


function CreateArticle() {


  return (
    <>
			<Provider store={store}>
				<div>
					<CheckDays />
				</div>
			</Provider>
    </>
  )
}

export default CreateArticle