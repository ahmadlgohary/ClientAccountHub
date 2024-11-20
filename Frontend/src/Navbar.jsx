import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <header>
        <span>
          <Link to="/" ><a href="#">BizPoints</a></Link>
        </span>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          &#9776;
        </button>
        <nav className={menuOpen ? "menu_open" : "menu"}>
          <ul>
            <li>
              <Link to="/"><a href="#">Dashboard</a></Link>
            </li>
            <li>
              <Link to="/profile"><a href="#">Profile</a></Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
