import React from "react";
import NotFoundSVG from "../assets/notfound.svg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={NotFoundSVG} alt="Not Found" className="w-1/2 h-1/2" />
      <h1 className=" text-2xl font-bold text-gray-800 dark:text-white">
        Page Not Found
      </h1>
    </div>
  );
};

export default NotFound;
