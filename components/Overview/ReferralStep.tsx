"use client";
import { AppStore, CottageUserStore, RegServicesStore, ResidentStore } from "@/store"
import { Database } from "@/types/db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import CopyIcon from '@/assets/icons/copy.svg';
import MessageIcon from '@/assets/icons/message.svg'
import EmailIcon from '@/assets/icons/email.svg'
import LinkIcon from '@/assets/icons/link.svg'
import { BaseButton, BaseIcon } from "@/components";
import { useRouter } from "next/navigation";

type ReferralStepProps = {
    isModalOpen: string;
    maxWidth: string;
    closeType: string;
}

export const ReferralStep = () => {
    const { resident } = ResidentStore();
    const { getReferralCode, referralCode } = CottageUserStore();
    const { serviceGroup } = RegServicesStore();
    const { user } = AppStore();
    const supabase = createClientComponentClient<Database>();

    const [isCopyReferralOpen, setIsCopyReferralOpen] = useState(false);
    const [isCopyLinkOpen, setIsCopyLinkOpen] = useState(false);
    const [isCopyMessage, setIsCopyMessage] = useState(false);

    useEffect(() => {
        if (user?.id)
            getReferralCode(user.id);
    }, []);

    const createTextMessage = () => {
        const bodyString =
            "I%20just%20signed%20up%20with%20Cottage%20to%20manage%20my%20electricity%20account.%20They%20are%20saving%20me%2010%25%20on%20my%20electricity%20bill%20every%20month.%20Give%20them%20at%20try%21%0A%0A" +
            process.env.NEXT_PUBLIC_SITE_URL +
            "/ref/" +
            referralCode;
        if (navigator.userAgent.match(/iPhone/i)) {
            window.open("sms://?/&body=" + bodyString);
        } else if (navigator.userAgent.match(/Android/i)) {
            window.open("sms://?/?body=" + bodyString);
        } else {
            navigator.clipboard.writeText(
                "I just signed up with Cottage to manage my electricity account. They help 'power up' your electricity account and provide the cheapest way to convert your energy usage to renewable. Give them a try!" +
                process.env.NEXT_PUBLIC_SITE_URL +
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
            "mailto:?subject=Check-out%20Cottage!&body=I%20just%20signed%20up%20with%20Cottage%20to%20manage%20my%20electricity%20account.%20They%20help%20%27power%20up%27%20your%20electricity%20account%20and%20provide%20the%20cheapest%20way%20to%20convert%20your%20energy%20usage%20to%20renewable.%20Give%20them%20at%20try%21%0A" +
            process.env.NEXT_PUBLIC_SITE_URL +
            "/ref/" +
            referralCode;
        window.location.href = mailString;
    }
    const router = useRouter();
    function copyURL() {
        // navigator.clipboard.writeText(process.env.NEXT_PUBLIC_SITE_URL + "/ref/" + referralCode);
        setIsCopyLinkOpen(true);
        setTimeout(() => {
            setIsCopyLinkOpen(false);
        }, 1500);
    }
    function copyReferralCode() {
        // navigator.clipboard.writeText(referralCode);
        setIsCopyReferralOpen(true);
        setTimeout(() => {
            setIsCopyReferralOpen(false);
        }, 1500);
    }

    return (
        <div className="flex flex-col w-full mt-4">
            <div className="text-center w-full relative">
                <div>
                    <div className="pb-4 flex flex-col justify-center">
                        <p className="">
                            Every <span className="text-green-700 font-bold">5 friends</span> you refer to sign up for Cottage, you earn<b> </b>
                            <span className="text-green-700 font-bold"> ${serviceGroup.referralProgramAmount}</span>.
                        </p>
                        <p>Tell them to enter the code below during sign up</p>
                        <div className="flex justify-center py-2">
                            {/* <ClientOnly> */}
                            <div
                                // v-tooltip="{
                                // 	content: 'Copied to clipboard!',
                                // 	shown: isCopyReferralOpen,
                                // 	theme: 'dark',
                                // 	triggers: [],
                                // }"
                                className="text-xl font-semibold bg-green-50 rounded-xl justify-center leading-tight px-4 py-3 flex space-x-2 cursor-pointer hover:bg-green-100/70"
                                onClick={copyReferralCode}
                            >
                                <span>
                                    {referralCode}
                                </span>
                                <BaseIcon icon={<CopyIcon />} />
                            </div>
                            {/* </ClientOnly> */}
                        </div>
                        <p className="pt-2">Or share a link</p>
                        <div className="flex flex-row justify-center space-x-4 pt-2">
                            {/* <ClientOnly> */}
                            <BaseButton
                                // v-tooltip="{
                                // 	content: 'Copied to clipboard!',
                                // 	shown: isCopyMessage,
                                // 	theme: 'dark',
                                // 	triggers: [],
                                // }"
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
                                // v-tooltip="{
                                // 	content: 'Copied to clipboard!',
                                // 	shown: isCopyLinkOpen,
                                // 	theme: 'dark',
                                // 	triggers: [],
                                // }"
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
            </div>
            <div className="text-sm pt-2 text-center">
                By participating, you agree to the<b> </b>
                <a href="/terms-of-service" target="_blank" className="underline">Terms of Service</a>
            </div>
        </div>
    )
}