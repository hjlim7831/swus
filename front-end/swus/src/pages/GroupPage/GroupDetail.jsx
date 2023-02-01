import React from 'react';
import { Container } from "@mui/system";
import { Button, Grid } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function GroupDetail() {
  return (
    <>
      <Container sx={{ border: "1px gray solid", borderRadius: "10px" }}>
        <Grid container sx={{ px: 2 }}>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontWeight: "bold", fontSize: "25px" }}>[스터디] Figma 숙달방</p>
            <p style={{ paddingLeft: 30, paddingTop: 5 }}>
              <EditOutlinedIcon
                sx={{ fontSize: 30 }}
              />
            </p>
          </Grid>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={1.5} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
            <Button
              variant="contained"
              sx={{ height: 30, backgroundColor: "green" }}
              >초대하기</Button>
          </Grid>
          <Grid item xs={1.5} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
            <Button
              variant="contained"
              sx={{ height: 30, backgroundColor: "red"}}
            >종료하기</Button>
          </Grid>
          <Grid item xs={1.5} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
            <Button
              variant="contained"
              sx={{ height: 30, backgroundColor: "#E2B9B3", color: "black"}}
            >탈퇴하기</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default GroupDetail