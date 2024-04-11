import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { arrayUnion, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

function MovieCard({ el }) {
  const [isLike, setIsLike] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    const checkSavedMovies = async () => {
      if (user) {
        const movieID = doc(db, "users", `${user?.email}`);
        const movieDoc = await getDoc(movieID);
        if (movieDoc.exists()) {
          const savedMovies = movieDoc.data().savedMovies;
          const isMovieSaved = savedMovies.some((movie) => movie.id === el.id);
          setIsLike(isMovieSaved);
        }
      }
    };

    checkSavedMovies();
  }, [user, el.id]);

  const saveMovie = async () => {
    if (user?.email) {
      const movieID = doc(db, "users", `${user?.email}`);
      const movieDoc = await getDoc(movieID);

      if (movieDoc.exists()) {
        const savedMovies = movieDoc.data().savedMovies;
        const isMovieSaved = savedMovies.some((movie) => movie.id === el.id);

        if (isMovieSaved) {
          // If movie is already saved, remove it from the array
          const updatedMovies = savedMovies.filter(
            (movie) => movie.id !== el.id
          );
          await updateDoc(movieID, { savedMovies: updatedMovies });
          setIsLike(false);
        } else {
          // If movie is not saved, add it to the array
          await updateDoc(movieID, {
            savedMovies: arrayUnion({
              id: el.id,
              title: el.title,
              img: el.poster_path,
            }),
          });
          setIsLike(true);
        }
      } else {
        // If user document doesn't exist, create it with the movie
        await setDoc(movieID, {
          savedMovies: [
            {
              id: el.id,
              title: el.title,
              img: el.poster_path,
            },
          ],
        });
        setIsLike(true);
      }
    } else {
      alert("Log in to save a movie");
    }
  };

  return (
    <div className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] h-full inline-block cursor-pointer m-4 relative">
      <Link to={`/movie/${el.id}`}>
        <img
          className="w-full h-auto block border-solid border-2 border-red-600 rounded-md"
          src={`https://image.tmdb.org/t/p/w500${el.poster_path || el.img}`}
          alt={el.title}
        />
        <div className="absolute top-0 left-0 w-full h-1/2 hover:bg-zinc-800/60 opacity-0 hover:opacity-100 text-white overflow-hidden">
          <div className="flex flex-col justify-start items-center text-center text-wrap p-6 w-full h-full">
            <h4 className="text-xs sm:text-sm md:text-base font-bold my-6">
              {el.title && el.title.length > 30
                ? el.title.slice(0, 30) + "..."
                : el.title}
            </h4>
          </div>
        </div>
      </Link>
      <div
        className="absolute bottom-0 left-0 bg-red-600/60 p-2 rounded-md text-white"
        onClick={saveMovie}
      >
        {isLike ? <FaHeart /> : <FaRegHeart />}
      </div>
    </div>
  );
}

export default MovieCard;
