import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";

function GroupTodoForm({ handleSubmit, value, setValue }) {
  const hadleChange = (e) => {
    //이벤트 발생하면
    setValue(e.target.value);
  };
  return (
    <div>
      <form
        style={{
          width: "90%",
          paddingTop: 5,
          paddingLeft: 20,
          paddingRight: 0,
        }}
        onSubmit={handleSubmit}
      >
        <Stack direction="row" spacing={0}>
          <TextField
            id="standard-basic"
            label="할 일 입력"
            variant="standard"
            size="small"
            sx={{ width: 1 }} //꽉차게
            value={value}
            onChange={hadleChange} //입력 발생하면 value바꿔줌
          />
          <IconButton
            type="submit"
            variant="text"
            sx={{
              borderRadius: 28,
              // p: 0,
              marginTop: 1,
              cursor: "pointer",
            }}
          >
            <Icon color="primary">add_circle</Icon>
          </IconButton>
        </Stack>

        {/* <input
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
        /> */}
      </form>
    </div>
  );
}

export default GroupTodoForm;
