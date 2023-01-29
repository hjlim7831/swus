// import GroupPage from './pages/GroupPage/GroupPage';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Nav from './components/Nav';
// import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import GroupPage from './pages/GroupPage/GroupPage'
import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
// import ReduxToolkit from './pages/GroupPage/ReduxToolkit';


// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   }
// });

function App() {

  return (
    <Container fixed>
      {/* <ThemeProvider theme={darkTheme}> */}
        <Nav />
        <CssBaseline />
        <div className="App">
          <GroupPage />
        </div>
      {/* </ThemeProvider> */}
      {/* <ReduxToolkit/> */}
    </Container>
  );
}

export default App;
