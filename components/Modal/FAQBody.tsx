"use client"

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export const FAQBody = () => {
    return (
        <div className="flex flex-col pb-8 max-w-3xl mx-auto text-left">
            <div className="space-y-6 divide-y divide-border">
                <Disclosure as="div" className="pt-6">
                    {
                        ({ open }) => (
                            <>
                                <dt className="text-lg">
                                    <Disclosure.Button
                                        className="text-left w-full flex flex-col sm:flex-row justify-between items-start text-border space-y-1 sm:space-y-0"
                                    >
                                        <span className="font-medium text-textblack text-lg md:text-xl">Can I sign up even though I already have a utility account?</span>
                                        <span className="sm:ml-6 h-7 flex items-center text-green-700">
                                            <span className="text-base text-green-700 pr-1">
                                                {open ? "Hide" : "View"}
                                            </span>
                                            <ChevronDownIcon className={clsx(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')} aria-hidden="true" />
                                        </span>
                                    </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className="mt-2">
                                    <div className="flex flex-col text-left text-textblack/80 text-base md:text-lg">
                                        <div>Find a recent bill from Con Edison (most of the time you can find this in your email inbox)</div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )
                    }
                </Disclosure>
                <Disclosure as="div" className="pt-6">
                    {
                        ({ open }) => (
                            <>
                                <dt className="text-lg">
                                    <Disclosure.Button
                                        className="text-left w-full flex flex-col sm:flex-row justify-between items-start text-border space-y-1 sm:space-y-0"
                                    >
                                        <span className="font-medium text-textblack text-lg md:text-xl">
                                            If I already have service, will I experience any interruptions?
                                        </span>
                                        <span className="sm:ml-6 h-7 flex items-center text-green-700">
                                            <span className="text-base text-green-700 pr-1">
                                                {open ? "Hide" : "View"}
                                            </span>
                                            <ChevronDownIcon className={clsx(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')} aria-hidden="true" />
                                        </span>
                                    </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className="mt-2">
                                    <div className="flex flex-col text-left text-textblack/80 text-base md:text-lg">
                                        <div>Find a recent bill from Con Edison (most of the time you can find this in your email inbox)</div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )
                    }
                </Disclosure>
                <Disclosure as="div" className="pt-6">
                    {
                        ({ open }) => (
                            <>
                                <dt className="text-lg">
                                    <Disclosure.Button
                                        className="text-left w-full flex flex-col sm:flex-row justify-between items-start text-border space-y-1 sm:space-y-0"
                                    >
                                        <span className="font-medium text-textblack text-lg md:text-xl">Does Cottage sell my information?</span>
                                        <span className="sm:ml-6 h-7 flex items-center text-green-700">
                                            <span className="text-base text-green-700 pr-1">
                                                {open ? "Hide" : "View"}
                                            </span>
                                            <ChevronDownIcon className={clsx(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')} aria-hidden="true" />
                                        </span>
                                    </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className="mt-2">
                                    <div className="flex flex-col text-left text-textblack/80 text-base md:text-lg">
                                        <div>Find a recent bill from Con Edison (most of the time you can find this in your email inbox)</div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )
                    }
                </Disclosure>
                <Disclosure as="div" className="pt-6">
                    {
                        ({ open }) => (
                            <>
                                <dt className="text-lg">
                                    <Disclosure.Button
                                        className="text-left w-full flex flex-col sm:flex-row justify-between items-start text-border space-y-1 sm:space-y-0"
                                    >
                                        <span className="font-medium text-textblack text-lg md:text-xl">
                                            Your service is free but what happens if I want to delete my account?
                                        </span>
                                        <span className="sm:ml-6 h-7 flex items-center text-green-700">
                                            <span className="text-base text-green-700 pr-1">
                                                {open ? "Hide" : "View"}
                                            </span>
                                            <ChevronDownIcon className={clsx(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')} aria-hidden="true" />
                                        </span>
                                    </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className="mt-2">
                                    <div className="flex flex-col text-left text-textblack/80 text-base md:text-lg">
                                        <div>Find a recent bill from Con Edison (most of the time you can find this in your email inbox)</div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )
                    }
                </Disclosure>
                <Disclosure as="div" className="pt-6">
                    {
                        ({ open }) => (
                            <>
                                <dt className="text-lg">
                                    <Disclosure.Button
                                        className="text-left w-full flex flex-col sm:flex-row justify-between items-start text-border space-y-1 sm:space-y-0"
                                    >
                                        <span className="font-medium text-textblack text-lg md:text-xl">What happens if I move?</span>
                                        <span className="sm:ml-6 h-7 flex items-center text-green-700">
                                            <span className="text-base text-green-700 pr-1">
                                                {open ? "Hide" : "View"}
                                            </span>
                                            <ChevronDownIcon className={clsx(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')} aria-hidden="true" />
                                        </span>
                                    </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className="mt-2">
                                    <div className="flex flex-col text-left text-textblack/80 text-base md:text-lg">
                                        <div>Find a recent bill from Con Edison (most of the time you can find this in your email inbox)</div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )
                    }
                </Disclosure>
            </div>
        </div>
    );
}