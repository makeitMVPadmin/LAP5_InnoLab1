import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/LogIn/LogIn";
import Signup from "./pages/Signup/Signup";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HackathonEventsPage from "./pages/HackathonEventsPage/HackathonEventsPage";
import JoinEvent from "./pages/JoinEvent/JoinEvent";
import EventPage from "./pages/EventPage/EventPage";
import ProjectSubmissionPage from "./pages/ProjectSubmissionPage/ProjectSubmissionPage";
import ProjectReviewPage from "./pages/ProjectReviewPage/ProjectReviewPage";
import MyEventsPage from "./pages/MyEventsPage/MyEventsPage";
import EventForm from "./pages/CreateEvent/EventForm";
import ChallengeDetails from "./pages/CreateEvent/ChallengeDetails";
import ProjectShowcasePage from "./pages/ProjectShowcasePage/ProjectShowcasePage";
import "./styles/_global.scss";
import EventDetailsPage from "./pages/EventDetails/EventDetailsPage";
import EventDetails from "./components/EventDetails/EventDetails";
import OrganizerReviewPage from "./pages/OrganizerReviewPage/OrganizerReviewPage";
import Layout from "./components/Layout/Layout";
import { Toaster } from "./components/ui/toaster"

const App = () => {
  return (
    <AuthProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
          <Route path="/hackathons" element={<Layout><HackathonEventsPage /></Layout>} />
          <Route path="/hackathons/joined" element={<Layout redirect="/hackathons"><MyEventsPage /></Layout>} />
          <Route path="/hackathons/submissions/:submissionId" element={<Layout navigateback><ProjectShowcasePage /></Layout>} />
          <Route path="/join-event/:eventId" element={<Layout redirect="/hackathons" ><JoinEvent /></Layout>} />
          <Route path="/event/:eventId" element={<Layout redirect="/hackathons"><EventPage /></Layout>} />
          <Route path="/event/:eventId/admin" element={<Layout navigateback><OrganizerReviewPage /></Layout>} />
          <Route path="/event/:eventId/submit" element={<Layout navigateback ><ProjectSubmissionPage /></Layout>} />
          <Route path="/event/:eventId/review-submit" element={<Layout navigateback><ProjectReviewPage /></Layout>} />
          <Route path="/EventForm" element={<Layout redirect="/hackathons" ><EventForm /></Layout>} />
          <Route path="/ChallengeDetails" element={<Layout redirect="/EventForm"><ChallengeDetails /></Layout>} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>

  );
};

export default App;
