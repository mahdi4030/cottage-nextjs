"use client";
import { BaseButton, BaseIcon, BaseInput, ElementsCard } from "@/components";
import { useAuth } from "@/composables/useAuth";
import { AppStore } from "@/store";
import { validateEmail } from "@/utils/validation";
import { differenceInMonths } from "date-fns";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import IconGoogle from '@/assets/icons/icon-google.svg'
import IconFacebook from '@/assets/icons/icon-facebook.svg'

export default function Main() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { utilityCompany } = params;
    const accountid = searchParams.get("accountid");
    const startdate = searchParams.get("startdate");
    const enddate = searchParams.get("enddate");
    const DataCustodianID = searchParams.get("DataCustodianID");

    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [hasErrorsEmail, setHasErrorsEmail] = useState(false);
    const [hasErrorsPassword, setHasErrorsPassword] = useState(false);
    const [hasErrorsOauth, setHasErrorsOauth] = useState(false);

    const { user } = AppStore();

    useEffect(() => {
        (async () => {
            const { utilityCompany } = params;
            const accountid = searchParams.get("accountid");
            const startdate = searchParams.get("startdate");
            const enddate = searchParams.get("enddate");
            const DataCustodianID = searchParams.get("DataCustodianID");
            if (utilityCompany === "coned") {
                if (enddate) {
                    const today = new Date();
                    const sharingEndDate = new Date(enddate as string);
                    const diffInMonths = differenceInMonths(sharingEndDate, today);
                    if (diffInMonths > 10) {
                        if (user) {
                            return router.push(`/oauth/${utilityCompany}/scopes?accountid=${accountid}&startdate=${startdate}&enddate=${enddate}&DataCustodianID=${DataCustodianID}`);
                        }
                    } else {
                        return router.push("/oauth/" + utilityCompany + "/end-date-error");
                    }
                } else {
                    return router.push("/oauth/" + utilityCompany + "/end-date-error");
                }
            } else {
                if (user) {
                    return router.push(`/oauth/${utilityCompany}/scopes?accountid=${accountid}&DataCustodianID=${DataCustodianID}`);
                }
            }
        })();
    }, []);

    const login = async () => {
        setHasErrorsEmail(false);
        setHasErrorsPassword(false);
        setHasErrorsOauth(false);

        if (validateEmail(signInEmail)) {
            try {
                await useAuth().login(signInEmail, signInPassword);
                return router.push(`/oauth/${utilityCompany}/scopes?accountid=${accountid ?? ""}&startdate=${startdate ?? ""}&enddate=${enddate ?? ""}&DataCustodianID=${DataCustodianID ?? ""}`);
            } catch (err) {
                setHasErrorsPassword(true);
                console.error(err);
            }
        } else {
            setHasErrorsEmail(true);
        }
    }

    const createOAuthSession = async (provider: string) => {
        setHasErrorsOauth(false);
        try {
            await useAuth().createOAuthSession(
                provider,
                "/oauth/" +
                utilityCompany +
                "/scopes" +
                (accountid ?? "?accountid=" + accountid) +
                (startdate ?? "&startdate=" + startdate) +
                (enddate ?? "&enddate=" + enddate) +
                (DataCustodianID ?? "&DataCustodianID=" + DataCustodianID),
            );
        } catch (err) {
            console.error(err);
            setHasErrorsOauth(true);
        }
    }
    return (
        <div className="flex flex-col w-full max-w-lg">
            <div className="flex flex-row items-center md:flex-start justify-between w-full">
                <BaseButton
                    type="logo"
                    className="w-full px-2 pt-2"
                    size="large"
                    style="px-4"
                    onClick={() => createOAuthSession('google')}
                >
                    <BaseIcon icon={<IconGoogle />} className="min-w-fit text-2xl" />
                </BaseButton>
                <BaseButton
                    type="logo"
                    className="w-full px-2 pt-2"
                    size="large"
                    style="px-4"
                    onClick={() => createOAuthSession('facebook')}
                >
                    <BaseIcon icon={<IconFacebook />} className="min-w-fit text-2xl" />
                </BaseButton>
            </div>
            {
                hasErrorsOauth &&
                <div className="text-rose-600 my-2 max-w-2xl">
                    There was a problem logging in, please try another method
                </div>
            }
            <div className="w-full mt-5">
                <div className="relative flex py-3 items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-4 text-forrest-700 font-semibold">Or</span>
                    <div className="flex-grow border-t border-border"></div>
                </div>
            </div>
            <div className="flex flex-col items-center md:flex-start justify-between w-full">
                <BaseInput
                    inputValue={signInEmail}
                    onChange={setSignInEmail}
                    subtext="Invalid email"
                    hasErrors={hasErrorsEmail || hasErrorsPassword}
                    showSubtext={hasErrorsEmail}
                    inputClass="w-full flex text-left mt-2"
                    autocomplete="email"
                    inputName="signInEmail"
                    inputControl="flex"
                >
                    Email
                </BaseInput>
                <BaseInput
                    inputValue={signInPassword}
                    onChange={setSignInPassword}
                    subtext="Invalid login details, please try again"
                    hasErrors={hasErrorsPassword}
                    showSubtext={hasErrorsPassword}
                    inputClass="w-full flex text-left mt-2"
                    inputType="password"
                    autocomplete="current-password"
                    inputName="signInPassword"
                    inputControl="flex"
                >
                    Password
                </BaseInput>
                <BaseButton type="primary" className="w-full flex pt-6" style="w-full" size="large" onClick={login}>
                    Sign In
                </BaseButton>
            </div >
            <div className="text-green-700 mt-8 text-xl font-semibold max-w-2xl underline">
                <Link href="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="w-full mt-5">
                <div className="relative flex py-3 items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-4 text-forrest-700 font-semibold">Not a registered user?</span>
                    <div className="flex-grow border-t border-border"></div>
                </div>
            </div>
            <BaseButton href="/onboarding/start" type="line" className="w-full flex pt-6" style="w-full" size="large">
                Register
            </BaseButton>
        </div >
    )
}