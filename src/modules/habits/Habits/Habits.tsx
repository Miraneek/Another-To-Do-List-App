"use client"
import {HabitCard} from "@/modules/habits/HabitCard/HabitCard";
import {useEffect, useState} from "react";
import {getAllHabits} from "@/utils/habits/habitsFunctions";
import {Loading} from "@/modules/utils/Loading/Loading";
import {HabitCreate} from "@/modules/habits/HabitCreate/HabitCreate";

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

    return <div className={"flex items-stretch lg:justify-start justify-center w-full flex-wrap lg:w-full gap-8"}>
        {habits.map((habit, index) => (<HabitCard key={habit.id} data={habit.data} id={habit.id} index={index}/>))}
        <HabitCreate index={habits.length + 1}/>
    </div>
}