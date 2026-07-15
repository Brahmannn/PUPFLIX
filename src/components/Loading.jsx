function Loading() {
  return (
    <div className="movie-row">
      {[...Array(8)].map((_, index) => (
        <div className="loading-card" key={index}></div>
      ))}
    </div>
  );
}

export default Loading;