"use client";

import clsx from "clsx";
import { differenceInDays } from 'date-fns';
import { useState, useMemo, useEffect } from "react";

import { FormNavigation } from '@/components/Form'
import useOnboardingNavigation from '@/composables/useOnboardingNavigation';
import { ModalInfo } from "@/components/Modal";
import { BaseIcon, BaseInput, ElementsOnboardingCard } from "@/components";

import { RegistrationAccountType } from '@/types/enums'

import { RegistrationStore } from "@/store";
import { RegServicesStore } from "@/store";


import { RadioGroup } from "@headlessui/react";

import CheckIcon from "@/assets/icons/check.svg"
import AddUserIcon from "@/assets/icons/add-user.svg";
import BriefcaseManage from "@/assets/icons/briefcase-manage.svg";

export default function Main() {
    const { registration, setAccountType, setResidentStartServiceDate } = RegistrationStore();
    const { serviceGroup } = RegServicesStore();

    const [showClient, setShowClient] = useState(false);

    const [isApplicationTypeModalOpen, setIsApplicationTypeModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [hasErrorsStartServiceDate, setHasErrorStartServiceDate] = useState(false);
    const [startServiceErrorText, setStartServiceErrorText] = useState("Enter a valid date");

    const toolTipOptions = {
        content:
            "We can only help people online with existing electric accounts in your area, but we can help sign you up over the phone. Give us a call at (646) 847-7885",
        triggers: ["hover", "click"],
    }
    const radioOptions = useMemo(() => {
        return [
            {
                id: "NEW",
                title: "Sign me up for a new account with " + serviceGroup.electricCompanyID?.name,
                // icon: "add-user",
                icon: AddUserIcon,
                enabled: serviceGroup.electricCompanyID?.isHandleMoveIns,
                modalTitle: "Sign-up with a new electricity account",
                modalBody:
                    // eslint-disable-next-line quotes
                    '<div class="font-bold">Are you about to, or are you just moving into a new apartment/house\n and need to set up an electricity account?</div> \n \
          <div class="flex flex-row justify-center"><svg width="24px" height="24px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0009 21.3472C31.4447 20.1201 30.8061 18.7669 29.5747 18.3246C28.3434 17.8824 26.9848 18.5185 26.5408 19.7455C22.0782 31.4489 4.89971 28.481 4.68543 15.941C4.57757 7.92972 13.3421 2.22645 20.6433 5.80624C21.8328 6.35119 23.2403 5.83233 23.7873 4.64738C24.3344 3.46242 23.8137 2.05995 22.6244 1.515C20.4307 0.509644 18.1834 0 15.9448 0C-5.2834 0.876055 -5.27356 31.011 15.9448 31.8823C22.6705 31.8823 28.721 27.6486 31.0009 21.3472Z" fill="#194D3E"></path><path d="M17.7261 20.7826C16.105 20.7826 14.5829 20.146 13.44 18.9902L10.1004 15.584C9.18571 14.6509 9.20337 13.1558 10.1399 12.2443C11.0766 11.3331 12.5772 11.3506 13.4919 12.2836L16.8242 15.6826C17.0618 15.923 17.3847 16.0593 17.726 16.0593C18.0673 16.0593 18.3902 15.923 18.6351 15.6754L27.8902 6.36756C28.8112 5.44097 30.3121 5.43388 31.2423 6.35186C32.1724 7.26983 32.1794 8.76511 31.258 9.6917L22.0075 18.9948C20.8695 20.146 19.3472 20.7826 17.7261 20.7826V20.7826Z" fill="#18A57B"></path></svg>\
          <div class="pl-3">This option is for you.</div></div>\n \
          During the next steps, we’ll collect a couple of details so we can setup your new electricity account. We handle everything from signing you up to setting up your online account so you can have peace of mind and electricity on the day you move in.  \n\nIf you have any questions feel free to call <a class="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a> any time during the process',
            },
            {
                id: "EXISTING",
                title: "I have an electricity account and want Cottage to help manage it",
                // icon: "briefcase-manage",
                icon: BriefcaseManage,
                enabled: true,
                modalTitle: "Cottage plugs into your existing account",
                modalBody:
                    // eslint-disable-next-line quotes
                    '<div class="font-bold">Do you have an electricity account with ' +
                    serviceGroup.electricCompanyID?.name +
                    // eslint-disable-next-line quotes
                    ' for your current apartment/house?</div>\n \
          <div class="flex flex-row justify-center"><svg width="24px" height="24px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0009 21.3472C31.4447 20.1201 30.8061 18.7669 29.5747 18.3246C28.3434 17.8824 26.9848 18.5185 26.5408 19.7455C22.0782 31.4489 4.89971 28.481 4.68543 15.941C4.57757 7.92972 13.3421 2.22645 20.6433 5.80624C21.8328 6.35119 23.2403 5.83233 23.7873 4.64738C24.3344 3.46242 23.8137 2.05995 22.6244 1.515C20.4307 0.509644 18.1834 0 15.9448 0C-5.2834 0.876055 -5.27356 31.011 15.9448 31.8823C22.6705 31.8823 28.721 27.6486 31.0009 21.3472Z" fill="#194D3E"></path><path d="M17.7261 20.7826C16.105 20.7826 14.5829 20.146 13.44 18.9902L10.1004 15.584C9.18571 14.6509 9.20337 13.1558 10.1399 12.2443C11.0766 11.3331 12.5772 11.3506 13.4919 12.2836L16.8242 15.6826C17.0618 15.923 17.3847 16.0593 17.726 16.0593C18.0673 16.0593 18.3902 15.923 18.6351 15.6754L27.8902 6.36756C28.8112 5.44097 30.3121 5.43388 31.2423 6.35186C32.1724 7.26983 32.1794 8.76511 31.258 9.6917L22.0075 18.9948C20.8695 20.146 19.3472 20.7826 17.7261 20.7826V20.7826Z" fill="#18A57B"></path></svg>\
          <div class="pl-3">This option is for you.</div></div>\n \
          After creating an account with Cottage, we connect you with 100% renewable energy and work in the background to find the best energy suppliers and incentives for your area.  \n\nIf you have any questions feel free to call <a class="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a> any time during the process',
            },
        ]
    }, [serviceGroup]);

    const openModal = (optionID: string) => {
        const index = radioOptions.findIndex((arr) => {
            return arr.id === optionID;
        });
        const modalContent = radioOptions[index];
        setModalTitle(modalContent["modalTitle"]);
        setModalBody(modalContent["modalBody"]);
        setIsApplicationTypeModalOpen(true);
    }

    const [startServiceDate, setStartServiceDate] = useState(registration.resident.startServiceDate ?? "");

    useEffect(() => {
        setResidentStartServiceDate(startServiceDate);
    }, [startServiceDate])

    const setTodaysDate = () => {
        let todaysDate = new Date().toLocaleDateString("en-us", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        setStartServiceDate(todaysDate);
    }

    const { checkRequiredFields, navigateToNextPage, navigateToPreviousPage } = useOnboardingNavigation();

    const isNextDisabled = useMemo(() => {
        if (registration.accountType === RegistrationAccountType.NONE) {
            return true;
        }
        return checkRequiredFields();
    }, [registration.accountType]);

    const nextPage = () => {
        setHasErrorStartServiceDate(false);
        setStartServiceErrorText("Enter a valid date");

        if (registration.accountType === RegistrationAccountType.NEW) {
            const today = new Date();
            const startServiceDateString = registration.resident.startServiceDate;
            const startServiceDate = new Date(registration.resident.startServiceDate ?? "");

            if (startServiceDateString && startServiceDateString.length !== 10) {
                setHasErrorStartServiceDate(true);
            } else {
                const diffInDays = differenceInDays(startServiceDate, today);
                if (diffInDays >= 32) {
                    setStartServiceErrorText("Enter a date that is less than 1 month");
                    setHasErrorStartServiceDate(true);
                } else if (diffInDays <= -1) {
                    setStartServiceErrorText("Enter a future date. If you have already started your lease, just click 'Today'.");
                    setHasErrorStartServiceDate(true);
                }
            }

            if (hasErrorsStartServiceDate) {
                return;
            } else {
                navigateToNextPage();
            }
        } else {
            navigateToNextPage();
        }
    }

    const previousPage = () => {
        navigateToPreviousPage();
    }

    const closeApplicationTypeModal = () => {
        setIsApplicationTypeModalOpen(false);
    }

    useEffect(() => {
        setShowClient(true);
    }, []);

    if (!showClient)
        return null;
    return (
        <>
            <div>
            <ModalInfo isModalOpen={isApplicationTypeModalOpen} closeModal={closeApplicationTypeModal} header={<div className="whitespace-pre-line">{modalTitle}</div>}>
                <div className="flex flex-col py-4 mx-auto text-center">
                    <div className="flex flex-row py-4 whitespace-pre-line text-lg md:text-xl mx-auto">
                        <div dangerouslySetInnerHTML={{ __html: modalBody }}></div>
                    </div>
                </div>
            </ModalInfo>
            </div>
            <div className="w-full flex flex-col items-center">
                <h2 className="text-center leading-tight">Good to go 🎉 How can we help?</h2>
                <ElementsOnboardingCard>
                    <div>
                        <p className="text-center">
                            Based on your address, your utility company is
                            <b> {serviceGroup.electricCompanyID.name}</b>. This won’t change with Cottage.
                        </p>
                        <div className="flex flex-row items-center justify-center">
                            <RadioGroup value={registration.accountType} onChange={(value) => setAccountType(value)}>
                                <div className="mt-4 flex flex-col md:flex-row space-x-0 md:space-x-8 items-center justify-center space-y-4 md:space-y-0">
                                    {radioOptions.map(radioOption => {
                                        const checked = radioOption.id == registration.accountType;
                                        const active = true;
                                        return (
                                            <RadioGroup.Option
                                                key={radioOption.id}
                                                // v-tooltip="!radioOption.enabled && toolTipOptions"
                                                value={radioOption.id}
                                                disabled={!radioOption.enabled}
                                            >
                                                <div>
                                                    <div
                                                        className={clsx(checked ? 'border-green-700  ring-2 ring-green-700' : 'border-border',
                                                            !radioOption.enabled ? '!bg-gray-100 pointer-events-none' : '',
                                                            'relative bg-white border rounded-lg shadow-sm px-4 pt-6 pb-4 cursor-pointer focus:outline-none hover:border-green-700 flex flex-col justify-center items-center w-full md:w-80')}
                                                    >
                                                        <div className="flex flex-col items-center mb-2">
                                                            <div><BaseIcon icon={<radioOption.icon />} style={{ fontSize: "3rem" }} ></BaseIcon></div>
                                                            <p className="block text-textblack pt-4 text-center leading-7">
                                                                {radioOption.title}
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={clsx(
                                                                checked ? 'bg-green-700 border-green-700' : 'bg-transparent border-border',
                                                                'h-7 w-7 border-solid border rounded-full flex items-center justify-center absolute top-4 right-4',
                                                            )}
                                                            aria-hidden="true"
                                                        >
                                                            {checked && <BaseIcon icon={<CheckIcon />} className="text-lg" />}
                                                        </div>
                                                        <span
                                                            className={clsx(
                                                                active ? 'border-2' : 'border-2',
                                                                checked ? 'border-green-700' : 'border-transparent',
                                                                !radioOption.enabled ? 'pointer-events-none' : '',
                                                                'absolute -inset-px rounded-lg hover:border-green-700',
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <div className="pt-3 w-full flex items-center justify-center">
                                                        <RadioGroup.Label
                                                            as="span"
                                                            className="block text-base md:text-lg font-semibold underline text-green-700 cursor-pointer"
                                                            onClick={(e) => { e.preventDefault(); openModal(radioOption.id) }}
                                                        >
                                                            Is this option right for me?
                                                        </RadioGroup.Label>
                                                    </div>
                                                </div>
                                            </RadioGroup.Option>
                                        )
                                    })}
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    {registration.accountType === RegistrationAccountType.NEW &&
                        <div className="flex flex-col pt-6 w-full">
                            <div className="flex flex-col w-full items-center">
                                <p className="pb-2 text-center">
                                    When you sign-up with Cottage,
                                    <b>we take care of signing up with {serviceGroup.electricCompanyID?.name}</b>
                                </p>
                                <div className="w-full md:w-1/2 mx-auto">
                                    <div className="flex flex-row w-full">
                                        <BaseInput
                                            inputValue={startServiceDate}
                                            inputName="startServiceDate"
                                            inputClass="my-0"
                                            cleaveOptions={{
                                                date: true,
                                                datePattern: ['m', 'd', 'Y'],
                                            }}
                                            hasErrors={hasErrorsStartServiceDate}
                                            showSubtext={hasErrorsStartServiceDate}
                                            subtext={startServiceErrorText}
                                            onChange={(value) => setStartServiceDate(value)}
                                            action={<div className="absolute z-10 top-3 right-4 text-green-700 font-bold text-lg cursor-pointer"
                                                onClick={setTodaysDate}>Today</div>}
                                        >
                                            Start Date
                                        </BaseInput>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {registration.accountType === RegistrationAccountType.EXISTING &&
                        <div className="flex flex-col pt-6 w-full">
                            <div className="flex flex-col w-full items-center">
                                <div className="text-lg md:text-xl pb-2 text-center">
                                    Cottage connects your existing account to
                                    <b>100% green energy for no extra cost</b> and works in the background to to find savings.
                                </div>
                            </div>
                        </div>
                    }
                </ElementsOnboardingCard>
            </div>
            <div className="container lg:px-6 pt-4 md:py-4">
                <FormNavigation
                    isNextDisabled={isNextDisabled}
                    showPrevious={true}
                    nextButtonText="Continue"
                    navBtnStyle="py-3 lg:py-4 text-lg lg:text-xl"
                    nextPage={nextPage}
                    previousPage={previousPage}
                />
            </div>
        </>
    )
}