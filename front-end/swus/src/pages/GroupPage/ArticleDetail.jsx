import { Container } from '@mui/system';
import { Grid, Divider, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function ArticleDetail() {

	const navigate = useNavigate();
  const article = useSelector(state => {
		return state.checkDays
	});

	const [day, setDay] = useState("");

	useEffect(() => {
		let date = ""
		for (let i = 0; i < article.day.length; i++) {
			if (article.day[i] === "1")	{
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
			}
		setDay(date)
		}
	}, [article.day])

	
	 
  return (
		<>
			<Container sx={{ border: "1px gray solid", borderRadius: "10px"}}>
				<Grid container sx={{ px: 2 }}>
					<Grid item xs={6}>
    				<h1>[{article.category}] {article.title}</h1>
					</Grid>
					<Grid item xs={3}>
					</Grid>
					<Grid item xs={1.5} sx={{ alignItems: "center", display: "flex", pl: 5}}>
						<Button
							variant="contained"
							sx={{ height: "40px" }}
							onClick={() => {navigate("/group/update")}}>수정하기</Button>
					</Grid>
					<Grid item xs={1.5} sx={{ alignItems: "center", display: "flex", pl: 4}}>
						<Button 
							variant="contained" 
							sx={{ height: "40px" }} 
							onClick={() => {navigate("/group")}}>뒤로 가기</Button>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={1} sx={{ textAlign: "center" }}>
						<p>서형준</p>
					</Grid>
					<Divider orientation='vertical' flexItem variant='middle'/>
					<Grid item xs={8} sx={{ px: 3}}>
						<p>{article.writedAt}</p>
					</Grid>
					<Grid item xs={2} sx={{ textAlign: "right"}}>
						<p>조회수 : 6</p>
					</Grid>
				</Grid>
				<Divider orientation='horizontal' flexItem sx={{ borderBottomWidth: 5 }}/>
				<Grid container>
					<Grid item xs={2} sx={{ alignContent: "center" }}>
						<p style={{ fontWeight: "bold", textAlign: "center" }}>스터디 일정</p>
					</Grid>
					<Grid item xs={3}>
						<p>{article.beginAt} - {article.endAt}</p>
					</Grid>
					<Divider orientation='vertical' flexItem variant='middle' sx={{ mr: 2}}/>
					<Grid item xs={2}>
						<p style={{ fontWeight: "bold", textAlign: "center" }}>스터디 시간</p>
					</Grid>
					<Grid item xs={2}>
						<p style={{ textAlign: "center" }}>{day} {article.startTime} - {article.finishTime}</p>
					</Grid>
					<Divider orientation='vertical' flexItem variant='middle' sx={{ mx: 2}}s/>
					<Grid item xs={1}>
						<p style={{ fontWeight: "bold", textAlign: "center" }}>인원 현황</p>
					</Grid>
					<Grid item xs={1}>
						<p style={{ textAlign: "center" }}>3 / {article.recruitmentNumber}</p>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={2} sx={{ alignContent: "center" }}>
						<p style={{ fontWeight: "bold", textAlign: "center" }}>상세 내용</p>
					</Grid>
				</Grid>
				<Container 
					sx={{ width: "85%", minHeight: "500px", borderRadius: "10px", backgroundColor: "rgba(244, 239, 230, 0.47)", padding: 3, mb: 3}}>
					<Box>
						<p>{article.content}</p>
					</Box>
				</Container>
			</Container>
		</>
  )
}

export default ArticleDetail