import "./Navbar.scss";
import Button from "../Button/Button";
import { ReactComponent as Communiti } from "../../assets/logos/communiti.svg";
import { ReactComponent as MiniCommuniti } from "../../assets/logos/miniCommuniti.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
    <nav className="navbar">
      <Link to="/home" className="navbar__link">
        {windowWidth <= 1023 ? <MiniCommuniti className="navbar__img" /> : <Communiti className="navbar__img" />}
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
  );
};

export default Navbar;
