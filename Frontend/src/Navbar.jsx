import "./Navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <header>
        <span>
          <a href="#">BizPoints</a>
        </span>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          &#9776;
        </button>
        <nav className={menuOpen ? "menu_open" : "menu"}>
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
