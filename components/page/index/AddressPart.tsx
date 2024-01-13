"use client"

import TypeIt from "typeit";
import { BaseAddressGoogle, BaseButton } from "@/components";
import { RegServicesStore, RegistrationStore } from "@/store";
import { RegistrationFlowType, ServiceGroupStatus } from "@/types/enums";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddressPart() {

	const { registration, setRegistration, setDisplayAddress, setIsAddressCovered, setFlowType } = RegistrationStore();
	const { getServiceGroup } = RegServicesStore();
	// useEffect(() => {
	// 	setShowClient(true);
	// }, []);

    useEffect(() => {
        setTimeout(() => {
            const tii = new (TypeIt as any)("#type-effect", {
                speed: 50,
                deleteSpeed: 35,
                loop: true,
            });
    
            tii
                .type("7 Years of recycling ♻️")
                .pause(3500)
                .delete(null)
                .type("driving 10,000 fewer miles 🚙")
                .pause(3500)
                .delete(null)
                .type("growing 60 trees for 10 years 🌳")
                .pause(3500)
                .delete(null)
                .type("not burning 4,400 lbs of coal 🔥")
                .pause(3500)
                .delete(null)
                .go();
        }, 500);
    }, []);

	const router = useRouter();

	const handleGetStarted = async () => {
		// setHasAddressError(false);
		if (!registration.isValidAddress) {
			// setHasAddressError(true);
			return;
		}
		const serviceGroupStatus = await getServiceGroup(registration.address.zip);
		setIsAddressCovered(serviceGroupStatus === ServiceGroupStatus.ACTIVE);
		if (serviceGroupStatus === ServiceGroupStatus.ACTIVE) {
			setFlowType(RegistrationFlowType.DEFAULT);
			return router.push("/onboarding/address");
		} else if (serviceGroupStatus === ServiceGroupStatus.BETA) {
			return router.push("/onboarding/join-beta");
		} else {
			return router.push("/onboarding/join-waitlist");
		}
	};

	function setAddressComponents(val): void {
		// setSelectedAddress(registration.displayAddress);
		setRegistration({ ...Object.assign(registration), isValidAddress: true, isAddressCovered: null, formatted_address: val.formatted_address, address: { ...registration.address, street: val.streetNum + " " + val.streetName, city: val.city, state: val.state, zip: val.zip, googlePlaceID: val.place_id } } as Registration);
	}

	return (
		<div className="flex flex-col md:flex-row max-w-2xl pt-6 w-full text-left space-x-0 md:space-x-4 space-y-4 md:space-y-0 mx-auto">
			<div className="w-full">
				<BaseAddressGoogle
					modelValue={registration.displayAddress}
					inputName="displayAddress"
					returnFullAddress={true}
					hasErrors={false}
					setAddressComponents={setAddressComponents}
					onInputChange={setDisplayAddress}
				>
					Address
				</BaseAddressGoogle>
			</div>
			<div className="min-w-fit">
				<BaseButton onClick={handleGetStarted}>Check Availability</BaseButton>
			</div>
		</div>
	);
}