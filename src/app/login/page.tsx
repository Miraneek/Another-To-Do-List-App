import {LoginForm} from "@/modules/auth/LoginForm";

export default function page() {

    return <main className={"min-h-full flex flex-col items-center justify-center h-[90vh] t-20 lg:mt-0"}>
        <LoginForm/>
    </main>
}