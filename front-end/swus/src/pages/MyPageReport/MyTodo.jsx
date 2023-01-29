import React, { useState } from "react";
import { Box } from "@mui/system";
import MyTodoList from "./MyTodoList";
import MyTodoForm from "./MyTodoForm";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function MyTodo() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //새로운 할 일 데이터
    let newTodo = {
      id: Date.now(), //유니크해야하기때문에 현재 시간으로
      title: value, //입력한것이 들어있음(value에)
      completed: false,
    };

    //원래 있던 할 일에 새로운 할 일 더해주기
    setTodoData((prev) => [...prev, newTodo]); //hooks사용해서 Setter에서 이전 state를 가지고 오기 위해서는 인수에 함수를 이용해서 사용
    //prev: 전 todaData의 값. 전 Todo데이터에 newTodo데이터를 함께 넣어줌
    setValue("");
  };

  return (
    <>
      <Box sx={{ position: "relative", width: 300, height: 400 }}>
        <h4 style={{ display: "inline-block" }}>Todo List</h4>
        <IconButton sx={{ display: "inline-block" }} color="secondary" aria-label="add an alarm">
          <AutorenewIcon />
        </IconButton>
        <MyTodoForm handleSubmit={handleSubmit} value={value} setValue={setValue} />
        <MyTodoList todoData={todoData} setTodoData={setTodoData} />{" "}
        {/*todoData라는 state를 내려줌 List.js에 */}
        {/*자녀컴포넌트에서는 props 파라미터로 받음 */}
      </Box>
    </>
  );
}

export default MyTodo;
