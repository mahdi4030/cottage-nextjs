import OpenChat from "@/components/page/onboarding/start/OpenChat";
import FormNavigationClient from '@/components/page/onboarding/start/FormNavigationClient';

export default function Onboarding() {

    // const isNextDisabled = false;
    return (
        <div className="flex flex-col container m-auto items-center md:px-6 xl:max-w-6xl">
            <h2 className="text-center leading-tight">
                Hi, there 👋
                <br />
                Welcome to Cottage!
            </h2>
            {/* <ClientOnly> */}
            <div className="p-6 flex flex-col text-center items-center">
                <p className="text-center pb-4 max-w-4xl">
                    Cottage is a<b> </b>
                    <a
                        v-tooltip="{
							content:
								'Cottage is free and always will be. We make money through referral fees from our partners but NOT by selling your data. If you choose to use one of our partners, they pay us a small fee for connecting you with them.',
							triggers: ['hover', 'click'],
						}"
                        className="font-bold text-green-700 underline"
                    >free</a>

                    <b> green energy management</b> platform. <br />We <b>power-up</b> electricity accounts to reduce carbon emissions and save on
                    energy bills.
                </p>
                <h3 className="pt-4">What's next?</h3>
                <ul className="relative text-left pt-2 ml-0 md:ml-20 max-w-lg">
                    <li className="pb-10 pl-6 border-l-2 border-green-700 flex flex-row space-x-4">
                        <span
                            className="flex absolute -left-4 justify-center items-center w-8 h-8 bg-green-700 rounded-full ring-8 ring-tan-200 font-semibold text-xl pt-1 text-white"
                        >
                            1
                        </span>
                        <p className="pt-2 text-textblack">Enter your address</p>
                    </li>
                    <li className="pb-6 pl-6 border-l-2 border-green-700 flex flex-row space-x-4">
                        <span
                            className="flex absolute -left-4 justify-center items-center w-8 h-8 bg-green-700 rounded-full ring-8 ring-tan-200 font-semibold text-xl pt-1 text-white"
                        >
                            2
                        </span>
                        <p className="mb-1 text-textblack">
                            <b>Connect your electric account</b> (if you don't have one, we handle signing you up for electricity)
                        </p>
                    </li>
                    <li className="pl-6 flex flex-row space-x-4">
                        <span
                            className="flex absolute -left-4 justify-center items-center w-8 h-8 bg-green-700 rounded-full ring-8 ring-tan-200 font-semibold text-xl pt-1 text-white"
                        >
                            3
                        </span>
                        <p className="mb-1 text-textblack">
                            Cottage works in the background for you and <b>promises no disruption to service or unexpected charges</b>
                        </p>
                    </li>
                </ul>
                <p className="text-center mt-8">
                    Want to know more before starting? <br />
                    {/* <a className="text-green-700 underline cursor-pointer font-semibold" onClick={openChat}>Open up a chat</a> */}
                    <OpenChat />
                </p>
            </div>
            <div className="container lg:px-6 pb-4">
                <FormNavigationClient />
            </div>
            {/* </ClientOnly> */}
            <svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
