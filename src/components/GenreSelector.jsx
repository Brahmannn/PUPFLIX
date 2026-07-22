import { useEffect, useState } from "react";
import API from "../services/tmdb";

function GenreSelector({ onGenreSelect }) {

  const [genres, setGenres] = useState([]);

  useEffect(() => {

    async function fetchGenres() {

      try {

        const response = await API.get("/genre/movie/list");

        setGenres(response.data.genres);

      } catch (error) {

        console.log(error);

      }

    }

    fetchGenres();

  }, []);

  return (

    <div className="genre-section">

      <h2>🎭 Browse by Genre</h2>

      <div className="genre-buttons">

        {genres.map((genre) => (

          <button
            key={genre.id}
            onClick={() => onGenreSelect(genre.id)}
          >
            {genre.name}
          </button>

        ))}

      </div>

    </div>

  );

}

export default GenreSelector;