import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPageMain from "./pages/MyPageMain/MyPageMain";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyPageMain />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
