import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import requests from "../../tmdbUrls";

function MoviePage() {
  // params take id from url
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  // useEffect listen to movieId for changes to then fetch the movie with the id passed
  useEffect(() => {
    if (movieId) {
      const movieRequestUrl = requests.movieById(movieId);
      console.log(movieRequestUrl);
      axios
        .get(movieRequestUrl)
        .then((response) => {
          setMovie(response.data);
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
    }
  }, [movieId]);

  // find the right video to display
  const renderTrailer = () => {
    if (movie && movie.videos && movie.videos.results) {
      const trailer = movie.videos?.results.find(
        (video) => video?.name === "Official Trailer"
      );

      // If the trailer video exist it gets displayed on the page
      if (trailer)
        return (
          <div className="md:w-[60%] mx-auto my-20">
            <p className="text-white m-6 text-lg">Check out the Trailer now:</p>
            <YouTube
              className="px-6 h-[300px] md:h-[350px] lg:h-[400px] "
              opts={{
                width: "100%",
                height: "100%",
              }}
              videoId={trailer?.key}
            ></YouTube>
          </div>
        );
    }
  };

  return (
    movie && (
      <div>
        <Navbar />
        <div className="w-full h-[700px] text-white">
          <div className="w-full h-full">
            <div className="absolute w-full h-[700px] bg-gradient-to-r from-black from-0% via-zinc-700/55 via-50% to-black"></div>
            <img
              className="w-full h-full object-cover 2xl:object-contain object-center"
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
              alt={movie?.title}
            />
            <div className="absolute w-full top-[20%] p-4 md:p-8">
              <h1 className="text-3xl md:text-5xl font-bold pb-6">
                {movie?.title.length > 60
                  ? movie?.title.slice(0, 60) + "..."
                  : movie?.title}
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
          <div className="flex w-[90%] lg:w-[70%] xl:w-[50%] m-auto justify-between p-2 md:px-6 md:py-10 border-2 border-red-600 my-10">
            <div className="flex flex-col justify-center">
              {movie.tagline ? (
                <h2 className="text-2xl pb-10">&quot;{movie.tagline}&ldquo;</h2>
              ) : null}

              <p className="font-bold pb-4">
                Directed by:{" "}
                <span className="font-normal">
                  {movie.credits.crew.find((dir) => dir.job === "Director")
                    ? movie.credits.crew.find((dir) => dir.job === "Director")
                        .name
                    : "Not Available"}
                </span>
              </p>
              <p className="font-bold pb-4">
                Producer:{" "}
                <span className="font-normal">
                  {movie.credits.crew.find((dir) => dir.job === "Producer")
                    ? movie.credits.crew.find((dir) => dir.job === "Producer")
                        .name
                    : "Not Available"}
                </span>
              </p>
              <p className="font-bold pb-4">
                Writer
                {movie.credits.crew.find((dir) => dir.job === "Screenplay") ? (
                  movie.credits?.crew
                    ?.filter((el) => el.job === "Screenplay")
                    .map((el, i) => (
                      <span className="font-normal" key={el.id}>
                        {(i ? "," : ": ") + el.name}
                      </span>
                    ))
                ) : (
                  <span className="font-normal">: Not Available</span>
                )}
              </p>
              <p className="font-bold pb-4">
                Runtime:{" "}
                <span className="font-normal">
                  {Math.floor(movie.runtime / 60) +
                    "h " +
                    Math.floor(movie.runtime % 60) +
                    "m"}
                </span>
              </p>
              <p className="font-bold pb-4">
                Genre
                <span className="font-normal">
                  {movie.genres.map((el, i) => (i ? " - " : ": ") + el.name)}
                </span>
              </p>
            </div>
            <div className="flex justify-center min-w-[180px]">
              <img
                className="w-[250px] lg:w-[300px]"
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                alt={movie.title}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-white mt-10 lg:mt-0 lg:w-[70%] flex flex-col items-center">
              <p className="text-xl pb-10">Cast members:</p>
              <ul className="flex flex-wrap justify-center">
                {movie?.credits.cast.slice(0, 15).map((member) =>
                  member?.profile_path ? (
                    <li
                      key={member.id}
                      className="m-2 flex flex-col items-center"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${member?.profile_path}`}
                        alt={`A portrait of ${member?.name}`}
                        className="h-[150px] w-[130px] object-cover object-top border-2 border-red-600 rounded-full"
                      />
                      <p>{member?.name}</p>
                      <p className="text-sm">
                        {member?.character.length > 20
                          ? member?.character.slice(0, 15) + "..."
                          : member?.character}
                      </p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>
          <div className="trailer">
            {movie && (movie.videos ? renderTrailer() : null)}
          </div>
          <Footer />
        </div>
      </div>
    )
  );
}

export default MoviePage;
