"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import useUtils from "@/composables/useUtils";
import { AppStore, CottageUserStore, ReferralsStore, RegServicesStore, ResidentStore } from "@/store";
import { ToastsStore } from "@/store/toast";

import { BaseBadge, BaseButton, BaseIcon, BaseInput, BaseTabsContainer, BaseTabsTab, ElementsCard, ModalAction, UtilityConnectForm } from "@/components";

import CopyIcon from '@/assets/icons/copy.svg'
import EmailIcon from '@/assets/icons/email.svg'
import LinkIcon from '@/assets/icons/link.svg'
import MessageIcon from '@/assets/icons/message.svg'
export default function Main() {
    
    const statusMap = {
        complete: "success",
        pending: "",
        invalid: "error",
    };
    const [hasErrorsResident, setHasErrorsResident] = useState(false);
    const [hasErrorsFirstName, setHasErrorsFirstName] = useState(false);
    const [hasErrorsLastName, setHasErrorsLastName] = useState(false);
    const [hasErrorsEmail, setHasErrorsEmail] = useState(false);
    const [baseResident, setBaseResident] = useState({
        firstName: "",
        lastName: "",
        phone: "",
    });
    const [phoneInput, setPhoneInput] = useState<any>(null);

    const { resident, updateResident } = ResidentStore();
    const { getReferralCode, referralCode } = CottageUserStore();
    const { serviceGroup } = RegServicesStore();
    const { referrals, fetchReferrals } = ReferralsStore();

    const { addToastToQueue } = ToastsStore();
    const { user } = AppStore();

    const [isConfirmDeleteAccountOpen, setIsConfirmDeleteAccountOpen] = useState(false);
    const closeConfirmDeleteAccount = () => {
        setIsConfirmDeleteAccountOpen(false);
    }
    const deleteAccount = () => {
        window.location.href = "mailto:support@energybycottage.com";
    }

    useEffect(() => {
        (async () => {
            setBaseResident({ ...baseResident, firstName: resident.firstName ?? "", lastName: resident.lastName ?? "", phone: resident.phone ?? "" });
            await getReferralCode(user?.id);
            await fetchReferrals(user?.id);
            setPhoneInput(resident.phone);
        })();
    }, []);

    const saveResidentUpdate = async () => {
        try {
            await updateResident(baseResident);
            addToastToQueue({
                message: "Successfully updated your profile",
                type: "success",
            });
        } catch (err) {
            addToastToQueue({
                message: "Something went wrong. Please try again later.",
                type: "warning",
            });
        }
    }

    const resetForm = () => {
        Object.assign(baseResident, useUtils().updateObject(baseResident, resident));
        setPhoneInput(resident.phone);
    }

    const [isCopyReferralOpen, setIsCopyReferralOpen] = useState(false);
    const [isCopyLinkOpen, setIsCopyLinkOpen] = useState(false);
    const [isCopyMessage, setIsCopyMessage] = useState(false);

    const createTextMessage = () => {
        const bodyString =
            "I%20just%20signed%20up%20with%20Cottage%20to%20manage%20my%20electricity%20account.%20They%20are%20saving%20me%2010%25%20on%20my%20electricity%20bill%20every%20month.%20Give%20them%20at%20try%21%0A%0A" +
            process.env.SITE_URL +
            "/ref/" +
            referralCode;
        if (navigator.userAgent.match(/iPhone/i)) {
            window.open("sms://?/&body=" + bodyString);
        } else if (navigator.userAgent.match(/Android/i)) {
            window.open("sms://?/?body=" + bodyString);
        } else {
            navigator.clipboard.writeText(
                "I just signed up with Cottage to manage my electricity account. They are saving me 10% on my electricity bill every month. Give them at try!" +
                process.env.SITE_URL +
                "/ref/" +
                referralCode,
            );
            setIsCopyMessage(true);
            setTimeout(() => {
                setIsCopyMessage(false);
            }, 1500);
        }
    }

    const createMailTo = () => {
        const mailString =
            "mailto:?subject=Check-out%20Cottage!&body=I%20just%20signed%20up%20with%20Cottage%20to%20manage%20my%20electricity%20account.%20They%20are%20saving%20me%2010%25%20on%20my%20electricity%20bill%20every%20month%20and%20are%20providing%20green%20energy%20for%20the%20cost%20of%20a%20cup%20of%20coffee.%20%0A%0AGive%20them%20at%20try%21%0A" +
            process.env.SITE_URL +
            "/ref/" +
            referralCode;
        window.location.href = mailString;
    }

    const copyURL = () => {
        navigator.clipboard.writeText(process.env.SITE_URL + "/ref/" + referralCode);
        setIsCopyLinkOpen(true);
        setTimeout(() => {
            setIsCopyLinkOpen(false);
        }, 1500);
    }
    const copyReferralCode = () => {
        navigator.clipboard.writeText(referralCode);
        setIsCopyReferralOpen(true);
        setTimeout(() => {
            setIsCopyReferralOpen(false);
        }, 1500);
    }
    return (
        <>
            {/* <ClientOnly> */}
            <ModalAction
                isModalOpen={isConfirmDeleteAccountOpen}
                confirmButtonText="Delete My Account"
                cancelAction={closeConfirmDeleteAccount}
                confirmAction={deleteAccount}
                header="Are you sure you want to delete your account?"
            >
                <div className="flex flex-col mx-auto text-center">
                    <div className="text-lg text-textblack">To delete your account, you will need to send us an email.</div>
                    <div className="text-lg text-textblack">All of your data will be permanently removed.</div>
                </div>
            </ModalAction>
            {/* </ClientOnly> */}
            {/* <ClientOnly> */}
            <BaseTabsContainer>
                {
                    (registerChild, unregisterChild) => (
                        <>
                            <BaseTabsTab id="account" name="Account" callback={() => { }} registerChild={registerChild} unregisterChild={unregisterChild}>
                                <ElementsCard className="w-full p-6 md:!p-8">
                                    <div>
                                        <div className="text-xl font-bold text-textblack">Personal Information</div>
                                        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <BaseInput
                                                    inputValue={baseResident.firstName}
                                                    onChange={(value) => setBaseResident({ ...baseResident, firstName: value })}
                                                    autocomplete="given-name"
                                                    inputClass="w-full flex text-left mt-4"
                                                    inputName="firstName"
                                                    inputControl="flex"
                                                    subtext="First name cannot be blank"
                                                    hasErrors={hasErrorsFirstName || hasErrorsResident}
                                                    showSubtext={hasErrorsFirstName}
                                                >
                                                    First Name
                                                </BaseInput>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <BaseInput
                                                    inputValue={baseResident.lastName}
                                                    onChange={(value) => setBaseResident({ ...baseResident, lastName: value })}
                                                    autocomplete="family-name"
                                                    inputClass="w-full flex text-left mt-4"
                                                    inputControl="flex"
                                                    inputName="lastName"
                                                    subtext="Last name cannot be blank"
                                                    hasErrors={hasErrorsLastName || hasErrorsResident}
                                                    showSubtext={hasErrorsLastName}
                                                >
                                                    Last Name
                                                </BaseInput>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <BaseInput
                                                    inputValue={user?.email}
                                                    // onChange
                                                    autocomplete="email"
                                                    inputClass="w-full flex text-left mt-4"
                                                    inputName="email"
                                                    inputControl="flex"
                                                    subtext="Invalid email"
                                                    hasErrors={hasErrorsEmail || hasErrorsResident}
                                                    showSubtext={hasErrorsEmail}
                                                >
                                                    Email
                                                </BaseInput>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <BaseInput
                                                    inputValue={baseResident.phone}
                                                    onChange={(value) => setBaseResident({ ...baseResident, phone: value })}
                                                    inputClass="w-full flex text-left mt-4"
                                                    inputName="phone"
                                                    cleaveOptions={{
                                                        blocks: [3, 3, 4],
                                                        delimiters: ['-', '-'],
                                                        numericOnly: true,
                                                    }}
                                                >
                                                    Phone
                                                </BaseInput>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <Link className="text-xl text-green-700 underline" href="'/forgot-password?email=' + user.email"
                                        >Forgot Password?</Link>
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <BaseButton size="base" style="w-full" type="line" className="flex" onClick={resetForm}>Cancel</BaseButton>
                                        <BaseButton size="base" style="w-full" type="primary" className="flex pl-2" onClick={saveResidentUpdate}>
                                            Save
                                        </BaseButton>
                                    </div>
                                </ElementsCard>
                                <ElementsCard className="w-full p-6 md:!p-8 mt-3">
                                    <div className="">
                                        <div className="text-xl font-bold text-textblack pb-2">Delete Cottage Account</div>
                                        <p>While we hate to see you go, we definitely understand that you might want to delete your account with Cottage.</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <div>
                                            <BaseButton
                                                size="base"
                                                style="w-full"
                                                type="warning"
                                                className="flex pt-6"
                                                onClick={() => setIsConfirmDeleteAccountOpen(true)}
                                            >Delete Account</BaseButton
                                            >
                                        </div>
                                    </div>
                                </ElementsCard>
                            </BaseTabsTab>
                            <BaseTabsTab id="utility-account" name="Utility Account" callback={() => { }} registerChild={registerChild} unregisterChild={unregisterChild}>
                                <ElementsCard className="w-full p-6 md:!p-8">
                                    <div className="text-xl font-bold text-textblack pb-1">Utility Account</div>
                                    <p>Your utility account helps us find savings and know how much renewable energy to buy.</p>
                                    <div className="flex flex-col w-full">
                                        <UtilityConnectForm />
                                    </div>
                                </ElementsCard>
                            </BaseTabsTab>
                            <BaseTabsTab id="referrals" name="Referrals" callback={() => { }} registerChild={registerChild} unregisterChild={unregisterChild}>
                                <ElementsCard className="w-full p-6 md:!p-8">
                                    <div className="text-xl font-bold text-textblack pb-1">Your Code</div>
                                    <p>
                                        Share your code - for every 5 friends that sign-up using your code,
                                        <b>we give you ${serviceGroup.referralProgramAmount}</b>!
                                    </p>
                                    <div className="mb-8 flex flex-col w-full">
                                        <div className="flex flex-col md:flex-row items-center md:space-x-4 space-x-0 space-y-2 md:space-y-0 pt-2">
                                            <div className="flex justify-center pt-1">
                                                {/* <ClientOnly> */}
                                                <div
                                                    v-tooltip="{
												content: 'Copied to clipboard!',
												shown: isCopyReferralOpen,
												theme: 'dark',
												triggers: [],
											}"
                                                    className="text-xl font-semibold bg-green-50 rounded-xl justify-center leading-tight px-4 py-3 flex space-x-2 cursor-pointer hover:bg-green-100/70"
                                                    onClick={(e) => copyReferralCode()}
                                                >
                                                    <span>
                                                        {referralCode}
                                                    </span>
                                                    <BaseIcon icon={<CopyIcon />} />
                                                </div>
                                                {/* </ClientOnly> */}
                                            </div>
                                            <div className="flex flex-row justify-center space-x-4 pt-2">
                                                {/* <ClientOnly> */}
                                                <BaseButton
                                                    v-tooltip="{
												content: 'Copied to clipboard!',
												shown: isCopyMessage,
												theme: 'dark',
												triggers: [],
											}"
                                                    type="line"
                                                    size="base"
                                                    onClick={createTextMessage}
                                                >
                                                    <BaseIcon className="text-3xl" icon={<MessageIcon />} />
                                                </BaseButton>
                                                <BaseButton type="line" size="base" onClick={createMailTo}>
                                                    <BaseIcon className="text-3xl" icon={<EmailIcon />} />
                                                </BaseButton>
                                                <BaseButton
                                                    v-tooltip="{
												content: 'Copied to clipboard!',
												shown: isCopyLinkOpen,
												theme: 'dark',
												triggers: [],
											}"
                                                    type="line"
                                                    size="base"
                                                    onClick={copyURL}
                                                >
                                                    <BaseIcon className="text-3xl" icon={<LinkIcon />} />
                                                </BaseButton>
                                                {/* </ClientOnly> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold text-textblack pb-1">Your Referrals</div>
                                    <p>Anyone who uses your referral code when signing up to Cottage will appear here</p>
                                    <div className="mt-2 ring-1 ring-border md:mx-0 rounded-lg">
                                        <table className="min-w-full divide-y divide-border">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textblack sm:pl-6">User</th>
                                                    <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-textblack lg:table-cell">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-textblack lg:table-cell">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (!referrals || !referrals.length ? [] : referrals).map((referral, refIndex) => (
                                                        <tr key={referral.createdAt}>
                                                            <td className={clsx(refIndex === 0 ? '' : 'border-t border-transparent', 'relative py-4 pl-4 sm:pl-6 pr-3 text-sm')}>
                                                                <div className="text-lg text-textblack">{referral.firstName} {referral.lastName}</div>
                                                                {refIndex !== 0 &&
                                                                    <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                                                                }
                                                            </td>
                                                            <td
                                                                className={clsx(
                                                                    refIndex === 0 ? '' : 'border-t border-gray-200',
                                                                    'hidden px-3 py-3.5 text-gray-500 lg:table-cell',
                                                                )}
                                                            >
                                                                <BaseBadge badgeStyle={statusMap[referral.referralStatus]}>
                                                                    {referral.referralStatus}
                                                                </BaseBadge>
                                                            </td>
                                                            <td
                                                                className={clsx(
                                                                    refIndex === 0 ? '' : 'border-t border-transparent',
                                                                    'relative py-3.5 pl-3 pr-4 sm:pr-6 text-sm font-medium',
                                                                )}
                                                            >
                                                                {new Date(referral.createdAt).toLocaleDateString()}
                                                                {
                                                                    refIndex !== 0 &&
                                                                    <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" />
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </ElementsCard>
                            </BaseTabsTab>
                        </>
                    )
                }
            </BaseTabsContainer>
            { /* </ClientOnly> */}
        </>
    )
}