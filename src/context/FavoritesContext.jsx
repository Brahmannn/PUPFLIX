import { createContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

  const [favorites, setFavorites] = useState(() => {

    return JSON.parse(localStorage.getItem("favorites")) || [];

  });

  useEffect(() => {

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

  }, [favorites]);

  const addFavorite = (movie) => {

    if (!favorites.find((m) => m.id === movie.id)) {

      setFavorites([...favorites, movie]);

    }

  };

  const removeFavorite = (movieId) => {

    setFavorites(
      favorites.filter((movie) => movie.id !== movieId)
    );

  };

  return (

    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite
      }}
    >

      {children}

    </FavoritesContext.Provider>

  );

}

export default FavoritesContext;