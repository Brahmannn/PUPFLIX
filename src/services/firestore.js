import { db } from "../firebase/firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

// Save movie
export const saveMovie = async (uid, movie) => {
  await setDoc(
    doc(db, "users", uid, "favorites", movie.id.toString()),
    movie
  );
};

// Remove movie
export const removeMovie = async (uid, movieId) => {
  await deleteDoc(
    doc(db, "users", uid, "favorites", movieId.toString())
  );
};

// Check if movie is saved
export const isMovieSaved = async (uid, movieId) => {
  const snapshot = await getDoc(
    doc(db, "users", uid, "favorites", movieId.toString())
  );

  return snapshot.exists();
};