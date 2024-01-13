import { ElementsCard } from "@/components";
import Main from "@/components/page/create-new-password/Main";

export default function CreateNewPassword() {

    return (
        <div className="w-screen flex flex-col px-4">
            <section className="w-full">
                <div className="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
                    <ElementsCard className="flex text-center md:p-12 max-w-2xl">
                        <h2 className="pb-8">Create New Password</h2>
                        <div className="text-xl">Enter your new password</div>
                        <div className="text-base italic text-center mt-1">Passwords must be at least 8 characters in length</div>
                        <div className="flex flex-col items-center md:flex-start justify-between w-full">
                            <Main />
                        </div>
                    </ElementsCard>
                </div>
            </section>
        </div>
    );
}
