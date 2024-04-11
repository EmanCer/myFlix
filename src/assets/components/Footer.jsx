function Footer() {
  return (
    <footer className="rounded-lg shadow m-4 mb-0">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3">
            <img
              src="src\assets\img\logo.png"
              alt="myflix logo"
              className="h-8"
            />
          </a>
          <div className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
            <a href="/" className="hover:underline me-4 md:me-6">
              Home
            </a>
          </div>
        </div>
        <hr className="my-6 border-red-600 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-white sm:text-center">
          2024 Created by{" "}
          <a
            href="https://www.linkedin.com/in/emanuelecerreoni"
            target="_blank"
            className="hover:underline font-bold text-red-600"
          >
            Emanuele Cerreoni
          </a>
          . Personal project. Source Data: TMDB -{" "}
          <a href="https://www.themoviedb.org" target="_blank">
            The Movie
          </a>
          DB
        </span>
      </div>
    </footer>
  );
}

export default Footer;
