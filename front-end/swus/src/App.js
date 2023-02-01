import { BrowserRouter, Routes, Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
