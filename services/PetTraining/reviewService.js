import { ref, set } from "firebase/database";
import { db } from "../../database/firebaseConfig";

export async function addReview(data) {
  const id = Date.now();
  const dbRef = ref(db, `reviews/${id}`);
  return await set(dbRef, {...data});
}
