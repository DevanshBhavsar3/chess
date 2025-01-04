import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
