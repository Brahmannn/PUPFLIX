import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieDetails from "./pages/MovieDetails";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import MyListPage from "./pages/MyListPage";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/mylist" element={<MyListPage />} />
        <Route
  path="/movie/:id"
  element={<MovieDetails />}
/>
      </Routes>
    </>
  );
}

export default App;