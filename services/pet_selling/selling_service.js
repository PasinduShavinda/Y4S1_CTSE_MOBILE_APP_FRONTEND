import { fireDB, fireStorage, db } from "../../database/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { onValue, ref, remove, set, update } from "firebase/database";

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
export async function get_pet_by_id(id) {
  return await getDocs(collection(fireDB, "sellingPets"), id);
}
export async function update_selling_pet_by_id(request, id) {
  const get_ref = ref(db, `sellingPets/${id}`);
  console.log("get_ref");
  console.log(get_ref);
  return await update(get_ref, request);
}

export async function update_selling_pet(request, id) {
  const vetRef = doc(fireDB, "sellingPets", id);
  console.log("get_ref");
  console.log(vetRef);
  return await updateDoc(vetRef, request);
}
