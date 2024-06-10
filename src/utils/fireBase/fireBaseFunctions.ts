import {authCorrect} from "@/lib/fireBase/firebase";

export async function getCurrentUser() {

    await authCorrect.authStateReady()

    return authCorrect.currentUser
}