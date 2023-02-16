import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import MyTodoList from "./../OpenVidu/TodoList/MyTodoList";
import MyTodoForm from "./../OpenVidu/TodoList/MyTodoForm";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Grid } from "@mui/material";
import axios from "./../../Utils/index";
import "../../App.css";


function MyTodoBlock({ setType }) {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const config = {
      url: "/my-todos",
      method: "get",
    };

    axios(config)
      .then((response) => {
        if (response.data) {
          const updatedData = response.data.map((todo) => {
            return {
              ...todo,
              todo_done: todo.todo_done === "N" ? false : true,
            };
          });
          setTodoData(updatedData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = value;

    const config = {
      url: "/my-todos",
      method: "post",
      data: { todo_done: "N", content },
    };

    axios(config).then((response) => {
      let newTodo = {
        num: response.data.num,
        content,
        todo_done: false,
      };
      setTodoData((prev) => [...prev, newTodo]);
    });

    setValue("");
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 500,
          backgroundColor: "white",
          borderRadius: 2,
          padding: "10px",
          boxShadow: "2px 2px 7px 1px grey",
        }}
      >
        <Grid container>
          <Grid item xs={5}>
            <h2 style={{ marginLeft: "40px", fontFamily: "Cafe24" }}>To-Do List</h2>
          </Grid>
          <Grid item xs={7}>
            <IconButton
              color="black"
              aria-label="change view"
              sx={{ paddingTop: "20px", marginLeft: "10rem" }}
              onClick={() => {
                setType("Time");
              }}
            >
              <AutorenewIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                position: "relative",
                overflow: "auto",
                overflowX: "hidden",
                width: "85%",
                marginX: "auto",
                height: 360,
                backgroundColor: "#E7E6F2",
              }}
            >
              <MyTodoForm
                handleSubmit={handleSubmit}
                value={value}
                setValue={setValue}
              />
              <MyTodoList
                todoData={todoData}
                setTodoData={setTodoData}
                value={value}
                setValue={setValue}
              />
              {/*todoData라는 state를 내려줌 List.js에 */}
              {/*자녀컴포넌트에서는 props 파라미터로 받음 */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MyTodoBlock;
