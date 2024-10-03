import "./Signup.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import NavbarAlt from "../../components/NavbarAlt/NavbarAlt";
import communitiHero from "../../assets//images/communitiHero.svg";
import { Link } from "react-router-dom";
import { handleSignUp, handleGoogleSignIn } from "../../Firebase/FirebaseAuth";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isFormValid = () => {
    // Basic validation checks
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("All fields must be filled");
      return false;
    }

    // Email validation using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return false;
    }

    // Password length validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    setError(null); // Reset error state if all checks pass
    return true;
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    // Validate the form
    if (!isFormValid()) {
      return;
    }

    // Call the Firebase signup function with the email and password
    handleSignUp(email, password, fullName)
      .then(() => {
        // Signup was successful, redirect
        navigate("/hackathons");
      })
      .catch((error) => {
        // Handle signup error, you can display an error message
        console.error("Signup error:", error);
      });
  };

  const handleGoogleButtonClicked = async () => {
    try {
      await handleGoogleSignIn();
      // Google sign-in was successful, you can redirect the user or perform any other actions here.
      navigate("/dashboard");
    } catch (error) {
      // Handle the error or display an error message to the user.
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <>
      <NavbarAlt />
      <main className="signuppage">
        <img
          src={communitiHero}
          alt="Home Icon"
          className="signuppage__image"
        ></img>
        <section className="signuppage__content">
          <h1 className="signuppage__heading">Create Your Communiti!</h1>
          {error && <p className="signuppage__error">{error}</p>}
          <form className="signuppage__form" onSubmit={handleSignupSubmit}>
            <input
              className="signuppage__input signuppage__input--margin"
              placeholder="Full Name"
              type="text"
              name="name"
              id="name"
              value={fullName}
              onChange={handleFullNameChange}
            ></input>
            <input
              className="signuppage__input signuppage__input--margin"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            ></input>
            <input
              className="signuppage__input signuppage__input--margin"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
            <div className="signuppage__button-link">
              <Button
                buttonText="Sign Up"
                className="button button--yellow-alt signuppage__button"
                type="submit"
              />
            </div>
          </form>
          <div className="signuppage__button-link">
            <Button
              buttonText=" Sign Up With Google"
              className="button button--red "
              onClick={handleGoogleButtonClicked}
            ></Button>
          </div>
          <div className="signuppage__text-container">
            <hr className="signuppage__divider" />
            <p className="signuppage__text">or</p>
            <hr className="signuppage__divider" />
          </div>
          <Link
            className="signuppage__button-link signuppage__button-link--signup"
            to={"/login"}
          >
            <Button
              buttonText="Sign In"
              className="button button--dark-blue "
            ></Button>
          </Link>
        </section>
      </main>
    </>
  );
}

export default Signup;
