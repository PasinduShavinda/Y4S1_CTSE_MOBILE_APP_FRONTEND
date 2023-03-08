import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/firebaseConfig";


export async function registerUser(user) {
  return await createUserWithEmailAndPassword(auth,user.email, user.password);
}
export async function loginUser(user) {
  return await signInWithEmailAndPassword(auth,user.email, user.password);
}
