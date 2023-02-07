import React, { useState } from 'react';
import { Paper,
				Container,
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
import { useNavigate } from 'react-router-dom';


function createData( index, type, name, is_finished, date, watched, bool ) {
	return { index, type, name, is_finished, date, watched, bool };
}

const filterCategory = /스터디/;

const articles = [
	createData(1, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(2, "[메이트]", "리액트 그자체", "모집중", "2023-01-29", 3, false),
	createData(3, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(4, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(5, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(6, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(7, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(8, "[메이트]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(9, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(10, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(11, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(12, "[메이트]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(13, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(14, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(15, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(16, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(17, "[메이트]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(18, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(19, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(20, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(1, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(2, "[메이트]", "리액트 그자체", "모집중", "2023-01-29", 3, false),
	createData(3, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(4, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(5, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(6, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(7, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(8, "[메이트]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(9, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(10, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(11, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(12, "[메이트]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(13, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(14, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(15, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(16, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(17, "[메이트]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(18, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(19, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(20, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 1, true),
];


function GroupPage() {

	const navigate = useNavigate();
	const [page, setPage] = useState(0)
	// const [rowsPerPage, setRowsPerPage] = useState(20)

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	// const handleChangeRowsPerPage = (event) => {
	// 	setRowsPerPage(parseInt(event.target.value, 5))
	// 	setPage(0)
	// }

	return (
		<>
			<Container sx={{ border: "1px gray solid", borderRadius: "10px", height: "85vh", marginTop: 3 }}>
				<Grid container style={{ justifyContent: "space-between", display: "flex", alignContent: "center"}}>
					<p style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize: "30px", textAlign: "center" }}>
						<span>스터디 모집게시판</span>
					</p>
					<Button 
						type="submit" 
						variant='contained' 
						sx={{ backgroundColor: "green", m: 3, height: "40px", "&:hover": { backgroundColor: "green" } }}
						size="small"
						onClick={() => {navigate("/group/board/create")}}>글 작성</Button>
				</Grid>

				<TableContainer style={{ textAlign: "center"}}>
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
							// .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
							.slice(page * 10, (page + 1) * 10)
							.map((article) => (
								<TableRow
									key={article.index}
								>
									<TableCell style={{ justifyItems: "center", justifyContent: "center", textAlign: "center"}}>
										<span>{article.index}</span>
									</TableCell>
									<TableCell style={{  textAlign: "center" }}><span style={filterCategory.test(article.type) ? { color: "red"} : {color: "blue"}}>{article.type}</span></TableCell>
									<TableCell style={{ textAlign: "center" }}>{article.name}</TableCell>
									<TableCell style={{ textAlign: "center" }}>{article.is_finished}</TableCell>
									<TableCell style={{ textAlign: "center" }}>{article.date}</TableCell>
									<TableCell style={{ textAlign: "center" }}>{article.watched}</TableCell>
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