import { onValue, ref, remove, set, update } from "firebase/database";
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
import { auth, db, fireDB } from "../../database/firebaseConfig";
const userId = auth.currentUser?.uid;

export async function addTraining(data) {
  const id = Date.now();
  const dbRef = ref(db, `trainings/${id}`);
  return await set(dbRef, { ...data, id: id });
}

export function getAllTrainings() {
  const Ref = ref(db, "trainings/");
  let list =[]
  onValue(Ref, (snapshot) => {
    const data = snapshot.val();
    const listings = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    list = [...listings]
  });
  return list;
}

export async function updateTraining(data, id) {
  const dbRef = ref(db, `trainings/${id}`);
  return await update(dbRef, data);
}

export async function deleteTraining(id) {
  const dbRef = ref(db, `trainings/${id}`);
  return await remove(dbRef);
}
