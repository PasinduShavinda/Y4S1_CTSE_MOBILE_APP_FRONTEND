import { fireDB, fireStorage } from "../../database/firebaseConfig";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function Add_new_pets_to_db(value) {
  return await addDoc(collection(fireDB, "sellingPets"), value);
}
export async function Upload_image(image) {
  const response = await fetch(image.uri);
  const imageName = "PT_" + Date.now() + "_SL";
  const blob = await response.blob();
  const reference = ref(fireStorage, `/petSelling/${imageName}`);
  await uploadBytes(reference, blob);
  const download_url = await getDownloadURL(reference);

  return download_url;
}
export async function get_all_pets() {
  return await getDocs(collection(fireDB, "sellingPets"));
}
