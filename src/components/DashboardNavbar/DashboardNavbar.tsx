import "./DashboardNavbar.scss";
import homeIcon from "../../assets/images/homeIcon.svg";
import chatIcon from "../../assets/images/chatIcon.svg";
import calendarIcon from "../../assets/images/calendarIcon.svg";
import communitiesIcon from "../../assets/images/communitiesIcon.svg";
import coffeeChatIcon from "../../assets/images/coffeeChatIcon.svg";
import LogoIcon from "../../assets/logos/communiti2.svg";
import profilePic from "../../assets/images/profilePic.svg";
import DropDownArrow from "../../assets/images/drop-down-arrow.svg";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../Firebase/FirebaseConfig";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [dropdownButton, setDropdownButton] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(() => {
    // Try to get profile photo from session storage
    const storedProfilePhoto = sessionStorage.getItem("profilePhoto");
    return storedProfilePhoto ? JSON.parse(storedProfilePhoto) : null;
  });

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleDropdown = () => {
    setDropdownButton(!dropdownButton); // Toggle the dropdownButton state
  };


  return (
    <div className="dashboard-navbar">
      <div className="dashboard-navbar__left">
        <Link to="/" className="dashboard-navbar__link">
          <img
            src={LogoIcon}
            alt="Logo Icon"
            className="dashboard-navbar__logo"
          />
        </Link>
        <NavLink
          to="/dashboard"
          className={(navData) =>
            navData.isActive
              ? "dashboard-navbar__link active"
              : "dashboard-navbar__link"
          }
        >
          <img
            src={homeIcon}
            alt="Home icon"
            className="dashboard-navbar__img dashboard-navbar__img--home"
          />
          <p className="dashboard-navbar__text">Home</p>
        </NavLink>
        <NavLink
          to="/communities"
          className={(navData) =>
            navData.isActive
              ? "dashboard-navbar__link active"
              : "dashboard-navbar__link"
          }
        >
          <img
            src={communitiesIcon}
            alt="communities icon"
            className="dashboard-navbar__img dashboard-navbar__img--communities"
          />
          <p className="dashboard-navbar__text">Communities</p>
        </NavLink>
        <NavLink
          to="/hackathons"
          className={(navData) =>
            navData.isActive
              ? "dashboard-navbar__link active"
              : "dashboard-navbar__link"
          }
        >
          <img
            src={calendarIcon}
            alt="calendar icon"
            className="dashboard-navbar__img dashboard-navbar__img--calendar"
          />
          <p className="dashboard-navbar__text">Events</p>
        </NavLink>
        <NavLink
          to="/coffeechat"
          className={(navData) =>
            navData.isActive
              ? "dashboard-navbar__link active"
              : "dashboard-navbar__link"
          }
        >
          <img
            src={coffeeChatIcon}
            alt="coffee chat icon"
            className="dashboard-navbar__img dashboard-navbar__img--chat"
          />
          <p className="dashboard-navbar__text">Coffee Chat</p>
        </NavLink>
      </div>
      <div className="dashboard-navbar__right">
        <Link to="/profile" className="dashboard-navbar__link">
          <img
            src={profilePhoto || profilePic}
            alt="profile icon"
            className="dashboard-navbar__img dashboard-navbar__img--profile"
          />
        </Link>
        <button className="dashboard-navbar__button" onClick={handleDropdown}>
          <img src={DropDownArrow} alt="DropDownArrow icon" />
        </button>
        {dropdownButton && ( // Render logout button if dropdownButton is true
          <button 
            className="log-out" 
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default DashboardNavbar;
