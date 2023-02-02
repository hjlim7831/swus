import React, { useState } from 'react';
import { Container } from "@mui/system";
import { Button, Grid, Divider, Typography, TextField } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";


function GroupDetail() {

  const navigate = useNavigate();
  const members = [
    "서형준",
    "이정현"
  ];

  const message = "공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부공부 합시다`/n` 겅부겅부"

  const weekTopics = [
    "1주차 계획",
    "2주차 계획",
    "3주차 계획",
    "4주차 계획"
  ];

  const category = "스터디";

  const filterCategory = /스터디/;

  const [ modal, setModal ] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const [member, setMember] = useState("")


  function getWeekTopics() {
    return weekTopics.map((topic, index) => {
      return (
        <Grid container sx={{ padding: 2, display: "flex", alignItems: "center"}}>
          <Grid item xs={3}>
            <div style={{ fontWeight: "bold", margineInline: 5, padding: 5, textAlign: "center", alignItems: "center", height: "40px", justifyContent: "center", display: "flex"}}>
              <span style={{ verticalAlign: "middle", display: "inline-block"}}>{index + 1}주차</span>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div style={{  padding: 5, marginLeft: 3, backgroundColor: "#F4EFE6", height: "35px", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <span style={{ verticalAlign: "middle", display: "inline-block"}}>{topic}</span>
            </div>
          </Grid>
        </Grid>
      )
    })
  }


  function getMembers() {
    return members.map((member, index) => {
      return (
        <div 
          key={index}
          style={{ borderRadius: "20px", border: "1px solid gray", padding: 5, marginInline: 10, paddingInline: 10 }}>
          {member}
        </div>
      )
    });
  }

  function getMember(event) {
    const value = event.target.value
    setMember(value)
  }

  return (
    <>
      <Container sx={{ border: "1px grey solid", borderRadius: "10px" }}>
        <Grid container sx={{ px: 2 }}>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontWeight: "bold", fontSize: "25px" }}> <span style={filterCategory.test(category) ? { color: "red"} : { color: "blue" }}>[{category}]</span> Figma 숙달방</p>
            <p style={{ paddingLeft: 30, paddingTop: 5 }}>
              <EditOutlinedIcon
                sx={{ fontSize: 30 }}
                onClick={() => {navigate("/detail/update")}}
              />
            </p>
          </Grid>
          <Grid item xs={2.1}></Grid>
          <Grid item xs={1.3} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
            <Button
              variant="contained"
              sx={{ height: 30, backgroundColor: "green" }}
              onClick={openModal}
              >초대하기</Button>
            <Modal open={modal} close={closeModal} header="멤버 초대하기">
              <TextField 
                name="member"
                value={member}
                placeholder="초대할 친구의 닉네임을 입력해주세요"
                variant="outlined"
                fullWidth
                onChange={getMember} />
            </Modal>
          </Grid>
          <Grid item xs={1.3} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
            <Button
              variant="contained"
              sx={{ height: 30, backgroundColor: "red"}}
            >종료하기</Button>
          </Grid>
          <Grid item xs={1.3} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
            <Button
              variant="contained"
              sx={{ height: 30, backgroundColor: "#E2B9B3", color: "black"}}
            >탈퇴하기</Button>
          </Grid>
        </Grid>
        <Divider orientation='horizontal' flexItem/>
        <Grid container sx={{ padding: 2}}>
          <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
            <div style={{ marginInline: 10, padding: 5 }}>그룹장 </div>
            <div style={{ borderRadius: "20px", border: "1px solid grey", backgroundColor: "#E2B9B3", padding: 5, marginInline: 10, paddingInline: 10 }}>조혜진</div>
          </Grid>
            <Divider orientation='vertical' flexItem sx={{ background: "grey", borderWidth: 1, marginInline: 3 }}/>
          <Grid item xs={9} sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
            <div style={{ marginInline: 10, padding: 5}}>그룹원 </div>
            {getMembers()}
          </Grid>
        </Grid>
          <Divider orientation='horizontal' flexItem sx={{ background: "grey", borderWidth: 1 }}/>
        <Grid container sx={{ padding: 2 }}>
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
            <div style={{ fontWeight: "bold", marginInline: 5, padding: 5 }}>스터디 일정</div>
            <div style={{ marginInline: 5, padding: 5, marginLeft: 20 }}>2023-05-01 ~ 2023-05-31</div>
          </Grid>
          <Grid item xs={5} sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
            <div style={{ fontWeight: "bold", margineInline: 5, padding: 5 }}>스터디 시간</div>
            <div style={{ marginInline: 5, padding: 5, marginLeft: 20 }}>월수금 12:00 ~ 15:00</div>
          </Grid>
          <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
            <div style={{ fontWeight: "bold", margineInline: 5, padding: 5 }}>인원</div>
            <div style={{ marginInline: 5, padding: 5, marginLeft: 20 }}>3 / 6</div>
          </Grid>
          <Grid container sx={{ padding: 2 }}>
            <Grid item xs={12} sx={{ display: "float", justifyContent: "flex-start", alignContent: "center" }}>
              <div style={{ fontWeight: "bold", margineInline: 5, padding: 5 }}>내용</div>
              <Typography style={{ margin: 10, padding: 35, minHeight: "30px", wordBreak: "break-all", borderRadius: "10px", backgroundColor: "#F4EFE6" }}>{message}
              </Typography>
            </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
            <div style={{ paddingInline: 20, fontWeight: "bold", fontSize: "20px" }}>
              회차별 주제
            </div>
            <div>
              <Button variant="outlined">
                리포트 보기
              </Button>
            </div>
          </div>
          {getWeekTopics()}
        </Grid>
      </Container>
    </>
  )
}

export default GroupDetail