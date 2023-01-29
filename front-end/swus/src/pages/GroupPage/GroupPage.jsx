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

function createData( index, type, name, is_finished, date, watched ) {
	return { index, type, name, is_finished, date, watched };
}

const articles = [
	createData(1, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(2, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(3, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(4, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(5, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(6, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(7, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(8, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(9, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(10, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(11, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(12, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(13, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(14, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(15, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(16, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(17, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(18, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(19, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
	createData(20, "[스터디]", "리액트 그자체", "모집중", "2023-01-29", 3),
];


function GroupPage() {

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 5))
		setPage(0)
	}

	return (
		<>
			<Container maxWidth="md" sx={{ border: "5px solid red", padding: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						스터디 모집 게시판
					</Grid>
					<Grid item xs={6}></Grid>
					<Grid item xs={3} sx={{ justifyContent: "alig" }}>
						<Button variant='outlined'>글 쓰기</Button>
					</Grid>
				</Grid>

				<TableContainer component={Paper}>
					<Table sx={{ width: "100%" }}>
						<TableHead>
							<TableRow>
								<TableCell>id</TableCell>
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
									<TableCell>
										{article.index}
									</TableCell>
									<TableCell>{article.type}</TableCell>
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
									onChangeRowsPerPage={handleChangeRowsPerPage}
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