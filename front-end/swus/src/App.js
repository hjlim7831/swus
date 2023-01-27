import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyProfileMain from "./pages/MyPageProfile/MyProfileMain";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyProfileMain />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
