import * as Dialog from '@radix-ui/react-dialog';
import React from "react";
import {ToDoCreateForm} from "@/modules/to-dos/To-doCreate/ToDoCreateForm";

export function ToDoCreateModal() {

    const [open, setOpen] = React.useState(false);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <button>Create new to-do</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay
                    className="bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0 fixed grid place-content-center text-black">
                    <Dialog.Content
                        className="fixed top-[50%] left-[50%] translate-x-[-50%] lg:w-auto lg:min-w-[400px] w-[90vw] translate-y-[-50%] rounded-xl focus:outline-none">
                        <ToDoCreateForm setOpen={setOpen}/>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}