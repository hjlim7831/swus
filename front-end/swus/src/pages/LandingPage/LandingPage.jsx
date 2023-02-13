import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Button, Card, Typography, CardActions } from '@mui/material'

import imgClock from '../../image/landingPage/watch.jpg'
import imgBench from '../../image/landingPage/benches.jpg'
import imgGroup from '../../image/landingPage/group.jpg'
import imgSched from '../../image/landingPage/scheduler.jpg'

function Example(props)
{
    var items = [
        {
            name: "공용 열람실",
            description: "Probably the most random thing you have ever seen!",
            img:imgClock
        },
        {
            name: "그룹 스터디",
            description: "Probably the most random thing you have ever seen!",
            img:imgGroup
        },
        {
            name: "마이 페이지",
            description: "Probably the most random thing you have ever seen!",
            img:imgSched
        },
        {
            name: "휴게실",
            description: "Hello World!",
            img:imgBench
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{

    const styles = {
        categoryCard: {
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(${props.item.img})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: 600,
            width: 1000
        }
    }

    return (
        <Card style={styles.categoryCard}>
        <Typography mt={3} variant="h4" style={{color:"white"}}>
            {props.item.name}
        </Typography>
        <Typography variant="body2" style={{color:"white"}}>
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