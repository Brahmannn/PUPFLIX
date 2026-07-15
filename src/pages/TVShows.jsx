import MovieRow from "../components/MovieRow";

function TVShows() {
  return (
    <MovieRow
      title="📺 TV Shows"
      endpoint="/tv/popular"
    />
  );
}

export default TVShows;