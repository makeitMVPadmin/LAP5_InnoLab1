import "./Hero.scss";
import communitiHero from "../../assets/images/communitiHero.svg";
import { Link } from "react-router-dom";

const Hero = () => {

  return (
    <div className="hero">
      <div className="hero__image-container">
        <img className="hero__image" alt="Hero Icon" src={communitiHero} />
      </div>
      <div className="hero__left-container">
        <div className="hero__container">
          <h1 className="hero__header">Access Hackathons!<span>Head to our Innolab Suite</span></h1>
        </div>
        <p className="hero__description">
        It offers features like event creation, real-time participant tracking,
        project submission, and collaboration tools
        </p>
        <div className="hero__container hero__container--alt">
            <Link to='/hackathons'
              className="button button--yellow"
            >Start Your Hackathon Journey →</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
