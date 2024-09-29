import React, { useState, useEffect } from "react";
import axios from "axios";
import { GameType } from "../../types/state-types";
import {
  Card,
  Spin,
  Typography,
  Pagination,
  Skeleton,
  Input,
  Dropdown,
  Menu,
} from "antd";
import GameCard from "../components/card/gameCard";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function Home() {
  const [games, setGames] = useState<GameType[]>([]);
  const [originalGames, setOriginalGames] = useState<GameType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(8);

  const sortGamesByReleaseYear = (order: "asc" | "desc") => {
    const sortedGames = [...games].sort((a, b) => {
      const aValue = a.releaseYear;
      const bValue = b.releaseYear;

      setCurrentPage(1);
      return order === "asc"
        ? (aValue ?? 0) - (bValue ?? 0)
        : (bValue ?? 0) - (aValue ?? 0);
    });

    setGames(sortedGames);
  };

  const sortGamesByStandalone = (value: boolean) => {
    const filteredGames = originalGames.filter(
      (game) => game.standalone === value
    );

    setGames(filteredGames);
    setCurrentPage(1);
  };

  const fetchGames = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not defined");
      }
      const response = await axios.get(apiUrl);
      setGames(response.data);
      setOriginalGames(response.data);
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (searchValue) {
      const filteredGames = originalGames.filter((game) =>
        game.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setGames(filteredGames);
      setCurrentPage(1);
    } else {
      setGames(originalGames);
    }
  };

  const handleSortMenuClick = (order: "asc" | "desc") => {
    sortGamesByReleaseYear(order);
  };

  const sortMenu = (
    <Menu>
      <Menu.Item onClick={() => handleSortMenuClick("asc")}>
        Sort by Release Year Asc
      </Menu.Item>
      <Menu.Item onClick={() => handleSortMenuClick("desc")}>
        Sort by Release Year Desc
      </Menu.Item>
      <Menu.Item onClick={() => sortGamesByStandalone(false)}>
        Show Non-Standalone Games Only
      </Menu.Item>
      <Menu.Item onClick={() => sortGamesByStandalone(true)}>
        Show Standalone Games Only
      </Menu.Item>
    </Menu>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className={`p-12 transition-colors duration-300`}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <Typography.Title level={2} className="mb-6 dark:text-white">
          Game List
        </Typography.Title>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search games..."
            inputMode="search"
            className="w-full sm:w-60 dark:bg-gray-800 placeholder:white dark:placeholder-gray-300 dark:text-white"
            onChange={handleSearch}
          />
          <Dropdown overlay={sortMenu} trigger={["click"]}>
            <div className="p-2 rounded-full bg-white dark:bg-gray-800 mb-2 cursor-pointer">
              <FilterListIcon className="dark:text-white" />
            </div>
          </Dropdown>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: gamesPerPage }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
              >
                <Card className={`bg-white dark:bg-gray-800`}>
                  <Skeleton active />
                </Card>
              </div>
            ))
          : currentGames.map((game) => <GameCard key={game.id} game={game} />)}
      </div>

      <div className="flex justify-center mt-10">
        <Pagination
          current={currentPage}
          pageSize={gamesPerPage}
          total={games.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="bg-transparent dark:text-white"
        />
      </div>
    </div>
  );
}
