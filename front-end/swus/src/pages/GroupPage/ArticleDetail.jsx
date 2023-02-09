import { Container } from '@mui/system';
import { Grid, Divider, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import deleteArticle from '../../components/modals/DeleteArticle';
import axios from "../../Utils/index";




function ArticleDetail() {

	const navigate = useNavigate();
  const [article, setArticle] = useState([]);

	const [day, setDay] = useState("");
	const [studyPlan, setStudyPlan] = useState("");
	const filterCategory = /S/;

	
	useEffect(() => {
		const boardId = window.location.pathname.slice(13, window.location.pathname.length + 1);
		const config = {
			url: `/boards/${boardId}`,
			method: "GET",
		};
		
		axios(config)
		.then((response) => {
			setArticle(response.data)

			let date = "";
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
			}
			setDay(date)

			console.log("역;!")
			console.log(article)
			if (article.begin_at === "" || article.end_at === "")	{
				setStudyPlan("미정")
			}	else {
				setStudyPlan(article.begin_at + " ~ " + article.end_at)
			}

			setArticle({...article, ["start_time"]: response.data.start_time.slice(0, 5)})
			setArticle({...article, ["finish_time"]: response.data.finish_time.slice(0, 5)})
		})
	}, [])

	function getButtons () {
		return (
			<>
				<p style={{ paddingLeft: 30, paddingTop: 5}}>
					<EditOutlinedIcon
						variant="contained"
						sx={{ fontSize: 30, color: "blue", "&:hover": { cursor: "pointer"} }}
						onClick={() => {navigate("/group/board/:boardId/update")}} />
				</p>
				<p style={{ paddingLeft: 10, paddingTop: 5}}>
					<DeleteOutlinedIcon
						onClick={deleteArticle}
						sx={{ fontSize: 30, color: "red", "&:hover": { cursor: "pointer"} }} 
					/>
				</p>
			</>
		)
	}
	 
  return (
		<>
			<Container sx={{ border: "1px gray solid", borderRadius: "10px", minWidth: "1000px"}}>
				<Grid container sx={{ px: 2 }}>
					<Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: ""}}>
    				<p style={{ fontWeight: "bold", fontSize: "30px"}}>
							<span style={{ fontWeight: "bold" }}>
								{filterCategory.test(article.category) 
									? <span style={{ color: "red" }}>[스터디]</span> 
									: <span style={{ color: "blue" }}>[메이트]</span>}
							</span>
							<span style={{ marginLeft: 30 }}>{article.title}</span>
						</p>
						{(localStorage.getItem("id") === article.email) ? getButtons() : null }
					</Grid>
					<Grid item xs={3}>
					</Grid>
					<Grid item xs={1.5} sx={{ alignItems: "center", display: "flex", pl: 5}}>
					</Grid>
					<Grid item xs={1.5} sx={{ alignItems: "center", display: "flex", pl: 4}}>
						<Button 
							variant="contained" 
							sx={{ height: "40px" }} 
							onClick={() => {						
								navigate("/group/board");
								}}>목록 보기</Button>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={1} sx={{ textAlign: "center" }}>
						<p>{article.nickname}</p>
					</Grid>
					<Grid item xs={8} sx={{ px: 3 }}>
						<p>{article.writedAt}</p>
					</Grid>
					<Grid item xs={3} sx={{ textAlign: "right", display: "flex", justifyContent: "right", pr: 3 }}>
						<p>조회수 : {article.views}</p>
					</Grid>
				</Grid>
				<Divider orientation='horizontal' flexItem sx={{ borderBottomWidth: 5 }}/>
				<Grid container>
					<Grid item xs={2} sx={{ alignContent: "center" }}>
						<p style={{ fontWeight: "bold", textAlign: "center" }}>스터디 일정</p>
					</Grid>
					<Grid item xs={3}>
						<p>{studyPlan}</p>
					</Grid>
					<Divider orientation='vertical' flexItem variant='middle' sx={{ mr: 2 }}/>
					<Grid item xs={2}>
						<p style={{ fontWeight: "bold", textAlign: "center" }}>스터디 시간</p>
					</Grid>
					<Grid item xs={2}>
						<p style={{ textAlign: "center" }}>{day} {article.start_time} - {article.finish_time}</p>
					</Grid>
					<Divider orientation='vertical' flexItem variant='middle' sx={{ mx: 2 }}/>
					<Grid item xs={1}>
						<p style={{ fontWeight: "bold", textAlign: "center" }}>인원 현황</p>
					</Grid>
					<Grid item xs={1}>
						<p style={{ textAlign: "center" }}>{article.team_number} / {article.board_number}</p>
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
						<div style={{ whiteSpace: "pre-wrap", paddingLeft: 10, paddingTop: 10, overflowY: "scroll", height: "500px" }}>{article.content}</div>
					</Box>
				</Container>
			</Container>
		</>
  )
}

export default ArticleDetail