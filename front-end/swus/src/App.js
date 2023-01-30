import NavBar from "./components/NavBar/NavBar";
import {
  BrowserRouter,
  Routes,
  Route,
  // Link
} from "react-router-dom";

import SignInSide from "./pages/Accounts/LogIn";
import SignUpSide from "./pages/Accounts/SignUp";
import FindPassword from "./pages/Accounts/FindPassword";
import BasicModalDialog from "./pages/Accounts/UserModal";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route exact path="/login/" element={<SignInSide />} />
            <Route exact path="/signup/" element={<SignUpSide />} />
            <Route exact path="/findpassword" element={<FindPassword />} />
            <Route exact path="/modal/" element={<BasicModalDialog />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
