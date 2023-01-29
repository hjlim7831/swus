import React from "react";

function MyTodoList({ todoData, setTodoData }) {
  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px, 9px",
    borderRadius: "50%" /*원래 css는 border-Radius지만 여기는 JSX*/,
    cursor: "pointer",
    float: "right",
  };

  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  const hadleCompleteChange = (id) => {
    //id 파라미터로 받기
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        //state안에서 어떤게 클릭이 됐는지
        data.completed = !data.completed; // 클릭이 된 애의 completed를 원래의 반대로 바꾸기
      }
      return data;
    });

    setTodoData(newTodoData);
  };
  const handleClick = (id) => {
    //id를 파라미터로 가져옴
    let newToDoData = todoData.filter((data) => data.id !== id); //id는 선택한 id
    console.log("newToDoData", newToDoData);

    setTodoData(newToDoData); //필터링 후 갱신
  };

  return (
    <div>
      {todoData.map((data) => (
        <div style={getStyle(data.completed)} key={data.id}>
          {" "}
          {/*함수이므로 ()필수, key속성에는 객체의 유니크 값 넣어줘야*/}
          <input
            type="checkbox"
            defaultChecked={false}
            onChange={() => hadleCompleteChange(data.id)}
          />
          {/*어떤 아이디 값 클릭됐는지*/}
          {data.title} {/*실제 데이터를 넣기 위해 중괄호 */}
          <button style={btnStyle} onClick={() => handleClick(data.id)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyTodoList;
