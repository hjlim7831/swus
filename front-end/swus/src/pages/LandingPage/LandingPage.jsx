import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button, Card, Typography, Icon } from '@mui/material';
import NavBar from "../../components/NavBar/NavBar";
// import imgClock from '../../image/landingPage/watch.jpg';
// import imgBench from '../../image/landingPage/benches.jpg';
// import imgGroup from '../../image/landingPage/group.jpg';
// import imgSched from '../../image/landingPage/scheduler.jpg';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import ForestIcon from '@mui/icons-material/Forest';



function Example(props)
{
	var items = [
			{
				status:"common",
				name: "공용 열람실",
				description: "혼자 집중하기 힘들다면?",
				// img:imgClock,
				icon:CoPresentIcon
			},
			{   
				status:"group",
				name: "그룹 스터디",
				description: "친구와 함께 공부해요",
				// img:imgGroup,
				icon:GroupIcon
			},
			{
				status:"mypage",
				name: "마이 페이지",
				description: "얼마나 공부했을까요?",
				// img:imgSched,
				icon:BarChartIcon
			},
			{
				status:"rest",
				name: "휴게실",
				description: "잠깐 쉬어가고 싶다면?",
				// img:imgBench,
				icon:ForestIcon
			}
	]

	return (
		<>
			<NavBar />
			<Carousel sx={{ marginTop: "60px"}}>
				{
					items.map( (item, i) => <Item key={i} item={item} /> )
				}
			</Carousel>
		</>
	)
}

function Item(props)
{

    const styles = {
        categoryCard: {
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(${props.item.img})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            textAlign: 'center',
            height: 800,
            // width: 1000
        },
        
    }

    return (
        <Card style={styles.categoryCard}>
            <Icon/>
        <Typography align="center" mt={10} variant="h4" style={{color:"white"}}>
            {props.item.name}
        </Typography>
        <Typography align="center" mt={3} variant="body2" style={{color:"white"}}>
            {props.item.description}
        </Typography>
        <div>
        <Button variant="outlined" style={{color:"white", borderColor:"white"}}>
            LOG IN!
        </Button>
        </div>
    </Card>
)
}


function LandingPage() {
  return (
    <>
        <Example></Example>
    </>
  )
}

export default LandingPage