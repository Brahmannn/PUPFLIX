import MovieRow from "../components/MovieRow";

function Movies() {
  return (
    <MovieRow
      title="🎬 Popular Movies"
      endpoint="/movie/popular"
    />
  );
}

export default Movies;