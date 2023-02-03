import {
  BrowserRouter,
  Routes,
  Route,
  // Link
} from "react-router-dom";
// import NavBar from "./components/NavBar/NavBar";
// import SignInSide from "./pages/Accounts/LogIn";
// import SignUpSide from "./pages/Accounts/SignUp";
// import FindPassword from "./pages/Accounts/FindPassword";
// import BasicModalDialog from "./pages/Accounts/UserModal";
// import Lounge from "./pages/Lounge/SideBar";
// import GroupPage from "./pages/GroupPage/GroupPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* landingPage */}
          <Route exact path="/" />
          {/* 공용 열람실 관련 주소 */}
          <Route exact path="/studyroom">
            <Route exact path="/" />
            <Route exact path="/:sessionName" />
          </Route>
          {/* 마이 페이지 관련 주소 */}
          <Route exact path="/mypage">
            <Route exact path="/profile/:userId" />
            <Route exact path="/group/:groupId" />
            <Route exact path="/group/:groupId/update" />
            <Route exact path="/myreport/:userId" />
          </Route>
          {/* 그룹 페이지(게시판) 관련 주소 */}
          <Route exact path="/group">
            <Route exact path="/mystudy/:userId" />
            <Route exact path="/board" />
            <Route exact path="board/:boardId" />
            <Route exact path="/board/:boardId/update" />
            <Route exact path="/board/create" />
            <Route exact path="/studyroom/:sessionName" />
          </Route>
          {/* 휴게실 */}
          <Route exact path="/lounge" />
          {/* 회원 정보 관련 주소 */}
          <Route exact path="/account">
            <Route exact path="/login" />
            <Route exact path="/signup" />
            <Route exact path="/findpassword" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
