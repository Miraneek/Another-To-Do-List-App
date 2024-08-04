import {ToDos} from "@/modules/to-dos/ToDos/ToDos";
import {ToDoCreateModal} from "@/modules/to-dos/To-doCreate/ToDoCreateModal";
import {Habits} from "@/modules/habits/Habits/Habits";
export default function Page() {
    return <>
        <section className={"lg:w-6/12 w-10/12 flex flex-col items-center mx-auto mt-10"}>
            <div className={"flex justify-center relative w-full flex-col p-4"}>
                <h1 className={"text-4xl font-semibold my-6 lg:text-start text-center"}>Your habits</h1>
            </div>
            <Habits/>
            <div className={"flex justify-center relative w-full gap-4 flex-col lg:items-stretch items-center my-8"}>
                <h1 className={"text-4xl font-semibold m-0"}>{"Your to-do's"}</h1>
                <div className={"lg:absolute block right-5 top-1"}>
                    <ToDoCreateModal/>
                </div>
            </div>
            <ToDos/>
        </section>
    </>;
}