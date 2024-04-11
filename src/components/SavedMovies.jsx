import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import MovieCard from "./MovieCard";

function SavedMovies() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  console.log(movies);

  return (
    <div className="grow pt-40 mx-2 text-center">
      <h3 className="text-white mx-8 my-3 text-base sm:text-lg md:text-xl">
        My Favorite Movies
      </h3>
      <div className="w-[80%] m-auto flex justify-start flex-wrap">
        {movies && movies.map((el) => <MovieCard key={el.id} el={el} />)}
      </div>
    </div>
  );
}

export default SavedMovies;
