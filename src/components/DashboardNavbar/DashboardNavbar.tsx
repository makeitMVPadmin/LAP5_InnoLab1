import { ReactComponent as HomeIcon } from "../../assets/images/homeIcon.svg";
import { ReactComponent as CalendarIcon } from "../../assets/images/calendarIcon.svg";
import { ReactComponent as CommunitiesIcon } from "../../assets/images/communitiesIcon.svg";
import { ReactComponent as CoffeeChatIcon } from "../../assets/images/coffeeChatIcon.svg";
import { ReactComponent as LogoIcon } from "../../assets/logos/communiti2.svg";
import ProfilePic from "../../assets/images/profilePic.svg";
import { ReactComponent as DropDownArrow } from "../../assets/images/drop-down-arrow.svg";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../Firebase/FirebaseConfig";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [dropdownButton, setDropdownButton] = useState(false);


  const navItems = [
    { path: "/dashboard", icon: HomeIcon, label: "Home" },
    { path: "/communities", icon: CommunitiesIcon, label: "Communities" },
    { path: "/hackathons", icon: CalendarIcon, label: "Events" },
    { path: "/coffeechat", icon: CoffeeChatIcon, label: "Coffee Chat" },
  ];

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleDropdown = () => {
    setDropdownButton(!dropdownButton);
  };


  return (
    <div className="bg-white font-gilroy font-extrabold h-[6rem] px-[2rem] flex w-full justify-between items-center border-b border-black ">
      <div className="flex h-full items-end">
        <Link to="/" className="flex flex-col items-center justify-center h-full mx-4 mr-[3rem]">
          <LogoIcon
            className="w-[18rem]"
          />
        </Link>
      <div className="flex h-full pt-[0.5rem]">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className="flex flex-col items-center justify-center h-full mx-4 no-underline gap-[0.25rem]"
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-[3rem] ${isActive ? 'filter brightness-[1.5] fill-MVP-dark-blue' : 'fill-MVP-black'}`}
                />
                <p className={`text-MVP-black text-center font-gilroy text-[1rem] leading-[115.645%] pb-1 border-b-4 ${isActive ? 'text-MVP-dark-blue border-b-4 border-MVP-dark-blue' : 'border-transparent'}`}>
                  {label}
                </p>
              </>
            )}
          </NavLink>  
        ))}
      </div>
      </div>
      <div className="flex h-full relative">
        <Link to="/profile" className="flex items-center text-none flex-col justify-center h-full mx-4">
          <img src={ProfilePic} className="w-[3rem]" />
        </Link>
        <button className="flex items-center bg-none border-none cursor-pointer" onClick={handleDropdown}>
          <DropDownArrow className="w-[2rem]" />
        </button>
        {dropdownButton && (
          <button
            className="absolute top-[5rem] right-[0.3rem] px-[2rem] border-[3px] border-t-[3px] border-r-[5px] border-b-[5px] border-l-[3px] border-MVP-black rounded-[0.625rem] text-[1.2rem] font-gilroy cursor-pointer bg-MVP-light-blue"
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
