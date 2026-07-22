import { useEffect, useState } from "react";
import API from "../services/tmdb";
import { useFavorites } from "../context/FavoritesContext";
import { toast } from "react-toastify";
import { saveWatchHistory } from "../firebase/watchHistory";

function MovieModal({ movie, onClose }) {
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useFavorites();

  const favorite = movie ? isFavorite(movie.id) : false;

  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");

  useEffect(() => {
    if (!movie) {
  setTrailerKey("");
  setShowTrailer(false);
  setMovieDetails(null);
  setCast([]);
  setDirector("");
  return;
}

    async function fetchMovieData() {
      try {
        const [videoResponse, detailsResponse, creditsResponse] =
  await Promise.all([
    API.get(`/movie/${movie.id}/videos`),
    API.get(`/movie/${movie.id}`),
    API.get(`/movie/${movie.id}/credits`),
  ]);

        setMovieDetails(detailsResponse.data);
        setCast(creditsResponse.data.cast.slice(0, 5));

const movieDirector = creditsResponse.data.crew.find(
  (person) => person.job === "Director"
);

setDirector(movieDirector ? movieDirector.name : "Unknown");

        const trailer = videoResponse.data.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey("");
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setTrailerKey("");
      }
    }

    fetchMovieData();
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button
          className="close-btn"
          onClick={() => {
            setShowTrailer(false);
            onClose();
          }}
        >
          ✖
        </button>

        {showTrailer ? (
          <iframe
            width="100%"
            height="420"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }
            alt={movie.title || movie.name}
          />
        )}

        <div className="modal-content">
          <h2>{movie.title || movie.name}</h2>

          <div className="movie-details">
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>

            <span>
              🗳 {movie.vote_count?.toLocaleString()} Votes
            </span>

            {movieDetails?.runtime && (
              <span>
                ⏱ {Math.floor(movieDetails.runtime / 60)}h{" "}
                {movieDetails.runtime % 60}m
              </span>
            )}

            <span>
              📅 {movie.release_date || movie.first_air_date}
            </span>

            <span>
              🌍 {movie.original_language?.toUpperCase()}
            </span>
          </div>

          {movieDetails?.genres?.length > 0 && (
            <div className="movie-genres">
              {movieDetails.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="genre-badge"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p>{movie.overview}</p>
          <div className="movie-cast">
  <strong>👥 Cast:</strong>

  {cast.map((actor) => (
    <span key={actor.id}>
      {actor.name}
      {", "}
    </span>
  ))}
</div>
<div className="movie-director">
  <strong>🎬 Director:</strong> {director}
</div>

          <div className="modal-buttons">
            <button
              className="play-btn"
              onClick={() => {
                if (trailerKey) {
                  setShowTrailer(true);
                } else {
                  toast.error("Trailer not available!");
                }
              }}
            >
              ▶ Play Trailer
            </button>

            <button
              className="list-btn"
              onClick={async () => {
                if (favorite) {
    await removeFromFavorites(movie.id);
    toast.info("Removed from My List");
} else {
    await addToFavorites(movie);
    toast.success("Added to My List");
}
              }}
            >
              {favorite ? "✔ Remove" : "+ My List"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;