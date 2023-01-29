import NavBar from  './components/NavBar/NavBar'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  // Link
} from "react-router-dom";

import SignInSide from './pages/Accounts/Login';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div>
          <Switch>
            <Route exact path="/login/" element={<SignInSide />} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
