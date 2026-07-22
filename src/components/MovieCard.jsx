

function MovieCard({ movie, onClick }) {
  return (
    <div
      className="movie-card"
      onClick={() => onClick(movie)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
      />

      <div className="movie-info">
        <h3>{movie.title || movie.name}</h3>

        <div className="movie-meta">
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>

          <span>
            {movie.release_date?.substring(0, 4) ||
              movie.first_air_date?.substring(0, 4)}
          </span>
        </div>

        <div className="movie-buttons">
          <button>▶</button>
          <button>❤</button>
          <button>ⓘ</button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;