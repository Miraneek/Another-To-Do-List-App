import {motion} from "framer-motion";

interface Habit {
    data: {
        title: string;
        emoji: string;
        isPublic: boolean;
        isDoneToday: boolean;
        streak: number;
    }
    index: number
}

export function HabitCard({data, index}: Habit) {

    return <motion.div
        className={"w-24"}
        initial={{"opacity": 0, scale: 0.8}}
        animate={{"opacity": 1, scale: 1}}
        transition={{duration: 0.3, delay: index * 0.1}}
        key={data.title}
    >
        <div
            className={"aspect-square relative rounded-full bg-[#222228] text-3xl sm:text-5xl border-white border-2 shadow-white shadow-md flex-wrap"}>
            <span className={"absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                {data.emoji}
            </span>
            <span
                className={"absolute -bottom-4 right-0 text-2xl drop-shadow text-red-700 font-bold text-center"}>{data.streak}</span>
        </div>
        <p className={"text-center text-white font-semibold text-xl mt-3 capitalize"}>{data.title}</p>
    </motion.div>
}