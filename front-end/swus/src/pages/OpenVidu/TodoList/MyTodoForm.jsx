import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";

function MyTodoForm({ handleSubmit, value, setValue }) {
  const hadleChange = (e) => {
    //이벤트 발생하면
    setValue(e.target.value);
  };
  return (
    <div>
      <form
        style={{ width: "100%", paddingInline: 20, paddingTop: 5 }}
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
          <Button
            type="submit"
            variant="text"
            sx={{ borderRadius: 28, p: 0, marginTop: 2 }}
          >
            <Icon color="primary">add_circle</Icon>
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default MyTodoForm;
