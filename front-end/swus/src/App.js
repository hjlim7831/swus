import GroupPage from './pages/GroupPage/GroupPage';
import CreateArticle from './pages/GroupPage/CreateArticle';
import ArticleDetail from './pages/GroupPage/ArticleDetail';
import UpdateArticle from './pages/GroupPage/UpdateArticle';
import GroupDetail from './pages/GroupPage/GroupDetail';
import UpdateGroupDetail from './pages/GroupPage/UpdateGroupDetail';
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import GroupMain from "./pages/GroupPage/Main";
import Login from "./pages/Accounts/LogIn";
import SignUp from "./pages/Accounts/SignUp";
import MyGroupList from './pages/MyPageProfile/MyGroupList';


// import Nav from "./components/Nav";
import { Box } from '@mui/material';
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
      <BrowserRouter>
        <Routes>
          {/* landingPage */}
          {/* <Route exact path="/" /> */}
          {/* 공용 열람실 관련 주소 */}
          <Route exact path="/studyroom">
            <Route path="" />
            <Route path=":sessionName" />
          </Route>
          {/* 마이 페이지 관련 주소 */}
          <Route exact path="/mypage">
            <Route path="profile/:userId" />
            <Route path="group/:groupId" element={<GroupDetail/>}/>
            <Route path="group/:groupId/update" element={<UpdateGroupDetail/>}/>
            <Route path="myreport/:userId" />
          </Route>
          {/* 그룹 페이지(게시판) 관련 주소 */}
          <Route exact path="/group" element={<GroupMain />}>
            <Route path="mystudy/:userId" element={<MyGroupList/>}/>
            <Route path="board" element={<GroupPage/>}/>
            <Route path="board/:boardId" element={<ArticleDetail />}/>
            <Route path="board/:boardId/update" element={<UpdateArticle />}/>
            <Route path="board/create" element={<CreateArticle />}/>
            <Route path="studyroom/:sessionName"/>
          </Route>
          {/* 휴게실 */}
          <Route exact path="/lounge" />
          {/* 회원 정보 관련 주소 */}
          <Route exact path="/account">
            <Route path="login" element={<Login />}/>
            <Route path="signup" element={<SignUp />}/>
            <Route path="findpassword" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
