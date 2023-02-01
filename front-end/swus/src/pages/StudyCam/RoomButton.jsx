import React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";

function RoomButton() {
  return (
    <>
      <Stack direction="row">
        {/**justifyContent="flex-end"오른쪽 끝으로 밀어줌 */}
        <IconButton aria-label="record" color="primary">
          <PlayCircleOutlineIcon />
        </IconButton>
        <IconButton color="primary" aria-label="add an alarm">
          <MusicNoteOutlinedIcon />
        </IconButton>
        <IconButton color="primary" aria-label="quit">
          <HighlightOffIcon />
        </IconButton>
      </Stack>
    </>
  );
}

export default RoomButton;
