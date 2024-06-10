"use client"
import {ToDos} from "@/modules/to-dos/ToDos/ToDos";
import {useAuth} from "@/modules/auth/AuthContextProvider";
import {ToDoCreateModal} from "@/modules/to-dos/To-doCreate/ToDoCreateModal";
export default function Page() {

    const {logOut} = useAuth()

    const handleClick = async () => {
        logOut()
    }

    return <>
        <section className={"lg:w-8/12 w-full flex flex-col items-center mx-auto"}>
            <div className={"flex justify-center relative w-full flex-col p-4"}>
                <h1 className={"text-4xl font-semibold my-10"}>{"Your to-do's"}</h1>
                <div className={"lg:absolute top-14 right-5 bg-white p-2 rounded-lg text-black"}>
                    <ToDoCreateModal/>
                </div>
            </div>
            <ToDos/>
            <button onClick={handleClick} className={"absolute top-5 right-5 text-2xl"}>log out</button>
        </section>
    </>
}