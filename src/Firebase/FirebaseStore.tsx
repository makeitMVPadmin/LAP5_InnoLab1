import { db, storage, } from "./FirebaseConfig";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  Timestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ProjectSubmission } from "../types/submissionTypes"

// Function to create or update user in Firestore
export const updateUserInFirestore = async (
  user,
  { email, photoURL, fullName }
) => {
  try {
    const usersRef = collection(db, "hackathonUsers");
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


export const createProjectSubmission = async (formData: ProjectSubmission): Promise<void> => {

  try {
    // Upload images and get URLs
    const imageURLs = await uploadImages(formData.imageFiles);
    const pdfURLs = await uploadImages(formData.pdfFiles);

    const submissionData = {
      title: formData.title,
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
      imageFiles: imageURLs,
      pdfFiles: pdfURLs,
      createdAt: Timestamp.now(),
    };

    const submissionRef = await addDoc(
      collection(db, "hackathonProjectSubmissions"),
      submissionData
    );

    const secondDocRef = doc(db, "hackathonEvents", formData.eventId);
    await updateDoc(secondDocRef, {
      submissionsId: arrayUnion(submissionRef.id)
    });

  } catch (error) {
    console.error("Error submitting project submission form data:", error);
    throw error; // Re-throw to handle in the component
  }
};

export const uploadImage = async (imageFile: File) => {
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

export const addCommentToSubmission = async (data) => {
  const { submissionId, commentEntry, fullName } = data;
  if (!submissionId || !commentEntry) {
    return { success: false, message: 'All fields are required.' };
  }
  const docRef = doc(db, "hackathonProjectSubmissions", submissionId);
  try {
    const comment = {
      commenterName: fullName,
      commentEntry,
      commentTimestamp: Timestamp.now()
    };
    await updateDoc(docRef, {
      comments: arrayUnion(comment)
    });
    return {
      success: true,
      commenterName: comment.commenterName,
      commentEntry: comment.commentEntry,
      commentTimestamp: comment.commentTimestamp
    };
  } catch (error) {
    console.error("Error adding comment: ", error);
    return { success: false };
  }
}

export const uploadImages = async (imageFiles: File[]) => {
  try {
    const uploadPromises = imageFiles.map((file) => uploadImage(file));

    const imageURLs = await Promise.all(uploadPromises);
    return imageURLs;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

