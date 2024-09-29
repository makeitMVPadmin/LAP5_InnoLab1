import "./HackathonEventsPage.scss";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
// import EventsInfo from "../../components/EventsInfo/EventsInfo";
import { useState, useEffect } from "react";
// import { collection, doc, getDoc } from "firebase/firestore";
// import { db, auth } from "../../Firebase/FirebaseConfig";
import { Link } from "react-router-dom";

const EventsHomePage = () => {
  const [joinedCommunityEvents, setJoinedCommunityEvents] = useState([]);
  const [managedCommunityEvents, setManagedCommunityEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedOption, setSelectedOption] = useState("option1"); // Default to All Events

  // // FIREBASE DATA
  // useEffect(() => {
  //   // Fetch user's communities
  //   const fetchUserCommunities = async () => {
  //     try {
  //       const currentUser = auth.currentUser;
  //       if (currentUser) {
  //         const uid = currentUser.uid;
  //         const userDocRef = doc(collection(db, "Users"), uid);
  //         const userDocSnapshot = await getDoc(userDocRef);

  //         if (userDocSnapshot.exists()) {
  //           const userData = userDocSnapshot.data();
  //           const joinedIds = userData.CommunitiesJoined || [];
  //           const managedIds = userData.CommunitiesManage || [];

  //           setUserCommunitiesJoined(joinedIds);
  //           setUserCommunitiesManaged(managedIds);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user communities:", error);
  //     }
  //   };

  //   fetchUserCommunities();
  // }, []);

  // useEffect(() => {
  //   setUserCommunitiesJoined(data.users[0].communitiesJoined);
  // }, []);
  // useEffect(() => {
  //   setUserCommunitiesManaged(data.users[0].communitiesManaged);
  // }, []);
  // useEffect(() => {
  //   setUserCommunities([...userCommunitiesJoined, ...userCommunitiesManaged]);
  // }, []);

  // useEffect(() => {
  //   setUserCommunities([1]);
  //   setUserCommunitiesJoined([1]);
  //   setUserCommunitiesManaged([1]);
  // }, []);


  //  DATA.JSON

  return (
    <div className="event-page">
      <DashboardNavbar/>
      <div className="event-page__banner">
        <div className="event-page__banner__btn-navigate-back">← Back</div>
        <h1 className="event-page__banner__header">Hackathon Events</h1>
        <p className="event-page__banner__sub-header">Explore all the hackathon events</p>
      </div>
      <div className="event-page__btn">
        <Link to="#" className="event-page__btn__my-events">My Events</Link>
        <Link to="#" className="event-page__btn__create-hackathon">Create Hackathon</Link>
      </div>
      <div className="event-page__container">
        <div className="event-page__container__filters">FILTER CONTAINER</div>
        <div className="event-page__container__event-cards">CARDS CONTAINER</div>
      </div>
    </div>
  );
}

export default EventsHomePage;
