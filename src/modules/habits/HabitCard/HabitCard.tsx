"use client"
import {motion} from "framer-motion";
import {Emoji} from "emoji-picker-react";
import {twMerge} from "tailwind-merge";
import {deleteHabit, setCompleationOnHabit} from "@/utils/habits/habitsFunctions";
import React, {useState} from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import {IconTrash} from "@tabler/icons-react";

interface Habit {
    data: {
        title: string; emoji: string; isPublic: boolean; isDoneToday: boolean; streak: number;
    }
    id: string;
    index: number;
}

export function HabitCard({data, id, index}: Habit) {

    const [isDoneToday, setIsDoneToday] = useState(data.isDoneToday);

    const handlClick = () => {
        if (isDoneToday){
            setIsDoneToday(false);
            setCompleationOnHabit(id, false);
        } else {
            setIsDoneToday(true);
            setCompleationOnHabit(id, true);
        }
    }

    const handleDelete = () => {
        deleteHabit(id).then(r => console.log(r));
    }

    return (<motion.div
        className={"w-32 flex flex-col items-center"}
        initial={{"opacity": 0, scale: 0.8}}
        animate={{"opacity": 1, scale: 1}}
        transition={{duration: 0.3, delay: index * 0.1}}
        key={data.title}
    >
        <button
            onClick={handlClick}
            className={twMerge("w-10/12 mx-auto aspect-square relative rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 ease-in-out text-3xl sm:text-5xl border-white border-2 shadow-white shadow-md flex-wrap", isDoneToday && "shadow-green-300 border-green-300 bg-green-300/20 hover:bg-green-300/30")}>
                <span
                    className={"absolute h-full w-full flex items-center justify-center top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                        <Emoji unified={data.emoji} size={70}/>
                </span>
        </button>
        <div className={"flex items-center gap-2"}>
            <p className={"text-center text-white font-semibold text-xl mt-3 capitalize"}>{data.title}</p>
            <AlertDialog.Root>
                <AlertDialog.Trigger
                >
                    <IconTrash stroke={1.5} className={"text-red-800 top-1.5 relative hover:text-red-600 transition-all duration-300 ease-in-out"}/>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay className={"bg-black/40 fixed inset-0 z-40"}/>
                    <AlertDialog.Content
                        className={"fixed z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] lg:w-auto lg:min-w-[400px] w-11/12"}
                    >
                        <motion.div
                            initial={{opacity: 0, scale: 0.8, y: 10}}
                            animate={{opacity: 1, scale: 1, y: 0}}
                            className={"border border-white/10 p-6 backdrop-blur-xl bg-black/0 rounded-xl focus:outline-none"}
                        >
                            <AlertDialog.Title className={"text-white text-2xl font-semibold"}>
                                ❌Delete Habit❌
                            </AlertDialog.Title>
                            <AlertDialog.Description
                                className={"text-white/70 mt-2 text-lg mb-4 font-semibold"}>
                                Are you sure you want to delete your habit? This action cannot be undone.
                            </AlertDialog.Description>
                            <div className={"flex gap-4"}>
                                <AlertDialog.Cancel
                                    className={"hover:border-white/60 border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-white/10 rounded-lg transition duration-300 ease-in-out"}
                                >
                                    Cancel
                                </AlertDialog.Cancel>
                                <AlertDialog.Action
                                    onClick={handleDelete}
                                    className={"hover:border-white border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-[#d90816] rounded-lg transition duration-300 ease-in-out"}
                                >
                                    Delete Habit
                                </AlertDialog.Action>
                            </div>
                        </motion.div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
        <p className={"text-center text-white font-semibold"}>
            Streak: <strong className={"text-pink-600 text-lg"}>{isDoneToday ? data.streak + 1 : data.streak}</strong>
        </p>
    </motion.div>)
}