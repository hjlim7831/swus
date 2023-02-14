import { Container } from '@mui/system';
import { Grid, Divider, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import deleteArticle from '../../components/modals/DeleteArticle';
import axios from "../../Utils/index";
import { useDispatch, useSelector } from 'react-redux';
import groupBoardSlice from '../../store/GroupBoardSlice';




function ArticleDetail() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
  const [article, setArticle] = useState([]);
	const [startTime, setStartTime] = useState();
	const [finishTime, setFinishTime] = useState();
	const filterCategory = /S/;

	const articleDetail = useSelector(state => {
		return state.groupBoard.info
	})

	const boardId = window.location.pathname.slice(13, window.location.pathname.length + 1)
	
	useEffect(() => {
		const config = {
			url: `/boards/${boardId}`,
			method: "GET",
		}

		axios(config)
			.then((response) => {
				setArticle(response.data)
				setStartTime(response.data.start_time.slice(0, 5))
				setFinishTime(response.data.finish_time.slice(0, 5))
			})
		dispatch(groupBoardSlice.actions.saveBoardId(boardId))
	}, [])

	function getButtons () {
		return (
			<>
				<p style={{ paddingLeft: 30, paddingTop: 5}}>
					<EditOutlinedIcon
						variant="contained"
						sx={{ fontSize: 30, color: "blue", "&:hover": { cursor: "pointer"} }}
						onClick={() => {navigate(`update`)}} />
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

	function getStudyDays() {
		if (article.day) {
			let checked = [false, false, false, false, false, false, false]
			for (let i = 0; i < 7; i++) {
				if (article.day[i] === "1") {
					checked[i] = true;
				}
			}
			const days = ["월", "화", "수", "목", "금", "토", "일"]
			return days.map((date, index) => {
				const style = {
					background: checked[index] ? "#9EC2F8" : "white",
					// color: checked[index] ? "white" : "black",
					marginInline: 3,
					borderRadius: 5,
					padding: "1px",
					fontWeight: "bold",
				}
				return (
					<>
						<span 
							style={style}>{date}</span>
					</>
				)
			});
		}	else {
			return null
		}
	}
	 
  return (
	<>
		{article ? (
			<>
			<Container sx={{ border: "1px gray solid", borderRadius: "10px", minWidth: "1000px", background: "white" }}>
				<Grid container sx={{ px: 2, mt: 3 }}>
					<Grid item xs={9} sx={{ display: "flex", alignItems: "center", justifyContent: "" }}>
    				<p style={{ fontWeight: "bold", fontSize: "30px", marginLeft: "10px" }}>
							<span style={{ fontWeight: "bold" }}>
								{filterCategory.test(article.category) 
									? <span style={{ color: "red" }}>[스터디]</span> 
									: <span style={{ color: "blue" }}>[메이트]</span>}
							</span>
							<span style={{ marginLeft: 30 }}>{article.title}</span>
						</p>
						{(localStorage.getItem("id") === article.email) ? getButtons() : null }
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
					<Grid item xs={2}>
						<p style={{ justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
							<span style={{ fontSize: "20px", fontWeight: "bold" }}>작성자: </span>
							<span style={{ fontSize: "20px", fontWeight: "bold" }}>{article.nickname}</span>
						</p>
					</Grid>
					<Grid item xs={7} sx={{ px: 3 }}>
						<p>{article.writed_at}</p>
					</Grid>
					<Grid item xs={3} sx={{ textAlign: "right", display: "flex", justifyContent: "right", pr: 3 }}>
						<p style={{ fontSize: "18px" }}>조회수 : {article.views}</p>
					</Grid>
				</Grid>
				<Divider orientation='horizontal' flexItem sx={{ borderBottomWidth: 5 }}/>
				<Grid container sx={{ display: "flex", alignItems: "center"}}>
					<Grid item xs={2} sx={{ alignContent: "center" }}>
						<p style={{ fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>스터디 일정</p>
					</Grid>
					<Grid item xs={3}>
						{(article.begin_at && article.end_at) 
							? <p style={{ textAlign: "center", fontSize: "20px" }}>{article.begin_at} ~ {article.end_at}</p> 
							: <p style={{ textAlign: "center", fontSize: "20px" }}>미정</p>}
					</Grid>
					<Divider orientation='vertical' flexItem variant='middle' sx={{ mr: 2 }}/>
					<Grid item xs={2}>
						<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
							<p style={{ fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>스터디 시간</p>
						</div>
					</Grid>
					<Grid item xs={2}>
						<p style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
							<p style={{ textAlign: "center", marginInline: 5 }}>{getStudyDays()} </p>
							<p style={{ textAlign: "center", marginInline: 5 }}>{startTime} ~ {finishTime}</p>
						</p>
					</Grid>
					<Divider orientation='vertical' flexItem variant='middle' sx={{ mx: 2 }}/>
					<Grid item xs={1}>
						<p style={{ fontWeight: "bold", textAlign: "center", fontSize: "18px" }}>인원 현황</p>
					</Grid>
					<Grid item xs={1}>
						<p style={{ textAlign: "center", fontSize: "18px" }}>{article.team_number} / {article.board_number}</p>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={2} sx={{ alignContent: "center" }}>
						<p style={{ fontWeight: "bold", textAlign: "center" }}>상세 내용</p>
					</Grid>
				</Grid>
				<Container 
					sx={{ width: "85%", minHeight: "480px", borderRadius: "10px", backgroundColor: "rgba(244, 239, 230, 0.47)", padding: 3, mb: 3}}>
					<Box>
						<div style={{ whiteSpace: "pre-wrap", paddingLeft: 10, paddingTop: 10, overflowY: "scroll", height: "420px" }}>{article.content}</div>
					</Box>
				</Container>
			</Container>
		</>
		) 
		: <div>loading</div>
		}
	</>
  )
}

export default ArticleDetail