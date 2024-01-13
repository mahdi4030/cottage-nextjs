import { BaseButton, BaseIcon, ElementsCard } from "@/components";

import SadIcon from '@/assets/icons/sad.svg'
import OpenChat from "@/components/page/oauth/error/OpenChat";

export default function Error() {
    
    return (
        <div className="w-screen flex flex-col px-4">
            <section className="w-full">
                <div className="flex flex-col mt-6 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
                    <ElementsCard className="flex text-center md:p-12 shadow-md bg-white rounded-xl max-w-2xl items-center w-full">
                        <h2 className="pb-4">Oops! That didn't work...</h2>
                        <BaseIcon icon={<SadIcon />} className="py-4" style={{fontSize: "5rem"}} />
                        <div className="flex flex-col w-full max-w-lg pt-4">
                            <div className="text-forrest-700 text-xl text-center">
                                Something went wrong... Mind trying again?
                                <br />
                                If this keeps happening,<b> </b>
                                <OpenChat /><b> </b>
                                or give us a call<b> </b>
                                <a className="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a><b> </b>
                            </div>
                            <BaseButton href="/oauth/coned/scopes" type="primary" style="w-full" className="flex mt-8 w-full" size="large">
                                Try Again
                            </BaseButton>
                        </div>
                    </ElementsCard>
                </div>
            </section >
        </div >
    )
}