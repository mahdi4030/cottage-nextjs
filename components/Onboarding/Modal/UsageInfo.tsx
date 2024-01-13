"use client";
import clsx from "clsx";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { BaseIcon, ModalInfo } from '@/components'

import InvoiceIcon from '@/assets/icons/invoice.svg'
import ConsumptionIcon from '@/assets/icons/consumption.svg'
import ElectricityIcon from '@/assets/icons/electricity.svg'
import AccountIcon from '@/assets/icons/account.svg'
import PrivacyIcon from '@/assets/icons/privacy.svg'
type UsageInfoProps = {
    isOpen: boolean;
    closeAction: Function;
}
export const UsageInfo: React.FC<Partial<UsageInfoProps>> = ({
    isOpen = false,
    closeAction = () => { }
}) => {
    return (
        <ModalInfo isModalOpen={isOpen} closeModal={closeAction} header="What information does Cottage collect?">
            <div className="flex flex-col w-full items-center">
                <p className="text-forrest-700 text-center mt-4 leading-5">Connect your utility account and the following data:</p>
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
                                                <ChevronUpIcon className={clsx(open ? 'rotate-180 transform' : '', "h-6 w-6 text-green-700")} />
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
                                ((open) => (
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
                                ))
                            }
                        </Disclosure>
                        <Disclosure as="div" className="px-4 pb-2">
                            {
                                (({ open }) => (
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
                                ))
                            }
                        </Disclosure>
                        <Disclosure as="div" className="px-4 pb-2">
                            {
                                (({ open }) => (
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
                                ))
                            }
                        </Disclosure>
                    </div>
                </div>
                <div className="flex flex-row bg-green-700/10 p-5 rounded-lg text-left space-x-4 md:mx-4 mb-2 items-center">
                    <BaseIcon icon={<PrivacyIcon />} className="text-3xl" />
                    <div className="text-forrest-700 text-base leading-4">
                        Your privacy matters to us. We do not sell your data and whenever you delete your Cottage account, we also delete your
                        personal data.
                    </div>
                </div>
            </div>
        </ModalInfo>
    );
}