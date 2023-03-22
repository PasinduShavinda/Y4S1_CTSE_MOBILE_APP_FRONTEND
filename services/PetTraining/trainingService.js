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
  return await set(dbRef, {
    ...data,
    id: id,
    rating: 0,
    ratingCount: 0,
    created: new Date().toString(),
  });
}

export function getAllTrainingsSub(setListings) {
  const Ref = ref(db, "trainings/");

  const listner = onValue(Ref, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const listings = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setListings(listings);
    }
  });
  return listner;
}
export function getAllTrainingsByUserSub(setListings) {
  const Ref = ref(db, "trainings/");

  const listner = onValue(Ref, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const listings = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      const filteredList = listings.filter(
        (item) => item.userId === auth.currentUser.uid
      );
      if (filteredList.length !== 0) {
        setListings(filteredList);
      }
    }
  });
  return listner;
}

export async function updateTraining(data, id) {
  const dbRef = ref(db, `trainings/${id}`);
  return await update(dbRef, data);
}

export async function deleteTraining(id) {
  const dbRef = ref(db, `trainings/${id}`);
  return await remove(dbRef);
}
