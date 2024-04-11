import { AuthContextProvider } from "./assets/context/AuthContext";
import Homepage from "./assets/pages/Homepage";
import MoviePage from "./assets/pages/MoviePage";
import ResultsPage from "./assets/pages/ResultsPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
