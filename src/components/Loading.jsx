import SkeletonCard from "./SkeletonCard";

function Loading() {
  return (
    <div className="movie-row">
      {[...Array(8)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export default Loading;