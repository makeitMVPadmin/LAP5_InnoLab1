import "./Footer.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Instagram } from "../../assets/logos/instagramIconBlack.svg";
import { ReactComponent as XIcon } from "../../assets/logos/xIconBlack.svg";
import { ReactComponent as Linkedin } from "../../assets/logos/linkedinIconBlack.svg";
import { ReactComponent as Communiti2 } from "../../assets/logos/communiti2.svg";

const Footer = () => {
  return (
    <div className="footer">
      <Communiti2 className="logo" />
      <div className="separator"></div>
      <div className="icon-row">
        <Link to="#">
          <Instagram />
        </Link>
        <Link to="#">
          <XIcon/>
        </Link>
        <Link to="#">
          <Linkedin />
        </Link>
      </div>
    </div>
  );
}
export default Footer;
