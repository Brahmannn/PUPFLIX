import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import { getFavorites } from "../utils/favorites";

function MyList() {

  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {

    loadFavorites();

    window.addEventListener("storage", loadFavorites);

    return () => {
      window.removeEventListener("storage", loadFavorites);
    };

  }, []);

  function loadFavorites() {
    setFavorites(getFavorites());
  }

  return (

    <div className="movie-section" id="my-list">

      <h2>❤️ My List</h2>

      {favorites.length === 0 ? (

        <p>No movies in your list.</p>

      ) : (

        <div className="movie-row">

          {favorites.map((movie) => (

            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={setSelectedMovie}
            />

          ))}

        </div>

      )}

      <MovieModal
        movie={selectedMovie}
        onClose={() => {
          setSelectedMovie(null);
          loadFavorites();
        }}
      />

    </div>

  );

}

export default MyList;