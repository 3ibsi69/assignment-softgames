import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { GameType } from "../../../types/state-types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function GameCard({ game }: { game: GameType }) {
  return (
    <div
      key={game.id}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105"
    >
      <Card hoverable className={`bg-white dark:bg-gray-800`}>
        <Card.Meta
          title={
            <Typography.Text className="text-lg font-bold dark:text-white">
              {game.standalone ? "🎮" : "🕹"} {game.name}
            </Typography.Text>
          }
          description={
            <>
              <Typography.Text className="dark:text-white">
                Release Year: {game.releaseYear ? game.releaseYear : "N/A"}
              </Typography.Text>
              <br />
              <Typography.Text className="dark:text-white">
                Players: {game.players.min} - {game.players.max}
              </Typography.Text>
              <br />
              <Typography.Text className="dark:text-white">
                Publisher: {game.publisher ? game.publisher : "Not specified"}
              </Typography.Text>
              <br />
              <Typography.Text className="dark:text-white">
                Type: {game.type}
              </Typography.Text>
            </>
          }
        />
        <Link
          to={`/details/${game.id}`}
          className="block w-24 p-2 bg-blue-500 rounded-lg text-center text-white mt-4 hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 float-end"
        >
          Details <ArrowForwardIcon className="size-6" />
        </Link>
      </Card>
    </div>
  );
}
