"use client"
import {useAuth} from "@/modules/auth/AuthContextProvider";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React from "react";
import Link from "next/link";

export function UserAvatar() {

    const {user, logOut} = useAuth()

    return <>
        <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger>
                <Avatar.Root
                    className={"shadow-sm shadow-black bg-amber-400 inline-flex h-[50px] w-[50px] select-none items-center justify-center overflow-hidden rounded-full align-middle"}>
                    <Avatar.Image
                        className={"h-full w-full rounded-[inherit] object-cover"}
                        src={user?.photoURL}
                        alt={"User Avatar"}
                    />
                    <Avatar.Fallback className={"text-black text-2xl font-bold uppercase"} delayMs={600}>
                        {user?.displayName?.charAt(0)}
                    </Avatar.Fallback>
                </Avatar.Root>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className={"bg-white rounded-md outline-none overflow-hidden shadow-2xl text-lg mr-2 font-semibold cursor-pointer"}
                    sideOffset={5}>
                    <DropdownMenu.Item
                        className="flex outline-none hover:bg-gray-100 items-center gap-2 py-1 px-2 text-black">
                        <Link href={"/edit-profile"}>Edit Profile</Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="flex outline-none hover:bg-red-100 items-center gap-2 py-1 px-2 bg-red-50 text-red-900">
                        <button onClick={logOut}>
                            Log Out
                        </button>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    </>
}