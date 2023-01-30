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
				Box,
			 } from '@mui/material';
import CreateArticle from './CreateArticle';

function createData( index, type, name, is_finished, date, watched, bool ) {
	return { index, type, name, is_finished, date, watched, bool };
}

const articles = [
	createData(1, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(2, "[메이트]", "리액트 그자체", "모집중", "2023-01-29", 3, false),
	createData(3, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(4, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(5, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(6, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(7, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(8, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(9, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(10, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(11, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(12, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(13, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(14, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(15, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(16, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(17, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(18, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(19, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
	createData(20, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3, true),
];


function GroupPage() {

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	// const handleChangeRowsPerPage = (event) => {
	// 	setRowsPerPage(parseInt(event.target.value, 5))
	// 	setPage(0)
	// }

	return (
		<>
			<Container maxWidth="md" sx={{ border: "5px solid red", padding: 2 }}>
				<Box>
					<Grid container spacing={2} sx={{ alignItems: "center", mb: 2 }}>
						<Grid item xs={3}>
							<h3>스터디 모집게시판</h3>
						</Grid>
						<Grid item xs={7}></Grid>
						<Grid item xs={2}>
							<Box sx={{ pl: 4 }}>
								<Button variant='outlined' sx={{ whiteSpace: "nowrap", minWidth: "auto", ml: 2 }}>글 쓰기</Button>
							</Box>
						</Grid>
					</Grid>
				</Box>

				<TableContainer component={Paper}>
					<Table sx={{ width: "100%" }}>
						<TableHead>
							<TableRow>
								<TableCell>글 번호</TableCell>
								<TableCell>그룹 종류</TableCell>
								<TableCell>제목</TableCell>
								<TableCell>모집 여부</TableCell>
								<TableCell>작성일</TableCell>
								<TableCell>조회수</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{articles
							.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
							.map((article) => (
								<TableRow
									key={article.index}
								>
									<TableCell sx={{ justifyItems: "center"}}>
										<span>{article.index}</span>
									</TableCell>
									<TableCell sx={{ color: "red"  }}>{article.type}</TableCell>
									<TableCell>{article.name}</TableCell>
									<TableCell>{article.is_finished}</TableCell>
									<TableCell>{article.date}</TableCell>
									<TableCell>{article.watched}</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									count={articles.length}
									page={page}
									rowsPerPage={rowsPerPage}
									onPageChange={handleChangePage}
									// onChangeRowsPerPage={handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Container>
			<CreateArticle />
		</>
		);
}

export default GroupPage