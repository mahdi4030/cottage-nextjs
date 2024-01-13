import { ElementsCard, BaseIcon } from "@/components";
import IncomingMessageIcon from '@/assets/icons/incoming-message.svg'

function ForgotPassword() {
    return (
        <div className="w-screen flex flex-col px-4">
            <section className="w-full">
                <div className="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
                    <ElementsCard className="flex flex-col text-center justify-center items-center md:p-12 shadow-md bg-white rounded-xl max-w-2xl w-full">
                        <h2 className="pb-4">Check Your Email</h2>
                        <BaseIcon icon={<IncomingMessageIcon />} className="text-6xl" />
                        <div className="text-forrest-700 pt-8 text-xl">A link will be sent to your email with further instructions.</div>
                    </ElementsCard>
                </div>
            </section>
        </div>
    );
}

export default ForgotPassword;