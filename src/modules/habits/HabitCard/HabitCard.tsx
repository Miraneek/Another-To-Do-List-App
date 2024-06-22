interface Habit {
    data: {
        title: string;
        emoji: string;
        isPublic: boolean;
        isDoneToday: boolean;
        streak: number;
    }
}

export function HabitCard({data}: Habit) {

    return <div className={"w-24"}>
        <div
            className={"aspect-square relative rounded-full bg-[#222228] text-3xl sm:text-5xl border-white border-2 shadow-white shadow-md flex-wrap"}>
            <span className={"absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                {data.emoji}
            </span>
            <span
                className={"absolute -bottom-4 right-0 text-2xl drop-shadow text-red-700 font-bold text-center"}>{data.streak}</span>
        </div>
        <p className={"text-center text-white font-semibold text-xl mt-3 capitalize"}>{data.title}</p>
    </div>
}