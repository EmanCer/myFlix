import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import MovieCard from "./MovieCard";
import axios from "axios";

function Row({ url, title, id }) {
  const [movies, setMovies] = useState([]);
  const [, setSlideDirection] = useState("");

  useEffect(() => {
    axios
      .get(url)
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
  }, [url]);

  const slide = (direction) => {
    const slider = document.getElementById(id);
    const elementWidth = slider.firstChild.offsetWidth;
    const scrollAmount = elementWidth + 32;
    direction === "left"
      ? (slider.scrollLeft -= scrollAmount)
      : (slider.scrollLeft += scrollAmount);
  };
  const handleScrollBtnClick = (direction) => {
    setSlideDirection(direction);
    slide(direction);
  };

  useEffect(() => {
    const handleResize = () => {
      const slider = document.getElementById(id);
      const elementWidth = slider.firstChild.offsetWidth;
      const scrollAmount = elementWidth + 32;
      slider.scrollLeft =
        Math.round(slider.scrollLeft / scrollAmount) * scrollAmount;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id]);

  return (
    <div className="mt-6 mx-2">
      <h3 className="text-white mx-8 my-3 text-base sm:text-lg md:text-xl">
        {title}
      </h3>
      <div className="relative flex items-center group">
        <div
          id="scrollLeftBtn"
          className="absolute left-0 hidden group-hover:flex justify-center items-center bg-zinc-600 hover:bg-zinc-700 rounded-md  w-6 h-40"
          onClick={() => handleScrollBtnClick("left")}
        >
          <FaChevronLeft
            size={20}
            className="text-red-500 rounded-full left-0 cursor-pointer z-10 group-hover:block"
          />
        </div>

        <div
          id={id}
          className="w-full h-full mx-8 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((el) => (
            <MovieCard el={el} key={el.id} />
          ))}
        </div>
        <div
          id="scrollRightBtn"
          className="absolute right-0 hidden group-hover:flex justify-center items-center bg-zinc-600 hover:bg-zinc-700 rounded-md  w-6 h-40"
          onClick={() => handleScrollBtnClick("right")}
        >
          <FaChevronRight
            size={20}
            className="text-red-500 rounded-full left-0 cursor-pointer z-10 group-hover:block"
          />
        </div>
      </div>
    </div>
  );
}

export default Row;
