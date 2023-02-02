import GroupPage from './pages/GroupPage/GroupPage';
import CreateArticle from './pages/GroupPage/CreateArticle';
import ArticleDetail from './pages/GroupPage/ArticleDetail';
import UpdateArticle from './pages/GroupPage/UpdateArticle';
import GroupDetail from './pages/GroupPage/GroupDetail';
import GroupDetailUpdate from './pages/GroupPage/GroupDetailUpdate';
// import Nav from "./components/Nav";
import { Box } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store/Store';
import { 
  BrowserRouter,
  Routes,
  Route, 
} from 'react-router-dom';

function App() {

  return (
    <>
      <Provider store={store}>
        {/* <Nav></Nav> */}
          <Box style={{ display: "flex", justifyContent: "flex-start", margin: 0 }}>
            <BrowserRouter>
              <div style={{ border: "1px red solid", minHeight: "500px", minWidth: "180px", marginRight: "30px" }}></div>
              <Box style={{ justyifyItems: "center"}}>
                <Routes>
                  <Route exact path="/" element={<GroupPage/>} />
                  <Route exact path="/group/create" element={<CreateArticle />} />
                  <Route exact path="/group/detail" element={<ArticleDetail />} />
                  <Route exact path="/group/update" element={<UpdateArticle />} />
                  <Route exact path="/detail" element={<GroupDetail />} />
                  <Route exact path="/detail/update" element={<GroupDetailUpdate />}/>
                </Routes>
              </Box>
            </BrowserRouter>
          </Box>
      </Provider>
    </>
  );
}

export default App;
