import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LogIn/LogIn";
import Signup from "./pages/Signup/Signup";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HackathonEventsPage from "./pages/HackathonEventsPage/HackathonEventsPage";
import JoinEvent from "./pages/JoinEvent/JoinEvent";
import EventPage from "./pages/EventPage/EventPage";
import ProjectSubmissionPage from "./pages/ProjectSubmissionPage/ProjectSubmissionPage";
import ProjectReviewPage from "./pages/ProjectReviewPage/ProjectReviewPage"
import MyEventsPage from "./pages/MyEventsPage/MyEventsPage";
import EventForm from "./pages/CreateEvent/EventForm";
import ChallengeDetails from "./pages/CreateEvent/ChallengeDetails";
import ProjectShowcasePage from "./pages/ProjectShowcasePage/ProjectShowcasePage";
import "./styles/_global.scss";
import OrganizerReviewPage from "./pages/OrganizerReviewPage/OrganizerReviewPage";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="*" element={<Navigate to="/hackathons" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/hackathons" element={<HackathonEventsPage />} />
          <Route path="/hackathons/joined" element={<MyEventsPage />} />
          <Route path="/hackathons/submissions/:submissionId" element={<ProjectShowcasePage />} />
          <Route path="/join-event/:eventId" element={<JoinEvent />} />
          <Route path="/event/:eventId" element={<EventPage />} />
          {/* Need to checkfor admin */}
          <Route path="/event/:eventId/admin" element={<OrganizerReviewPage />} />
          <Route path="/event/:eventId/submit" element={<ProjectSubmissionPage />} />
          <Route path="/event/:eventId/review-submit" element={<ProjectReviewPage />} />
          <Route path="/EventForm" element={<EventForm />} />
          <Route path="/ChallengeDetails" element={<ChallengeDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;