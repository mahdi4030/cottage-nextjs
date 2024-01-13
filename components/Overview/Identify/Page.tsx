"use client";

import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import Link from "next/link";
import { BaseBadge, BaseIcon, ElementsCard, OverviewIdentityStep1, OverviewReferralStep } from "@/components";
import ConfettiIcon from '@/assets/icons/confetti.svg'
import { ElectricBillStore, OccupancyStore, PropertyStore, ResidentStore } from '@/store'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';

import HomeIcon from '@/assets/icons/home.svg';
import CheckIcon from '@/assets/icons/check.svg'
import AlertSoftIcon from '@/assets/icons/alert-soft.svg'
import PlugStartIcon from '@/assets/icons/plug-start.svg'
import PaperPlaneIcon from '@/assets/icons/paper-plane.svg'
import LoadingIcon from '@/assets/icons/loading.svg'
import GreenImpactIcon from '@/assets/icons/green-impact.svg'
import { monthAndYear } from '@/utils/format';

export const IdentifyPage = () => {
    const { property } = PropertyStore();
    const { resident, checkResidentIdentity, isResidentIdentityComplete, isResidentIdentityLoaded } = ResidentStore();
    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        (async () => {
            const user = (await supabase.auth.getSession()).data.session?.user;
            if (user)
                checkResidentIdentity(user.id);
        })();
    }, [])

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-row w-full justify-center">
                <BaseIcon icon={<HomeIcon />} className="text-2xl pr-2" />
                {/* <ClientOnly> */}
                <div className="text-2xl font-bold text-forrest-700">
                    {property.addressID?.street}
                    {property.unitNumber ? ", Apt. " + property.unitNumber : ""}
                </div>
                {/* </ClientOnly> */}
            </div>
            <div className="flex flex-col w-full items-center space-y-4">
                {isResidentIdentityComplete && <p className="text-xl">We’ve got everything we need and got things handled from here!</p>}
                {!isResidentIdentityComplete && <p className="text-xl">We need a couple more details to make sure you’re all set.</p>}
                <ElementsCard className="w-full max-w-4xl !p-0">
                    <div className="flex flex-col divide-y divide-border">
                        <div className="flex flex-col p-5">
                            {/* <ClientOnly> */}
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex flex-row space-x-1">
                                    {isResidentIdentityComplete && isResidentIdentityLoaded &&
                                        <div
                                            className="bg-green-700 rounded-full h-6 w-6 flex items-center justify-center"
                                        >
                                            <BaseIcon icon={<CheckIcon />} className="text-white text-lg" />
                                        </div>}
                                    {
                                        !(isResidentIdentityComplete && isResidentIdentityLoaded) &&
                                        <div className="h-6 w-6 flex items-center justify-center">
                                            <BaseIcon icon={<AlertSoftIcon />} className="text-xl" />
                                        </div>
                                    }
                                    <div className="text-xl font-semibold text-forrest-700">Identity Verification Info</div>
                                </div>
                                <div className="hidden md:block">
                                    {
                                        !isResidentIdentityComplete && isResidentIdentityLoaded &&
                                        <BaseBadge badgeStyle="error">
                                            Missing Details
                                        </BaseBadge>
                                    }
                                    {
                                        !(!isResidentIdentityComplete && isResidentIdentityLoaded) &&
                                        <BaseBadge badge-style="success"> Complete </BaseBadge>
                                    }
                                </div>
                            </div>
                            {
                                !isResidentIdentityComplete && isResidentIdentityLoaded &&
                                <OverviewIdentityStep1 />
                            }
                            {/* </ClientOnly> */}
                        </div>
                        <div className="flex flex-col p-5">
                            {
                                !isResidentIdentityComplete && isResidentIdentityLoaded &&
                                <div
                                    className="flex flex-col-reverse md:flex-row justify-between w-full space-y-2 md:space-y-0 space-y-reverse"
                                >
                                    <div className="flex flex-row space-x-1">
                                        <div className="h-6 w-6 opacity-40">
                                            <BaseIcon icon={<PlugStartIcon />} className="text-xl" />
                                        </div>
                                        <div className="text-xl font-semibold text-forrest-700/40">Cottage sets up your utility account</div>
                                    </div>
                                    <div>
                                        <BaseBadge badgeStyle="disabled"> Not Started </BaseBadge>
                                    </div>
                                </div>
                            }
                            {
                                !(!isResidentIdentityComplete && isResidentIdentityLoaded) &&
                                <div>
                                    <div className="flex flex-col-reverse md:flex-row justify-between w-full space-y-2 md:space-y-0 space-y-reverse">
                                        <div className="flex flex-row space-x-2">
                                            <svg
                                                className="motion-safe:animate-spin h-6 w-6 text-green-700"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            <div className="text-xl font-semibold text-forrest-700">
                                                Setting up your account to start on <b> </b>
                                                {
                                                    new Date(resident.startServiceDate??"".replace(/-/g, "\/").replace(/T.+/, "")).toLocaleDateString("en", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <BaseBadge> Pending </BaseBadge>
                                        </div>
                                    </div>
                                    <p className="text-base text-textblack/80 mt-1">
                                        Don’t worry, you’ll have electricity the day you move in. Questions? Give us a call at <b> </b>
                                        <span className="text-green-700">(646) 847-7885</span>
                                    </p>
                                </div>
                            }
                        </div>
                        <div className="flex flex-col p-5">
                            <div className="flex flex-col-reverse md:flex-row justify-between w-full space-y-2 md:space-y-0 space-y-reverse">
                                <div className={clsx("flex flex-row space-x-1", !isResidentIdentityComplete ? 'opacity-40' : '')}>
                                    <div className="h-6 w-6">
                                        <BaseIcon icon={<PaperPlaneIcon />} className="text-xl" />
                                    </div>
                                    <div className="text-xl font-semibold text-forrest-700">Share green energy with friends!</div>
                                </div>
                                <div>
                                    {!isResidentIdentityComplete && isResidentIdentityLoaded &&
                                        <BaseBadge badge-style="disabled">
                                            Not Started
                                        </BaseBadge>
                                    }
                                    {
                                        !(!isResidentIdentityComplete && isResidentIdentityLoaded) &&
                                        <BaseBadge> Pending </BaseBadge>
                                    }
                                </div>
                            </div>
                            {isResidentIdentityComplete && isResidentIdentityLoaded &&
                                <OverviewReferralStep />
                            }
                        </div>
                    </div>
                </ElementsCard>
            </div >
        </div >
    );
}