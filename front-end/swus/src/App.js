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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudyRoomMain />} />
          <Route path="/nsroom" element={<NSRoom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
