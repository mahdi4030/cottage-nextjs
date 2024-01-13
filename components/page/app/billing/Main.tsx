"use client"
import { BaseBadge, BaseIcon, ElementsCard } from "@/components";
import { ElectricBillStore, OccupancyStore, RegServicesStore, RenewableSubscriptionStore } from "@/store";
import { monthAndYear, dayAndMonthAndYear } from "@/utils/format";
import Link from "next/link";
import { useEffect, useState } from "react";

import CircleCheck from '@/assets/icons/circle-check.svg'
import LogoFlattenedAnimatedIcon from '@/assets/icons/logo-flattened-animated.svg'
import clsx from "clsx";

export default function Main() {
    const { occupancy } = OccupancyStore();
    const { renewableSubscription } = RenewableSubscriptionStore();
    const { getElectricityBills, loaded: isBillsLoaded, bills } = ElectricBillStore();
    const [hasErrors, setHasErrors] = useState(false);

    const date = new Date();
    const firstDateOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1).toLocaleDateString();
    useEffect(() => {
        (async () => {
            try {
                await getElectricityBills();
            } catch (e) {
                setHasErrors(true);
            }
        })
    }, []);
    return (
        <>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 space-y-4 md:space-y-0">
                <ElementsCard className="p-8 items-start md:w-1/3">
                    <h3>Last Month's Bill</h3>
                    {
                        !isBillsLoaded &&
                        <div className="py-8 m-auto w-full">
                            <div className="animate-pulse flex space-x-6">
                                <div className="flex flex-col space-y-4">
                                    <div className="h-2 bg-border rounded"></div>
                                    <div className="rounded-lg bg-border h-14 w-32"></div>
                                </div>
                                <div className="flex flex-1 space-y-4 items-end justify-end flex-col">
                                    <div className="h-2 bg-border rounded w-1/2"></div>
                                    <div className="h-2 bg-border rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        isBillsLoaded &&
                        <div className="h-full w-full">
                            <div className="flex flex-row pb-2 pt-2 text-textblack/80">
                                <span>
                                    {monthAndYear(bills[0]?.startDate) ?? "-"} -
                                    {monthAndYear(bills[0]?.endDate) ?? "-"}
                                </span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="text-[2.5rem] leading-10 font-bold">${bills[0]?.totalAmountDue.toFixed(2) ?? "0.00"}</div>
                            </div>
                            {
                                bills.length > 0 &&
                                <div className="text-center mt-4">
                                    <Link className="text-lg text-green-700 underline font-bold text-center" href={`/app/billing/${bills[0].id}`}>
                                        View Detailed Calculations
                                    </Link>
                                </div>
                            }

                        </div>
                    }
                </ElementsCard>
                {
                    occupancy !== null &&
                    <ElementsCard className="p-8 md:w-1/3">
                        <h3>Outstanding Balance</h3>
                        {
                            !isBillsLoaded &&
                            <div className="py-8 m-auto w-full">
                                <div className="animate-pulse flex space-x-6">
                                    <div className="flex flex-col space-y-4">
                                        <div className="h-2 bg-border rounded"></div>
                                        <div className="rounded-lg bg-border h-14 w-32"></div>
                                    </div>
                                    <div className="flex flex-1 space-y-4 items-end justify-end flex-col">
                                        <div className="h-2 bg-border rounded w-1/2"></div>
                                        <div className="h-2 bg-border rounded w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            isBillsLoaded &&
                            <div className="h-full w-full flex flex-col">
                                <div className="flex flex-row pb-2 pt-2">
                                    <BaseIcon icon={<CircleCheck />} className="text-base mt-[2px] mr-1" />
                                    Auto-pay Scheduled for {monthAndYear(bills[0]?.endDate) ?? "-"}
                                </div>
                                <div className="text-[2.5rem] leading-10 font-bold">${bills[0]?.totalAmountDue.toFixed(2) ?? "0.00"}</div>
                                <Link className="text-lg text-center text-green-700 mt-2 font-bold underline" href="/app/account#billing">
                                    Edit Payment Method
                                </Link>
                            </div>
                        }
                    </ElementsCard>
                }
                <ElementsCard className="p-8 md:w-1/3">
                    <h3>Renewable Subscription</h3>
                    {
                        !isBillsLoaded &&
                        <div className="py-8 m-auto w-full">
                            <div className="animate-pulse flex space-x-6">
                                <div className="flex flex-col space-y-4">
                                    <div className="h-2 bg-border rounded"></div>
                                    <div className="rounded-lg bg-border h-14 w-32"></div>
                                </div>
                                <div className="flex flex-1 space-y-4 items-end justify-end flex-col">
                                    <div className="h-2 bg-border rounded w-1/2"></div>
                                    <div className="h-2 bg-border rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        (isBillsLoaded as any && renewableSubscription) &&
                        <div className="h-full w-full flex flex-col">
                            <div className="flex flex-row pb-2 pt-2">
                                <BaseIcon icon={<CircleCheck />} className="text-base mt-[2px] mr-1" />
                                Next Payment {firstDateOfNextMonth}
                            </div>
                            <div className="text-[2.5rem] leading-10 font-bold">
                                ${renewableSubscription.renewableSubscriptionPlan.costPerMonth}<span className="text-lg">/mth</span>
                            </div>
                            <Link href="/app/power-ups" className="text-lg text-center text-green-700 mt-2 font-bold underline cursor-pointer">
                                Edit Subscription
                            </Link>
                        </div>
                    }
                    {
                        isBillsLoaded &&
                        <div className="h-full w-full flex flex-col items-center">
                            <div className="flex flex-row pt-2 text-textblack/80">No Active Subscription</div>
                            <div className="text-2xl leading-10 font-bold">Not Enrolled 😢</div>
                            <Link href="/app/power-ups" className="text-lg text-center text-green-700 mt-2 font-bold underline cursor-pointer">
                                Start Using Green Energy
                            </Link>
                        </div>
                    }
                </ElementsCard>
            </div >
            <div className="flex w-full mt-6">
                <ElementsCard className="text-left items-start w-full">
                    {
                        !isBillsLoaded &&
                        <div className="py-8 m-auto">
                            <BaseIcon icon={<LogoFlattenedAnimatedIcon />} style={{ fontSize: "120px", strokeWidth: "4" }} />
                        </div>
                    }
                    {
                        isBillsLoaded &&
                        <div className="w-full">
                            <h3 className="mb-4">Your Utility Billing History</h3>
                            <div className="-mx-4 mt-2 ring-1 ring-border sm:-mx-6 md:mx-0 md:rounded-lg">
                                <table className="min-w-full divide-y divide-border">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textblack sm:pl-6">Month</th>
                                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-textblack lg:table-cell">
                                                Bill Total
                                            </th>
                                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-textblack lg:table-cell">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bills.map((bill, billIndex) => (
                                                <tr key={bill.id}>
                                                    <td className={clsx(billIndex === 0 ? '' : 'border-t border-transparent', 'relative py-4 pl-4 sm:pl-6 pr-3 text-sm')}>
                                                        <div className="text-lg text-textblack">
                                                            {dayAndMonthAndYear(bill?.startDate) ?? "-"} - {dayAndMonthAndYear(bill?.endDate) ?? "-"}
                                                        </div>
                                                        {
                                                            billIndex !== 0 &&
                                                            <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                                                        }
                                                    </td>
                                                    <td className={clsx(billIndex === 0 ? '' : 'border-t border-gray-200', 'px-3 py-3.5 text-textblack text-lg table-cell')} >
                                                        ${bill?.totalAmountDue}
                                                    </td>
                                                    <td className={clsx(billIndex === 0 ? '' : 'border-t border-gray-200', 'hidden px-3 py-3.5 text-gray-500 lg:table-cell')}>
                                                        <BaseBadge badgeStyle="success">Paid</BaseBadge>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div >
                        </div >
                    }
                </ElementsCard >
            </div >
        </>
    )
}