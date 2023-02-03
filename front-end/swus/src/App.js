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

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/login/" element={<SignInSide />} />
          <Route exact path="/signup/" element={<SignUpSide />} />
          <Route exact path="/findpassword" element={<FindPassword />} />
          <Route exact path="/lounge" element={<Lounge />} />
          <Route exact path="/accounts" element={<BasicModalDialog />}>
            <Route path="login" element={<SignInSide />}></Route>
            <Route path="signup" element={<SignUpSide />}></Route>
            <Route path="findpassword" element={<FindPassword />}></Route>
          </Route>
          <Route exact path="/" element={<GroupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
