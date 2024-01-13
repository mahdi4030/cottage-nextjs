"use client";
import { BaseIcon, OverviewUtilityLinkPage } from "@/components";
import { ElectricAccountStore, ResidentStore } from '@/store'

import { ElectricStatus } from '@/types/enums';
import { OverviewDashboard, OverviewIdentityPage } from '@/components';

import LogoFlattenedAnimated from "@/assets/icons/logo-flattened-animated.svg"
import { useEffect, useState } from "react";

export default function Main() {
    const { resident } = ResidentStore();
    const { electricAccount } = ElectricAccountStore();

    let showStep = 0;
    if (resident?.isRegistrationComplete)
        showStep = 0;
    else if (electricAccount?.status === ElectricStatus.NEW || electricAccount?.status === ElectricStatus.PENDING_CREATE)
        showStep = 1;
    else if (!resident?.isRegistrationComplete &&
        (electricAccount?.status === ElectricStatus.PENDING_LINK || electricAccount?.status === ElectricStatus.ACTIVE))
        showStep = 2;
    else
        showStep = 3;

    const [isClientShow, setIsClientShow] = useState(false);
    useEffect(() => {
        setIsClientShow(true);
    }, []);
    if (!isClientShow) return <></>;
    return (
        <>
        {showStep == 0 &&
                <OverviewDashboard />
            }
            {
                showStep == 1 &&
                <OverviewIdentityPage />
            }
            {
                showStep == 2 &&
                <OverviewUtilityLinkPage />
            }
            {
                showStep == 3 &&
                <div>
                    <div className="py-16 flex flex-row items-center justify-center">
                        <BaseIcon icon={<LogoFlattenedAnimated />} style={{fontSize: "160px", strokeWidth: "4"}} />
                    </div>
                </div>
            }
        </>
    )
}