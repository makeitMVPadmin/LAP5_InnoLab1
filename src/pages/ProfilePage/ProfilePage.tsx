import { useState, useEffect } from "react";
import "./ProfilePage.scss";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "../../Firebase/FirebaseConfig";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import profilePic from "../../assets/images/profilePic.svg";
import edit from "../../assets/images/edit.svg";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line
  const [isNotEditing, setIsNotEditing] = useState(false);
  const [name, setName] = useState("First Last Name");
  const [profileImage, setProfileImage] = useState(profilePic);

  useEffect(() => {
    // Fetch user data from Firestore on component mount
    const currentUser = auth.currentUser;

    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const uid = currentUser.uid;
          const userDocRef = doc(collection(db, "Users"), uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const fullName = userDocSnapshot.data().fullName;
            const userProfileImage = userDocSnapshot.data().profilePhoto;
            setName(fullName);
            setProfileImage(userProfileImage || profilePic);
          } else {
            console.error("User document does not exist");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsNotEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        const userDocRef = doc(collection(db, "Users"), uid);

        // Update Firestore document with the new profile photo URL
        await updateDoc(userDocRef, { profilePhoto: profileImage });
        setIsEditing(false);
        setIsNotEditing(true);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    // Add logic to handle name change
  };

  const handleImageChange = async (event) => {
    const newProfileImage = event.target.files[0];

    try {
      if (newProfileImage) {
        const imageFileName =
          newProfileImage.name || `profile_image_${Date.now()}`;
        const storageRef = ref(storage, `profile_thumbnails/${imageFileName}`);
        await uploadBytes(storageRef, newProfileImage);
        const imageUrl = await getDownloadURL(storageRef);

        // Update profileImage state with the new URL
        setProfileImage(imageUrl);
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <div className="profile">
        <div className="profile_container">
          {isEditing ? (
            <>
              <button className="profile_save" onClick={handleSaveClick}>
                Save
              </button>
              <div className="profile_pic_edit_container">
                <img
                  className="profile_pic"
                  src={profileImage}
                  alt="profile pic"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <button className="profile_edit_button">
                  <img src={edit} alt="edit" />
                </button>
              </div>
              <div className="profile_name_edit_container">
                <input
                  className="firstLastName"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
                <button className="profile_edit_button">
                  <img src={edit} alt="edit" />
                </button>
              </div>
            </>
          ) : (
            <>
              <button className="profile_edit" onClick={handleEditClick}>
                Edit
              </button>
              <img
                className="profile_pic"
                src={profileImage}
                alt="profile pic"
              />
              <span className="firstLastName">{name}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
