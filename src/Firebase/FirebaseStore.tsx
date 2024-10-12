import { db, storage, } from "./FirebaseConfig";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { ProjectSubmission } from "../types/submissionTypes"


// Function to create or update user in Firestore
export const updateUserInFirestore = async (
  user,
  { email, photoURL, fullName }
) => {
  try {
    const usersRef = collection(db, "Users");
    const userDocRef = doc(usersRef, user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // If user document does not exist, create a new one
      await setDoc(userDocRef, {
        email: email || user.email,
        fullName: fullName || user.displayName,
        createdAt: serverTimestamp(),
        profilePhoto: photoURL || "", // You may set this value during signup
      });
    } else {
      // If user document exists, update the existing one
      await setDoc(
        userDocRef,
        {
          email: email || user.email,
          fullName: fullName || user.displayName,
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.error(
      "Error creating or updating user in Firestore:",
      error.message
    );
    throw error;
  }
};


export const createProjectSubmission = async (formData): Promise<void> => {

  try {
    // Post image to firebase storage and retrieve link
    const imageURL = await uploadImage(formData.imageFile)

    // Reformat form data with imageFile link
    const submissionRef = await addDoc(collection(db, "hackathonProjectSubmissions"), {
      designFeatures: formData.designFeatures,
      designTools: formData.designTools,
      eventId: formData.eventId,
      nextSteps: formData.nextSteps,
      problemStatement: formData.problemStatement,
      projectLinks: formData.projectLinks,
      teamMembers: formData.teamMembers,
      teamName: formData.teamName,
      techStack: formData.techStack,
      userId: formData.userId,
      imageFile: imageURL,
    });

    // Add SubmissionId to Event
    const secondDocRef = doc(db, "hackathonEvents", formData.eventId);
    await updateDoc(secondDocRef, {
      submissionsId: arrayUnion(submissionRef.id)
    });

  } catch (error) {
    console.error("Error submitting project submission form data:", error);
  }

}

export const uploadImage = async (imageFile) => {
  try {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
