import GroupPage from './pages/GroupPage/GroupPage';
import CreateArticle from './pages/GroupPage/CreateArticle';
import ArticleDetail from './pages/GroupPage/ArticleDetail';
import UpdateArticle from './pages/GroupPage/UpdateArticle';
import GroupDetail from './pages/GroupPage/GroupDetail';
import GroupDetailUpdate from './pages/GroupPage/GroupDetailUpdate';
// import Nav from "./components/Nav";
import { Box } from '@mui/material';
import { 
  BrowserRouter,
  Routes,
  Route, 
} from 'react-router-dom';

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
            <Route path="group/:groupId/update" element={<GroupDetailUpdate/>}/>
            <Route path="myreport/:userId" />
          </Route>
          {/* 그룹 페이지(게시판) 관련 주소 */}
          <Route exact path="/group">
            <Route path="mystudy/:userId"/>
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
            <Route path="login" />
            <Route path="signup" />
            <Route path="findpassword" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
