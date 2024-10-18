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
    // Post image to firebase storage and retrieve link
    const imageURLs = await uploadImages(formData.imageFiles);
    const pdfURLs = await uploadImages(formData.pdfFiles)

    // Reformat form data with projectFile link
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
      imageFiles: imageURLs,
      pdfFiles: pdfURLs,
      createdAt: Timestamp.now(),
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

export const uploadFile = async (projectFile: File) => {
  try {
    const storageRef = ref(storage, `submissions/${projectFile.name}`);
    const snapshot = await uploadBytes(storageRef, projectFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const addCommentToSubmission = async ({
  submissionId,
  commentEntry,
  fullName,
  profileUrl
}: {
  submissionId: string;
  commentEntry: string;
  fullName: string;
  profileUrl: string;
}) => {
  const docRef = doc(db, "hackathonProjectSubmissions", submissionId);
  try {
    const comment = {
      commenterName: fullName,
      commentEntry,
      commentTimestamp: Timestamp.now(),
      profileUrl: profileUrl
    };
    await updateDoc(docRef, {
      comments: arrayUnion(comment)
    });
    return {
      success: true,
      commenterName: comment.commenterName,
      commentEntry: comment.commentEntry,
      commentTimestamp: comment.commentTimestamp,
      profileUrl: comment.profileUrl
    };
  } catch (error) {
    console.error("Error adding comment: ", error);
    return { success: false };
  }
}

export const uploadFiles = async (projectFiles: File[]) => {
  try {
    const uploadPromises = projectFiles.map((file) => uploadFile(file));

    const projectFileURLs = await Promise.all(uploadPromises);
    return projectFileURLs;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

