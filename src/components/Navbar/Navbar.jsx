import "./Navbar.scss";
import Button from "../Button/Button";
import communiti from "../../assets/logos/communiti.svg";
import miniCommuniti from "../../assets/logos/miniCommuniti.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <Link to="/home" className="navbar__link">
          <img
            className="navbar__img"
            src={windowWidth <= 1023 ? miniCommuniti : communiti}
            alt="communiti"
          />
        </Link>
        <ul className="navbar__links">
          <Link
            to="/home"
            className="navbar__link-container navbar__link-container--desktop"
          >
            <li className="navbar__link">Home</li>
          </Link>
          <Link className="navbar__link-container" to="/login">
            <li className="navbar__link-button">
              <Button buttonText="Log In" className="button" />
            </li>
          </Link>
          <Link className="navbar__link-container" to="/signup">
            <li className="navbar__link-button">
              <Button buttonText="Sign Up" className="button button--yellow" />
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
}
