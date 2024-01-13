import { ElementsCard } from "@/components";
import Retry from "@/components/page/oauth/end-date-error/Retry";

export default function EndDateError() {

    return (
        <div className="w-screen flex flex-col px-4">
            <section className="w-full">
                <div className="flex flex-col mt-6 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
                    <ElementsCard className="flex text-center md:p-12 shadow-md bg-white rounded-xl max-w-3xl items-center w-full">
                        <h2 className="pb-4">Increase the sharing timeframe</h2>
                        <div className="flex flex-col w-full max-w-2xl pt-4">
                            <div className="text-forrest-700 text-lg text-center">
                                To make sure Cottage can continously work in the background for you, we need ongoing access to your usage. When prompted
                                to select a timeframe, select
                                <b> Share it until I revoke it </b>
                                from the drop down.
                            </div>
                            <img className="object-cover w-full py-4" src="~/assets/img/coned/coned-share-timeframe.png" alt="" />
                            <Retry />
                        </div>
                    </ElementsCard>
                </div>
            </section >
        </div >
    )
}