import { useState } from "react";
import "./App.css";

import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import SearchBar from "./components/SearchBar";
import GenreSelector from "./components/GenreSelector";
import MyList from "./components/MyList";

function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <>

      <Hero />

      <SearchBar onSearch={setSearchQuery} />

      {!searchQuery && (
        <GenreSelector onGenreSelect={setSelectedGenre} />
      )}

      {searchQuery ? (

        <MovieRow
          title={`🔍 Search Results for "${searchQuery}"`}
          endpoint={`/search/movie?query=${encodeURIComponent(searchQuery)}`}
        />

      ) : selectedGenre ? (

        <MovieRow
          title="🎭 Genre Movies"
          endpoint={`/discover/movie?with_genres=${selectedGenre}`}
        />

      ) : (

        <>

          <MovieRow
            title="🔥 Trending Now"
            endpoint="/trending/movie/week"
          />

          <MovieRow
            title="🎬 Popular"
            endpoint="/movie/popular"
          />

          <MovieRow
            title="⭐ Top Rated"
            endpoint="/movie/top_rated"
          />

          <MovieRow
            title="💥 Action Movies"
            endpoint="/discover/movie?with_genres=28"
          />

          <MyList />

        </>

      )}

    </>
  );
}

export default App;