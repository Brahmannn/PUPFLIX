import { useEffect, useState } from "react";
import { getWatchHistory } from "../firebase/watchHistory";

function ContinueWatching() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      const data = await getWatchHistory();
      setMovies(data);
    }

    loadHistory();
  }, []);

  if (movies.length === 0) return null;

  return (
    <div className="movie-section">
      <h2>Continue Watching</h2>

      <div className="movie-row">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
              alt={movie.title}
            />
            <h4>{movie.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContinueWatching;