import { ReactComponent as CommunitiHero } from "../../assets/images/communitiHero.svg";
import { Link } from "react-router-dom";

const Hero = () => {

  return (
    <div className="bg-white w-full p-4 lg:flex lg:flex-row-reverse lg:items-center lg:p-8">
      <div className="flex w-full justify-center lg:w-[50%]">
        <CommunitiHero className="w-[70%] lg:w-[90%]" />
      </div>
      <div className="h-full w-full lg:w-[60%] flex flex-col">
        <div className="flex flex-col items-start lg:w-full">
          <h1 className="mb-4 text-MVP-black w-[65%] lg:text-[3vw] lg:w-full">Access Hackathons!
            <span className="text-[5vw] block lg:text-[2vw]">Head to our Innolab Suite</span>
          </h1>
        </div>
        <p className="flex justify-center text-left my-4 lg:w-[56%]">
          It offers features like event creation, real-time participant tracking,
          project submission, and collaboration tools
        </p>
        <div className="flex flex-col items-start lg:w-full">
          <Link to='/hackathons'
            className="text-black rounded-[6vw] border-none font-gilroy font-bold text-[5vw] px-[3vw] py-[2vw] shadow-[0px_0.2rem_0.2rem_rgba(0,0,0,0.25)] cursor-pointer lg:px-[1vw] lg:py-[0.5vw] lg:text-[1.6vw] bg-[#ffd22f]"
          >Start Your Hackathon Journey →</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
