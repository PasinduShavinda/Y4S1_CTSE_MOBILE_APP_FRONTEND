import { onValue, ref, set } from "firebase/database";
import { db } from "../../database/firebaseConfig";

export async function addReview(data) {
  const id = Date.now();
  const dbRef = ref(db, `reviews/${id}`);
  return await set(dbRef, { ...data });
}
export function getAllReviewsByItemSub(setState, id) {
  const Ref = ref(db, "reviews/");

  const listner = onValue(Ref, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const listings = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      const filteredList = listings.filter((item) => item.trainingId === id);
      if (filteredList.length !== 0) {
        setState(filteredList);
      }
    }
  });
  return listner;
}
