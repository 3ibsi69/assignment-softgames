import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const { toggleTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <nav className="flex justify-between items-center p-4 shadow mb-4 flex-wrap bg-white dark:bg-gray-800">
      <div className="text-lg font-bold">
        <Link to="/">SoftGames</Link>
      </div>
      <div className="flex items-center md:hidden">
        <div onClick={handleToggleMenu} className="text-2xl cursor-pointer">
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>

        <div onClick={toggleTheme} className="cursor-pointer text-2xl ml-4">
          {theme === "light" ? <MdOutlineDarkMode /> : <CiLight />}
        </div>
      </div>
      <div
        className={`flex-col md:flex-row ${
          isOpen
            ? "flex border-b-2 border-gray-300 dark:border-gray-600"
            : "hidden md:flex"
        } md:flex items-center md:visible absolute md:static top-14 left-0 w-full md:w-auto transition-all duration-300`}
      >
        <Link to="/" className="nav-link px-4 py-2 hover:underline">
          Home
        </Link>
        <Link to="/about" className="nav-link px-4 py-2 hover:underline">
          About
        </Link>
        <div
          onClick={toggleTheme}
          className={`cursor-pointer text-2xl ml-4 ${
            !isOpen ? "block" : "hidden"
          }`}
        >
          {theme === "light" ? <MdOutlineDarkMode /> : <CiLight />}
        </div>
      </div>
    </nav>
  );
}
