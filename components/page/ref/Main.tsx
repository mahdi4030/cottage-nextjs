"use client";
import { BaseButton, BaseIcon, ModalFAQBody, ModalInfo } from "@/components";
import { RegistrationStore } from "@/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useIntercom } from "react-use-intercom";

import CottageLogoSVG from "@/assets/img/logo/cottage-logo-combined-green.svg";
import DownArrowIcon from '@/assets/icons/dropdown-arrow.svg'
import GreenEarthIcon from '@/assets/icons/green-earth.svg'
import DecreaseCost from '@/assets/icons/decrease-cost.svg'
import BriefcaseManage from '@/assets/icons/briefcase-manage.svg'

export default function Main() {
    const [validReferral, setValidReferral] = useState(false);
    const [referrerName, setReferrerName] = useState("");
    const { registration, setRegistration } = RegistrationStore();
    const router = useRouter();
    const params = useParams();
    const { referralCode } = params;
    useEffect(() => {
        (async () => {
            if (referralCode) {
                try {
                    const data = await (await fetch("/api/referrals/get-referrer/" + referralCode, {
                        method: "get",
                    })).json();
                    setValidReferral(true);
                    setReferrerName(data.firstName)
                    setReferrerName(data.firstName);
                    setRegistration({ ...registration, referrerCode: referralCode });
                } catch (error) {
                    console.error("ERROR IS ", error);
                    setRegistration({ ...registration, referrerCode: "" });
                }
            }
        })();
    }, []);

    const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
    const closeFAQModal = () => {
        setIsFAQModalOpen(false);
    }

    const { showNewMessage } = useIntercom();

    const openChat = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        showNewMessage("I'd like a little more help understanding Cottage...");
    }
    return (
        <>
            <div>
                <ModalInfo isModalOpen={isFAQModalOpen} maxWidth="max-w-5xl" closeModal={closeFAQModal} header="Common FAQs">
                    <ModalFAQBody />
                </ModalInfo>
            </div>
            <div className="pt-6 flex items-center justify-center">
                <span className="logo-wrapper z-30">
                    <Link href="/">
                        <CottageLogoSVG className="h-auto w-40" />
                    </Link>
                </span>
            </div>
            <div className="flex md:flex-row flex-col mt-12 container w-full m-auto items-center text-left z-10 xl:max-w-6xl justify-center">
                {
                    validReferral &&
                    <div className="flex flex-col items-center">
                        <h1 className="text-center text-5xl">Hi, there 👋</h1>
                        <div className="py-12 text-center">
                            <div className="text-2xl">
                                <b>{referrerName} </b>
                                is inviting you to the easiest way to save money on your electric bill
                            </div>
                            <div className="text-2xl pt-4">And you can do a little something to for the planet as well 🌎</div>
                        </div>
                        <BaseButton className="w-full md:w-48 pt-2 md:pt-0" style="md:w-48 px-4 text-lg" href="/onboarding/address" size="large">
                            Get Started
                        </BaseButton>
                    </div>
                }
                {
                    !validReferral &&
                    <div className="flex flex-col items-center">
                        <h2 className="text-center">We couldn't find that referral code... but you can still sign up!</h2>
                        <div className="py-12 text-center">
                            <div className="text-2xl">Cottage is the easiest way to save money on your electric bill</div>
                            <div className="text-2xl pt-4">And you can do a little something to for the planet as well 🌎</div>
                        </div>
                        <BaseButton className="w-full md:w-48 pt-2 md:pt-0" style="'md:w-48 px-4 text-lg'" href="/onboarding/address" btn-size="large">
                            Get Started
                        </BaseButton>
                    </div>
                }
            </div>
            <div className="flex flex-col font-bold py-10 relative items-center pb-20">
                Want to learn more?
                <BaseIcon icon={<DownArrowIcon />} className="pt-2 w-auto move-up-and-down" style={{ fontSize: "2rem" }} />
            </div>
            <section className="w-full pt-16 pb-20 bg-tan-500">
                <div className="flex flex-col container m-auto items-center px-6 lg:px-0 xl:max-w-6xl">
                    <h2 className="text-center">Why Cottage?</h2>
                    {/* <ClientOnly> */}
                    <p className="text-center pb-4 lg:py-8">
                        Cottage is a <b> </b>
                        <a
                            v-tooltip="{
								content:
									'Cottage is free and always will be. We make money through referral fees from our suppliers but NOT by selling your data. If you choose to use one of our partner suppliers, theys pay us a small fee for connecting you with them.',
								triggers: ['hover', 'click'],
							}"
                            className="font-bold text-green-700 underline"
                        >
                            free
                        </a>
                        <b> smart energy management </b>
                        platform. We are not a utility company.
                    </p>
                    {/* </ClientOnly> */}
                    <div className="flex flex-col">
                        <ul className="text-left max-w-xl">
                            <li className="py-3 flex flex-row">
                                <BaseIcon icon={<GreenEarthIcon />} className="text-4xl mr-4" />
                                <p>
                                    <b>Go green. </b>
                                    Subscribe to renewable energy from clean sources like solar and wind for the cost of a cup of coffee a month
                                </p>
                            </li>
                            <li className="py-3 flex flex-row">
                                <BaseIcon icon={<DecreaseCost />} className="text-4xl mr-4" />
                                <p>
                                    <b>Save money. </b>
                                    We monitor the market for savings opportunities and automatically apply them for you
                                </p>
                            </li>
                            <li className="py-3 flex flex-row">
                                <BaseIcon icon={<BriefcaseManage />} className="text-4xl mr-4" />
                                <p>
                                    <b>Set it and forget it. </b>
                                    We help manage your electricity account. If you don’t have an account yet, we take care of that too
                                </p>
                            </li>
                        </ul>
                        <p className="text-center mt-4">
                            What else can we answer? <b> </b>
                            <a className="block md:inline text-green-700 underline cursor-pointer font-semibold" onClick={() => setIsFAQModalOpen(true)}>
                                View more FAQs
                            </a><b> </b>
                            or<b> </b>
                            <a className="text-green-700 underline cursor-pointer font-semibold" onClick={openChat}>open up a chat</a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}