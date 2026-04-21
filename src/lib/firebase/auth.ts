import { auth } from "./client";
import { onAuthStateChanged } from "firebase/auth";

export function listenToAuth(cb: (user: any | null) => void) {
    return onAuthStateChanged(auth, cb);
}

export async function getIdtoken() {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
}