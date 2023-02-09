import GroupPage from "./pages/GroupPage/GroupPage";
import CreateArticle from "./pages/GroupPage/CreateArticle";
import ArticleDetail from "./pages/GroupPage/ArticleDetail";
import UpdateArticle from "./pages/GroupPage/UpdateArticle";
import GroupDetail from "./pages/GroupPage/GroupDetail";
import UpdateGroupDetail from "./pages/GroupPage/UpdateGroupDetail";
import GroupMain from "./pages/GroupPage/Main";
import MyGroupList from "./pages/MyPageProfile/MyGroupList";

import LogIn from "./pages/Accounts/LogIn";
import SignUp from "./pages/Accounts/SignUp";
import FindPassword from "./pages/Accounts/FindPassword";
import Account from "./pages/Accounts/UserPage";

import MyPageMain from "./pages/MyPageMain/Main";

import Lounge from "./pages/Lounge/Lounge";

import UserModal from "./pages/Accounts/LogInModal/UserModal";
import LogInModal from "./pages/Accounts/LogInModal/LogIn";
import SignUpModal from "./pages/Accounts/LogInModal/SignUp";
import FindPasswordModal from "./pages/Accounts/LogInModal/FindPassword";
import MyReport from "./pages/MyPageReport/MyReport";

import StudyRoomMain from "./pages/MainPage/StudyRoomMain";
import NSRoom from "./pages/StudyCam/NSRoom";
import MyProfileMain from "./pages/MyPageProfile/MyProfileMain";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* landingPage */}
          {/* <Route exact path="/" /> */}
          {/* 공용 열람실 관련 주소 */}
          <Route exact path="/studyroom">
            <Route exact path="" element={<StudyRoomMain />} />
            <Route exact path=":sessionName" element={<NSRoom />} />
          </Route>
          {/* 마이 페이지 관련 주소 */}
          <Route exact path="/mypage">
            {/* <Route path="profile/:userId" /> */}
            <Route path="report" element={<MyReport />} />
            <Route path="profile" element={<MyPageMain />} />
            <Route path="group/:groupId" element={<GroupDetail />} />
            <Route
              path="group/:groupId/update"
              element={<UpdateGroupDetail />}
            />
            <Route path="myreport/:userId" />
          </Route>
          {/* 그룹 페이지(게시판) 관련 주소 */}
          <Route exact path="/group" element={<GroupMain />}>
            <Route path="mystudy/:userId" element={<MyGroupList />} />
            <Route path="board" element={<GroupPage />} />
            <Route path="board/:boardId" element={<ArticleDetail />} />
            <Route path="board/:boardId/update" element={<UpdateArticle />} />
            <Route path="board/create" element={<CreateArticle />} />
            <Route path="studyroom/:sessionName" />
          </Route>
          {/* 휴게실 */}
          <Route exact path="/lounge" element={<Lounge />} />
          {/* 회원 정보 관련 주소 */}
          {/* <Route exact path="/account" element={<UserModal />}> */}
          <Route exact path="/account" element={<Account />}>
            <Route exact path="login" element={<LogIn />} />
            <Route exact path="signup" element={<SignUp />} />
            <Route exact path="findpassword" element={<FindPassword />} />
          </Route>

          {/* Login modal */}
          <Route exact path="/accounts" element={<UserModal />}>
            <Route exact path="login" element={<LogInModal />} />
            <Route exact path="signup" element={<SignUpModal />} />
            <Route exact path="findpassword" element={<FindPasswordModal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
