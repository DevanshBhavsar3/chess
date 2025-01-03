import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./components/HomePage";
import Board from "./components/Board";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
