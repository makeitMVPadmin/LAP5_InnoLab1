import { ReactComponent as Communiti } from "../../assets/logos/communiti.svg";
import { ReactComponent as MiniCommuniti } from "../../assets/logos/miniCommuniti.svg";
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
      <nav className="navbar">
        <Link to="/" className="navbar__link">
        {windowWidth <= 1023 ? <MiniCommuniti className="navbar__img" /> : <Communiti className="navbar__img" />}
        </Link>
      </nav>
  );
};

export default NavbarAlt;
