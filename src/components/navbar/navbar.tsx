import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Icon from "@mui/material/Icon";

const Navbar = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <nav className="flex justify-between items-center p-4 shadow mb-4">
      <div className="text-lg font-bold">
        <Link to="/">MyApp</Link>
      </div>
      <div>
        <Link to="/" className="px-4 py-2 hover:underline">
          Home
        </Link>
        <Link to="/about" className="px-4 py-2 hover:underline">
          About
        </Link>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
