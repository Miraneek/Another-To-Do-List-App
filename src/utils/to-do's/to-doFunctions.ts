"use client"
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/fireBase/firebase";
import {getCurrentUser} from "@/utils/fireBase/fireBaseFunctions";

interface ToDo {
    title: string
    description: string
    priority: string
    isPublic: boolean
    deadline?: Date
}

export async function createToDo({title, description, priority, isPublic, deadline}: ToDo) {

    const user = await getCurrentUser()

    if (!user) {
        return {failure: "You are not logged in"};
    }

    try {
        const docRef = await addDoc(collection(db, `users/${user.uid}/to-dos`), {
            title: title,
            description: description,
            priority: priority,
            isPublic: isPublic,
            isDone: false,
            deadline: deadline ? deadline : null
        });
        return "Document written with ID: " + docRef.id + " with a tittle: " + title;
    } catch (e) {
        return "Error adding document: " + e;
    }
}

export async function editToDo({title, description, priority, isPublic, deadline}: ToDo , id: string) {
    const user = await getCurrentUser()
    if (!user) {
        return {failure: "You are not logged in"};
    }
    try {
        const docRef = doc(db, `users/${user.uid}/to-dos`, id);
        await updateDoc(docRef, {
            title: title,
            description: description,
            priority: priority,
            isPublic: isPublic,
            deadline: deadline ? deadline : null
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function completeToDo(id: string) {
    const user = await getCurrentUser()
    if (!user) {
        return {failure: "You are not logged in"};
    }
    try {
        const docRef = doc(db, `users/${user.uid}/to-dos`, id);
        await updateDoc(docRef, {
            isDone: true
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function unCompleteToDo(id: string) {
    const user = await getCurrentUser()
    if (!user) {
        return {failure: "You are not logged in"};
    }
    try {
        const docRef = doc(db, `users/${user.uid}/to-dos`, id);
        await updateDoc(docRef, {
            isDone: false
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteToDo(id: string) {

    const user = await getCurrentUser();

    if (!user) {
        return { failure: "You are not logged in" };
    }

    try {
        const docRef = doc(db, `users/${user.uid}/to-dos`, id);
        await deleteDoc(docRef);
        console.log("Document with ID: " + id + " has been successfully deleted.");
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export async function getAllToDos() {

    const user = await getCurrentUser()

    if (!user) {
        throw new Error("You have to be logged in");
    }

    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/to-dos`));
    return querySnapshot.docs
        .filter(doc => doc.data().blank !== "blank")
        .map(doc => ({
            data: doc.data(),
            id: doc.id
        }));
}

export async function getOne(id: string) {
    
    const user = await getCurrentUser()
    if (!user) {
        return {failure: "You are not logged in"};
    }
    try {
        const docRef = doc(db, `users/${user.uid}/to-dos`, id);
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