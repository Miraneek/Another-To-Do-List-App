"use client"
import * as Dialog from '@radix-ui/react-dialog';
import React from "react";
import {ToDoCreateForm} from "@/modules/to-dos/To-doCreate/ToDoCreateForm";

export function ToDoCreateModal() {

    const [open, setOpen] = React.useState(false);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <button className={"hover:border-white border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-[#e500a4] rounded-lg transition duration-300 ease-in-out"}>
                    Create new to-do
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay
                    className="bg-[rgba(0,0,0,0.5)] z-50 top-0 left-0 right-0 bottom-0 fixed grid place-content-center text-black">
                    <Dialog.Content
                        className="fixed z-50 top-[50%] left-[50%] translate-x-[-50%] lg:w-auto lg:min-w-[400px] w-[90vw] translate-y-[-50%] rounded-xl focus:outline-none">
                        <ToDoCreateForm setOpen={setOpen}/>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}