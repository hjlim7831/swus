import React from 'react'
import Button from "@mui/material/Button"
import { ButtonGroup } from '@mui/material';

function Header() {
  return (
    <header>
      <h1>Header</h1>
    </header>
  );
}

function Nav() {
  return (
    <nav>
      <ol>
        <li>1. html</li>
        <li>2. react</li>
      </ol>
    </nav>
  );
}

function Article() {
  return (
    <article>
      <h2>Article</h2>
      This is ....
    </article>
  )
}

function Mui() {
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <Article></Article>
      <ButtonGroup>
        <Button variant='outlined'>Create</Button>
        <Button variant='outlined'>Update</Button>
      </ButtonGroup>
      <hr/>
      <Button variant='outlined'>Delete</Button>
    </div>
  )
}

export default Mui