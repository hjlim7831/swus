import React from "react";
// 정환 추가 start
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Icon from '@mui/material/Icon';
// 정환 추가 end

function MyTodoForm({ handleSubmit, value, setValue }) {
  const hadleChange = (e) => {
    //이벤트 발생하면
    setValue(e.target.value);
  };
  return (
    <div>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        {/* 정환 추가 start */}
        <Stack direction="row" spacing={0}>
          <TextField
            id="standard-basic"
            label="할 일 입력"
            variant="standard"
            size="small"
            sx={{width: 1} } //꽉차게
            value={value}
            onChange={hadleChange} //입력 발생하면 value바꿔줌
          /> 
          <Button
            type="submit"
            variant="text"
            sx={ { borderRadius: 28, p:0, m:0} }
          ><Icon color="primary">add_circle</Icon></Button>
        </Stack>
        {/* 정환 추가 end */}
        {/* 정환 삭제 start
        <input
          type="text"
          name="value"
          style={{ flex: "10", padding: "5px" }}
          placeholder="해야 할 일을 입력하세요"
          value={value}
          onChange={hadleChange} //입력 발생하면 value바꿔줌
        />
        <input type="submit" value="입력" className="btn" style={{ flex: "1" }} />
        정환 삭제 end */}
      </form>
    </div>
  );
}

export default MyTodoForm;
