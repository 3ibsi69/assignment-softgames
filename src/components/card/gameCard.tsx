import { Card, Typography, Tooltip } from "antd";
import { GameType } from "../../../types/state-types";
import { GiConsoleController } from "react-icons/gi";
import { FaGamepad } from "react-icons/fa";

// This component is used to display the game card with the game details
export default function GameCard({ game }: { game: GameType }) {
  return (
    <div
      key={game.id}
      className="bg-gradient-to-br from-white via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-xl rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      style={{ height: "auto" }}
    >
      <Card
        hoverable
        bordered={false}
        className="p-4 bg-gradient-to-r from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 dark:border-none rounded-lg"
        style={{ padding: "16px", height: "100%" }}
      >
        <Card.Meta
          title={
            <div className="flex items-center">
              {game.standalone ? (
                <GiConsoleController
                  className="mr-2 text-customOrange"
                  style={{ fontSize: "1.5rem" }}
                />
              ) : (
                <FaGamepad
                  className="mr-2 text-customOrangeLight"
                  style={{ fontSize: "1.5rem" }}
                />
              )}
              <Tooltip title={game.name}>
                <Typography.Text
                  className="text-lg font-bold text-gray-800 dark:text-white"
                  ellipsis
                  style={{ maxWidth: "calc(100% - 40px)" }}
                >
                  {game.name}
                </Typography.Text>
              </Tooltip>
            </div>
          }
          description={
            <div className="mt-2 space-y-1">
              <Typography.Text className="block text-gray-600 dark:text-gray-300 text-sm">
                <span className="font-semibold">Release Year: </span>
                {game.releaseYear ? game.releaseYear : "Not specified"}
              </Typography.Text>
              <Typography.Text className="block text-gray-600 dark:text-gray-300 text-sm">
                <span className="font-semibold">Players: </span>
                {game.players.min} - {game.players.max}
              </Typography.Text>
              <Typography.Text className="block text-gray-600 dark:text-gray-300 text-sm">
                <span className="font-semibold">Publisher: </span>
                {game.publisher ? game.publisher : "Not specified"}
              </Typography.Text>
              <Typography.Text className="block text-gray-600 dark:text-gray-300 text-sm">
                <span className="font-semibold">Type: </span>
                {game.type}
              </Typography.Text>{" "}
              <Typography.Text className="block text-gray-600 dark:text-gray-300 text-sm">
                <span className="font-semibold">Expansions: </span>
                {game.expansions && game.expansions.length > 0
                  ? game.expansions.join(", ")
                  : "None"}
              </Typography.Text>{" "}
              <Typography.Text className="block text-gray-600 dark:text-gray-300 text-sm">
                <span className="font-semibold">Standalone: </span>
                {game.standalone ? "Yes" : "No"}
              </Typography.Text>
            </div>
          }
        />

        {/* I removed this so when there is more data i can display it for better readablity  */}
        {/* <Link
          to={`/details/${game.id}`}
          state={{ game }}
          className="details-link inline-block mt-3 p-2 bg-gradient-to-r from-customOrange to-customOrangeLight dark:from-customOrangeDark dark:to-customOrange hover:scale-110 transition-transform duration-200 shadow-lg rounded-lg text-center float-end"
          style={{ width: "auto", maxWidth: "140px", padding: "8px 16px" }}
        >
          <Typography.Text className="text-sm flex items-center justify-center text-white">
            View Details <ArrowForwardIcon className="ml-2 text-sm" />
          </Typography.Text>
        </Link> */}
      </Card>
    </div>
  );
}
