import React, { useState, useEffect } from 'react';
import { Container, Box } from "@mui/system";
import { Button, Grid, Divider, Typography, TextField } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import inviteMember from '../../components/modals/InviteMember';
import endGroup from '../../components/modals/EndGroup';
import leaveGroup from '../../components/modals/LeaveGroup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Report from "../../components/modals/Report";
import { v4 as uuidv4 } from 'uuid';
import axios from "../../Utils/index";




function GroupDetail() {

  const navigate = useNavigate();
  const members = [
    "서형준",
    "이정현"
  ];

  const [reportData, setReportData] = useState([]);

  useEffect(() => {

    const config = {
      url: `my-reports/${1}/member-todos`,
      method: "GET",
    }

    axios(config)
      .then((response) => {
        console.log(response.data);
        setReportData(response.data.rounds);
      })
  }, [])
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const category = "스터디";

  const filterCategory = /스터디/;

  const [member, setMember] = useState("")

  function getWeekTopics() {
    return reportData.map((topics) => {
      return (
        <Grid container sx={{ padding: 2, display: "flex", alignItems: "center"}} key={uuidv4()}>
          <Grid item xs={3}>
            <div style={{ fontWeight: "bold", margineInline: 5, padding: 5, textAlign: "center", alignItems: "center", height: "40px", justifyContent: "center", display: "flex"}}>
              <span style={{ verticalAlign: "middle", display: "inline-block"}}>{topics.round}주차</span>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div style={{  padding: 5, marginLeft: 3, backgroundColor: "#F4EFE6", height: "35px", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <span style={{ verticalAlign: "middle", display: "inline-block"}}>{topics.content}</span>
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
          style={{ borderRadius: "20px", 
                    border: "1px solid gray", 
                    padding: 5, 
                    marginInline: 10,
                    paddingInline: 10,
                    fontWeight: "bold"
                 }}>{member}
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
        <Grid container sx={{ px: 2, paddingTop: 2 }}>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontWeight: "bold", fontSize: "25px" }}> <span style={filterCategory.test(category) ? { color: "red"} : { color: "blue" }}>[{category}]</span> Figma 숙달방</p>
            <p style={{ paddingLeft: 30, paddingTop: 5 }}>
              <EditOutlinedIcon
                sx={{ fontSize: 30, "&:hover" : { cursor: "pointer" } }}
                onClick={() => {navigate("/mypage/group/:groupId/update")}}
              />
            </p>
          </Grid>
          <Grid item xs={1.6}></Grid>
          <Grid item xs={1.3} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
            {/* {3 === 3 ? <p></p> : <Button
                          variant="contained"
                          sx={{ height: 30, backgroundColor: "green" }}
                          onClick={inviteMember}
                        >초대하기</Button>} */}
            <Button
              variant="contained"
              sx={{ height: 30, backgroundColor: "green", "&:hover" : { backgroundColor: "green" } }}
              onClick={inviteMember}
            >초대하기</Button>
          </Grid>
          <Grid item xs={1.3} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
            <Button
              variant="contained"
              sx={{ height: 30, backgroundColor: "red", "&:hover" : { backgroundColor: "red" } }}
              onClick={endGroup}
            >종료하기</Button>
          </Grid>
          <Grid item xs={1.3} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
            <Button
              variant="contained"
              sx={{ height: 30, backgroundColor: "#E2B9B3", color: "black", "&:hover" : { backgroundColor: "#E2B9B3" } }}
              onClick={leaveGroup}
            >탈퇴하기</Button>
          </Grid>
          <Grid item xs={0.5} sx={{ display: "flex", alignItems: "center", justifyContent: "right" }}>
            <ArrowBackIcon
              sx={{ "&:hover" : { cursor: "pointer" } }}
              onClick={() => {navigate("/group/mystudy/:userId")}} 
            />
          </Grid>
        </Grid>
        <Divider orientation='horizontal' flexItem/>
        <Grid container sx={{ padding: 2}}>
          <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
            <div style={{ marginInline: 10, padding: 5 }}>그룹장 </div>
            <div style={{ borderRadius: "20px", border: "1px solid grey", backgroundColor: "#E2B9B3", padding: 5, marginInline: 10, paddingInline: 10, fontWeight: "bold" }}>조혜진</div>
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
              <Typography style={{ margin: 10, padding: 35, minHeight: "30px", wordBreak: "break-all", borderRadius: "10px", backgroundColor: "#F4EFE6" }}>
                {/* {message} */}
              </Typography>
            </Grid>
          </Grid>
          <Container style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
            <div style={{ paddingInline: 20, fontWeight: "bold", fontSize: "20px" }}>
              회차별 주제
            </div>
            <div>
              <Button variant="outlined" onClick={openModal}>
                리포트 보기
              </Button>
              <Report open={modalOpen} close={closeModal} header="우리 팀의 REPORT" payload={reportData}>
                {
                  <>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <p style={{ fontWeight: "bold", fontSize: "25px", justifyContent: "space-between" }}> 
                        <span style={ filterCategory.test(category) ? { color: "red"} : { color: "blue" }}>[{category}]</span> 
                        <span style={{ marginInline: "10px" }}>Figma 숙달방</span>
                      </p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
                      <div style={{ borderRadius: "20px", 
                                    border: "1px solid grey", 
                                    backgroundColor: "#E2B9B3", 
                                    padding: 5, 
                                    marginInline: 10, 
                                    paddingInline: 10, 
                                    fontWeight: "bold"
                                   }}>조혜진</div>
                      {getMembers()}
                    </div>
                  </>
                } 
              </Report>
            </div>
          </Container>
          <br/>
          <Container style={{ overflowY: "scroll", height: "250px" }}>
            {getWeekTopics()}
          </Container>
        </Grid>
      </Container>
    </>
  )
}

export default GroupDetail