"use client"
import * as Dialog from '@radix-ui/react-dialog';
import React from "react";
import {ToDoCreateForm} from "@/modules/to-dos/To-doCreate/ToDoCreateForm";

export function ToDoCreateModal() {

    const [open, setOpen] = React.useState(false);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
                className={"hover:border-white border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-[#e500a4] rounded-lg transition duration-300 ease-in-out"}>
                Create new to-do
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay
                    className={"bg-black/40 fixed inset-0 z-40"}>
                    <Dialog.Content
                        className="border w-11/12 border-white/10 p-6 backdrop-blur-xl bg-black/0 lg:w-auto lg:min-w-[400px] rounded-xl focus:outline-none fixed z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <ToDoCreateForm setOpen={setOpen}/>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}