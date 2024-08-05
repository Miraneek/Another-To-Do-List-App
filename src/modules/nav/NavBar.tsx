"use client"
import {UserAvatar} from "@/modules/nav/UserAvatar/UserAvatar";
import Link from "next/link";
import {useAuth} from "@/modules/auth/AuthContextProvider";
import {motion} from "framer-motion"
import {useEffect, useState} from "react";
import {Divide as Hamburger} from 'hamburger-react'

export function NavBar() {

    const [open, setOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const {user, logOut} = useAuth()

    useEffect(
        () => {
            window.addEventListener("resize", () => {
                setIsMobile(window.innerWidth < 1024)
            })
            setIsMobile(window.innerWidth < 1024)
        },
        []
    )

    if (user.email === null) {
        return null
    }

    const logout = () => {
        logOut()
        setOpen(false)
    }

    return (
        <>
            <button className={"lg:hidden fixed left-4 top-4 z-[1000]"}>
                <Hamburger toggled={open} toggle={setOpen}/>
            </button>
            <button className={"bg-black/50 fixed w-full h-full transition duration-300 z-40 lg:hidden " + (open ? "block" : "hidden")} onClick={() => setOpen(false)}>

            </button>
            <motion.nav
                className={`h-screen bg-[rgba(28,28,33,${isMobile ? "0.8" : "0.3"})] fixed left-0 top-0 pb-8 shadow-2xl shadow-[rgba(28,28,33,1)] flex flex-col items-center justify-between z-50`}
                initial={{
                    opacity: 0,
                    x: "-100%"
                }}
                animate={{
                    opacity: 1,
                    x: isMobile ? open ? 0 : "-100%" : 0
                }}
                transition={{duration: 0.3}}
            >
                <div className={"text-white font-bold text-lg m-4 text-center p-4"}>
                    <Link href={"/"} className={"flex flex-col lg:mt-0 mt-8"}>
                        <span className="text-2xl">Just Another</span>
                        <span className={"text-sm"}>TO-DO list app</span>
                    </Link>
                </div>
                <ul className={"flex flex-col text-white/80 font-bold text-md w-full"}>
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
                        <Link href={"/login"} onClick={logout}
                              className={"hover:text-white/80 cursor-pointer w-full h-full py-4 pl-8 block transition-all duration-100"}>
                            <strong className={"text-2xl mr-2"}>👋</strong>
                            Log out
                        </Link>
                    </li>
                </ul>
                <UserAvatar/>
            </motion.nav>
        </>)
}