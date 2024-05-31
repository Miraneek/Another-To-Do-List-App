"use client"
import {useAuth} from "@/modules/auth/AuthContextProvider";

export default function Page() {

    const {user, logOut} = useAuth();

    const handleClick = () => logOut();

    return <>

        <h1 className={"text-3xl font-bold underline"}>Hello {user.displayName}</h1>
        <button onClick={handleClick}>Log user</button>
    </>
}