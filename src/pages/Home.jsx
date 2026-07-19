import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import GenreSelector from "../components/GenreSelector";
import MovieRow from "../components/MovieRow";
import ContinueWatching from "../components/ContinueWatching";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <>
      <Hero />

      <SearchBar onSearch={setSearchQuery} />

      {!searchQuery && (
        <>
          <ContinueWatching />

          <GenreSelector onGenreSelect={setSelectedGenre} />
        </>
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
        </>
      )}
    </>
  );
}

export default Home;