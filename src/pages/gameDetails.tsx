import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function GameDetails() {
  const { theme } = useTheme();
  const { id } = useParams();

  return (
    <div className="flex justify-center items-center flex-grow">
      <h1
        className={`text-xl transition-colors duration-300 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        About Us Page {id}
      </h1>
    </div>
  );
}
