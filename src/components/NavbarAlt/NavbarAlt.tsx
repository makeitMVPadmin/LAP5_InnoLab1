import communiti from "../../assets/logos/communiti.svg";
import miniCommuniti from "../../assets/logos/miniCommuniti.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarAlt = () => {
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
        <Link to="/" className="navbar__link">
          <img
            className="navbar__img"
            src={windowWidth <= 1023 ? miniCommuniti : communiti}
            alt="communiti"
          />
        </Link>
      </nav>
    </>
  );
};

export default NavbarAlt;
