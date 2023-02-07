import {
  BrowserRouter,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SignInSide from "./pages/Accounts/LogIn";
import SignUpSide from "./pages/Accounts/SignUp";
import FindPassword from "./pages/Accounts/FindPassword";
import BasicModalDialog from "./pages/Accounts/UserModal";
import Lounge from "./pages/Lounge/SideBar";
import GroupPage from "./pages/GroupPage/GroupPage";
import StudyRoomMain from "./pages/MainPage/StudyRoomMain";
import NSRoom from "./pages/StudyCam/NSRoom";
import MyPageMain from "./pages/MyPageMain/Main";
import MyProfileMain from "./pages/MyPageProfile/MyProfileMain";
import SignUp from "./pages/Accounts/SignUp";
import MyReport from "./pages/MyPageReport/MyReport";
import SignIn from "./pages/Accounts/LogIn";

function App() {
  return (
    <>
      <>
        <BrowserRouter>
          <Routes>
            {/* landingPage */}
            <Route exact path="/" />
            {/* 공용 열람실 관련 주소 */}
            <Route exact path="/studyroom">
              <Route exact path="" element={<StudyRoomMain />} />
              <Route exact path=":sessionName" element={<NSRoom />} />
            </Route>
            {/* 마이 페이지 관련 주소 */}
            <Route exact path="/mypage">
              {/* <Route exact path="profile/:userId" element={<MyPageMain />} /> */}
              <Route exact path="profile" element={<MyPageMain />} />

              <Route exact path="group/:groupId" />
              <Route exact path="group/:groupId/update" />
              {/* <Route exact path="myreport/:userId" elemen /> */}
              <Route exact path="myreport" element={<MyReport />} />
            </Route>
            {/* 그룹 페이지(게시판) 관련 주소 */}
            <Route exact path="/group">
              <Route exact path="mystudy/:userId" />
              <Route exact path="board" />
              <Route exact path="board/:boardId" />
              <Route exact path="board/:boardId/update" />
              <Route exact path="board/create" />
              <Route exact path="studyroom/:sessionName" />
            </Route>
            {/* 휴게실 */}
            <Route exact path="/lounge" />
            {/* 회원 정보 관련 주소 */}
            <Route exact path="/account">
              <Route exact path="login" element={<SignIn />} />
              <Route exact path="signup" element={<SignUp />} />
              <Route exact path="findpassword" />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </>
  );
}

export default App;
