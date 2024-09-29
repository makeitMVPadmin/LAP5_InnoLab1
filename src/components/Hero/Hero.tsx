import { useState } from "react";
import "./Hero.scss";
import Button from "../Button/Button";
import communitiHero from "../../assets/images/communitiHero.svg";
import arrowCircleButton from "../../assets/images/arrowCircleButton.svg";
import { db } from "../../Firebase/FirebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      // If the email is empty or doesn't match the regex pattern
      // You can handle invalid email input here (show an error message, for example)
      console.error("Please provide a valid email address");
      return;
    }

    try {
      // Add the email to the PreLaunch collection in Firestore
      const preLaunchCollectionRef = collection(db, "PreLaunch");
      await addDoc(preLaunchCollectionRef, {
        email: email,
        timestamp: serverTimestamp(),
      });

      // Update state to show success message
      setShowSuccess(true);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting email to Firestore:", error);
      // Handle any errors
    }
  };

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
          {!showForm && !showSuccess && (
            <Link to='/hackathons'
              className="button button--yellow"
            >Start Your Hackathon Journey →</Link>
          )}
          {showForm && (
            <div className="hero__sign-up">
              <form onSubmit={handleSignupSubmit} className="hero__form">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="email address"
                  className="hero__input"
                />
                <button type="submit">
                  <img
                    src={arrowCircleButton}
                    alt="Submit"
                    className="arrow-circle-button"
                  />
                </button>
              </form>
            </div>
          )}
          {showSuccess && (
            <div className="hero__success">
              <h4 className="hero__success-message-header">Success!</h4>
              <p className="hero__success-message">
                Thank you for signing up! We can't wait to have you in the
                Communiti!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
