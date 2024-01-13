"use client";
import { useAuth } from "@/composables/useAuth";
import { ResidentStore } from "@/store"
import { useRouter } from "next/navigation";

import "@/assets/scss/components/Global/AccountDropdown.scss";
import { Menu, Transition } from "@headlessui/react";
import { BaseIcon } from "@/components";
import clsx from "clsx";

import DropdownArrowIcon from '@/assets/icons/dropdown-arrow.svg'
import UserIcon from '@/assets/icons/user.svg'
import LogoutIcon from '@/assets/icons/logout.svg'
import Link from "next/link";

type AccountDropdownType = {
    className?: string;
}

export const AccountDropdown:React.FC<Partial<AccountDropdownType>> = ({className = ""}) => {
    const { resident } = ResidentStore();
    const auth = useAuth();
    const router = useRouter();
    const logout = async () => {
        if (await auth.logout()) {
            return router.push("/");
        }
    }
    return (
        <div className={className}>
            {/* <ClientOnly> */}
            {
                resident !== undefined &&
                <Menu as="div" className="relative text-left z-40">
                    <div>
                        <Menu.Button
                            className="inline-flex justify-center w-full rounded-xl border border-border account-dropdown p-1 sm:p-2 bg-white text-sm font-medium text-forrest-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-700"
                        >
                            <div className="flex items-center">
                                <div className="bg-green-700 rounded-lg mr-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                                    {resident?.firstName &&
                                        <div className="text-white font-cooper text-lg sm:text-xl p-1.5">
                                            {resident?.firstName.charAt(0) + (resident?.lastName ?? "").charAt(0)}
                                        </div>
                                    }
                                </div>
                                <div className="hidden sm:block text-xl font-medium text-forrest-700 pl-1">
                                    {resident?.firstName}
                                </div>
                                <BaseIcon icon={<DropdownArrowIcon />} className="text-sm md:text-xl sm:ml-2 text-green-700 sm:px-2" />
                            </div>
                        </Menu.Button>
                    </div>

                    <Transition
                        enter-active-classname="transition ease-out duration-100"
                        enter-from-classname="transform opacity-0 scale-95"
                        enter-to-classname="transform opacity-100 scale-100"
                        leave-active-classname="transition ease-in duration-75"
                        leave-from-classname="transform opacity-100 scale-100"
                        leave-to-classname="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-2xl shadow-lg bg-white ring-1 ring-border focus:outline-none"
                        >
                            <div className="py-2 px-3">
                                <div className="py-3 pb-4 px-0 mx-4 text-xl font-medium border-b border-border">
                                    {resident?.firstName + " " + resident?.lastName}
                                </div>
                                <Menu.Item>
                                    {
                                        ({ active, close }) => (
                                            <Link
                                                href="/app/account"
                                                onClick={close}
                                                className={clsx(active ? 'bg-gray-100 text-green-700' : 'text-gray-700', 'block px-3 py-3 text-lg rounded-lg mt-2')}
                                            >
                                                <span className="flex flex-row text-xl">
                                                    <BaseIcon icon={<UserIcon />} className="min-w-fit text-2xl mr-3" />
                                                    Profile
                                                </span>
                                            </Link>
                                        )
                                    }
                                </Menu.Item>
                                <Menu.Item>
                                    {
                                        ({ active }) => (
                                            <button
                                                className={clsx(active ? 'bg-gray-100 text-green-700' : 'text-gray-700', 'block px-3 py-3 text-lg rounded-lg w-full')}
                                                onClick={logout}
                                            >
                                                <span className="flex flex-row text-xl">
                                                    <BaseIcon icon={<LogoutIcon />} className="min-w-fit text-2xl mr-3" />
                                                    Logout
                                                </span>
                                            </button>
                                        )
                                    }
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            }
            {/* </ClientOnly> */}
        </div >
    );
}