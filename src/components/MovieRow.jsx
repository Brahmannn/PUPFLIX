import Loading from "./Loading";
import { useEffect, useState } from "react";
import MovieModal from "./MovieModal";
import API from "../services/tmdb";
import MovieCard from "./MovieCard";

function MovieRow({ title, endpoint }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    API.get(endpoint)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="movie-section">
      <h2>{title}</h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="movie-row">
          {movies.map((movie) => (
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

export default MovieRow;