import {getCurrentUser} from "@/utils/fireBase/fireBaseFunctions";
import {sendPasswordResetEmail, updateProfile} from "firebase/auth";
import {authCorrect, db} from "@/lib/fireBase/firebase";
import {doc, updateDoc} from "@firebase/firestore";
import {Locale} from "@/lib/next-intl/config";

export async function editDisplayName(name: string) {
    const user = await getCurrentUser()

    if (!user) {
        return {failure: "You are not logged in"};
    }

    await updateProfile(user, {
        displayName: name
    })
}

export async function editPhotoUrl(url: string) {
    const user = await getCurrentUser()

    if (!user) {
        return {failure: "You are not logged in"};
    }

    await updateProfile(user, {
        photoURL: url
    })
}

export async function resetPassword(email: string) {
    await authCorrect.authStateReady()
    await sendPasswordResetEmail(authCorrect, email)
}

export async function changeLanguage(lang: string) {
    const user = await getCurrentUser()

    const locale = lang as Locale;

    if (!user) {
        return {failure: "You are not logged in"};
    }

    await updateDoc(doc(db, `users/${user.uid}`), {language: locale})
}