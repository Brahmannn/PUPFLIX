import { useEffect, useState } from "react";
import API from "../services/tmdb";
import Navbar from "./Navbar";

function Hero() {

  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(0);

  useEffect(() => {

    async function fetchHeroMovies() {

      try {

        const response = await API.get("/trending/movie/week");

        setMovies(response.data.results);

      } catch (error) {

        console.log(error);

      }

    }

    fetchHeroMovies();

  }, []);

  useEffect(() => {

    if (movies.length === 0) return;

    const interval = setInterval(() => {

      setCurrentMovie((prev) =>
        (prev + 1) % movies.length
      );

    }, 8000);

    return () => clearInterval(interval);

  }, [movies]);

  if (movies.length === 0) return null;

  const movie = movies[currentMovie];

  return (

    <section
      className="hero"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}
    >

      <Navbar />

      <div className="hero-content">

        <h1>{movie.title}</h1>

        <div className="hero-info">

          <span>⭐ {movie.vote_average.toFixed(1)}</span>

          <span>{movie.release_date?.substring(0,4)}</span>

          <span>HD</span>

        </div>

        <p>{movie.overview}</p>

        <div className="buttons">

          <button className="play">
            ▶ Watch Now
          </button>

          <button className="info">
            ⓘ More Info
          </button>

        </div>

      </div>

    </section>

  );

}

export default Hero;