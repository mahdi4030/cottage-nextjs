import { BaseIcon, ElementsCard } from "@/components";

import SavingsIcon from "@/assets/icons/savings.svg"
import GreenImpactIcon from "@/assets/icons/green-impact.svg"
import ForrestIcon from "@/assets/icons/forrest.svg"
import EnergyConsumption from "@/components/page/app/insights/EnergyConsumption";

export default function Insights() {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const tips = [
        {
            id: "1",
            title: "Lower your thermostat",
            icon: "add-user",
            body: "Each degree over 68°F can increase your energy usage by 3 percent.",
            link: "",
        },
        {
            id: "2",
            title: "Consider a cold wash",
            icon: "add-user",
            body: "Switching your temperature setting from hot to cold can cut energy use in half for washing one load.",
            link: "",
        },
        {
            id: "3",
            title: "Make Your Refrigerator Run More Efficiently",
            icon: "add-user",
            body: "Clean the coils yearly and set the temperature to 38°F to conserve energy effortlessly.",
            link: "",
        },
    ];
    return (
        <div>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 space-y-4 md:space-y-0">
                <EnergyConsumption />
                <div className="flex flex-col space-y-4 w-full md:w-1/4">
                    <ElementsCard className="text-left w-full py-8">
                        <div className="flex flex-row space-x-4">
                            <BaseIcon icon={<SavingsIcon />} className="text-[2rem]" />
                            <div className="text-[2.5rem] font-bold leading-none text-green-700">$0</div>
                        </div>
                        <p className="text-textblack/80 pt-1">Savings to Date</p>
                    </ElementsCard>
                    <ElementsCard className="text-left w-full py-8">
                        <div className="flex flex-row space-x-4">
                            <BaseIcon icon={<GreenImpactIcon />} className="text-[2rem]" />
                            <div className="text-[2.5rem] font-bold leading-none">0 <span className="text-xl">kWh</span></div>
                        </div>
                        <p className="text-textblack/80 pt-1">Clean Energy Generated</p>
                    </ElementsCard>
                    <ElementsCard className="text-left w-full py-8">
                        <div className="flex flex-row space-x-4">
                            <BaseIcon icon={<ForrestIcon />} className="text-[2rem]" />
                            <div className="text-[2.5rem] font-bold leading-none">0</div>
                        </div>
                        <p className="text-textblack/80 pt-1">Equivalent Trees Planted</p>
                    </ElementsCard>
                </div>
            </div>
            <h3 className="pb-2 mt-6">Energy Saving Tips</h3>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 space-y-4 md:space-y-0">
                {
                    tips.map((t, index) => (
                        <ElementsCard key={t.id} className="text-left items-start w-full md:w-1/3">
                            <div className="text-xl font-bold text-forrest-700 leading-tight pb-1">{t.title}</div>
                            <p>
                                {t.body}
                            </p>
                        </ElementsCard>
                    ))
                }
            </div>
        </div >
    )
}