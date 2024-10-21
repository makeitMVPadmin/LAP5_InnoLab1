import DashboardNavbar from "../DashboardNavbar/DashboardNavbar"
import BackArrow from "../../assets/images/back.svg"

const Header = ({ handleClick }) => {
    return (
        <header >
            <DashboardNavbar />
            <section className="h-[3rem] bg-MVP-soft-blue px-10">
                <button className="flex items-center w-11 h-11 gap-2" aria-label="Go back to the previous page" onClick={handleClick}>
                    <img className="w-7 h-6" src={BackArrow} alt="Back Arrow" />
                    <span className="text-black text-lg inline-block font-gilroy">Back</span>
                </button>
            </section>
        </header>
    )
}

export default Header