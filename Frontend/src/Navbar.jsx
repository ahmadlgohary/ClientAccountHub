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
      <header className="navbar">
        <span>
          <Link className="link" to="/">
            BizPoints
          </Link>
        </span>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          &#9776;
        </button>
        <nav className={menuOpen ? "menu_open" : "menu"}>
          <ul>
            <li>
              <Link className="link" to="/">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="link" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
