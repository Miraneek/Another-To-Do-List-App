"use client"
import {RegisterFrom} from "@/app/modules/auth/RegisterForm";
import {LoginForm} from "@/app/modules/auth/LoginForm";
import {authCorrect} from "@/lib/fireBase/firebase";

export default function Page() {

    return <>
        <RegisterFrom/>
        <LoginForm/>
        {authCorrect.currentUser ? <div>User is logged in as {authCorrect.currentUser.displayName}</div> : <div>User is not logged in</div>}
    </>
}