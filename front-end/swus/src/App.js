import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPageMain from "./pages/MyPageMain/MyPageMain";
import MainPage from "./pages/MainPage/MainPage";
import NSRoom from "./pages/StudyCam/NSRoom";
import OpenViduApp from "./pages/OpenVidu/OpenViduApp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<MyPageMain />} /> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/nsroom" element={<NSRoom />} />
          {/* <Route path="/" element={<OpenViduApp />} /> */}
          {/* <Route path="/openvidu" element={<OpenViduApp />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
