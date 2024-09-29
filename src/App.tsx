import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import EventsPage from "./pages/EventsPage/EventsPage";
import Login from "./pages/LogIn/LogIn"; 
import Signup from "./pages/Signup/Signup"; 
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { auth } from "./Firebase/FirebaseConfig";
import "./styles/_global.scss";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return null;
  }
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProfilePage />} />
    
      {user ? (
        <>
          <Route path="/events" element={<EventsPage />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
