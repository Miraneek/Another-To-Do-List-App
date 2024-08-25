"use client"
import {motion} from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import React, {useState} from "react";
import {createHabit} from "@/utils/habits/habitsFunctions";
import EmojiPicker, {Emoji, EmojiClickData, EmojiStyle, Theme} from "emoji-picker-react";
import {Loading} from "@/modules/utils/Loading/Loading";
import {useAuth} from "@/modules/auth/AuthContextProvider";

interface HabitData {
    title: string;
    emoji: string;
}

export function HabitCreate({index}: { index: number }) {

    const [open, setOpen] = useState(false);
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<HabitData>({
        title: '',
        emoji: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {user} = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        if (type === 'checkbox') {
            const {checked} = e.target as HTMLInputElement;
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: checked
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.emoji) {
            setEmojiPickerOpen(true);
            return;
        }
        if (!formData.title) {
            setError('Please add a title to your habit');
            return;
        }
        setIsSubmitting(true);
        createHabit({...formData}).then(
            () => {
                setOpen(false);
                setIsSubmitting(false);
                window.location.reload();
            }
        );
    };

    const handleEmojiPicker = (emoji: EmojiClickData) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            emoji: emoji.unified
        }));
        setEmojiPickerOpen(false);
    };

    return <motion.div
        className={"w-32"}
        initial={{"opacity": 0, scale: 0.8}}
        animate={{"opacity": 1, scale: 1}}
        transition={{duration: 0.3, delay: 0.1 * index}}
    >
        <div
            className={"aspect-square w-10/12 mx-auto relative rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 ease-in-out text-3xl sm:text-5xl border-white border-2 shadow-white/50 hover:shadow-white/90 shadow-md flex-wrap"}>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger
                    className={"absolute top-[46%] left-1/2 -translate-x-1/2 w-full h-full -translate-y-1/2"}>
                    +
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay
                        className="bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0 fixed grid place-content-center text-black z-50">
                        <Dialog.Content
                            className="fixed top-[50%] left-[50%] translate-x-[-50%] lg:w-auto lg:min-w-[400px] w-[90vw] translate-y-[-50%] rounded-xl focus:outline-none">
                            <form onSubmit={handleSubmit}
                                  className="border border-white/10 p-6 backdrop-blur-2xl bg-black/20 rounded-xl focus:outline-none">
                                <div className="flex flex-col mb-4">
                                    <h2 className="text-white text-xl mb-4">Create Habit</h2>
                                    <div className="mb-4">
                                        <label className="block text-white mb-2" htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full p-2 border-2 border-white/20 bg-black/20 rounded-lg text-white placeholder-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-white text-xl mb-4">Emoji:</h2>
                                        {formData.emoji ?
                                            <button onClick={() => setEmojiPickerOpen(true)}>
                                                <Emoji unified={formData.emoji ? formData.emoji : "1f600"}
                                                       emojiStyle={EmojiStyle.APPLE} size={70}/>
                                            </button>
                                            : <button onClick={() => setEmojiPickerOpen(true)}
                                                      className="text-white text-xl mb-4">Select emoji</button>
                                        }
                                        <Dialog.Root open={emojiPickerOpen} onOpenChange={setEmojiPickerOpen}>
                                            <Dialog.Portal>
                                                <Dialog.Overlay
                                                    className={"bg-black/20 top-0 left-0 right-0 bottom-0 fixed grid place-content-center text-black z-50"}/>
                                                <Dialog.Content
                                                    className={"fixed top-[50%] left-[50%] translate-x-[-50%] lg:w-auto lg:min-w-[400px] z-50 w-[90vw] translate-y-[-50%] rounded-xl focus:outline-none"}>
                                                    <Dialog.Title>
                                                        <h2 className="text-white text-xl mb-4 text-center font-bold w-full">Select an emoji</h2>
                                                    </Dialog.Title>
                                                    <motion.div
                                                        initial={{"opacity": 0, scale: 0.8, y: -10}}
                                                        animate={{"opacity": 1, scale: 1, y: 0}}
                                                        transition={{duration: 0.3, delay: 0.1}}
                                                    >
                                                        <EmojiPicker onEmojiClick={(e) =>
                                                            handleEmojiPicker(e)
                                                        } open={emojiPickerOpen} theme={Theme.DARK}/>
                                                    </motion.div>
                                                </Dialog.Content>
                                            </Dialog.Portal>
                                        </Dialog.Root>
                                    </div>
                                </div>
                                {error && <p className={"text-red-500 mb-2 text-sm font-semibold"}>{error}</p>}
                                <div className={"flex gap-2"}>
                                    <button type="submit" disabled={isSubmitting || user.email === 'showcase@showcase.cz'}
                                            className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-[#e500a4] hover:border-white border-transparent border-2 text-white py-1 px-2 rounded-md transition duration-300 ease-in-out">
                                        {isSubmitting ? <Loading/> : 'Create'}
                                    </button>
                                    <Dialog.Close
                                        className={"hover:border-white/60 border-transparent border-2 text-white disabled:bg-gray-400 py-1 px-2 bg-white/10 rounded-lg transition duration-300 ease-in-out"}
                                    >
                                        Close
                                    </Dialog.Close>
                                </div>
                            </form>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
        <p className={"text-center text-white font-semibold text-xl mt-3 capitalize"}>Create Habit</p>
    </motion.div>
}