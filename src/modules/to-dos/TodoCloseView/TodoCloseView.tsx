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
        <div className="border border-white/10 p-6 backdrop-blur-2xl bg-black/20 rounded-xl focus:outline-none">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-4xl font-semibold flex gap-1 items-baseline">
                    {todo.title}
                    {todo.isPublic ?
                        <Tooltip.Provider>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <IconLockOpen color={"green"} stroke={"1.5"}/>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade z-[100] data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] px-1.5 py-1 text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
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
                                        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade z-[100] data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] px-1.5 py-1 text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                                        sideOffset={5}
                                    >
                                        <span className="text-red-700 font-semibold">Private</span>
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>
                    }
                </h2>
                <div className={"flex items-center gap-2"}>
                    <span className={"text-gray-300"}>Priority:</span>
                    <div className={`rounded-full text-xs py-1 px-2 ${priorityColors[todo.priority]} text-white`}>
                        {todo.priority}
                    </div>
                </div>
            </div>
            <p className="text-gray-300 mb-4">
                {todo.description}
            </p>
            <button
                onClick={() => setOpenCloseView(false)}
                className={"hover:border-white/60 border-transparent border-2 text-white disabled:bg-gray-400 py-1 px-2 bg-white/10 rounded-lg transition duration-300 ease-in-out"}
            >
                Close
            </button>
        </div>
    );
}
