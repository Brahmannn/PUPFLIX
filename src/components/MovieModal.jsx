import { useEffect, useState } from "react";
import API from "../services/tmdb";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../utils/favorites";

function MovieModal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (!movie) {
      setTrailerKey("");
      setFavorite(false);
      setShowTrailer(false);
      return;
    }

    // Check if movie is already in favorites
    setFavorite(isFavorite(movie.id));

    async function fetchTrailer() {
      try {
        const response = await API.get(`/movie/${movie.id}/videos`);

        const trailer = response.data.results.find(
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
        console.log("Error fetching trailer:", error);
        setTrailerKey("");
      }
    }

    fetchTrailer();
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
          ></iframe>
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
              📅 {movie.release_date || movie.first_air_date}
            </span>

            <span>
              🌍 {movie.original_language?.toUpperCase()}
            </span>
          </div>

          <p>{movie.overview}</p>

          <div className="modal-buttons">

            <button
              className="play-btn"
              onClick={() => {
                if (trailerKey) {
                  setShowTrailer(true);
                } else {
                  alert("Trailer not available.");
                }
              }}
            >
              ▶ Play Trailer
            </button>

            <button
              className="list-btn"
              onClick={() => {
                if (favorite) {
                  removeFavorite(movie.id);
                  setFavorite(false);
                } else {
                  addFavorite(movie);
                  setFavorite(true);
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