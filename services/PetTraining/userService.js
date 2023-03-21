import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, fireDB } from "../../database/firebaseConfig";
import { onValue, ref, set, update } from "firebase/database";

export async function registerUser(user) {
  return await createUserWithEmailAndPassword(auth, user.email, user.password);
}
export async function loginUser(user) {
  return await signInWithEmailAndPassword(auth, user.email, user.password);
}
export async function saveUser(user, uid) {
  const Ref = ref(db, `users/${uid}`);
  return await set(Ref, { name: user.name, isAdmin: false, id: uid, dp: "null" });
}
export function currentUser() {
  const user = auth.currentUser;
  let cuser = null;
  const Ref = ref(db, `users/${user.uid}`);
  onValue(Ref, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      cuser = data;
    }
  });
  return cuser;
}

export async function updateUser(user) {
  const Ref = ref(db, `users/${user.id}`);
  return await update(Ref, { ...user });
}
