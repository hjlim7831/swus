import React from "react";
import axios from "../../../Utils/index";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function GroupTodoList({
  todoData,
  setTodoData,
  value,
  setValue,
  groupId,
  round,
}) {
  const getStyle = (todo_done) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: todo_done ? "line-through" : "none",
    };
  };

  // 완료여부
  const hadleCompleteChange = (num) => {
    //num 파라미터로 받기

    // 어떤 게 클릭 되었는지 찾기
    // filter 활용시 함수의 실행속도 차이로 실시간 반영 힘듦.
    // findIndex 활용 원하는 곳의 인덱스 찾기
    const i = todoData.findIndex((e) => e.num === num);

    const newTodoData = [...todoData]; // 복사본 생성

    // axios가 성공하면, true -> false를 변경하기 때문에
    // 아직 변경 전
    // 그래서 ture => 'N'으로 수정된 값 반환
    const done = newTodoData[i].todo_done ? "N" : "Y";

    // 수정 axios 요청
    const config = {
      url: `/my-groups/${groupId}/round/${round}/num/${num}`,
      method: "put",
      data: { content: newTodoData[i].content, todo_done: done },
    };

    axios(config).then((response) => {
      newTodoData[i].todo_done = !newTodoData[i].todo_done;
      setTodoData(newTodoData);
    });
  };

  // 삭제 logic
  const handleClick = (num) => {
    //name를 파라미터로 가져옴

    const config = {
      url: `/my-groups/${num}`,
      method: "delete",
    };

    axios(config)
      .then(() => {
        let newToDoData = todoData.filter((data) => data.num !== num); //id는 선택한 num

        setTodoData(newToDoData); //필터링 후 갱신
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {todoData &&
        todoData.map((data, i) => (
          <div style={getStyle(data.todo_done)} key={i}>
            {/*함수이므로 ()필수, key속성에는 객체의 유니크 값 넣어줘야*/}
            <input
              type="checkbox"
              checked={data.todo_done}
              onChange={() => hadleCompleteChange(data.num)}
            />
            {/*어떤 아이디 값 클릭됐는지*/}
            {data.content}

            <RemoveCircleOutlineIcon
              color="error"
              sx={{ fontSize: 18, cursor: "pointer", float: "right" }}
              onClick={() => handleClick(data.num)}
            />
          </div>
        ))}
    </div>
  );
}

export default GroupTodoList;
