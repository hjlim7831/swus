// import GroupPage from './pages/GroupPage/GroupPage';
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
import CreateArticle from './pages/GroupPage/CreateArticle';

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
        <Container fixed>
          {/* <ThemeProvider theme={darkTheme}> */}
            <Nav />
            <CssBaseline />
            <div className="App">
              {/* <GroupPage /> */}
              <CreateArticle />
            </div>
          {/* </ThemeProvider> */}
          {/* <ReduxToolkit/> */}
        </Container>
      </Provider>
    </>
  );
}

export default App;
