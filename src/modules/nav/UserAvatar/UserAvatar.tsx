"use client"
import {useAuth} from "@/modules/auth/AuthContextProvider";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React from "react";
import Link from "next/link";

export function UserAvatar() {

    const {user} = useAuth()

    return <Link href={"/user-settings"} className={"flex flex-col items-center"}>
        <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger>
                <Avatar.Root
                    className={"shadow-sm shadow-black bg-[#fbbf24] inline-flex h-[100px] w-[100px] select-none items-center justify-center overflow-hidden rounded-full align-middle border-4 border-white"}>
                    <Avatar.Image
                        className={"h-full w-full rounded-[inherit] object-cover"}
                        src={user?.photoURL}
                        alt={"User Avatar"}
                    />
                    <Avatar.Fallback className={"text-black text-2xl font-bold"} delayMs={600}>
                        {user?.displayName?.charAt(0).toUpperCase() + user?.displayName?.charAt(1)}
                    </Avatar.Fallback>
                </Avatar.Root>
            </DropdownMenu.Trigger>
        </DropdownMenu.Root>
        <span className={"text-white text-2xl font-bold mt-2"}>{user.displayName}</span>
    </Link>
}