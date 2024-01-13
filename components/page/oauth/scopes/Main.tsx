
"use client";

import clsx from "clsx";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

import { BaseButton, BaseIcon, ElementsCard, ModalInfo } from "@/components";
import { useAuth } from "@/composables/useAuth";
import useUtilityIntegration from "@/composables/useUtilityIntegration";
import { AppStore, GreenButtonOAuthStore, RegServicesStore, ResidentStore } from "@/store";
import { Database } from "@/types/db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import CircleCheckIcon from '@/assets/icons/circle-check.svg'
import LogoFlattenedAnimatedIcon from '@/assets/icons/logo-flattened-animated.svg'
import InvoiceIcon from '@/assets/icons/invoice.svg'
import ElectricityIcon from '@/assets/icons/electricity.svg'
import ConsumptionIcon from '@/assets/icons/consumption.svg'
import AccountIcon from '@/assets/icons/account.svg'
import PrivacyIcon from '@/assets/icons/privacy.svg'

export default function Main() {
    const { oAuthConfig } = useUtilityIntegration();
    const { greenButton, setGreenButton } = GreenButtonOAuthStore();
    const { getResident } = ResidentStore();
    const { user } = AppStore();
    const supabase = createClientComponentClient<Database>();
    const [processingRequest, setProcessingRequest] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const router = useRouter();

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const redirectToUtility = async () => {
        const searchParams = useSearchParams();
        const accountid = searchParams.get("accountid");
        const startdate = searchParams.get("startdate");
        const enddate = searchParams.get("enddate");
        const DataCustodianID = searchParams.get("DataCustodianID");

        // Manually creating backup cookies in case the Green Button Cookies Didnt Sync
        if (startdate) {
            const [greenButtonStartDate, setGreenButtonStartDate] = useCookies(["greenButtonStartDate"])
            setGreenButtonStartDate("greenButtonStartDate", startdate as string, {
                path: "/",
                maxAge: 3600
            })
            setGreenButton({ ...greenButton, startDate: (startdate as string) ?? "" });
        }
        if (enddate) {
            const [greenButtonEndDate, setGreenButtonEndDate] = useCookies(["greenButtonEndDate"]);
            setGreenButtonEndDate("greenButtonEndDate", enddate as string, {
                path: "/",
                maxAge: 3600
            });
            setGreenButton({ ...greenButton, endDate: (enddate as string) ?? "" });
        }

        const [electricCompany, setElectricCompany] = useCookies(["electricCompany"]);

        if (DataCustodianID) {
            if (DataCustodianID === "ConEdison") {
                setElectricCompany("electricCompany", "CON_EDISON", {
                    path: "/",
                    maxAge: 3600
                })
            } else if (DataCustodianID === "ComEd") {
                setElectricCompany("electricCompany", "COM_ED", {
                    path: "/",
                    maxAge: 3600
                })
            } else {
                setElectricCompany("electricCompany", "ORU", {
                    path: "/",
                    maxAge: 3600
                })
            }
        }
        setProcessingRequest(true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.location.href = oAuthConfig(electricCompany).SCOPES_REDIRECT_URL;
    };
    useEffect(() => {
        (async () => {
            if (user) {
                try {
                    await getResident();
                    setIsPageLoading(false);
                } catch (error) {
                    console.error("ERROR DURING GETTING PROFILE", error);
                    // TODO: HANDLE NO ACCOUNT SO GET STARTED WITH OAUTH
                    await useAuth().logout();

                    router.push("/no-account");
                }
            }
        })();
    }, [user]);
    return (
        <>
            {/* <ClientOnly> */}
            <div>
                <ModalInfo isModalOpen={isModalOpen} closeModal={closeModal} header="How Cottage uses this information">
                    <div className="flex flex-col py-4 max-w-2xl mx-auto text-left">
                        <div className="mx-auto">
                            <ul className="text-left space-y-2">
                                <li className="py-2 flex flex-row">
                                    <BaseIcon icon={<CircleCheckIcon />} className="text-2xl mr-2" />
                                    <div className="text-lg md:text-xl">
                                        As we find new ways to save you money, we
                                        <b>provide personalized recommendations</b>
                                        based on your usage profile
                                    </div>
                                </li>
                                <li className="py-2 flex flex-row">
                                    <BaseIcon icon={<CircleCheckIcon />} className="text-2xl mr-2" />
                                    <div className="text-lg md:text-xl">
                                        We break down your utility statements directly in Cottage and provide
                                        <b>a more transparent explanation of your consumption</b>
                                    </div>
                                </li>
                                <li className="py-2 flex flex-row">
                                    <BaseIcon icon={<CircleCheckIcon />} className="text-2xl mr-2" />
                                    <div className="text-lg md:text-xl">
                                        Based on your past consumption, we can provide
                                        <b>accurate forecasts of your upcoming bills</b>
                                        so you're never surprised
                                    </div>
                                </li>
                                <li className="py-2 flex flex-row">
                                    <BaseIcon icon={<CircleCheckIcon />} className="text-2xl mr-2" />
                                    <div className="text-lg md:text-xl">
                                        Hate having multiple internet accounts? Connecting your data allows us to provide
                                        <b>a single platform to manage your energy</b>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </ModalInfo>
            </div>
            {/* </ClientOnly> */}
            {/* <ClientOnly> */}
            <section className="w-full">
                <div className="flex flex-col mt-6 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
                    <ElementsCard className="flex text-center md:p-12 shadow-md bg-white rounded-xl max-w-2xl items-center">
                        {
                            isPageLoading &&
                            <div>
                                <div className="flex flex-col md:px-20 py-8 w-full text-center items-center max-w-2xl">
                                    <div className="py-12">
                                        <BaseIcon icon={<LogoFlattenedAnimatedIcon />} style={{ fontSize: "160px", strokeWidth: "4" }} />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            !isPageLoading &&
                            <div>
                                <h2 className="pb-4">Connecting your accounts</h2>
                                <div className="flex flex-col w-full max-w-lg">
                                    <div className="text-forrest-700 text-lg md:text-xl text-center mt-4 leading-5">
                                        Connect your utility account and the following data:
                                    </div>
                                    <div className="w-full text-left py-2">
                                        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2 w-full">
                                            <Disclosure as="div" className="px-4 pb-2">
                                                {
                                                    ({ open }) => (
                                                        <>
                                                            <Disclosure.Button
                                                                className="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
                                                            >
                                                                <div className="text-lg md:text-xl inline-flex">
                                                                    <BaseIcon icon={<InvoiceIcon />} className="text-2xl mr-2" />
                                                                    <span>Billing data</span>
                                                                </div>
                                                                <div className="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
                                                                    <ChevronUpIcon className={clsx("h-6 w-6 text-green-700", open ? 'rotate-180 transform' : '')} />
                                                                </div>
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel className="pb-2 pt-1 text-base text-textblack/80">
                                                                Utility bill amounts, due dates, service dates
                                                            </Disclosure.Panel>
                                                        </>
                                                    )
                                                }
                                            </Disclosure>
                                            <Disclosure as="div" className="px-4 pb-2">
                                                {
                                                    ({ open }) => (
                                                        <>
                                                            <Disclosure.Button
                                                                className="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
                                                            >
                                                                <div className="text-lg md:text-xl inline-flex">
                                                                    <BaseIcon icon={<ElectricityIcon />} className="text-2xl mr-2" />
                                                                    <span>Consumption data</span>
                                                                </div>
                                                                <div className="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
                                                                    <ChevronUpIcon className={clsx(open ? 'rotate-180 transform' : '', "h-6 w-6 text-green-700")} />
                                                                </div>
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel className="pb-2 pt-1 text-base text-textblack/80">
                                                                Monthly energy consumption, electricity rate
                                                            </Disclosure.Panel>
                                                        </>
                                                    )
                                                }
                                            </Disclosure>
                                            <Disclosure as="div" className="px-4 pb-2">
                                                {
                                                    ({ open }) => (
                                                        <>
                                                            <Disclosure.Button
                                                                className="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
                                                            >
                                                                <div className="text-lg md:text-xl inline-flex">
                                                                    <BaseIcon icon={<ConsumptionIcon />} className="text-2xl mr-2" />
                                                                    <span>Real-time data</span>
                                                                </div>
                                                                <div className="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
                                                                    <ChevronUpIcon className={clsx(open ? 'rotate-180 transform' : '', "h-6 w-6 text-green-700")} />
                                                                </div>
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel className="pb-2 pt-1 text-base text-textblack/80">
                                                                Hourly energy usage profile as reported by your smart meter
                                                            </Disclosure.Panel>
                                                        </>
                                                    )
                                                }

                                            </Disclosure>
                                            <Disclosure as="div" className="px-4 pb-2">
                                                {
                                                    ({ open }) => (
                                                        <>
                                                            <Disclosure.Button
                                                                className="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
                                                            >
                                                                <div className="text-lg md:text-xl inline-flex">
                                                                    <BaseIcon icon={<AccountIcon />} className="text-2xl mr-2" />
                                                                    <span>Customer information</span>
                                                                </div>
                                                                <div className="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
                                                                    <ChevronUpIcon className={clsx(open ? 'rotate-180 transform' : '', "h-6 w-6 text-green-700")} />
                                                                </div>
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel className="pb-2 pt-1 text-base text-textblack/80">
                                                                Utility account number, service address, utility service type (electric, gas, etc.)
                                                            </Disclosure.Panel>
                                                        </>
                                                    )
                                                }
                                            </Disclosure>
                                        </div>
                                    </div>
                                    <div className="flex flex-row bg-green-700/10 p-5 rounded-lg text-left space-x-4 md:mx-4 mb-2 items-center">
                                        <BaseIcon icon={<PrivacyIcon />} className="text-3xl" />
                                        <div className="text-forrest-700 text-base leading-4">
                                            Your privacy matters to us. We do not sell your data and whenever you delete your Cottage account, we also
                                            delete your personal data.
                                        </div>
                                    </div>
                                    <a className="text-lg text-center mt-4 text-green-700 underline cursor-pointer font-semibold" onClick={() => setIsModalOpen(true)}>
                                        Why does Cottage want access to this information?
                                    </a>
                                    <BaseButton
                                        size="large"
                                        style={clsx('w-full font-semibold leading-6 text-white hover:bg-green-200 transition ease-in-out duration-150', processingRequest ? 'cursor-not-allowed' : '')}
                                        type="primary"
                                        className="flex w-full mt-6"
                                        disabled={processingRequest}
                                        onClick={redirectToUtility}
                                    >
                                        {
                                            !processingRequest &&
                                            <div >Accept</div>
                                        }
                                        {
                                            !processingRequest &&
                                            <div className="inline-flex items-center space-x-2">
                                                <svg
                                                    className="animate-spin -mt-1 h-6 w-6 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                <span>Processing Request...</span>
                                            </div>
                                        }
                                    </BaseButton>
                                </div>
                            </div>
                        }

                    </ElementsCard >
                </div >
            </section >
            {/* </ClientOnly> */}
        </>
    )
}