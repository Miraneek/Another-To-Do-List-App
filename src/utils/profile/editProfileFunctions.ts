import {getCurrentUser} from "@/utils/fireBase/fireBaseFunctions";
import {getAuth, sendPasswordResetEmail, updateProfile} from "firebase/auth";
import {authCorrect} from "@/lib/fireBase/firebase";

export async function editDisplayName(name: string) {
    const user = await getCurrentUser()

    if (!user) {
        return {failure: "You are not logged in"};
    }

    updateProfile(user, {
        displayName: name
    })
}

export async function editPhotoUrl(url: string) {
    const user = await getCurrentUser()

    if (!user) {
        return {failure: "You are not logged in"};
    }

    updateProfile(user, {
        photoURL: url
    })
}

export async function resetPassword(email: string) {
    await authCorrect.authStateReady()
    sendPasswordResetEmail(authCorrect, email)
}