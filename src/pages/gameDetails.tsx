import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Typography } from "antd";
import { GameType } from "../../types/state-types";

export default function GameDetails() {
  const { theme } = useTheme();
  const location = useLocation();
  const game: GameType = location.state?.game;

  if (!game) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <Typography.Text className={`text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
          Game not found
        </Typography.Text>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-grow">

    </div>
  );
}
