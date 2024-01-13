"use client";
import { useEffect, useMemo, useState } from "react";

import { FormNavigation } from '@/components/Form'
import useOnboardingNavigation from '@/composables/useOnboardingNavigation';
// import { ModalAddressNotFound } from "@/components/Modal";
import { BaseAddressGoogle, BaseInput } from "@/components";

import { RegistrationStore, RegServicesStore } from "@/store";

import { ServiceGroupStatus } from "@/types/enums";

import { useRouter } from "next/navigation";
import { Registration } from "@/types/models";
import dynamic from "next/dynamic";

const ModalAddressNotFound = dynamic(() => import('@/components/Modal/AddressNotFound'))

export default function Main() {
    const { registration, setIsAddressCovered, setRegistration, setDisplayAddress } = RegistrationStore();
	const { getServiceGroup } = RegServicesStore();

	const [isAddressNotFoundOpen, setIsAddressNotFoundOpen] = useState(false);
	const [startAddressCheck, setStartAddressCheck] = useState(false);
	const [unitNumber, setUnitNumber] = useState("");
	const [hasErrors, setHasErrors] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(null as any);

	const router = useRouter();

	useEffect(() => {
		if (registration.isValidAddress) {
			setSelectedAddress(registration.displayAddress);
		}
	}, []);

	const { navigateToNextPage, navigateToPreviousPage } = useOnboardingNavigation();

	const nextPage = async () => {
		setStartAddressCheck(true);
		setHasErrors(false);
		const serviceGroupStatus = await getServiceGroup(registration.address.zip ?? "");
		if (serviceGroupStatus === ServiceGroupStatus.ACTIVE) {
			navigateToNextPage();
			setIsAddressCovered(serviceGroupStatus === ServiceGroupStatus.ACTIVE);
		} else if (serviceGroupStatus === ServiceGroupStatus.BETA) {
			router.push("/onboarding/join-beta");
		} else {
			router.push("/onboarding/join-waitlist");
		}
		// navigateToNextPage();
	}

	const closeAddressNotFound = () => {
		setIsAddressNotFoundOpen(false);
	}

	// const isNextDisabled = false;

	const isNextDisabled = useMemo(() => {
		if (registration.displayAddress.length >= 5 || registration.isValidAddress === true) {
			return false;
		}
		return true;
	}, [registration]);

	function setAddressComponents(val: any): void {
		setSelectedAddress(registration.displayAddress);
		setRegistration({...Object.assign(registration), isValidAddress: true, isAddressCovered: null, formatted_address: val.formatted_address, address: {...registration.address, street: val.streetNum + " " + val.streetName, city: val.city, state: val.state, zip: val.zip, googlePlaceID: val.place_id}} as Registration);
	}

	const [subTitle, setSubTitle] = useState("");
	const [hintText, setHintText] = useState(<p></p>);

	useEffect(() => {
		setSubTitle(registration.isAddressCovered ? "You're covered 👍 Add an unit number if you have one" : "Let's do an address check 🔎");
		setHintText(registration.isAddressCovered ? <p className="pb-4 text-center">If you do not have a unit number, you can leave it blank.</p>: <p className="pb-4 text-center">Select an address. If you do not have a unit number, you can leave it blank.</p>)
	}, [registration.isAddressCovered])

	const [nextButtonText, setNextButtonText] = useState("");
	useEffect(() => {
		setNextButtonText(!isNextDisabled ? 'Continue' : 'Check Coverage');
	}, [isNextDisabled])
    return (
        <>
            <ModalAddressNotFound isOpen={isAddressNotFoundOpen} closeAction={closeAddressNotFound} />
            <h2 className="text-center leading-tight">
                {subTitle}
            </h2>
            <div className="p-6 flex flex-col w-full">
                {/* <ClientOnly> */}
                {/* <Transition name="fade" mode="out-in"> */}
                <div className="flex flex-col w-full">
                    {hintText}
                    <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 w-full max-w-2xl mx-auto">
                        <div className="sm:col-span-5">
                            <BaseAddressGoogle
                                modelValue={registration.displayAddress}
                                inputName="displayAddress"
                                returnFullAddress={true}
                                setAddressComponents={setAddressComponents}
                                onInputChange={setDisplayAddress}
                            >
                                Address
                            </BaseAddressGoogle>
                        </div>
                        <div className="sm:col-span-1">
                            <BaseInput inputValue={unitNumber} inputName="unitNumber" inputClass="my-0" onChange={(value: string) => setUnitNumber(value)}>Unit</BaseInput>
                        </div>
                    </div>
                </div>
                {/* </Transition> */}
                {/* </ClientOnly> */}
                <div className="text-center w-full">
                    <div className="text-base underline text-green-700 mt-4 cursor-pointer font-semibold" onClick={() => setIsAddressNotFoundOpen(true)}>
                        I cannot find my address
                    </div>
                </div>
            </div>
            <div className="container lg:px-6 pb-4 pt-4">
                <FormNavigation
                    isNextDisabled={isNextDisabled}
                    showPrevious={true}
                    nextButtonText={nextButtonText}
                    navBtnStyle="py-3 lg:py-4 text-lg lg:text-xl"
                    processingRequest={startAddressCheck}
                    processingRequestText="Checking..."
                    nextPage={nextPage}
                    previousPage={navigateToPreviousPage}
                    isFixedToBottom={false}
                />
            </div>
        </>
    )
}