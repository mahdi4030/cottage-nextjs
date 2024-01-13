import { ElementsCard } from "@/components";
import Main from "@/components/page/oauth/signin/Main";

export default function Signin() {
    
    return (
        <div className="w-screen flex flex-col px-4">
            <section className="w-full">
                <div className="flex flex-col mt-6 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
                    <ElementsCard className="flex flex-col text-center justify-center items-center md:p-12 max-w-2xl w-full">
                        <h2 className="pb-8">Sign in to link accounts</h2>
                        <Main />
                    </ElementsCard >
                </div >
            </section >
        </div >
    )
}