import React from 'react';
// import { useState } from 'react';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';





function GroupPage() {

	// const Item = styled(Paper)(({ theme }) => ({
	// 	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : "#fff",
	// 	...theme.typography.body2,
	// 	padding: theme.spacing(2),
	// 	textAlign: 'center',
  //   color: theme.palette.text.secondary,
	// }));


	return (
		<>
			<Container maxWidth="md" sx={{ border: "5px solid red" }}>
				<h3>내 스터디</h3>
			</Container>
		</>
		// <div style={{ textAlign: 'space-between'}}>
		// 	<Stack spacing={2}>
		// 		{rendering()}
		// 	</Stack>
		// 	<Stack spacing={2}>
		// 	<br/>
		// 		{(() => {
		// 			const array = [];
		// 			for (let i = 0; i < article.length; i++) {
		// 				array.push(<Item>{article[i].id} {article[i].title}</Item>)
		// 			} return array;
		// 		})()}
		// 	</Stack>
		// </div>
		)
}

export default GroupPage