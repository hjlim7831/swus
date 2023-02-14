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
import { useDispatch, useSelector } from 'react-redux';
import myGroupListSlice from '../../store/MyGroupListSlice';




function GroupDetail() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teamId = window.location.pathname.slice(21, window.location.pathname.length + 1)

  const [teamDetails, setTeamDetails] = useState([]);

  const [reportData, setReportData] = useState([]);

  const [start_time, setStart_time] = useState();
  const [finish_time, setFinish_time] = useState();
  const [studyDays, setStudyDays] = useState();

  useEffect(() => {

    const config = {
      url: `/users/my-groups/${teamId}`,
      method: "GET",
    };

    const config2 = {
      url: `/my-reports/${teamId}/member-todos`,
      method: "GET",
    }

    axios(config)
      .then((response) => {
        console.log(response.data);
        setTeamDetails(response.data)
        setStart_time(response.data.start_time.slice(0, 5))
        setFinish_time(response.data.finish_time.slice(0, 5))
        let date = "";
        for (let i = 0; i < 7; i++) {
          if (response.data.day[i] === "1") {
            if (i === 0)  {
              date += "월"
            } else if (i === 1) {
              date += "화"
            } else if (i === 2) {
              date += "수"
            } else if (i === 3) {
              date += "목"
            } else if (i === 4) {
              date += "금"
            } else if (i === 5) {
              date += "토"
            } else if (i === 6) {
              date += "일"
            } 
          }
        }
        setStudyDays(date)
      })
      .then((response) => {
        axios(config2)
          .then((response) => {
            console.log("리포트 정보")
            console.log(response.data)
            setReportData(response.data)
          })
      })

      dispatch(myGroupListSlice.actions.saveGroupId(teamId))
    
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const filterCategory = /S/;

  function getStudyDays() {
		if (teamDetails.day) {
			let checked = [false, false, false, false, false, false, false]
			for (let i = 0; i < 7; i++) {
				if (teamDetails.day[i] === "1") {
					checked[i] = true;
				}
			}
			const days = ["월", "화", "수", "목", "금", "토", "일"]
			return days.map((date, index) => {
				const style = {
					background: checked[index] ? "#9EC2F8" : "white",
					// color: checked[index] ? "white" : "black",
					marginInline: 3,
					borderRadius: 5,
					padding: "1px",
					fontWeight: "bold",
				}
				return (
					<>
						<span 
							style={style}>{date}</span>
					</>
				)
			});
		}	else {
			return null
		}
	}

  function getWeekTopics() {
    if (Array.isArray(teamDetails.todolist) && teamDetails.todolist.length > 0) {
      return teamDetails.todolist.map((topics) => {
        return (
          <Grid container sx={{ padding: 2, display: "flex", alignItems: "center"}} key={uuidv4()}>
            <Grid item xs={3}>
              <div style={{ fontWeight: "bold", margineInline: 5, padding: 5, textAlign: "center", alignItems: "center", height: "40px", justifyContent: "center", display: "flex"}}>
                <span style={{ verticalAlign: "middle", display: "inline-block"}}>{topics.id_round}주차</span>
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
    } else {
      return
    }
  }


  function getMembers() {
    if (Array.isArray(teamDetails.member_list) && teamDetails.member_list.length > 0) {
      return teamDetails.member_list.map((member) => {
        return (
          <div 
            key={uuidv4()}
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
    } else {
      return null
    }
  }

  return (
    <>
      {teamDetails ? (
        <>
          <Container sx={{ border: "1px grey solid", borderRadius: "10px", background: "white", marginTop: "20px" }}>
            <Grid container sx={{ px: 2, paddingTop: 2 }}>
              <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontWeight: "bold", fontSize: "25px" }}>
                  {filterCategory.test(teamDetails.category) 
                    ? <span style={{ color: "red", marginRight: 10 }}>[스터디]</span>
                    : <span style={{ color: "blue", marginRight: 10 }}>[메이트]</span>} 
                {teamDetails.team_name}
                {(teamDetails.team_done === "Y") ? <span style={{ marginInline: 10, color: "red" }}>[완료]</span> : null}</p>
                {(teamDetails.leader_email === localStorage.getItem("id") && teamDetails.team_done === "N") 
                  ? <p style={{ paddingLeft: 30, paddingTop: 5 }}>
                      <EditOutlinedIcon
                        sx={{ fontSize: 30, "&:hover" : { cursor: "pointer" } }}
                        onClick={() => {navigate(`update`)}}
                      /></p>
                  : null}
              </Grid>
              <Grid item xs={1.6}></Grid>
              <Grid item xs={1.3} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
                {(teamDetails.leader_email === localStorage.getItem("id") && teamDetails.team_done === "N")
                  ? <Button
                      variant="contained"
                      sx={{ height: 30, backgroundColor: "green", "&:hover" : { backgroundColor: "green" } }}
                      onClick={() => {inviteMember(teamId)}}>초대하기</Button>
                  : null}
              </Grid>
              <Grid item xs={1.3} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
                {(teamDetails.leader_email === localStorage.getItem("id") && teamDetails.team_done === "N")
                  ? <Button
                      variant="contained"
                      sx={{ height: 30, backgroundColor: "red", "&:hover" : { backgroundColor: "red" } }}
                      onClick={() => {endGroup(teamId)}}>종료하기</Button>
                  : null}
              </Grid>
              <Grid item xs={1.3} sx={{ display: "flex", alignItems: "center", justifyContent: "right"}}>
                {(teamDetails.team_done === "N")
                  ?  <Button
                        variant="contained"
                        sx={{ height: 30, backgroundColor: "#E2B9B3", color: "black", "&:hover" : { backgroundColor: "#E2B9B3" } }}
                        onClick={() => {leaveGroup(teamId)}}
                      >탈퇴하기</Button>
                  : <div>
                      <Button variant="outlined" onClick={openModal}>
                        리포트 보기
                      </Button>
                      <Report open={modalOpen} close={closeModal} header="우리 팀의 REPORT" payload={reportData}>
                        {
                          <>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              <p style={{ fontWeight: "bold", fontSize: "25px", justifyContent: "space-between" }}> 
                                {filterCategory.test(teamDetails.category) 
                                  ? <span style={{ color: "red" }}>[스터디]</span>
                                  : <span style={{ color: "blue"}}>[메이트]</span>} 
                                <span style={{ marginInline: "10px" }}>{teamDetails.team_name}</span>
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
                                          }}>{teamDetails.leader}</div>
                              {getMembers()}
                            </div>
                          </>
                        } 
                      </Report>
                    </div>
                }
              </Grid>
              <Grid item xs={0.5} sx={{ display: "flex", alignItems: "center", justifyContent: "right" }}>
                <ArrowBackIcon
                  sx={{ "&:hover" : { cursor: "pointer" } }}
                  onClick={() => {navigate("/group/mystudy")}} 
                />
              </Grid>
            </Grid>
            <Divider orientation='horizontal' flexItem/>
            <Grid container sx={{ padding: 2}}>
              <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
                <div style={{ marginInline: 10, padding: 5 }}>그룹장 </div>
                <div style={{ borderRadius: "20px", 
                              border: "1px solid grey", 
                              backgroundColor: "#E2B9B3", 
                              padding: 5, 
                              marginInline: 10, 
                              paddingInline: 10, 
                              fontWeight: "bold" }}>{teamDetails.leader}</div>
              </Grid>
                <Divider orientation='vertical' flexItem sx={{ background: "grey", borderWidth: 1, marginInline: 3 }}/>
              <Grid item xs={9} sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
                <div style={{ marginInline: 10, padding: 5}}>그룹원 </div>
                {getMembers()}
              </Grid>
            </Grid>
              <Divider orientation='horizontal' flexItem sx={{ background: "grey", borderWidth: 1 }}/>
            <Grid container sx={{ padding: 2 }}>
              {/* <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
                <div style={{ fontWeight: "bold", marginInline: 5, padding: 5 }}>스터디 일정</div>
                <div style={{ marginInline: 5, padding: 5, marginLeft: 20 }}>{teamDetails.begin_at} ~ {teamDetails.end_at}</div>
              </Grid>
              <Grid item xs={5} sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
                <div style={{ fontWeight: "bold", margineInline: 5, padding: 5 }}>스터디 시간</div>
                <div style={{ marginInline: 5, padding: 5, marginLeft: 20 }}>{studyDays} {start_time} ~ {finish_time}</div>
              </Grid>
              <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
                <div style={{ fontWeight: "bold", margineInline: 5, padding: 5 }}>인원</div>
                <div style={{ marginInline: 5, padding: 5, marginLeft: 20 }}>{teamDetails.team_number} / {teamDetails.recruitment_number}</div>
              </Grid>
              <Grid container sx={{ padding: 2 }}>
                <Grid item xs={12} sx={{ display: "float", justifyContent: "flex-start", alignContent: "center" }}>
                  <div style={{ fontWeight: "bold", margineInline: 5, padding: 5 }}>내용</div>
                  <Typography style={{ margin: 10, padding: 35, minHeight: "30px", wordBreak: "break-all", borderRadius: "10px", backgroundColor: "#F4EFE6" }}>
                    {teamDetails.team_info}
                  </Typography>
                </Grid>
              </Grid> */}
              <Grid container sx={{ display: "flex", alignItems: "center"}}>
                <Grid item xs={2} sx={{ alignContent: "center" }}>
                  <p style={{ fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>스터디 일정</p>
                </Grid>
                <Grid item xs={3}>
                  {(teamDetails.begin_at && teamDetails.end_at) 
                    ? <p style={{ textAlign: "center", fontSize: "20px" }}>{teamDetails.begin_at} ~ {teamDetails.end_at}</p> 
                    : <p style={{ textAlign: "center", fontSize: "20px" }}>미정</p>}
                </Grid>
                <Divider orientation='vertical' flexItem variant='middle' sx={{ mr: 2 }}/>
                <Grid item xs={2}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p style={{ fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>스터디 시간</p>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <p style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <p style={{ textAlign: "center", marginInline: 5 }}>{getStudyDays()} </p>
                    <p style={{ textAlign: "center", marginInline: 5 }}>{start_time} ~ {finish_time}</p>
                  </p>
                </Grid>
                <Divider orientation='vertical' flexItem variant='middle' sx={{ mx: 2 }}/>
                <Grid item xs={1}>
                  <p style={{ fontWeight: "bold", textAlign: "center", fontSize: "18px" }}>인원 현황</p>
                </Grid>
                <Grid item xs={1}>
                  <p style={{ textAlign: "center", fontSize: "18px" }}>{teamDetails.team_number} / {teamDetails.recruitment_number}</p>
                </Grid>
              </Grid>
              <Container style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBlock: 30 }}>
                <div style={{ paddingInline: 20, fontWeight: "bold", fontSize: "20px" }}>
                  회차별 주제
                </div>
                {(teamDetails.team_done === "N")
                  ? <div>
                      <Button variant="outlined" onClick={openModal}>
                        리포트 보기
                      </Button>
                      <Report open={modalOpen} close={closeModal} header="우리 팀의 REPORT" payload={reportData}>
                        {
                          <>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              <p style={{ fontWeight: "bold", fontSize: "25px", justifyContent: "space-between" }}> 
                                {filterCategory.test(teamDetails.category) 
                                  ? <span style={{ color: "red" }}>[스터디]</span>
                                  : <span style={{ color: "blue"}}>[메이트]</span>} 
                                <span style={{ marginInline: "10px" }}>{teamDetails.team_name}</span>
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
                                          }}>{teamDetails.leader}</div>
                              {getMembers()}
                            </div>
                          </>
                        } 
                      </Report>
                    </div>
                  : null
                }
              </Container>
              <br/>
              <Container style={{ overflowY: "scroll", height: "300px" }}>
                {getWeekTopics()}
              </Container>
            </Grid>
          </Container>
        </>
      )
      : <div>loading</div>
      }
    </>
  )
}

export default GroupDetail