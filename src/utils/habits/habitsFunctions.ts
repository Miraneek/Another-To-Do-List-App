"use client"
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/fireBase/firebase";
import {getCurrentUser} from "@/utils/fireBase/fireBaseFunctions";

interface habit {
    title: string;
    emoji: string;
    isPublic: boolean;
    isDoneToday: boolean;
    streak: number;
}

interface createHabit {
    title: string;
    emoji: string;
}

export async function createHabit({title, emoji}: createHabit) {

    const user = await getCurrentUser()

    if (!user) {
        return {failure: "You are not logged in"};
    }

    try {
        const docRef = await addDoc(collection(db, `users/${user.uid}/habits`), {
            title: title,
            emoji: emoji,
            isDoneToday: false,
            streak: 0
        });
        return "Document written with ID (habit): " + docRef.id + " with a tittle: " + title;
    } catch (e) {
        return "Error adding document (habit createHabit): " + e;
    }
}

export async function setCompleationOnHabit(id: string, isDone: boolean) {
    const user = await getCurrentUser()
    if (!user) {
        return {failure: "You are not logged in"};
    }
    try {
        const docRef = doc(db, `users/${user.uid}/habits`, id);
        await updateDoc(docRef, {
            isDoneToday: isDone
        });
    } catch (e) {
        console.error("Error adding document (habit CompleteHabit): ", e);
    }
}

export async function deleteHabit(id: string) {

    const user = await getCurrentUser();

    if (!user) {
        return { failure: "You are not logged in" };
    }

    try {
        const docRef = doc(db, `users/${user.uid}/habits`, id);
        await deleteDoc(docRef);
        console.log("Document with ID: " + id + " has been successfully deleted.");
    } catch (e) {
        console.error("Error deleting document (habit DeleteHabit): ", e);
    }
}

export async function getAllHabits() {

    const user = await getCurrentUser()

    if (!user) {
        throw new Error("You have to be logged in");
    }

    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/habits`));
    return querySnapshot.docs
        .filter(doc => doc.data().blank !== "blank")
        .map(doc => ({
            data: doc.data(),
            id: doc.id
        }));
}

export async function getOneHabit(id: string) {

    const user = await getCurrentUser()
    if (!user) {
        return {failure: "You are not logged in"};
    }
    try {
        const docRef = doc(db, `users/${user.uid}/habits`, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}