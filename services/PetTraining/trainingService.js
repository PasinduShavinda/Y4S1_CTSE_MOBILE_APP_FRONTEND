import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../database/firebaseConfig";

export default async function addTraining(data) {
  return await addDoc(collection(fireDB,'trainings'),data)
}