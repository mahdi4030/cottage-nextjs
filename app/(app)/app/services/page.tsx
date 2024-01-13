import { BaseIcon, ElementsCard } from "@/components";

import LogisticsIcon from '@/assets/icons/logistics.svg';
import StopServiceIcon from '@/assets/icons/stop-service.svg';
import Main from "@/components/page/app/services/Main";
export default function Services() {
    return (
        <div className="flex items-center flex-col">
            <h2 className="my-4">Service Your Account with Cottage</h2>
            <div className="flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-6 w-full">
                <ElementsCard className="w-full lg:w-1/3">
                    <BaseIcon icon={<LogisticsIcon />} className="text-3xl pb-2" />
                    <div className="text-xl font-bold text-forrest-700">Moving to a New Address?</div>
                    <p>If you are moving, we can help you set up your utilities at your new place.</p>
                    <a className="block text-xl text-green-700 underline mt-2" href="mailto:support@energybycottage.com">Transfer My Address</a>
                </ElementsCard>
                <ElementsCard className="w-full lg:w-1/3 flex">
                    <BaseIcon icon={<StopServiceIcon />} className="text-3xl pb-2" />
                    <div className="text-xl font-bold text-forrest-700">Stop Service</div>
                    <p>Moving out? Let us know so we can stop your service.</p>
                    <a className="block text-xl text-green-700 underline mt-2" href="mailto:support@energybycottage.com">Stop Service</a>
                </ElementsCard>
            </div>

            <Main />
        </div >
    );
}