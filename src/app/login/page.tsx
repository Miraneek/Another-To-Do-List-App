import {LoginForm} from "@/modules/auth/LoginForm";

export default function page() {

    return <main className={"min-h-full flex flex-col items-center justify-center h-[90vh] mt-20 lg:mt-4"}>
        <LoginForm/>
    </main>
}