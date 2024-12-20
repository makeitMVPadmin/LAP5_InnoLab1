import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import BackArrow from "../../assets/images/back.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ redirect, navigateback }) => {
    const navigate = useNavigate();

    return (
        <header>
            <DashboardNavbar />
            { (redirect || navigateback) &&
            <section className="bg-MVP-soft-blue font-gilroy font-extrabold text-2xl text-MVP-black px-10 py-2">
                {redirect ? (
                    <Link
                        to={redirect}
                        className="flex items-center w-11 h-11 gap-6"
                        aria-label="Go back to the previous page"
                    >
                        <img className="h-[1.4rem]" src={BackArrow} alt="Back Arrow" />
                        <span>Back</span>
                    </Link>
                ) : navigateback ? (
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center w-11 h-11 gap-6"
                        aria-label="Go back to the previous page"
                    >
                        <img className="h-[1.4rem]" src={BackArrow} alt="Back Arrow" />
                        <span>Back</span>
                    </button>
                ) : null}
            </section>
            }
        </header>    
    );
}

export default Header;
