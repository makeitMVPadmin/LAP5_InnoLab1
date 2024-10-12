import "./Footer.scss";
import { Link } from "react-router-dom";
import instagram from "../../assets/logos/instagramIconBlack.svg";
import xIcon from "../../assets/logos/xIconBlack.svg";
import linkedin from "../../assets/logos/linkedinIconBlack.svg";
import communiti2 from "../../assets/logos/communiti2.svg";

const Footer = () => {
  return (
    <div className="footer">
      <img className="logo" src={communiti2} alt="communiti in black font" />
      <div className="separator"></div>
      <div className="icon-row">
        <Link to="#">
          <img src={instagram} alt="instagram" />
        </Link>
        <Link to="#">
          <img src={xIcon} alt="X" />
        </Link>
        <Link to="#">
          <img src={linkedin} alt="linkedin" />
        </Link>
      </div>
    </div>
  );
}
export default Footer;
