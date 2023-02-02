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

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/login/" element={<SignInSide />} />
          <Route exact path="/signup/" element={<SignUpSide />} />
          <Route exact path="/findpassword" element={<FindPassword />} />
          <Route exact path="/accounts" element={<BasicModalDialog />}>
            <Route path="login" element={<SignInSide />}></Route>
            <Route path="signup" element={<SignUpSide />}></Route>
            <Route path="findpassword" element={<FindPassword />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
