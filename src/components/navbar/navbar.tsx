import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

// This component will be used to display the navbar at the top of the page
export default function Navbar() {
  const { toggleTheme, theme } = useTheme();

  return (
    <nav className="flex justify-between items-center p-4 shadow mb-4 flex-wrap bg-white dark:bg-gray-800">
      <div className="text-lg font-bold">
        <Link to="/" className="nav-link text-customOrange dark:text-white">
          SoftGames
        </Link>
      </div>
      <div className="flex items-center">
        <div
          onClick={toggleTheme}
          className="cursor-pointer text-2xl ml-4 text-customOrange dark:text-white"
        >
          {theme === "light" ? <MdOutlineDarkMode /> : <CiLight />}
        </div>
      </div>
    </nav>
  );
}
