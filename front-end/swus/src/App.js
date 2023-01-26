import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import MyInfo from "./pages/MyPageProfile/MyInfo";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyInfo name="김싸피" email="ksf@gmail.com" />} />



        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
