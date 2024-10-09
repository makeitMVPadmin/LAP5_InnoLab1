import { ReactComponent as HomeIcon} from "../../assets/images/homeIcon.svg";
import ChatIcon from "../../assets/images/chatIcon.svg";
import { ReactComponent as CalendarIcon } from "../../assets/images/calendarIcon.svg";
import { ReactComponent as CommunitiesIcon } from "../../assets/images/communitiesIcon.svg";
import { ReactComponent as CoffeeChatIcon } from "../../assets/images/coffeeChatIcon.svg";
import { ReactComponent as LogoIcon } from "../../assets/logos/communiti2.svg";
import ProfilePic from "../../assets/images/profilePic.svg";
import { ReactComponent as DropDownArrow } from "../../assets/images/drop-down-arrow.svg";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../Firebase/FirebaseConfig";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [dropdownButton, setDropdownButton] = useState(false);
  // const [profilePhoto, setProfilePhoto] = useState(() => {
  //   // Try to get profile photo from session storage
  //   const storedProfilePhoto = sessionStorage.getItem("profilePhoto");
  //   return storedProfilePhoto ? JSON.parse(storedProfilePhoto) : null;
  // });

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
    <div className="bg-white font-gilroy h-[10%] flex w-full px-6 justify-between items-center border-b border-black md:px-8">
      <div className="flex h-full items-end">
        <Link to="/" className="flex flex-col items-center justify-center h-full mx-4">
          <LogoIcon
            className="w-[24vw] md:w-[16vw]"
          />
        </Link>
        <NavLink
          to="/dashboard"
          className="flex flex-col items-center justify-center h-full mx-4 no-underline"
        >
          {({ isActive }) => (
            <>
              <HomeIcon
                className={`w-[2.3vw] md:w-[1.5vw] ${isActive ? 'filter brightness-[1.5] fill-MVP-dark-blue' : 'fill-MVP-black' }`}
              />
              <p className={`text-MVP-black text-center font-gilroy text-[1.5vw] leading-[115.645%] pb-1 md:text-[20px] ${isActive && 'text-MVP-dark-blue border-b-4 border-MVP-dark-blue' }`}>
                Home
              </p>
            </>
            
          )}
        </NavLink>
        <NavLink
          to="/communities"
          className="flex flex-col items-center justify-center h-full mx-4 no-underline"
        >
          {({ isActive }) => (
            <>
              <CommunitiesIcon
                className={`w-[2.3vw] md:w-[1.5vw] ${isActive ? 'filter brightness-[1.5] fill-MVP-dark-blue' : 'fill-MVP-black' }`}
              />
              <p className={`text-mvp-black text-center font-gilroy text-[1.5vw] leading-[115.645%] pb-1 md:text-[20px] ${isActive && 'text-mvp-dark-blue border-b-4 border-mvp-dark-blue' }`}>
                Communities
              </p>
            </>
            
          )}
        </NavLink>
        <NavLink
          to="/hackathons"
          className="flex flex-col items-center justify-center h-full mx-4 no-underline"
        >
          {({ isActive }) => (
            <>
              <CalendarIcon
                className={`w-[2.3vw] md:w-[1.5vw] ${isActive ? 'filter brightness-[1.5] fill-MVP-dark-blue' : 'fill-MVP-black' }`}
              />
              <p className={`text-MVP-black text-center font-gilroy text-[1.5vw] leading-[115.645%] pb-1 md:text-[20px] ${isActive && 'text-MVP-dark-blue border-b-4 border-MVP-dark-blue' }`}>
                Events
              </p>
            </>
            
          )}
        </NavLink>
        <NavLink
          to="/coffeechat"
          className="flex flex-col items-center justify-center h-full mx-4 no-underline"
        >
          {({ isActive }) => (
            <>
              <CoffeeChatIcon
                className={`w-[2.3vw] md:w-[1.5vw] ${isActive ? 'filter brightness-[1.5] fill-MVP-dark-blue' : 'fill-MVP-black' }`}
              />
              <p className={`text-mvp-black text-center font-gilroy text-[1.5vw] leading-[115.645%] pb-1 md:text-[20px] ${isActive && 'text-mvp-dark-blue border-b-4 border-mvp-dark-blue' }`}>
                Coffee Chat
              </p>
            </>
            
          )}
        </NavLink>
      </div>
      <div className="flex h-[100%]">
        <Link to="/profile" className="flex items-center text-none flex-col justify-center h-full mx-4 md:mx-4">
          <img src={ProfilePic} className="w-[2.3vw] md:w-[3vw]"/>
        </Link>
        <button className="flex items-center bg-none border-none cursor-pointer" onClick={handleDropdown}>
          <DropDownArrow className="w-[2vw] md:w-[3vw]"/>
        </button>
        {dropdownButton && (
          <button 
            className="absolute top-[6%] right-[1.5%]"
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
