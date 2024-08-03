"use client"
import React from 'react';
import {IconLock, IconLockOpen} from "@tabler/icons-react";
import * as Tooltip from '@radix-ui/react-tooltip';

interface ToDo {
    todo: {
        title: string;
        description: string;
        priority: string;
        isPublic: boolean;
    }
    setOpenCloseView: React.Dispatch<React.SetStateAction<boolean>>;
}

const priorityColors: { [key: string]: string } = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
};

export function TodoCloseView({ todo, setOpenCloseView }: ToDo) {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto z-50">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-4xl font-semibold flex gap-1 items-center">
                    {todo.title}
                    {todo.isPublic ?
                        <Tooltip.Provider>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <IconLockOpen color={"green"} stroke={"1.5"}/>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-gray-200 px-1.5 py-1 text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                                        sideOffset={5}
                                    >
                                        <span className="text-green-800 font-semibold">Public</span>
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider> :
                        <Tooltip.Provider>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <IconLock color={"red"} stroke={"1.5"}/>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-gray-200 px-1.5 py-1 text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                                        sideOffset={5}
                                    >
                                        <span className="text-red-700 font-semibold">Private</span>
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>
                    }
                </h2>
                <div className={`rounded-full text-xs py-1 px-2 ${priorityColors[todo.priority]} text-white`}>
                    {todo.priority}
                </div>
            </div>
            <p className="text-gray-300 mb-4">
                {todo.description}
            </p>
            <button
                onClick={() => setOpenCloseView(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
            >
                Close
            </button>
        </div>
    );
}
