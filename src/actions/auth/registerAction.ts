"use server";
import {action} from "@/lib/safe-action";
import {registerSchema} from "@/actions/auth/authSchemas";

import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile
} from "firebase/auth";
import {authCorrect} from "@/lib/fireBase/firebase";

export const registerUserAction = action(registerSchema, async ({username, password, email}) => {

    try {
        const userCredential = await createUserWithEmailAndPassword(authCorrect, email, password);
        const user = userCredential.user;

        /*await sendEmailVerification(user);*/

        await updateProfile(user, {
            displayName: username
        })

        console.log("Registered user: " + username + " " + user.email);

        return {success: "User registered successfully"};
    } catch (error: any) {
        const errorCode = error.code;
        switch (errorCode) {
            case "auth/weak-password":
                return {failure: "The password is too weak."};
            case "auth/email-already-in-use":
                return {failure: "This email address is already in use by another account."};
            case "auth/invalid-email":
                return {failure: "This email address is invalid."};
        }
        return {failure: error.message};
    }
});
