"use client";

import { BaseAddressGoogle, BaseButton, BaseIcon, BaseInput, FaqBody, ModalAddressNotFound, TestimonialsCarousel } from "@/components";
import { useAuth } from "@/composables/useAuth";
import useOnboardingNavigation from "@/composables/useOnboardingNavigation";
import useResetState from "@/composables/useResetState";
import { RegServicesStore, RegistrationStore } from "@/store";
import { RegistrationFlowType, ServiceGroupStatus } from "@/types/enums";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import LocationIcon from '@/assets/icons/location.svg'
import AddUserIcon from '@/assets/icons/add-user.svg'
import GreenEarthIcon from '@/assets/icons/green-earth.svg'
import BulbIcon from '@/assets/icons/bulb.svg'
import CarIcon from '@/assets/icons/car.svg'
import RecycleIcon from '@/assets/icons/recycle.svg'
export default function Main() {
    const { buildingList, partner, getServiceGroup } = RegServicesStore();
    const { registration, setRegistration, setDisplayAddress, setPropertyUnitNumber } = RegistrationStore();

    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [referralImgURL, setReferralImgURL] = useState("");

    const router = useRouter();
    const params = useParams();

    const isNextDisabled = useMemo(() => {
        if (selectedAddress !== null) {
            return false;
        }
        return true;
    }, [selectedAddress]);

    const setAddressComponents = (val) => {
        setSelectedAddress(registration.displayAddress);
        setRegistration({
            ...registration,
            isValidAddress: true,
            isAddressCovered: true,
            address: {
                ...registration.address,
                street: val.streetNum + " " + val.streetName,
                city: val.city,
                state: val.state,
                zip: val.zip,
                googlePlaceID: val.place_id
            }
        });
        // check to see if the building is known. If it is, pass them to the found building page to select a unit
    }

    const handleGetStarted = async () => {
        const serviceGroupStatus = await getServiceGroup(registration.address.zip);
        setRegistration({ ...registration, isAddressCovered: serviceGroupStatus === ServiceGroupStatus.ACTIVE });
        if (serviceGroupStatus === ServiceGroupStatus.ACTIVE) {
            setRegistration({ ...registration, flowType: RegistrationFlowType.PARTNER, referrerCode: partner.referralCode ?? null })
            return router.push("/onboarding/service");
        } else if (serviceGroupStatus === ServiceGroupStatus.BETA) {
            return router.push("/onboarding/join-beta");
        } else {
            return router.push("/onboarding/join-waitlist");
        }
    }

    const [isAddressNotFoundOpen, setIsAddressNotFoundOpen] = useState(false);
    const closeAddressNotFound = () => {
        setIsAddressNotFoundOpen(false);
    }

    useEffect(() => {
        async () => {
            const { useResetOnboarding } = useResetState();
            useResetOnboarding();
            const { code } = params;
            const { routingPath, setRoutingPath } = useOnboardingNavigation();
            const { partnerCode, partner, setPartner, setPartnerCode } = RegServicesStore();
            setPartnerCode((code as string) ?? partnerCode);
            setRoutingPath(RegistrationFlowType.PARTNER);
            try {
                const data = await (await fetch("/api/referrals/get-partner/" + partnerCode, {
                    method: "get",
                })).json();
                setPartner(data);
            } catch (error) {
                console.error(error);
            }
        }

        (async () => {
            setRegistration({ ...registration, displayAddress: "" })
            try {
                await useAuth().logout();
            } catch (error) {
                console.error("No logged in account", error);
            }
        })();
    }, []);
    return (
        <>
            {/* <ClientOnly> */}
            <div>
                <ModalAddressNotFound isOpen={isAddressNotFoundOpen} closeAction={closeAddressNotFound} />
            </div>
            {/* </ClientOnly> */}
            <div className="w-screen flex flex-col">
                <section className="bg-forrest-700 w-full relative">
                    <div className="flex flex-col items-center mt-20 container m-auto text-center z-10 px-6 md:px-0 pb-16 text-white">
                        <div className="flex flex-col z-10 w-full max-w-2xl">
                            <div className="py-4 m-auto">
                                <img className="h-auto w-48" src={partner.imgURL} />
                            </div>
                            <h1 className="pt-4 pb-8 text-white">Hey there 👋</h1>
                            <div className="text-lg md:text-xl leading-tight pb-4">
                                We take the hassle out of setting up your home’s electricity account. <br />
                                We also power your home with <b>renewable energy. No extra cost.</b>
                            </div>
                            <div className="text-lg pt-2 pb-2">Select your address below to get started</div>
                            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 w-full max-w-2xl text-left">
                                <div className="sm:col-span-5">
                                    <BaseAddressGoogle
                                        modelValue={registration.displayAddress}
                                        onInputChange={(value) => setDisplayAddress(value)}
                                        inputName="displayAddress"
                                        returnFullAddress={true}
                                        setAddressComponents={setAddressComponents}
                                    >
                                        Address
                                    </BaseAddressGoogle>
                                </div>
                                <div className="sm:col-span-1">
                                    <BaseInput inputValue={registration.property.unitNumber ?? ""} onChange={(value) => setPropertyUnitNumber(value)} inputName="unitNumber" inputClassName="my-0">Unit</BaseInput>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-0 md:space-x-4 justify-center mt-3">
                                <BaseButton disabled={isNextDisabled} type="primary" className="w-full md:w-64" onClick={handleGetStarted}>
                                    Get Started
                                </BaseButton>
                            </div>
                            <div className="text-base underline text-white mt-6 cursor-pointer font-semibold" onClick={() => setIsAddressNotFoundOpen(true)}>
                                I cannot find my building
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-tan-200 w-full py-16 lg:pt-20">
                    <div className="flex flex-col container m-auto px-6 lg:px-0 xl:max-w-6xl">
                        <h4 className="pb-4">EASY AND FAST</h4>
                        <h2 className="md:pb-8">Sign-up in 3 easy steps</h2>
                        <div className="flex flex-col lg:flex-row py-4 space-x-0 md:space-x-16">
                            <div className="flex flex-col lg:w-1/3 py-4 lg:py-0">
                                <BaseIcon icon={<LocationIcon />} className="mb-3 lg:mb-6" style={{ fontSize: "4rem" }} />
                                <h3 className="">Sign-up with your address</h3>
                                <div className="text-lg leading-tight py-1">Enter your address for your home or apartment building.</div>
                            </div>
                            <div className="flex flex-col lg:w-1/3 py-4 lg:py-0">
                                <BaseIcon icon={<AddUserIcon />} className="mb-3 lg:mb-6" style={{ fontSize: "4rem" }} />
                                <h3 className="">We sign-up with the utility</h3>
                                <div className="text-lg leading-tight py-1">
                                    If you don't have an existing account, we register you with your local utility company and take care of setting up
                                    your online account.
                                </div>
                            </div>
                            <div className="flex flex-col lg:w-1/3 py-4 lg:py-0">
                                <BaseIcon icon={<GreenEarthIcon />} className="mb-3 lg:mb-6" style={{ fontSize: "4rem" }} />
                                <h3 className="">Support a greener future</h3>
                                <div className="text-lg leading-tight py-1">
                                    Join the thousands of individuals who are driving the demand for renewable energy and significantly reducing their
                                    carbon footprint at the same time.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-tan-500 w-full py-16 lg:py-20">
                    <div className="flex flex-col container m-auto items-center px-6 lg:px-0 xl:max-w-6xl">
                        <h2 className="text-center pb-2">Why sign-up with Cottage?</h2>
                        <p className="py-4 max-w-3xl text-center mx-auto">
                            Our goal is to make it simple for you to reduce your carbon footprint and contribute to a cleaner world, no matter if you rent
                            or own your home.
                        </p>
                        <div className="text-lg md:text-xl font-semibold text-center">In just one year with us you can make an impact equivalent to…</div>
                        <div className="flex flex-col md:flex-row py-8 text-center items-start space-y-8 md:space-y-0 md:space-x-20">
                            <div className="flex flex-col justify-center items-center w-full md:w-[13.5rem]">
                                <BaseIcon icon={<BulbIcon />} className="text-5xl pb-2" />
                                <p className="text-lg md:text-xl !leading-tight">Switching <b>140 light bulbs</b> to LED</p>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full md:w-[13.5rem]">
                                <BaseIcon icon={<CarIcon />} className="text-5xl pb-2" />
                                <p className="text-lg md:text-xl !leading-tight">Driving <b>9,000 fewer miles</b> in your car</p>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full md:w-[13.5rem]">
                                <BaseIcon icon={<RecycleIcon />} className="text-5xl pb-2" />
                                <p className="text-lg md:text-xl !leading-tight">Recycling for <b>7 years</b></p>
                            </div>
                        </div>
                        <p className="text-textblack/80 text-sm text-center">
                            *Estimated using EPA EGrid Emission Factor data, and the U.S. Environmental Protection Agency's greenhouse gas equivalencies
                            calculator
                        </p>
                    </div>
                </section>
                <section className="w-full py-16 lg:pt-20">
                    <h2 className="text-center">Have more questions?</h2>
                    <div className="flex flex-col py-8 max-w-3xl mx-auto text-left">
                        {/* <ClientOnly> */}
                        <FaqBody />
                        {/* </ClientOnly> */}
                    </div>
                </section>
                <section className="w-full py-16 pb-32 lg:pt-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl md:text-center">
                            <h2 className="text-center">Join the green energy revolution</h2>
                            <p className="py-6 max-w-4xl text-center mx-auto">Something better for you and your neighbors</p>
                        </div>
                        <div className="w-full mx-auto">
                            {/* <ClientOnly> */}
                            <TestimonialsCarousel />
                            {/* </ClientOnly> */}
                        </div>
                    </div>
                </section>
            </div >
        </>
    )
}