import "./HomePage.scss";
import { MouseEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import NavbarAlt from "../../components/NavbarAlt/NavbarAlt";
import { ReactComponent as CommunitiHero } from "../../assets/images/communitiHero.svg";
import { handleGoogleSignIn } from "../../Firebase/FirebaseAuth";

const HomePage = () => {
  const navigate = useNavigate();
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
      <main className="homepage">
        <CommunitiHero
          className="homepage__image"
        />
        <section className="homepage__content">
          <h1 className="homepage__heading">Welcome to Communiti!</h1>
          <div className="homepage__buttons">
            <Link to="/login" className="homepage__buttons-link">
              <Button buttonText="Log In" className="button--yellow-alt" />
            </Link>
            <Link to="/signup" className="homepage__buttons-link">
              <Button
                buttonText="Sign Up"
                className="button button--dark-blue"
              />
            </Link>
          </div>
          <div className="homepage__text-container">
            <hr className="homepage__divider" />
            <p className="homepage__text">or</p>
            <hr className="homepage__divider" />
          </div>
          <div className="homepage__buttons-link">
            <Button
              buttonText="Log In With Google"
              className="button button--red "
              onClick={handleGoogleButtonClicked}
            ></Button>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
