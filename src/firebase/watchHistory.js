import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "./firebase";
import { auth } from "./firebase";

// Save watched movie
export async function saveWatchHistory(movie) {
  const user = auth.currentUser;

  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid, "watchHistory", movie.id.toString()),
    {
      id: movie.id,
      title: movie.title || movie.name,
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
      watchedAt: Date.now(),
    }
  );
}

// Load watch history
export async function getWatchHistory() {
  const user = auth.currentUser;

  if (!user) return [];

  const q = query(
    collection(db, "users", user.uid, "watchHistory"),
    orderBy("watchedAt", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
}