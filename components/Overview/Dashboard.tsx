"use client";

import clsx from 'clsx';
import { useMemo } from 'react';
import Link from "next/link";
import { BaseIcon, ElementsCard } from "@/components";
import ConfettiIcon from '@/assets/icons/confetti.svg'
import { ElectricBillStore, OccupancyStore, PropertyStore, ResidentStore } from '@/store'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';

import HomeIcon from '@/assets/icons/home.svg';
import LoadingIcon from '@/assets/icons/loading.svg'
import GreenImpactIcon from '@/assets/icons/green-impact.svg'
import { monthAndYear } from '@/utils/format';

export const Dashboard = () => {
    const { occupancy } = OccupancyStore();
    const { property } = PropertyStore();
    const { resident } = ResidentStore();
    const { getElectricityBills, loaded: isBillsLoaded, bills, fetchingData: fetchingElectricData } = ElectricBillStore();
    const supabase = createClientComponentClient<Database>();

    const monthToMonthDiff = useMemo(() => {
        if (bills.length >= 2) {
            const lastMonth = bills[1].totalUsage;
            const thisMonth = bills[0].totalUsage;
            return (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(0);
        } else {
            return "--";
        }
    }, [bills]);

    (async () => {
        try {
            await getElectricityBills();
        } catch (e) {
            // console.error(e);
        }
    })();

    return (
        <div className="flex flex-col space-y-8">
            <div className="flex flex-row w-full">
                <BaseIcon icon={<HomeIcon />} className="text-2xl pr-2" />
                <div className="text-2xl font-bold text-forrest-700">
                    {property.addressID?.street}
                    {property.unitNumber ? ", Apt. " + property.unitNumber : ""}
                </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-1 space-y-6">
                    <ElementsCard
                        className=""
                        cardTitle="Last Month's Usage"
                        cardSubTitle={
                            bills.length > 0
                                ? (monthAndYear(bills[0]?.startDate) ?? '-') + ' - ' + (monthAndYear(bills[0]?.endDate) ?? '-')
                                : 'Coming Soon'
                        }
                    >
                        {bills.length > 0 &&
                            <div className="flex flex-row justify-between">
                                <div className="text-[2.5rem] leading-10 font-bold">{bills[0]?.totalUsage ?? "0.00"}<span className="text-lg"> kWh</span></div>
                                <div className="flex flex-col text-right">
                                    <span className={clsx(monthToMonthDiff < 0 ? 'text-green-700' : 'text-rose-700', "text-2xl font-bold leading-6")}>{monthToMonthDiff}%</span>
                                    <span>from last month</span>
                                </div>
                            </div>
                        }
                        {bills.length <= 0 &&
                            <div className="flex flex-col items-center">
                                <BaseIcon icon={<LoadingIcon />} className="text-5xl pb-4" />
                                <div className="text-base text-center">
                                    You don't have any billing history just yet. Check back after your first billing cycle.
                                </div>
                            </div>
                        }
                        {
                            bills.length > 0 &&
                            <div className="text-center pt-2">
                                <Link className="text-lg text-green-700 underline font-bold text-center" href="/app/insights">
                                    View Usage Summary
                                </Link>
                            </div>
                        }
                    </ElementsCard>
                </div>
                <div className="col-span-1 space-y-6">
                    <ElementsCard className="" cardTitle="Outstanding Balance">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col items-center pt-4">
                                <BaseIcon icon={<ConfettiIcon />} className="text-5xl" />
                                <div className="text-xl pt-4">No Balance Due</div>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <tbody className="divide-y divide-gray-200">
                                            {
                                                bills.slice(0, 3).map((bill) =>
                                                (<tr key={bill.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium text-gray-900 sm:pl-6 md:pl-0">
                                                        {monthAndYear(bill?.startDate) ?? "-"}
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-base font-bold sm:pr-6 md:pr-0">
                                                        ${bill.totalAmountDue}
                                                    </td>
                                                </tr>)
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {
                            bills.length > 0 &&
                            <Link className="text-lg text-green-700 underline font-bold text-center" href="/app/billing">
                                View Bill History
                            </Link>
                        }
                    </ElementsCard >
                </div >
                <div className="col-span-1 space-y-6">
                    <ElementsCard className="" cardTitle="Impact Report" cardSubTitle="Coming Soon">
                        <div className="flex flex-col items-center">
                            <BaseIcon icon={<GreenImpactIcon />} className="text-5xl pb-4" />
                            <div className="text-base text-center">After your first month, come back to see just how much your positive impact is.</div>
                        </div>
                    </ElementsCard>
                </div>
            </div >
        </div >
    );
}