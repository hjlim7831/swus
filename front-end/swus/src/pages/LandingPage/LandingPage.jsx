import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

function Example(props)
{
    var items = [
        {
            name: "바로 로그인",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "공용 열람실",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "마이 페이지",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "그룹 스터디",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "휴게실",
            description: "Hello World!"
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
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                LOG IN!
            </Button>
        </Paper>
    )
}


function LandingPage() {
  return (
    <>
        <div>LandingPage</div>
        <Example></Example>
    </>
  )
}

export default LandingPage