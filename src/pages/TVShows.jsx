import MovieRow from "../components/MovieRow";

function TVShows() {
  return (
    <>
      <MovieRow
        title="📺 Popular TV Shows"
        endpoint="/tv/popular"
      />

      <MovieRow
        title="⭐ Top Rated"
        endpoint="/tv/top_rated"
      />

      <MovieRow
        title="📡 On The Air"
        endpoint="/tv/on_the_air"
      />

      <MovieRow
        title="🆕 Airing Today"
        endpoint="/tv/airing_today"
      />

      <MovieRow
        title="🎭 Drama"
        endpoint="/discover/tv?with_genres=18"
      />

      <MovieRow
        title="😂 Comedy"
        endpoint="/discover/tv?with_genres=35"
      />

      <MovieRow
        title="🕵️ Crime"
        endpoint="/discover/tv?with_genres=80"
      />
    </>
  );
}

export default TVShows;