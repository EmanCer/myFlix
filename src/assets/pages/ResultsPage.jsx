import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

function ResultsPage() {
  const location = useLocation();
  const searchData = location.state?.searchData || null;

  return (
    <div>
      <Navbar />
      {searchData.total_results > 0 && (
        <div className="w-full flex flex-wrap justify-center m-auto pt-[150px]">
          {searchData && (
            <h4 className="w-full text-center text-xl text-white ml-6">
              Here the results:
            </h4>
          )}
          {searchData &&
            searchData.results &&
            searchData.results.map((el) =>
              el.poster_path ? <MovieCard key={el.id} el={el} /> : null
            )}
        </div>
      )}
      {searchData.total_results === 0 && (
        <div>
          <h4 className="w-full mt-[100px] min-h-[70dvh] text-xl text-white ml-6 pt-6 text-center">
            No Matches for your search. Try again
          </h4>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ResultsPage;
