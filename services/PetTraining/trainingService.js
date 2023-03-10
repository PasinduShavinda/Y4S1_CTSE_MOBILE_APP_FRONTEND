import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { auth, fireDB } from "../../database/firebaseConfig";
const userId = auth.currentUser?.uid;
export async function addTraining(data) {
  return await addDoc(collection(fireDB, "trainings"), data);
}

export async function getAllTrainings() {
  return await getDocs(collection(fireDB, "trainings"));
}
