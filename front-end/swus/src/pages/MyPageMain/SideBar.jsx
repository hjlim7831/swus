import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});


export default function MiniDrawer(props) {

  const navigate = useNavigate();

  const sideItems = window.location.pathname.slice(8, 15) === "profile"
    ? [
      { name: "PROFILE", path: `profile`, backgroundColor: "#DEDCEE", color: "#1A1E33" },
      { name: "MY REPORT", path: `myreport`, backgroundColor: "#1A1E33", color: "white"}
    ]
    : [
      { name: "PROFILE", path: `profile`, backgroundColor: "#1A1E33", color: "white" },
      { name: "MY REPORT", path: `myreport`, backgroundColor: "#DEDCEE", color: "#1A1E33"} 
    ]


  return (
    <Box
      sx={{ display: "flex", backgroundColor: "#1A1E33", height: "100vh" }}
      boxSizing={openedMixin}
    >

      <Box fullWidth sx={{ mt: 11, mx: 4, justifyContent: "center" }}>
        {sideItems.map((item, index) => {
          return (
            <Button
              disableRipple 
              variant="contained"
              fullWidth
              style={{
                backgroundColor: item.backgroundColor,
                color: item.color,
                width: "180px",
                height: "60px",
                fontSize: "20px",
                marginBlock: "20px",
              }}
              onClick={() => {navigate(item.path)}}
          >{item.name}</Button>
          )
        })}
      </Box>
    </Box>
  );
}
