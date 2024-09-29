import React, { useState, useEffect } from "react";
import axios from "axios";
import { GameType, OptionFilter } from "../../types/state-types";
import { Spin, Typography, Input, CascaderProps, Cascader } from "antd";
import GameCard from "../components/card/gameCard";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "../components/Pagination/Pagination";
import ClearIcon from "@mui/icons-material/Clear";
import { optionsFilter } from "../utils/cascader-options";
import Void from "../assets/void.svg";

export default function Home() {
  const [games, setGames] = useState<GameType[]>([]);
  const [originalGames, setOriginalGames] = useState<GameType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(8);
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined);
  const [filteredOptions, setFilteredOptions] =
    useState<OptionFilter[]>(optionsFilter);

  const fetchGames = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not defined");
      }
      const response = await axios.get(apiUrl);
      const gamesData = response.data;
      setGames(gamesData);
      setOriginalGames(gamesData);

      const uniquePublishers = Array.from(
        new Set(
          gamesData.map((game: GameType) => game.publisher).filter(Boolean)
        )
      );

      const publisherOptions = uniquePublishers.map((publisher) => ({
        value: publisher,
        label: publisher,
      }));

      const updatedOptionsFilter = [...optionsFilter];

      const filterOptionIndex = updatedOptionsFilter.findIndex(
        (option) => option.value === "filter"
      );

      if (filterOptionIndex !== -1) {
        const publisherFilterExists = updatedOptionsFilter[
          filterOptionIndex
        ].children?.some((child) => child.value === "Publisher");
        if (!publisherFilterExists) {
          updatedOptionsFilter[filterOptionIndex].children?.push({
            value: "Publisher",
            label: "Publisher",
            children: publisherOptions as OptionFilter[],
          });
        }
      }

      setFilteredOptions(updatedOptionsFilter);
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchGames();
  }, []);

  const onChange: CascaderProps<OptionFilter>["onChange"] = (
    value,
    selectedOptions
  ) => {
    const selectedValue = selectedOptions[selectedOptions.length - 1];
    const selectedKey = selectedValue.value;
    console.log(selectedKey);
    console.log(selectedValue);

    switch (selectedKey) {
      case "asc":
      case "desc":
        sortGames("releaseYear", selectedKey);
        break;
      case "ascend":
      case "descend":
        sortGames("name", selectedKey);
        break;
      case "ascendPub":
      case "descendPub":
        sortGames("publisher", selectedKey);
        break;
      case "true":
      case "false":
        sortGames("standalone", selectedKey === "true");
        break;
      case "BaseGame":
      case "Expansion":
        sortGames("type", selectedKey);
        break;
      case "1":
      case "2":
        sortGames("players", selectedKey);
        break;
      default:
        if (selectedKey) {
          sortGames("publisher", selectedKey);
        }
        break;
    }
    setFilterValue(selectedOptions.map((o) => o.label).join(", "));
  };

  const sortGames = (criteria: string, value: any) => {
    let sortedGames = [...originalGames];
    switch (criteria) {
      case "releaseYear":
        sortedGames.sort((a, b) => {
          const aValue = a.releaseYear ?? 0;
          const bValue = b.releaseYear ?? 0;
          return value === "asc" ? aValue - bValue : bValue - aValue;
        });
        break;
      case "name":
        sortedGames.sort((a, b) => {
          const aValue = a.name.charAt(0).toLowerCase();
          const bValue = b.name.charAt(0).toLowerCase();
          return value === "ascend"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        });
        break;
      case "standalone":
        sortedGames = sortedGames.filter((game) => game.standalone === value);
        break;
      case "type":
        sortedGames = sortedGames.filter((game) => game.type === value);
        break;
      case "publisher":
        sortedGames = sortedGames.filter((game) => game.publisher === value);
        break;
      case "players":
        if (value === "1") {
          sortedGames = sortedGames.filter((game) => game.players.min === 1);
        } else if (value === "2") {
          sortedGames = sortedGames.filter((game) => game.players.min >= 2);
        }
        break;
      default:
        break;
    }

    setGames(sortedGames);
    setCurrentPage(1);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        <Typography.Title
          level={2}
          className="mb-6 text-2xl font-semibold dark:text-white"
        >
          Game List
        </Typography.Title>
        <div className="flex flex-row items-center gap-4 w-full sm:w-auto">
          <Input
            placeholder="Search games..."
            inputMode="search"
            className="w-full sm:w-60 dark:bg-gray-800 placeholder-black-300 dark:placeholder-gray-300 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:border-customOrange dark:hover:border-customOrange focus:border-customOrange dark:focus:border-customOrange focus:outline-none transition duration-150 ease-in-out"
            onChange={handleSearch}
          />

          <Cascader
            options={filteredOptions}
            onChange={onChange}
            className="flex-shrink-0 w-24 sm:w-32 md:w-40 lg:w-48 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm transition duration-150 ease-in-out"
          >
            <FilterListIcon className="dark:text-white" />
          </Cascader>

          {filterValue && (
            <div
              className="flex items-center cursor-pointer p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150 ease-in-out whitespace-nowrap"
              onClick={() => {
                setFilterValue(undefined);
                setGames(originalGames);
                setCurrentPage(1);
              }}
            >
              <ClearIcon className="text-sm dark:text-white mr-1" />
              <Typography.Text className="text-sm dark:text-white">
                Clear
              </Typography.Text>
            </div>
          )}
        </div>
      </div>

      <div
        className={
          games.length === 0
            ? "flex justify-center items-center h-full w-full"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        }
      >
        {games.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <img src={Void} alt="No games found" className="w-1/2 h-1/2" />
            <Typography.Text className="text-2xl font-bold text-gray-800 dark:text-white">
              No games found
            </Typography.Text>
          </div>
        ) : (
          games
            .slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage)
            .map((game) => <GameCard key={game.id} game={game} />)
        )}
      </div>

      <div className="flex justify-center mt-10">
        <Pagination
          current={currentPage}
          pageSize={gamesPerPage}
          total={games.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
