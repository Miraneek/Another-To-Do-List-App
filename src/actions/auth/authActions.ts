"use server";
import {action} from "@/lib/safe-action";
import {nothingSchema, registerSchema} from "@/actions/auth/authSchemas";

import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {authCorrect} from "@/lib/fireBase/firebase";
import {cookies} from "next/headers";

export const registerUserAction = action(registerSchema, async ({username, password, email}) => {

    try {
        const userCredential = await createUserWithEmailAndPassword(authCorrect, email, password);
        const user = userCredential.user;

        /*await sendEmailVerification(user);*/

        await updateProfile(user, {
            displayName: username,
        })

        console.log("Registered user: " + username + " " + user.email);

        return {success: {email: email, password: password}};
    } catch (error: any) {
        const errorCode = error.code;
        switch (errorCode) {
            case "auth/weak-password":
                return {failure: "The password is too weak."};
            case "auth/email-already-in-use":
                return {failure: "This email address is already in use by another account."};
            case "auth/invalid-email":
                return {failure: "This email address is invalid."};
            case "auth/network-request-failed":
                return {failure: "Network request failed. Please try again."};
        }
        return {failure: error.message};
    }
});

export const loginAction = action(nothingSchema, async () => {
    cookies().set("loggedIn", "true");
    console.log("Logged in")
    return {success: "User logged in successfully"}
})

export const logOutAction = action(nothingSchema, async () => {
    cookies().set("loggedIn", "false");
    console.log("Logged out")
    return {success: "User logged in successfully"}
})
