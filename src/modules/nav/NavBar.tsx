"use client"
import {UserAvatar} from "@/modules/nav/UserAvatar/UserAvatar";
import Link from "next/link";
import {useAuth} from "@/modules/auth/AuthContextProvider";
import {motion} from "framer-motion"

export function NavBar() {

    const {user, logOut} = useAuth()

    if (user.email === null) {
        return null
    }

    return <motion.nav
        className="h-screen bg-[rgba(28,28,33,0.3)] pb-8 shadow-2xl shadow-[rgba(28,28,33,1)] flex flex-col items-center justify-between z-50"
        initial={{
            opacity: 0,
            x: -100
        }}
        animate={{
            opacity: 1,
            x: 0
        }}
        transition={{duration: 0.3}}
    >
        <div className="text-white font-bold text-lg m-4 text-center p-4">
            <Link href={"/"} className={"flex flex-col"}>
                <span className="text-2xl">Just Another</span>
                <span className={"text-sm"}>TO-DO list app</span>
            </Link>
        </div>
        <ul className={"flex flex-col text-white/60 font-bold text-md w-full"}>
            <li className={"w-full hover:bg-[rgba(28,28,33,0.2)] transition-all duration-100 border-t-2 hover:border-[rgba(255,255,255,0.006)] border-transparent border-b-2"}>
                <Link href={"/"}
                      className={"hover:text-white/80 cursor-pointer w-full h-full py-4 pl-8 block transition-all duration-100"}>
                    <strong className={"text-2xl mr-2"}>🏡</strong>
                    Home
                </Link>
            </li>
            <li className={"w-full hover:bg-[rgba(28,28,33,0.2)] transition-all duration-100 border-t-2 hover:border-[rgba(255,255,255,0.006)] border-transparent border-b-2"}>
                <Link href={"/user-settings"}
                      className={"hover:text-white/80 cursor-pointer w-full h-full py-4 pl-8 block transition-all duration-100"}>
                    <strong className={"text-2xl mr-2"}>✏️</strong>
                    User settings
                </Link>
            </li>
            <li className={"w-full hover:bg-[rgba(28,28,33,0.2)] transition-all duration-100 border-t-2 hover:border-[rgba(255,255,255,0.006)] border-transparent border-b-2"}>
                <Link href={"/login"} onClick={logOut}
                      className={"hover:text-white/80 cursor-pointer w-full h-full py-4 pl-8 block transition-all duration-100"}>
                    <strong className={"text-2xl mr-2"}>👋</strong>
                    Logout
                </Link>
            </li>
        </ul>
        <UserAvatar/>
    </motion.nav>
}