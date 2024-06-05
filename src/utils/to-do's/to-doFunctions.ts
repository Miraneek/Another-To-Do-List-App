import {addDoc, collection, deleteDoc, doc, updateDoc} from "@firebase/firestore";
import {authCorrect, db} from "@/lib/fireBase/firebase";

interface ToDo {
    title: string
    description: string
    priority: string
    isPublic: boolean
    deadline?: Date
}

export async function createToDo({title, description, priority, isPublic, deadline}: ToDo) {

    const user = authCorrect.currentUser

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
        console.log("Document written with ID: " + docRef.id + " with a tittle: " + title);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function editToDo({title, description, priority, isPublic, deadline}: ToDo , id: string) {
    const user = authCorrect.currentUser
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
    const user = authCorrect.currentUser
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

export async function deleteToDo(id: string) {

    const user = authCorrect.currentUser;

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

//TODO getAll return array of objects to render
