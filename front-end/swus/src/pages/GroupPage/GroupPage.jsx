import React from 'react';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';




function GroupPage() {
  const [article, setArticle] = useState([
			{
				id: 1,
				title: 'Article 1',
			},
			{
				id: 2,
				title: 'Article 2',
			},
			{
				id: 3,
				title: 'Article 3',
			},
			{
				id: 4,
				title: 'Article 4',
			},
	]);

	let content = [];

	for (let i = 0; i < article.length; i++) {
		content.push(
		<>
			{article[i].id}
			{article[i].title}
			<hr />   
		</>
		);
	}

	return (
		<div style={{ textAlign: 'center'}}>
			<Container maxWidth="lg" sx={{ justifyContent: 'space-between' }}>
				{content}
			</Container>
			<div style={{ display: 'inline-block' }}>
				<Stack spacing={2} sx={{ justifyContent: 'center' }}>
					<Pagination count={5} color="primary" sx={{ justifyContent : 'center' }}/>
				</Stack>
			</div>
		</div>
		)
}

export default GroupPage