import MovieRow from "../components/MovieRow";

function Movies() {
  return (
    <>
      <MovieRow
        title="🎬 Popular Movies"
        endpoint="/movie/popular"
      />

      <MovieRow
        title="🔥 Now Playing"
        endpoint="/movie/now_playing"
      />

      <MovieRow
        title="⭐ Top Rated"
        endpoint="/movie/top_rated"
      />

      <MovieRow
        title="🎥 Upcoming"
        endpoint="/movie/upcoming"
      />

      <MovieRow
        title="🍿 Action Movies"
        endpoint="/discover/movie?with_genres=28"
      />

      <MovieRow
        title="😂 Comedy Movies"
        endpoint="/discover/movie?with_genres=35"
      />

      <MovieRow
        title="👻 Horror Movies"
        endpoint="/discover/movie?with_genres=27"
      />
    </>
  );
}

export default Movies;