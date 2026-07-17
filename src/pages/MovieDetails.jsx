import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/tmdb";
import MovieRow from "../components/MovieRow";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        // Fetch movie details
        const response = await API.get(`/movie/${id}`);
        setMovie(response.data);
        console.log(response.data);

        // Fetch trailer
        const videoResponse = await API.get(`/movie/${id}/videos`);

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
        console.error(error);
      }
    }

    fetchMovie();

    // Close trailer when changing movie
    setShowTrailer(false);
  }, [id]);

  if (!movie) {
    return (
      <div
        style={{
          color: "white",
          background: "#000",
          minHeight: "100vh",
          padding: "120px 60px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      {/* Hero Section */}
      <div
        className="details-hero"
        style={{
  backgroundImage: movie.backdrop_path
    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
    : `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
}}
      >
        <div className="details-overlay">
          <h1>{movie.title}</h1>

          <div className="details-meta">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>📅 {movie.release_date}</span>
            <span>🌍 {movie.original_language.toUpperCase()}</span>
          </div>

          <p>
  {movie.overview.length > 250
    ? movie.overview.substring(0, 250) + "..."
    : movie.overview}
</p>

          <div className="details-buttons">
            {trailerKey ? (
              <button
                className="play-btn"
                onClick={() => setShowTrailer(!showTrailer)}
              >
                {showTrailer ? "✖ Close Trailer" : "▶ Watch Trailer"}
              </button>
            ) : (
              <button className="play-btn" disabled>
                Trailer Not Available
              </button>
            )}

            <button className="list-btn">
              ❤ My List
            </button>
          </div>
        </div>
      </div>

      {/* Trailer */}
      {showTrailer && trailerKey && (
        <div className="trailer-container">
          <iframe
            width="100%"
            height="600"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Movie Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Similar Movies */}
      <MovieRow
        title="🎬 Similar Movies"
        endpoint={`/movie/${id}/similar`}
      />

      {/* Recommended Movies */}
      <MovieRow
        title="⭐ Recommended Movies"
        endpoint={`/movie/${id}/recommendations`}
      />
    </div>
  );
}

export default MovieDetails;