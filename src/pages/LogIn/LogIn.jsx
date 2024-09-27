import "./LogIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button";
import NavbarAlt from "../../components/NavbarAlt/NavbarAlt";
import communitiHero from "../../assets//images/communitiHero.svg";
import { handleSignIn, handleGoogleSignIn } from "../../Firebase/FirebaseAuth";

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignInButtonClicked = async (event) => {
    event.preventDefault();
    try {
      await handleSignIn(email, password);
      navigate("/events");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleGoogleButtonClicked = async () => {
    try {
      await handleGoogleSignIn();
      // Google sign-in was successful
      navigate("/events");
    } catch (error) {
      // Handle the error or display an error message to the user.
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <>
      <NavbarAlt />
      <main className="loginpage">
        <img
          src={communitiHero}
          alt="Home Icon"
          className="loginpage__image"
        ></img>
        <section className="loginpage__content">
          <h1 className="loginpage__heading">Log in to Communiti!</h1>
          <form
            className="loginpage__form"
            onSubmit={handleSignInButtonClicked}
          >
            <div className="loginpage__label-container">
              <label className="loginpage__label">Email</label>
            </div>
            <input
              className="loginpage__input"
              type="email"
              name="email"
              id="email"
              autoComplete="current-email"
              value={email}
              onChange={handleEmailChange}
            ></input>
            <div className="loginpage__label-container">
              <label className="loginpage__label">Password</label>
              <Link to={"/forgot"} className="loginpage__forgot-link">
                <p className="loginpage__forgot"> Forgot Password?</p>
              </Link>
            </div>

            <input
              className="loginpage__input"
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            ></input>

            <div className="loginpage__button-link">
              <Button
                buttonText="Log In"
                className="button button--yellow-alt loginpage__button"
                type="submit"
              />
            </div>
          </form>
          <div className="loginpage__button-link">
            <Button
              buttonText="Log In With Google"
              className="button button--red "
              onClick={handleGoogleButtonClicked}
            ></Button>
          </div>
          <div className="loginpage__text-container">
            <hr className="loginpage__divider" />
            <p className="loginpage__text">or</p>
            <hr className="loginpage__divider" />
          </div>
          <Link
            className="loginpage__button-link loginpage__button-link--signup"
            to={"/signup"}
          >
            <Button
              buttonText="Sign Up"
              className="button button--dark-blue "
            ></Button>
          </Link>
        </section>
      </main>
    </>
  );
}

export default LogIn;
