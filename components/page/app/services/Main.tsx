"use client";
import { ElectricAccountStore } from "@/store";
import WhistleIcon from '@/assets/icons/whistle.svg';
import MapIcon from '@/assets/icons/map.svg';
import LoadingIcon from '@/assets/icons/loading.svg'
import { BaseIcon, ElementsCard } from "@/components";
export default function Main() {
    const { electricAccount } = ElectricAccountStore();
    return (
        <>
            <h2 className="my-10">
                Services Provided by
                {electricAccount?.electricCompanyID.name}
            </h2>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 w-full">
                <ElementsCard className="w-full lg:w-1/3">
                    <BaseIcon icon={<WhistleIcon />} className="text-3xl pb-2" />
                    <div className="text-xl font-bold text-forrest-700">Have an issue with your service?</div>
                    <p>Report a service problem to your utility provider so they can provide assistance.</p>
                    <a href={electricAccount?.electricCompanyID.reportOutageURL} className="block text-xl text-green-700 underline mt-2" target="_blank">
                        Report an Outage
                    </a>
                </ElementsCard>
                <ElementsCard className="w-full lg:w-1/3">
                    <BaseIcon icon={<MapIcon />} className="text-3xl pb-2" />
                    <div className="text-xl font-bold text-forrest-700">View Outage Map</div>
                    <p>See outages reported in your area.</p>
                    <a href={electricAccount?.electricCompanyID.outageMapURL} className="block text-xl text-green-700 underline mt-2" target="_blank">
                        View Map
                    </a>
                </ElementsCard>
                <ElementsCard className="w-full lg:w-1/3">
                    <BaseIcon icon={<LoadingIcon />} className="text-3xl pb-2" />
                    <div className="text-xl font-bold text-forrest-700">Check Outage Status</div>
                    <p>If you have already reported an outage, check your status with the utility provider.</p>
                    <a
                        href={electricAccount?.electricCompanyID.checkOutageStatusURL}
                        className="block text-xl text-green-700 underline mt-2"
                        target="_blank"
                    >
                        Check Status
                    </a>
                </ElementsCard >
            </div >
        </>
    )
}