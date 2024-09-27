import "./EventsPage.scss";
import EventsNavbar from "../../components/DashboardNavbar/DashboardNavbar";
// import EventsInfo from "../../components/EventsInfo/EventsInfo";
import { useState, useEffect } from "react";
// import { collection, doc, getDoc } from "firebase/firestore";
// import { db, auth } from "../../Firebase/FirebaseConfig";

function EventsHomePage() {
  const [joinedCommunityEvents, setJoinedCommunityEvents] = useState([]);
  const [managedCommunityEvents, setManagedCommunityEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([])
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
  useEffect(() => {
    
  }, []);

  const filterEvents = () => {
    switch (selectedOption) {
      case "option2": // Communities Managed
        return (
          <>
            {/* <EventsInfo eventList={managedCommunityEvents} /> */}
          </>
        );
      case "option3": // Communities Joined
        return (
          <>
            {/* <EventsInfo eventList={joinedCommunityEvents} /> */}
          </>
        );
      default: // All Events
        return (
          <>
            {/* <EventsInfo eventList={allEvents} /> */}
          </>
        );
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="event-page">
      <EventsNavbar />
      <div className="event-page__container">
        <div className="event-page__filters">
          <select
            id="myDropdown"
            className="event-page__dropdown"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="option1">All Events</option>
            <option value="option2">Communities Managed</option>
            <option value="option3">Communities Joined</option>
          </select>
          <div className="event-page__date-container">
            <label className="event-page__date-text">Select Date Range</label>
            <div className="event-page__dates-container">
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="event-page__date-input"
              />
              <p className="event-page__date-text event-page__date-text--alt">
                -
              </p>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="event-page__date-input"
              />
            </div>
          </div>
        </div>
        <div className="event-page__section">
          {filterEvents()}
        </div>
      </div>
    </div>
  );
}

export default EventsHomePage;
