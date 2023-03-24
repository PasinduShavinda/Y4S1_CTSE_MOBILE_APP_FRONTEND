import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireStorage } from "../../database/firebaseConfig";

export default async function imageUpload(imageArr) {
  const images = [...imageArr];
  const uris = [];
  for (let i = 0; i < images.length; i++) {
    const res = await fetch(images[i]);
    const blob = await res.blob();
    const filename = "Training_" + Date.now();
    const sref = ref(fireStorage, `/petTraining/${filename}`);
    await uploadBytes(sref, blob);
    const downloadUrl = await getDownloadURL(sref);
    uris.push(downloadUrl);
  }
  return uris;
}
