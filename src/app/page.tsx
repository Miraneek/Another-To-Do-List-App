"use client"
import {RegisterFrom} from "@/app/modules/auth/RegisterForm";
import {LoginForm} from "@/app/modules/auth/LoginForm";

export default function Page() {
    const user = true

    if (!user) {
        return <LoginForm/>
    } else {
        return <RegisterFrom/>
    }
}