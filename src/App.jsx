import { AuthContextProvider } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import MoviePage from "./pages/MoviePage";
import ResultsPage from "./pages/ResultsPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
