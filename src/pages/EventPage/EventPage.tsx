import DashboardNavbar from "@/components/DashboardNavbar/DashboardNavbar"
import { Link } from "react-router-dom"
import Clock from "../../assets/images/clockIcon.svg"
import { STYLES } from '../../constants/styles';

const EventPage = () => {
    return (<div className="w-full h-full bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
        <DashboardNavbar />
        <div className="h-[22%] bg-MVP-light-gray flex flex-col justify-between px-8 py-8 max-h-[15rem] min-h-[12.5rem]">
            <Link to="/" className="text-MVP-black cursor-pointer">← Back</Link>

        </div>

        <div className="w-full h-full flex gap-4 mt-4 px-8">




        </div>
        <div className="h-[127px] absolute bg-MVP-white">
            <div className="flex gap-2 "><img src={Clock} /><p>Time left to submit: 50m:15s</p></div>
            <button className={STYLES.}></button>
        </div>

    </div>)
}


export default EventPage