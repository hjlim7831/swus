import {
  BrowserRouter,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import LogIn from "./pages/Accounts/LogIn";
import SignUp from "./pages/Accounts/SignUp";
import FindPassword from "./pages/Accounts/FindPassword";
import Account from "./pages/Accounts/UserPage";
import Lounge from "./pages/Lounge/SideBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* landingPage */}
          {/* <Route exact path="/" /> */}
          {/* 공용 열람실 관련 주소 */}
          {/* <Route exact path="/studyroom">
            <Route exact path="" />
            <Route exact path=":sessionName" />
          </Route> */}
          {/* 마이 페이지 관련 주소 */}
          {/* <Route exact path="/mypage">
            <Route exact path="profile/:userId" />
            <Route exact path="group/:groupId" />
            <Route exact path="group/:groupId/update" />
            <Route exact path="myreport/:userId" />
          </Route> */}
          {/* 그룹 페이지(게시판) 관련 주소 */}
          {/* <Route exact path="/group">
            <Route exact path="mystudy/:userId" />
            <Route exact path="board" />
            <Route exact path="board/:boardId" />
            <Route exact path="board/:boardId/update" />
            <Route exact path="board/create" element={<CreateArticle />} />
            <Route exact path="studyroom/:sessionName" />
          </Route> */}
          {/* 휴게실 */}
          <Route exact path="/lounge" element={<Lounge />} />
          {/* 회원 정보 관련 주소 */}
          {/* <Route exact path="/account" element={<UserModal />}> */}
          <Route exact path="/account" element={<Account />}>
            <Route exact path="login" element={<LogIn />} />
            <Route exact path="signup" element={<SignUp />} />
            <Route exact path="findpassword" element={<FindPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
