import React from "react";

function GroupTodoForm({ handleSubmit, value, setValue }) {
  const hadleChange = (e) => {
    //이벤트 발생하면
    setValue(e.target.value);
  };
  return (
    <div>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <input
          type="text"
          name="value"
          style={{ flex: "10", padding: "5px" }}
          placeholder="해야 할 일을 입력하세요"
          value={value}
          onChange={hadleChange} //입력 발생하면 value바꿔줌
        />
        <input
          type="submit"
          value="입력"
          className="btn"
          style={{ flex: "1" }}
        />
      </form>
    </div>
  );
}

export default GroupTodoForm;
