import GroupPage from './pages/GroupPage/GroupPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Nav from './components/Nav';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

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
    </>
  );
}

export default App;
