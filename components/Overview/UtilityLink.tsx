"use client";

import { ElectricAccountStore, PropertyStore, ResidentStore } from "@/store";
import { Database } from "@/types/db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import HomeIcon from '@/assets/icons/home.svg'
import PaperPlaneIcon from '@/assets/icons/paper-plane.svg'
import CheckIcon from '@/assets/icons/check.svg'
import AlertSoft from '@/assets/icons/alert-soft.svg'
import clsx from "clsx";
import { BaseBadge, BaseButton, BaseIcon, ElementsCard, OverviewReferralStep, UtilityConnectForm } from "@/components";
import { ClientShow } from "@/components/page/index";

export const UtilityLink = () => {
    const { property } = PropertyStore();
    const { resident, updateResident } = ResidentStore();
    const supabase = createClientComponentClient<Database>();
    const { electricAccount } = ElectricAccountStore();
    const updateResidentRegistrationValue = async () => {
        await updateResident({
            isRegistrationComplete: true
        });
    }
    return (
        <ClientShow>
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
                    {
                        electricAccount?.isAccountLinkedWithUtility &&
                        <p className="text-xl">
                            Good to go! We've got everything we need to get you renewable energy.
                        </p>
                    }
                    {
                        !electricAccount?.isAccountLinkedWithUtility &&
                        <p className="text-xl">Before we can get you renewable energy, we need to link with your utility account.</p>
                    }
                    <ElementsCard className="w-full max-w-4xl !p-0">
                        <div className="flex flex-col divide-y divide-border">
                            <div className="flex flex-col p-5">
                                {/* <ClientOnly> */}
                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex flex-row space-x-1">
                                        {
                                            electricAccount?.isAccountLinkedWithUtility &&
                                            <div
                                                className="bg-green-700 rounded-full h-6 w-6 flex items-center justify-center"
                                            >
                                                <BaseIcon icon={<CheckIcon />} className="text-white text-lg" />
                                            </div>
                                        }
                                        {
                                            !electricAccount?.isAccountLinkedWithUtility &&
                                            <div className="h-6 w-6 flex items-center justify-center">
                                                <BaseIcon icon={<AlertSoft />} className="text-xl" />
                                            </div>
                                        }
                                        <div className="text-xl font-semibold text-forrest-700">Link Utility Account</div>
                                    </div>
                                    <div className="hidden md:block">
                                        {
                                            !electricAccount?.isAccountLinkedWithUtility &&
                                            <BaseBadge badgeStyle="error"> Action Needed </BaseBadge>
                                        }
                                        {
                                            electricAccount?.isAccountLinkedWithUtility &&
                                            <BaseBadge badgeStyle="success"> Complete </BaseBadge>
                                        }
                                    </div>
                                </div>
                                <UtilityConnectForm />
                                {/* </ClientOnly> */}
                            </div>
                            <div className="flex flex-col p-5">
                                <div className="flex flex-col-reverse md:flex-row justify-between w-full space-y-2 md:space-y-0 space-y-reverse">
                                    <div className={clsx("flex flex-row space-x-1", !electricAccount?.isAccountLinkedWithUtility ? 'opacity-40' : '')}>
                                        <div className="h-6 w-6">
                                            <BaseIcon icon={<PaperPlaneIcon />} className="text-xl" />
                                        </div>
                                        <div className="text-xl font-semibold text-forrest-700">Share green energy with friends!</div>
                                    </div>
                                    <div>
                                        {
                                            !electricAccount?.isAccountLinkedWithUtility &&
                                            <BaseBadge badgeStyle="disabled"> Not Started </BaseBadge>
                                        }
                                        {
                                            electricAccount?.isAccountLinkedWithUtility &&
                                            <BaseBadge> Pending </BaseBadge>
                                        }
                                    </div>
                                </div>
                                {
                                    electricAccount?.isAccountLinkedWithUtility &&
                                    <OverviewReferralStep />
                                }
                            </div>
                        </div>
                    </ElementsCard>
                    {electricAccount?.isAccountLinkedWithUtility &&
                        <div className="flex items-center justify-center py-2">
                            <BaseButton onClick={updateResidentRegistrationValue}>Go to Dashboard</BaseButton>
                        </div >
                    }
                </div >
            </div >
        </ClientShow>
    );
}