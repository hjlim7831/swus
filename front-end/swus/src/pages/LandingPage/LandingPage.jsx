import React from "react";
import Carousel from "react-material-ui-carousel";
import { Button, Card, Typography } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import ForestIcon from "@mui/icons-material/Forest";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import studyroom from "../../image/studyroom.gif";
import groups from "../../image/g.png";
import lounge from "../../image/lounge.gif";
import report from "../../image/report.gif";

function Example(props) {
  var items = [
    {
      status: "common",
      name: "공용 열람실",
      description: "혼자 집중하기 힘들다면?",
      img: studyroom,
      icon: CoPresentIcon,
      color: "white",
      url: "/studyroom",
      text: "공부하러가기",
    },
    {
      status: "group",
      name: "그룹 스터디",
      description: "친구와 함께 공부해요",
      img: groups,
      icon: GroupIcon,
      color: "white",
      url: "/group/mystudy",
      text: "공부하러가기",
    },
    {
      status: "mypage",
      name: "마이 페이지",
      description: "얼마나 공부했을까요?",
      img: report,
      icon: BarChartIcon,
      color: "white",
      url: "/mypage/profile",
      text: "내 기록 보기",
    },
    {
      status: "rest",
      name: "휴게실",
      description: "잠깐 쉬어가고 싶다면?",
      img: lounge,
      icon: ForestIcon,
      color: "white",
      url: "/lounge",
      text: "쉬러가기",
    },
  ];

  return (
    <>
      <NavBar />
      <Carousel sx={{ marginTop: "60px" }}>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </>
  );
}

function Item(props) {
  const navigate = useNavigate();

  const styles = {
    categoryCard: {
      backgroundImage: `url(${props.item.img})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      textAlign: "center",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      opacity: "50%",
      position: "absolute",
      width: "100vw",
      top: 0,
    },
  };

  function getStart(url) {
    if (sessionStorage.getItem("token")) {
      navigate(`${url}`);
    } else {
      navigate("/account/login");
    }
  }

  return (
    <>
      <div
        style={{
          background: "#1A1E33",
          height: "100vh",
          alignItems: "space-between",
          display: "flex",
          justifyContent: "center",
          marginTop: 0,
        }}
      >
        <Card style={styles.categoryCard}></Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "600px",
              height: "380px",
              opacity: "20%",
              backgroundColor: "gray",
              borderRadius: "20px",
              top: 220,
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              alignItems: "center",
              top: 190,
            }}
          >
            <Typography
              align="center"
              mt={10}
              variant="h4"
              style={{
                color: `${props.item.color}`,
                fontSize: "80px",
                fontFamily: "Cafe24",
                fontWeight: "bold",
              }}
            >
              {props.item.name}
            </Typography>
            <Typography
              align="center"
              mt={3}
              variant="body2"
              style={{
                color: `${props.item.color}`,
                fontSize: "35px",
                fontFamily: "Cafe24",
                fontWeight: "bold",
              }}
            >
              {props.item.description}
            </Typography>
            <div style={{ marginTop: 50 }}>
              <Button
                variant="fulfilled"
                style={{
                  color: "black",
                  background: "#DEDCEE",
                  fontSize: "30px",
                  fontFamily: "Cafe24",
                  fontWeight: "bold",
                  borderRadius: "15px",
                  paddingInline: "20px",
                  paddingBlock: "10px",
                }}
                onClick={() => {
                  getStart(props.item.url);
                }}
                size="large"
              >
                {props.item.text}
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}

function LandingPage() {
  return (
    <>
      <Example></Example>
    </>
  );
}

export default LandingPage;
