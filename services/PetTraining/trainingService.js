import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, fireDB } from "../../database/firebaseConfig";
const userId = auth.currentUser?.uid;

export async function addTraining(data) {
  const docRef = doc(collection(fireDB, "trainings"))
  return await setDoc(docRef, {...data, id:docRef.id});
}

export async function getAllTrainings() {
  return await getDocs(collection(fireDB, "trainings"));
}

export async function updateTraining(data,id) {
  return await updateDoc(doc(fireDB, "trainings", id), data);
}

export async function deleteTraining(id) {
  return await deleteDoc(doc(fireDB, "trainings", id));
}
