import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Typography } from "antd";
import { GameType } from "../../types/state-types";
import { FaUsers, FaCalendarAlt, FaTag, FaBuilding } from "react-icons/fa";
import InfoCard from "../components/card/InfoCard";

// This page  will only be shown when there is more data to display about a game
export default function GameDetails() {
  const { theme } = useTheme();
  const location = useLocation();
  const game: GameType = location.state?.game;

  if (!game) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <Typography.Text
          className={`text-lg ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Game not found
        </Typography.Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow">
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            title="Release Year"
            content={game.releaseYear ? game.releaseYear.toString() : "N/A"}
            icon={<FaCalendarAlt className="text-customOrange text-2xl" />}
          />
          <InfoCard
            title="Players"
            content={`${game.players.min} - ${game.players.max}`}
            icon={<FaUsers className="text-customOrange text-2xl" />}
          />
          <InfoCard
            title="Publisher"
            content={game.publisher ? game.publisher : "Not specified"}
            icon={<FaBuilding className="text-customOrange text-2xl" />}
          />
          <InfoCard
            title="Type"
            content={game.type}
            icon={<FaTag className="text-customOrange text-2xl" />}
          />
        </div>
      </div>
    </div>
  );
}
