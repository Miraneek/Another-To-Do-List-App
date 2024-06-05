"use client"
import {useAuth} from "@/modules/auth/AuthContextProvider";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "@/lib/fireBase/firebase";

export default function Page() {

    const {user, logOut} = useAuth();

    const handleClick = () => logOut();

    const handleData = async () => {
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())
        } catch (error) {
            console.log(error)
        }

    }

    handleData()


    return <>

        <h1 className={"text-3xl font-bold underline"}>Hello {user.displayName}</h1>
        <button onClick={handleClick}>Log user</button>
    </>
}