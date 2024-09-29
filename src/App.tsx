import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home";
import GameDetails from "./pages/gameDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className={`h-screen flex flex-col transition-colors duration-300`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<GameDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
