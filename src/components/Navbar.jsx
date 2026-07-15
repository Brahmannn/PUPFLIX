import { useEffect, useState } from "react";

function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 80) {
        setShow(true);
      } else {
        setShow(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={show ? "navbar navbar-black" : "navbar"}>

      <h1 className="logo">PUPFLIX</h1>

      <div className="menu">

        <a href="#">Home</a>

        <a href="#">TV Shows</a>

        <a href="#">Movies</a>

        <a href="#my-list">My List</a>

      </div>

    </nav>
  );
}

export default Navbar;