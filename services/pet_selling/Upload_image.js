import { fireDB, fireStorage, db } from "../../database/firebaseConfig";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { onValue, ref, remove, set, update } from "firebase/database";

export async function Upload_image(image) {
  const response = await fetch(image.uri);
  const imageName = "PT_" + Date.now() + "_SL";
  const blob = await response.blob();
  const reference = ref(fireStorage, `/petSelling/${imageName}`);
  await uploadBytes(reference, blob);
  const download_url = await getDownloadURL(reference);

  return download_url;
}
