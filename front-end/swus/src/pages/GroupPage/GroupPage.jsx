import React, { useEffect, useState } from 'react';
import { Container,
					Table,
					TableBody,
					TableCell,
					TableContainer,
					TableHead,
					TableRow,
					TableFooter,
					TablePagination,
					Button,
					Grid,
				} from '@mui/material';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "../../Utils/index";
import { v4 as uuidv4 } from "uuid";
import groupBoardSlice from '../../store/GroupBoardSlice';


const filterCategory = /S/;

function GroupPage() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [page, setPage] = useState(0)
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const config = {
			url: `/boards`,
			method: "GET",
		};

		axios(config)
			.then((response) => {
				setArticles(response.data)
			})
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	};

	function goArticleDetail(boardId) {

		const config = {
			url: `/boards/${boardId}`,
			method: "GET",
		};

		axios(config)
			.then((response) => {
				// const boardId = window.location.pathname.slice(13, window.location.pathname.length + 1)
				console.log(response.data)
				// dispatch(groupBoardSlice.actions.saveBoardId(boardId))
				dispatch(groupBoardSlice.actions.getArticleDetails(response.data))
			})
			.then((response) => {
				navigate(`${boardId}`)
			})
	}

	return (
		<>
			<Container sx={{ border: "1px gray solid", borderRadius: "10px", height: "85vh", marginTop: 3 }}>
				<Grid container style={{ justifyContent: "space-between", display: "flex", alignContent: "center", marginBlock: 20 }}>
					<p style={{ display: "flex", 
											alignItems: "center", 
											fontWeight: "bold", 
											fontSize: "30px", 
											textAlign: "center",
											marginLeft: 10 }}>
						<span>스터디 모집게시판</span>
					</p>
					<Button 
						type="submit" 
						variant='contained' 
						sx={{ backgroundColor: "green", m: 3, height: "40px", "&:hover": { backgroundColor: "green" } }}
						size="small"
						onClick={() => {navigate("/group/board/create")}}>글 작성</Button>
				</Grid>

				<TableContainer style={{ textAlign: "center", border: "2px solid #1A1E33" }}>
					<Table style={{ textAlign: "center" }}>
						<TableHead>
							<TableRow>
								<TableCell style={{ fontSize: "15px", fontWeight: "bold", textAlign: "center"}}></TableCell>
								<TableCell style={{ fontSize: "15px", fontWeight: "bold", textAlign: "center"}}>그룹 종류</TableCell>
								<TableCell style={{ fontSize: "15px", fontWeight: "bold", textAlign: "center"}}>제목</TableCell>
								<TableCell style={{ fontSize: "15px", fontWeight: "bold", textAlign: "center"}}>모집 여부</TableCell>
								<TableCell style={{ fontSize: "15px", fontWeight: "bold", textAlign: "center"}}>작성일</TableCell>
								<TableCell style={{ fontSize: "15px", fontWeight: "bold", textAlign: "center" }}>조회수</TableCell>
							</TableRow>
						</TableHead>
						<TableBody style={{ textAlign: "center" }}>
							{articles
							.slice(page * 10, (page + 1) * 10)
							.map((article) => (
								<TableRow
									key={uuidv4()}
								>
									<TableCell style={{ justifyItems: "center", justifyContent: "center", textAlign: "center"}}>
										<span>{article.board_id}</span>
									</TableCell>
									<TableCell style={{ textAlign: "center" }}>
											<span style={{ fontWeight: "bold" }}>
												{filterCategory.test(article.category) 
													? <span style={{ color: "red" }}>[스터디]</span> 
													: <span style={{ color: "blue" }}>[메이트]</span>}
											</span>
									</TableCell>
									<TableCell 
										style={{ textAlign: "center" }}
										onClick={() => {goArticleDetail(article.board_id)}}>
											<span style={{ cursor: "pointer" }}>{article.title}</span>
									</TableCell>
									<TableCell style={{ textAlign: "center" }}>
										{(article.recruitment_done === "Y") ? "모집중" : "모집 완료"}
									</TableCell>
									<TableCell style={{ textAlign: "center" }}>{article.write_at}</TableCell>
									<TableCell style={{ textAlign: "center" }}>{article.views}</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									count={articles.length}
									page={page}
									rowsPerPage={10}
									rowsPerPageOptions={[]}
									onPageChange={handleChangePage}
									// onChangeRowsPerPage={handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Container>
		</>
		);
}

export default GroupPage