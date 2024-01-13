
import { BaseButton } from "@/components";
import UtilityBill from "@/assets/img/external/utility-bill.svg";
import SupplyScene from "@/assets/img/external/supply-scene.svg";
import DeliveryScene from "@/assets/img/external/delivery-scene.svg";
import HowItWorksArrow from "@/assets/img/external/how-it-works-arrow.svg";
import "@/assets/scss/pages/electric-plan-switching.scss";

export default function ElectricPlanSwitching() {
    return (
        <div className="w-screen flex flex-col">
            <section className="w-full bg-tan-500">
                <div className="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl px-4 md:px-0">
                    <div className="flex flex-col text-center justify-center items-center">
                        <h4 className="">De-Complicating the Complicated</h4>
                        <h1 className="pt-4 pb-8">What is electric plan switching?</h1>
                    </div>
                </div>
            </section>
            <section className="bg-tan-500 w-full">
                <div className="flex flex-col container m-auto items-center px-6 lg:px-0 xl:max-w-6xl">
                    <h2 className="text-center pt-4 pb-8">
                        Every month, an electricity bill includes
                        <span className="text-green-700"> two </span>
                        charges
                    </h2>
                    <div className="flex w-full py-8">
                        <UtilityBill className="bill-svg-drop-shadow w-full h-auto" width="" height=""/>
                    </div>
                </div>
            </section>
            <section className="bg-white w-full pb-16 lg:py-20 -mt-40 md:-mt-60 lg:-mt-96">
                <div className="flex flex-col container m-auto items-center px-6 lg:px-0 xl:max-w-6xl mt-24 md:mt-40">
                    <h2 className="text-center pt-4 pb-8">
                        Supply Charges
                        <span className="text-green-700"> vs </span>
                        Delivery Charges
                    </h2>
                    <div className="flex flex-col md:flex-row w-full py-8 items-end">
                        <div className="flex flex-col px-8">
                            <SupplyScene className="w-full h-auto" width="" height=""/>
                            <h3 className="pt-4 pb-2">Supply Charges</h3>
                            <div className="leading-5">
                                This is from an electric company that supplies the energy to the company that
                                <b> delivers electricity </b>
                                . If you don’t choose a different supplier,
                                <b> delivery </b>
                                companies will put you on their default rate.
                            </div>
                        </div>
                        <div className="flex flex-col px-8">
                            <DeliveryScene className="w-full h-auto" width="" height=""/>
                            <h3 className="pt-4 pb-2">Delivery Charges</h3>
                            <div className="leading-5">
                                This is the
                                <b> utility </b>
                                company that is responsible for delivering electricity to you from a supplier through wires so you get the energy you
                                need. This company is the one that sends you a bill.
                            </div>
                        </div>
                    </div>
                    <div className="text-xl py-8 max-w-2xl text-center relative">
                        <HowItWorksArrow className="absolute h-auto invisible lg:visible lg:w-40 xl:w-48 lg:-left-32 lg:-top-6 xl:-left-40 xl:-top-6"  width="" height=""/>
                        Cottage
                        <b> continuously scans the market for lower supply rates </b>
                        and 
                        <b> </b>
                        switches you 
                        <b> </b>
                        when we find a comparable plan with lower charges.
                    </div>
                </div>
            </section>
            <section className="w-full py-16 lg:py-20">
                <div className="flex flex-col lg:flex-row container xl:max-w-6xl m-auto items-end justify-center p-6 lg:p-12">
                    <div className="flex flex-col lg:w-2/3">
                        <h2 className="py-4">Partner with Us</h2>
                        <div className="text-lg: md:text-xl">
                            Are you an Electricity Supply company or simply want to join with our mission? Become a Cottage partner! Reach out to learn
                            how we can work together to green the planet. Let's start the conversation about sustainability and get on the path to carbon
                            neutrality.
                        </div>
                    </div>
                    <div className="w-full px-8 lg:w-1/4 pt-4 lg:pt-0">
                        <BaseButton className="w-auto" style="my-4" href="/partnerships" size="large">Learn More</BaseButton>
                        <BaseButton
                            className="w-auto"
                            style="my-4"
                            type="secondary"
                            href="mailto:partnerships@energybycottage.com"
                            size="large"
                        >
                            Contact Us
                        </BaseButton>
                    </div>
                </div>
            </section>
        </div>
    );
}
