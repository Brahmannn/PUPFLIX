export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function addFavorite(movie) {
  const favorites = getFavorites();

  const exists = favorites.find((m) => m.id === movie.id);

  if (!exists) {
    favorites.push(movie);
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }
}

export function removeFavorite(movieId) {
  const favorites = getFavorites().filter(
    (movie) => movie.id !== movieId
  );

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
}

export function isFavorite(movieId) {
  return getFavorites().some(
    (movie) => movie.id === movieId
  );
}