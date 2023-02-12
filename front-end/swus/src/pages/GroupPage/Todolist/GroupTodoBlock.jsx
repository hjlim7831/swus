import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import GroupTodoList from "./GroupTodoList";
import GroupTodoForm from "./GroupTodoForm";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Grid } from "@mui/material";

import axios from "../../../Utils/index";

// import { useSelector, useDispatch } from "react-redux";
// import { addTodoList } from "./../../store/TodoList";

function GroupTodoBlock(props) {
  // const dispatch = useDispatch();
  // const todoList = useSelector((state) => state.todolist);
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  // ---------------------------------------------------------------------
  // 나중에 처리해야 하는 곳
  // 1. groupId 받아서 저장
  // 2. round 받아서 저장
  const groupId = props.groupId;
  const round = props.round;
  console.log("투두리스트 프롭스");
  console.log(groupId);
  console.log(round);

  useEffect(() => {
    const config = {
      url: `/my-groups/${groupId}/round/${round}`,
      method: "get",
    };

    axios(config)
      .then((response) => {
        console.log("그룹 투두 겟 api");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = value;

    const config = {
      url: `/my-groups/${groupId}/round/${round}`,
      method: "post",
      data: { content },
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
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              position: "relative",
              overflow: "auto",
              overflowX: "hidden",
              width: "100%",
              marginX: "auto",
              height: 360,
            }}
          >
            <GroupTodoForm handleSubmit={handleSubmit} value={value} setValue={setValue} />
            <GroupTodoList
              todoData={todoData}
              setTodoData={setTodoData}
              value={value}
              setValue={setValue}
              groupId={groupId}
              round={round}
            />
            {/*todoData라는 state를 내려줌 List.js에 */}
            {/*자녀컴포넌트에서는 props 파라미터로 받음 */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default GroupTodoBlock;
