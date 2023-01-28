// import GroupPage from './pages/GroupPage/GroupPage';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Nav from './components/Nav';
// import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import GroupPage from './pages/GroupPage/GroupPage'
import { CssBaseline } from '@mui/material';
import ReduxToolkit from './pages/GroupPage/ReduxToolkit';


// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   }
// });

function App() {

  return (
    <>
      {/* <ThemeProvider theme={darkTheme}> */}
        <Nav />
        <CssBaseline />
        <div className="App">
          <GroupPage />
        </div>
      {/* </ThemeProvider> */}
      <ReduxToolkit/>
    </>
  );
}

export default App;
