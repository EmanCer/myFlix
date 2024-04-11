import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import requests from "../../tmdbUrls";
import axios from "axios";

function Navbar() {
  const [query, setQuery] = useState("");
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const replacedQuery = query.replace(/ /g, "%20");
      const movieSearched = requests.movieByQuery(replacedQuery);
      const response = await axios.get(movieSearched);

      if (response.data.results.length === 0) {
        console.log("no results found");
        return;
      }

      navigate("/results", { state: { searchData: response.data } });
    } catch (error) {
      console.error("error Fetching movie", error);
    }
  };

  return (
    <nav className="absolute flex justify-between items-center w-full px-2 py-6 z-[100] text-white">
      <div className="w-40 sm:w-48">
        <Link to={"/"}>
          <img
            src="\src\img\logo.png"
            alt="myflix logo"
            className="object-cover cursor-pointer"
          />
        </Link>
      </div>

      <form
        className="absolute sm:relative top-[100%] w-[80%] m-auto left-0 right-0 md:block sm:w-[40%]"
        onSubmit={handleSearchSubmit}
      >
        <label
          htmlFor="movie-search"
          className="mb-2 text-sm font-medium text-zinc-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-zinc-600"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="movie-search"
            className="block w-full p-4 ps-10 text-sm text-zinc-900 border border-zinc-600 rounded-lg bg-white focus:ring-4 focus:ring-red-600 focus:border-red-600 focus:outline-none"
            placeholder="Search Movies..."
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      {user?.email ? (
        <ul className="flex items-center">
          <Link to={"/account"}>
            <button className="pr-4">Profile</button>
          </Link>
          <button
            className="bg-red-600 text-white  px-4 py-1 sm:px-6 sm:py-2 rounded-md cursor-pointer"
            onClick={handleLogout}
          >
            Logut
          </button>
        </ul>
      ) : (
        <ul className="flex items-center">
          <Link to={"/login"}>
            <button className="pr-4">Sign In</button>
          </Link>
          <Link to={"/signup"}>
            <button className="bg-red-600 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-md cursor-pointer">
              Sign Up
            </button>
          </Link>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
