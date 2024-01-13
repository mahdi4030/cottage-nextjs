"use client";

import { BaseButton, BaseIcon, ChartsInsights, ElementsCard } from "@/components";
import { ElectricAccountStore, ElectricBillStore } from "@/store";
import { useEffect, useMemo, useState } from "react";

import LinkedIcon from "@/assets/icons/linked.svg"
import LogoFlattenedAnimatedIcon from "@/assets/icons/logo-flattened-animated.svg"
import LoadingIcon from "@/assets/icons/loading.svg"

export default function EnergyConsumption() {
    const { electricAccount } = ElectricAccountStore();

    const [hasErrors, setHasErrors] = useState(false);
    const [activeGranularity, setActiveGranularity] = useState("YEAR");
    const { getElectricityBills, bills, loaded } = ElectricBillStore();

    const chartData = useMemo(() => {
        const billsToSort = [...bills];
        const sortedBills = billsToSort.sort(function (a, b) {
            return new Date(a.startDate) - new Date(b.startDate);
        });
        return sortedBills;
    }, [bills]);

    useEffect(() => {
        getElectricityBills().then(() => { }).catch(e => { console.error(e); setHasErrors(true) })
    }, []);
    return (
        <ElementsCard className="text-center items-center w-full md:w-3/4 inline-block">
            <div className="flex justify-between w-full">
                <h3>Energy Consumption</h3>
            </div>
            {
                !electricAccount?.isAccountLinkedWithUtility &&
                <div className="py-8 flex flex-col items-center justify-center flex-grow space-y-4">
                    <BaseIcon icon={<LinkedIcon />} className="min-w-fit text-5xl" />
                    <div className="text-lg leading-tight">You still need to connect your utility account to take full advantage of Cottage</div>
                    <BaseButton href="/app/account#utility-account">Connect My Account</BaseButton>
                </div>
            }
            {
                electricAccount?.isAccountLinkedWithUtility && !loaded &&
                <div className="py-8">
                    <BaseIcon icon={<LogoFlattenedAnimatedIcon />} style={{ fontSize: "120px", strokeWidth: "4" }} />
                </div>
            }
            {
                electricAccount?.isAccountLinkedWithUtility && loaded && bills.length > 0 &&
                <ChartsInsights chartData={chartData} />
            }
            {
                electricAccount?.isAccountLinkedWithUtility && loaded && bills.length == 0 &&
                <div className="py-8 flex flex-col items-center justify-center flex-grow">
                    <BaseIcon icon={<LoadingIcon />} className="text-5xl pb-4" />
                    <p>
                        It doesn't look like you have any usage history just yet. <br />
                        Check back later.
                    </p>
                </div>
            }
        </ElementsCard>
    )
}