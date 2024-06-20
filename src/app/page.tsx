import {ToDos} from "@/modules/to-dos/ToDos/ToDos";
import {ToDoCreateModal} from "@/modules/to-dos/To-doCreate/ToDoCreateModal";
export default function Page() {
    return <>
        <section className={"lg:w-8/12 w-full flex flex-col items-center mx-auto pt-10"}>
            <div className={"flex justify-center relative w-full flex-col p-4"}>
                <h1 className={"text-4xl font-semibold my-10"}>Your habits</h1>
            </div>
            <div className={"flex justify-center relative w-full flex-col p-4"}>
                <h1 className={"text-4xl font-semibold my-10"}>{"Your to-do's"}</h1>
                <div className={"lg:absolute top-14 right-5 bg-white p-2 rounded-lg text-black"}>
                    <ToDoCreateModal/>
                </div>
            </div>
            <ToDos/>
        </section>
    </>
}