import { useState, useEffect } from "react";
import axios from "axios";
import requests from "../../tmdbUrls";

function Main() {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios
      .get(requests.recent)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, []);

  return (
    <div className="w-full h-[600px]  text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black from-0% via-zinc-700/55 via-50% to-black"></div>
        <img
          className="w-full h-full object-cover 2xl:object-contain object-center"
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[35%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold pb-4">
            {movie?.title}
          </h1>
          <p className="text-gray-400 text-sm pb-2">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:w-[25%]">
            {movie?.overview.length > 200
              ? movie?.overview.slice(0, 200) + "..."
              : movie?.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
