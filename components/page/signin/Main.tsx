"use client";
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { BaseButton, BaseInput } from "@/components";

import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';

import { Auth as AuthHelper } from "@/helpers";
import { validateEmail } from "@/utils/validation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';
import { ResidentStore, OccupancyStore, ElectricBillStore, AppStore } from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/composables/useAuth';
import useResetState from '@/composables/useResetState';
export default function Main() {
    const {logout, login: login_} = useAuth();
	const {useResetOnboarding} = useResetState();

	const [signInEmail, setEmail] = useState("");
	const [signInPassword, setPassword] = useState("");
	const [hasErrorsEmail, setErrorsEmail] = useState(false);
	const [hasErrorsPassword, setErrorsPassword] = useState(false);
	const [hasErrorsOauth, setErrorsOauth] = useState(false);
	const [startLoginForm, setStartLoginForm] = useState(false);
	const {user} = AppStore();

	const { getResident } = ResidentStore();
	const { getOccupancy } = OccupancyStore();
	const { fetchElectricData } = ElectricBillStore();

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.get("outhFail")) {
			setErrorsOauth(true);
		}
		(async function () {
			if ((await supabase.auth.getUser()).data.user) {
				router.push('/app/overview');
			}
		})();
	}, []);

	const supabase = createClientComponentClient<Database>();

	// const router = useRouter();
	// const { oauthFail } = router.query;

	async function createOAuthSession(provider: string) {
		setErrorsOauth(false);
		try {
			await AuthHelper().createOAuthSession(provider);
		} catch (err) {
			console.error(err);
			setErrorsOauth(true);
		}
	}
	const [loginClicked, setLoginClicked] = useState(false);

	async function login() {
		setLoginClicked(true);
		setStartLoginForm(true);
		setErrorsOauth(false);
		setErrorsPassword(false);
		setErrorsOauth(false);

		if (validateEmail(signInEmail)) {
			try {
				// await AuthHelper().login(signInEmail, signInPassword);
				await login_(signInEmail, signInPassword);
			} catch (error) {
				console.error(error);
				setErrorsPassword(true);
				useResetOnboarding();
				setStartLoginForm(false);
			}
		} else {
			setErrorsEmail(true);
			setStartLoginForm(false);
		}
		setLoginClicked(false);
	}

	useEffect(() => {
		if (!loginClicked) {
			return;
		}
		(async () => {
			if (user) {
				try {
					await useAuth().fetchUserData();
					return router.push("/app/overview");
				} catch (error) {
					// TODO: Handle error here if API fails
					console.error(error);
					await logout();
					return router.push("/no-account");
				}
			}
		})();
	},[user])
    return (
        <>
            <div className="flex flex-row items-center md:flex-start justify-between w-full">
                <BaseButton
                    type="logo"
                    className="w-full px-2 pt-2"
                    size="large"
                    style="px-4"
                    onClick={() => createOAuthSession('google')}
                >
                    <FcGoogle className="min-w-fit w-6 h-6" />
                </BaseButton>
                <BaseButton
                    type="logo"
                    className="w-full px-2 pt-2"
                    size="large"
                    style="px-4"
                    onClick={() => createOAuthSession('facebook')}
                >
                    <BsFacebook className="min-w-fit w-6 h-6" color="rgb(24, 119, 242)" />
                </BaseButton>
            </div>
            {
                hasErrorsOauth &&
                <div className="text-rose-600 my-2 max-w-2xl">There was a problem logging in, please try another method</div>
            }
            <div className="w-full mt-5">
                <div className="relative flex py-3 items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-4 text-forrest-700 font-semibold">Or</span>
                    <div className="flex-grow border-t border-border"></div>
                </div>
            </div>
            <div className="flex flex-col items-center md:flex-start justify-between w-full px-2">
                <BaseInput
                    inputValue={signInEmail}
                    subtext="Invalid email"
                    hasErrors={hasErrorsEmail || hasErrorsPassword}
                    showSubtext={hasErrorsEmail}
                    inputClass="w-full flex text-left mt-2"
                    autocomplete="email"
                    inputName="signInEmail"
                    inputControl="flex"
                    onChange={(value: string) => { setEmail(value) }}
                >
                    Email
                </BaseInput>
                <BaseInput
                    inputValue={signInPassword}
                    subtext="Invalid login details, please try again"
                    hasErrors={hasErrorsPassword}
                    showSubtext={hasErrorsPassword}
                    inputClass="w-full flex text-left mt-2"
                    inputType="password"
                    autocomplete="current-password"
                    inputName="signInPassword"
                    inputControl="flex"
                    onChange={(value: string) => { setPassword(value) }}
                >
                    Password
                </BaseInput>
                <BaseButton
                    className="w-full flex pt-6"
                    btn-size="large"
                    style={clsx(
                        'w-full font-semibold leading-6 text-white hover:bg-green-200 transition ease-in-out duration-150',
                        startLoginForm ? 'cursor-not-allowed' : '',
                    )}
                    onClick={login}
                >
                    {
                        !startLoginForm
                            ?
                            <div>Sign In</div>
                            :
                            <div className="inline-flex items-center space-x-2">
                                <svg className="animate-spin -mt-1 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                <span>Processing...</span>
                            </div>
                    }
                </BaseButton>
            </div>
        </>
    )
}