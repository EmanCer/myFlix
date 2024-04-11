import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SavedMovies from "../components/SavedMovies";

function AccountPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <SavedMovies />
      <Footer />
    </div>
  );
}

export default AccountPage;
