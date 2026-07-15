import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">
  PUP<span>FLIX</span>
</h1>

      <div className="menu">
  <Link to="/">Home</Link>
  <Link to="/tvshows">TV Shows</Link>
  <Link to="/movies">Movies</Link>
  <Link to="/mylist">My List</Link>
</div>

      <LoginButton />
    </nav>
  );
}

export default Navbar;