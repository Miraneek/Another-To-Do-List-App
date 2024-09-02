"use server";
import {action} from "@/lib/safe-action";
import {nothingSchema, registerSchema} from "@/actions/auth/authSchemas";

import {createUserWithEmailAndPassword, updateProfile, sendEmailVerification} from "firebase/auth";
import {authCorrect, db} from "@/lib/fireBase/firebase";
import {cookies} from "next/headers";
import {doc, setDoc} from "@firebase/firestore";

export const registerUserAction = action(registerSchema, async ({username, password, email, lang}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(authCorrect, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        console.log("Verification email sent to: " + email);

        try {
            // Create a document in Firestore indicating that the user needs to verify their email
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                emailVerified: false, // Flag to indicate email verification status
                friends: [],
                language: lang
            });
            console.log("Document written with ID: " + user.uid);

            // Creating placeholder documents for to-dos and habits
            await setDoc(doc(db, `users/${user.uid}/to-dos`, "Placeholder"), {
                blank: "blank"
            });
            console.log("To-dos collection created with ID: " + user.uid);

            await setDoc(doc(db, `users/${user.uid}/habits`, "Placeholder"), {
                blank: "blank"
            });
            console.log("Habit-tracker collection created with ID: " + user.uid);

        } catch (e) {
            console.error("Error adding document: ", e);
        }

        await updateProfile(user, {
            displayName: username,
        });

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
