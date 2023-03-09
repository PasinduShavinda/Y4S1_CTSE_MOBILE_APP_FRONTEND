import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, fireDB } from "../../database/firebaseConfig";


export async function registerUser(user) {
  return await createUserWithEmailAndPassword(auth,user.email, user.password);
}
export async function loginUser(user) {
  return await signInWithEmailAndPassword(auth,user.email, user.password);
}
export async function saveUser(user, uid) { 
  console.log(user.name, uid)
  return await setDoc(doc(fireDB,'users',uid),{
    name: user.name
  })
}
export async function currentUser() {
  const user = auth.currentUser
  return await getDoc(doc(fireDB, "users",user?.uid));
}
