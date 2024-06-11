import {UserAvatar} from "@/modules/nav/UserAvatar/UserAvatar";
import Link from "next/link";

export function NavBar() {
    return<nav
        className="fixed top-0 left-0 w-full h-16 bg-[#222228] shadow-md shadow-[#222228] flex items-center justify-between px-4">
        <div className="text-white font-bold text-lg"><Link href={"/"}>Just another to-do list app</Link></div>
        <UserAvatar/>
    </nav>
}