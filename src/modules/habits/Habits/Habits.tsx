"use client"
import {HabitCard} from "@/modules/habits/HabitCard/HabitCard";
import {useEffect, useState} from "react";
import {createHabit, getAllHabits} from "@/utils/habits/habitsFunctions";
import {Loading} from "@/modules/utils/Loading/Loading";

interface Habit {
    data: any
    id: string
}

export function Habits() {

    const [habits, setHabits] = useState<Habit[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchHabits() {
            try {
                const result = await getAllHabits();
                setHabits(result);
                setLoading(false)
            } catch (error: any) {
                setError(error.message);
            }
        }

        fetchHabits();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <div className={"text-red-700"}>Error: {error}</div>;
    }

    return <div className={"flex items-stretch w-full flex-wrap lg:w-full gap-8"}>
        {habits.map((habit, index) => (
            <HabitCard key={habit.id} data={habit.data} index={index}/>
        ))}
        {habits.length === 0 && <div className={"w-full text-center text-2xl font-semibold text-white/80"}>Create some Habit&apos;s</div>}
    </div>
}