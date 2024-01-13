"use client";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { ElectricIntegrationType, ElectricStatus } from "@/types/enums";
import { ElectricAccountStore, ElectricBillStore, OccupancyStore, RegServicesStore, ResidentStore } from "@/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/db";
import { useState } from "react";
import { useIntercom } from "react-use-intercom";
import { BaseButton, BaseIcon, UtilityConnectStepper, OnboardingModalUsageInfo, OnboardingModalGreenButtonRedirect } from "@/components";
import SadIcon from "@/assets/icons/sad.svg"
export const Form = () => {
    const { occupancy, getOccupancy } = OccupancyStore();
    const { serviceGroup } = RegServicesStore();
    const { fetchElectricData } = ElectricBillStore();
    const { electricAccount, setIsAccountLinkedWithUtility } = ElectricAccountStore();
    const { updateResident } = ResidentStore();
    const supabase = createClientComponentClient<Database>();
    const [isUtilityLinkError, setIsUtilityLinkError] = useState(false);

    const connectedAccount = async (accountData: any) => {
        try {
            const { error } = await supabase
                .from("ElectricAccount")
                .update({
                    accountNumber: accountData.accountNumber.replaceAll("-", ""),
                    isAccountLinkedWithUtility: true,
                    status: ElectricStatus.ACTIVE,
                })
                .eq("id", electricAccount?.id);
            if (error) {
                console.error("Error updating utility account", error);
                setIsUtilityLinkError(true);
            }

            await updateResident({ isRegistrationComplete: true }, false);

            fetchElectricData();
        } catch (error) {
            console.error("Error updating utility account", error);
        }
    }

    const [isUsageInfoModalOpen, setIsUsageInfoModalOpen] = useState(false);
    function closeUsageInfoModal() {
        setIsUsageInfoModalOpen(false);
    }

    const [isGreenButtonRedirectOpen, setIsGreenButtonRedirectOpen] = useState(false);
    const closeGreenButtonRedirect = async () => {
        setIsGreenButtonRedirectOpen(false);
    }
    const { showNewMessage } = useIntercom()
    const openChat = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        showNewMessage("I am having issues connecting my utility account to Cottage.");
    }
    const resetUtilityAccountLink = () => {
        setIsAccountLinkedWithUtility(false);
        setIsUtilityLinkError(false);
    }
    return (
        <div className="flex flex-col items-center justify-between w-full">
            <OnboardingModalUsageInfo isOpen={isUsageInfoModalOpen} closeAction={closeUsageInfoModal} />
            <OnboardingModalGreenButtonRedirect isModalOpen={isGreenButtonRedirectOpen} cancelAction={closeGreenButtonRedirect} />
            {
                electricAccount?.isAccountLinkedWithUtility &&
                <div className="flex flex-col w-full pt-4">
                    <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <div className="p-6 border border-border rounded-lg flex">
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <img className="h-8" src={serviceGroup.electricCompanyID.logoURL} />
                                    </div>
                                    <div className="text-xl font-semibold pb-1">
                                        {electricAccount?.electricCompanyID?.name}
                                    </div>
                                    <div className="text-base">Account Number: {electricAccount?.accountNumber}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                !electricAccount?.isAccountLinkedWithUtility &&
                <div className="flex flex-col w-full">
                    {
                        isUtilityLinkError == true &&
                        <div className="flex flex-col items-center">
                            <h3>Oops! That didn't work...</h3>
                            <BaseIcon icon={<SadIcon />} className="py-4" style={{ fontSize: "5rem" }} />
                            <div className="flex flex-col w-full max-w-lg pt-4">
                                <div className="text-forrest-700 text-xl text-center">
                                    Something went wrong... Mind trying again?
                                    <br />
                                    If this keeps happening,
                                    <a className="underline text-green-700 font-semibold cursor-pointer" onClick={openChat}>open up a chat</a>
                                    or give us a call
                                    <a className="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a>
                                </div>
                                <BaseButton
                                    type="primary"
                                    style="w-full"
                                    className="flex mt-8 w-full"
                                    size="large"
                                    onClick={resetUtilityAccountLink}
                                >
                                    Try Again
                                </BaseButton>
                            </div>
                        </div>
                    }
                    {
                        !electricAccount?.isAccountLinkedWithUtility && isUtilityLinkError == false &&
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col w-full lg:px-20 md:w-2/3 mx-auto pt-4 items-center">
                                <div className="mb-4 mt-2">
                                    <img className="h-8" src={serviceGroup.electricCompanyID.logoURL} />
                                </div>
                                {
                                    serviceGroup.electricCompanyID.isElectricIntegrationActive &&
                                    serviceGroup.electricCompanyID.electricIntegrationType === ElectricIntegrationType.GREENBUTTON &&
                                    <div>
                                        <div className="flex flex-col items-center">
                                            <BaseButton onClick={() => setIsGreenButtonRedirectOpen(true)}>Connect My Account</BaseButton>
                                        </div>
                                    </div>
                                }
                                {
                                    serviceGroup.electricCompanyID.isElectricIntegrationActive &&
                                    serviceGroup.electricCompanyID.electricIntegrationType === ElectricIntegrationType.AUTOMATION &&
                                    <div >
                                        <UtilityConnectStepper connectedAccount={connectedAccount} />
                                    </div>
                                }

                            </div>
                            <p className="pt-4 cursor-pointer font-semibold text-green-700 underline text-base" onClick={(e) => { e.preventDefault(); setIsUsageInfoModalOpen(true) }} >
                                Learn what information we collect and how we use this information
                            </p >
                            <div className="flex flex-row bg-green-50 p-4 text-center rounded-lg my-4 items-center w-full">
                                <div className="text-forrest-700 text-base leading-4 w-full">
                                    We do not sell your data and whenever you delete your Cottage account, we also delete your personal data.
                                </div>
                            </div>
                        </div >
                    }

                </div >
            }
        </div >
    )
}