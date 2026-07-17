import { useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import { useFavorites } from "../context/FavoritesContext";

function MyList() {
  const { favorites, loading } = useFavorites();

  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="movie-section" id="my-list">

      <h2>❤️ My List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : favorites.length === 0 ? (
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
        onClose={() => setSelectedMovie(null)}
      />

    </div>
  );
}

export default MyList;