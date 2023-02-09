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
	const filterCategory = /S/;

	const articleDetail = useSelector(state => {
		return state.groupBoard.info
	})

	const boardId = window.location.pathname.slice(13, window.location.pathname.length + 1)
	
	useEffect(() => {
		setArticle(articleDetail)
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
				<Grid container>
					<Grid item xs={2} sx={{ alignContent: "center" }}>
						<p style={{ fontWeight: "bold", textAlign: "center" }}>스터디 일정</p>
					</Grid>
					<Grid item xs={3}>
						{(article.begin_at) ? <p>{article.begin_at} ~ {article.end_at}</p> : <p>미정</p>}
					</Grid>
					<Divider orientation='vertical' flexItem variant='middle' sx={{ mr: 2 }}/>
					<Grid item xs={2}>
						<p style={{ fontWeight: "bold", textAlign: "center" }}>스터디 시간</p>
					</Grid>
					<Grid item xs={2}>
						<p style={{ justifyContent: "center", alignItems: "center" }}>
							<span style={{ textAlign: "center", marginInline: 5 }}>{article.day} </span>
							<span style={{ textAlign: "center", marginInline: 5 }}>{article.start_time} ~ {article.finish_time}</span>
						</p>
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