import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import { db } from "../firebase/firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  saveMovie,
  removeMovie,
} from "../services/firestore";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all favorites when user logs in
  useEffect(() => {
    async function loadFavorites() {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const snapshot = await getDocs(
          collection(db, "users", user.uid, "favorites")
        );

        const movies = snapshot.docs.map((doc) => doc.data());

        setFavorites(movies);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadFavorites();
  }, [user]);

  // Save movie
  const addToFavorites = async (movie) => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    await saveMovie(user.uid, movie);

    setFavorites((prev) => [...prev, movie]);
  };

  // Remove movie
  const removeFromFavorites = async (movieId) => {
    if (!user) return;

    await removeMovie(user.uid, movieId);

    setFavorites((prev) =>
      prev.filter((movie) => movie.id !== movieId)
    );
  };

  // Check if movie exists
  const isFavorite = (movieId) => {
    return favorites.some(
      (movie) => movie.id === movieId
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}