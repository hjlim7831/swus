import GroupPage from './pages/GroupPage/GroupPage';
import CreateArticle from './pages/GroupPage/CreateArticle';
import ArticleDetail from './pages/GroupPage/ArticleDetail';
import UpdateArticle from './pages/GroupPage/UpdateArticle';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Nav from './components/Nav';
// import { useState, useEffect } from 'react';
import Nav from './components/Nav';
// import GroupPage from './pages/GroupPage/GroupPage'
import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import { Provider } from 'react-redux';
import store from './store/Store';
import { 
  BrowserRouter,
  Routes,
  Route, 
} from 'react-router-dom';


// import ReduxToolkit from './pages/GroupPage/ReduxToolkit';


// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   }
// });

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Container fixed>
              {/* <Nav />
              <CssBaseline />
              <div className="App"> */}
              <Routes>
                <Route exact path="/group" element={<GroupPage/>} />
                <Route exact path="/group/create" element={<CreateArticle />} />
                <Route exact path="/group/detail" element={<ArticleDetail />} />
                <Route exact path="/group/update" element={<UpdateArticle />} />
              </Routes>
              {/* </div> */}
          </Container>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
