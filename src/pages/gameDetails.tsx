import { useTheme } from "../context/ThemeContext";

export default function GameDetails() {
  const { theme } = useTheme();

  return (
    <div className="flex justify-center items-center flex-grow">
      <h1
        className={`text-xl transition-colors duration-300 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        About Us
      </h1>
    </div>
  );
}
