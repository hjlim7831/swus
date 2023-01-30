import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPageMain from "./pages/MyPageMain/MyPageMain";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<MyPageMain />} /> */}
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
