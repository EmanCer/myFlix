import Main from "../components/Main";
import Navbar from "../components/Navbar";
import requests from "../../tmdbUrls";
import Row from "../components/Row";
import Footer from "../components/Footer";

function Homepage() {
  return (
    <>
      <Navbar />
      <Main />
      <Row url={requests.recent} title="Discover Something new Today" id={1} />
      <Row url={requests.popular} title="Popular" id={2} />
      <Row url={requests.top} title="Modern Classics" id={3} />
      <Row url={requests.upcoming} title="Coming Soon" id={4} />
      <Footer />
    </>
  );
}

export default Homepage;
