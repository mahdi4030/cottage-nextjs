import { BaseIcon, ElementsCard } from "@/components";

import PlugSuccess from '@/assets/icons/plug-success.svg'
import GoToDashboard from "@/components/page/oauth/success/GoToDashboard";
export default function Success() {
    
    return (
        <div className="w-screen flex flex-col px-4">
            <section className="w-full">
                <div className="flex flex-col mt-6 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
                    <ElementsCard className="flex text-center md:p-12 shadow-md bg-white rounded-xl max-w-2xl items-center w-full">
                        <h2 className="pb-4">You're plugged in!</h2>
                        <BaseIcon icon={<PlugSuccess />} className="py-4" style={{fontSize: "5rem"}} />
                        <div className="flex flex-col w-full max-w-lg pt-4">
                            <div className="text-forrest-700 text-xl text-center">Your account is now connected to Cottage</div>
                            <GoToDashboard />
                        </div>
                    </ElementsCard>
                </div>
            </section >
        </div >
    )
}