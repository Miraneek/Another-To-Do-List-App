"use client"
import {useAuth} from "@/modules/auth/AuthContextProvider";
import {editToDo} from "@/utils/to-do's/to-doFunctions";

export default function Page() {

    const {user, logOut} = useAuth();

    const handleClick = () => logOut();

    const handleData = async () => {
        console.log("trying")
        try {
            await editToDo({
                title: "edited",
                description: "test",
                priority: "low",
                isPublic: true,
            }, "FUVgwWA5t4qnnR0U76Sc")
            console.log("done, good job")
        } catch (error) {
            console.log(error)
        }

    }
    return <>
        <h1 className={"text-3xl font-bold underline"}>Hello {user.displayName}</h1>
        <button onClick={handleClick}>Log user</button>
        <br/>
        <button onClick={handleData}
                className={"text-2xl bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 px-6"}>test
        </button>
    </>
}