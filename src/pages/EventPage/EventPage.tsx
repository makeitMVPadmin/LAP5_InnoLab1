import { Link } from "react-router-dom"
import { STYLES } from '../../constants/styles';
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar"
import Clock from "../../assets/images/clockIcon.svg"

const EventPage = () => {
    return (
        <main className="w-full  relative bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
            <div className="w-full h-full flex gap-4 mt-4 px-8">
            </div>
            <section className="h-[100px] w-full fixed bottom-0 px-8 border-t-[3px] border-MVP-black bg-MVP-white flex justify-between items-center">
                <div className="flex gap-2 ">
                    <img className="h-6" src={Clock} alt="clock icon" />
                    <p className="font-gilroy">Time left to submit: 50m:15s</p>
                </div>
                <button className={`${STYLES.primaryButton} rounded-[10px] w-auto`} aria-label="Submit Project">
                    {/* TO DO Make eventId dynamic  */}
                    <Link to={`/event/0wPdqmuwFXyZawaf2Q9d/submit`} >Submit Project</Link>
                </button>
            </section>
        </main>)
}


export default EventPage