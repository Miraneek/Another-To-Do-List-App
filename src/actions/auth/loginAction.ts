"use server";
import {action} from "@/lib/safe-action";
import {loginSchema} from "@/actions/auth/authSchemas";
import {auth} from "@/lib/firebase";
import {signInWithEmailAndPassword} from "firebase/auth";

export const loginUserAction = action(loginSchema, async ({email, password}) => {
    console.log("hou")

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("logged user: " + user.email);

        return {success: "User registered successfully"};
    } catch (error: any) {
        console.log(error)
        if (error.code === "auth/user-not-found") {
            return {failure: "User not found"};
        }

        if (error.code === "auth/invalid-credential") {
            return {failure: "Wrong email or password"};
        }
        return {failure: error.code};
    }
});
