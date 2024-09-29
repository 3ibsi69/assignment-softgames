import React, { useState, useEffect } from "react";
import axios from "axios";
import { GameType } from "../../types/state-types";
import { Card, Spin, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const Home = () => {
  const [games, setGames] = useState<GameType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not defined");
      }
      const response = await axios.get(apiUrl);
      setGames(response.data);
      console.log(response.data);
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className={`p-4 transition-colors duration-300`}>
      <Title level={2} className="mb-6">
        Game List
      </Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105"
          >
            <Card hoverable className={`bg-white dark:bg-gray-800`}>
              <Card.Meta
                title={
                  <Link
                    to={`/games/${game.id}`}
                    className="text-lg font-bold dark:text-white"
                  >
                    {game.name}
                  </Link>
                }
                description={
                  <>
                    <Text className="dark:text-white">
                      Release Year: {game.releaseYear}
                    </Text>
                    <br />
                    <Text className="dark:text-white">
                      Players: {game.players.min} - {game.players.max}
                    </Text>
                    <br />
                    <Text className="dark:text-white">
                      Publisher: {game.publisher}
                    </Text>
                    <br />
                    <Text className="dark:text-white">Type: {game.type}</Text>
                  </>
                }
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
