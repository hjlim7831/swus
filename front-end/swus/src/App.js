import GroupPage from './pages/GroupPage/GroupPage';
import CreateArticle from './pages/GroupPage/CreateArticle';
import ArticleDetail from './pages/GroupPage/ArticleDetail';
import UpdateArticle from './pages/GroupPage/UpdateArticle';
import GroupDetail from './pages/GroupPage/GroupDetail';
import GroupDetailUpdate from './pages/GroupPage/GroupDetailUpdate';
import Container from '@mui/material/Container';
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
        <BrowserRouter>
          <Container fixed>
              <div>
                <Routes>
                  <Route exact path="/" element={<GroupPage/>} />
                  <Route exact path="/group/create" element={<CreateArticle />} />
                  <Route exact path="/group/detail" element={<ArticleDetail />} />
                  <Route exact path="/group/update" element={<UpdateArticle />} />
                  <Route exact path="/detail" element={<GroupDetail />} />
                  <Route exact path="/detail/update" element={<GroupDetailUpdate />}/>
                </Routes>
              </div>
          </Container>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
