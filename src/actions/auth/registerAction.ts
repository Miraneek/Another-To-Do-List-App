"use server";
import { action } from "@/lib/safe-action";
import { registerSchema } from "@/actions/auth/authSchemas";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const registerUserAction = action(registerSchema, async ({ username, password, email }) => {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("Registered user: " + username + " " + email);

        return { success: "User registered successfully" };
    } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
            return { failure: "Email already in use" };
        }

        return { failure: error.message };
    }
});
