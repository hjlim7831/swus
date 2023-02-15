import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import MyTodoList from "./MyTodoList";
import MyTodoForm from "./MyTodoForm";
import { Grid } from "@mui/material";

import axios from "../../../Utils/index";

import { useSelector, useDispatch } from "react-redux";

function MyTodoPublicIn() {
  //{ parentFunction }
  const dispatch = useDispatch();
  // const todoList = useSelector((state) => state.todolist);
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");
  // const [todoCnt, setTodoCnt] = useState(0);
  // const [doneCnt, setDoneCnt] = useState(0);

  useEffect(() => {
    const config = {
      url: "/my-todos",
      method: "get",
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          const updatedData = response.data.map((todo) => {
            return {
              ...todo,
              todo_done: todo.todo_done === "N" ? false : true,
            };
          });
          console.log(updatedData);
          setTodoData(updatedData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   setTodoCnt(todoData.length);
  //   setDoneCnt(todoData.filter((todo) => todo.todo_done === true));
  // }, []);

  // const childFunction = () => {
  //   parentFunction(
  //     todoData.length,
  //     todoData.filter((todo) => todo.todo_done === true).length
  //   );
  // };

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

  // const todoList = useSelector((state) => state.todolist);

  return (
    <>
      <Box
        sx={{
          width: "90%",
          height: 500,
          padding: "10px",
        }}
      >
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: "3%" }}>
            <MyTodoForm
              handleSubmit={handleSubmit}
              value={value}
              setValue={setValue}
            />
            <Box
              sx={{
                position: "relative",
                overflow: "auto",
                overflowX: "hidden",
                width: "100%",
                marginX: "auto",
                height: 400,
                backgroundColor: "#F4EFE6",
                marginTop: "2%",
              }}
            >
              {/* {childFunction()} */}
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

export default MyTodoPublicIn;
