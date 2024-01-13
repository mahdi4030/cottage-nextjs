"use client";
import clsx from "clsx";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

import { FormNavigation } from '@/components/Form'
import useOnboardingNavigation from '@/composables/useOnboardingNavigation';
import { BaseIcon, BaseInput, BaseButton, ElementsOnboardingCard } from "@/components";
import { OnboardingModalAuthRep } from '@/components/Onboarding'
import { AppStore, RegistrationStore } from "@/store";
import { RegServicesStore } from "@/store";
import { useAuth } from "@/composables/useAuth";

import IconGoogle from '@/assets/icons/icon-google.svg';
import IconFacebook from '@/assets/icons/icon-facebook.svg';
import { validateEmail } from "@/utils/validation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/db";
export default function Main() {
    const { registration, createRegistration, setResidentFirstName, setResidentLastName } = RegistrationStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsAndConditions, setTermsAndConditions] = useState(false);

    const [hasFirstNameErrors, setHasFirstNameErrors] = useState(false);
    const [hasLastNameErrors, setHasLastNameErrors] = useState(false);
    const [showSignInLink, setShowSignInLink] = useState(false);

    const [hasEmailError, setHasEmailError] = useState(false);
    const [hasTermsAndConditionsError, setHasTermsAndConditionsError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("Enter a valid email");
    const [hasPasswordError, setHasPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("Password must be 8 characters, please try again");
    const [hasErrorsOauth, setHasErrorsOauth] = useState(false);

    const auth = useAuth();

    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [isProcessingAccountCreation, setIsProcessingAccountCreation] = useState(false);

    const { checkRequiredFields, navigateToPreviousPage } = useOnboardingNavigation();


    const isNextDisabled = useMemo(() => {
        if (!checkRequiredFields() && email.length > 5 && password.length >= 8 && termsAndConditions) {
            return false;
        }
        return true;
    }, [email, termsAndConditions, password]);

    const [isAuthorizedRepOpen, setIsAuthorizedRepOpen] = useState(false);
    const closeAuthorizedRepOpen = () => {
        setIsAuthorizedRepOpen(false);
    }

    const createAccountWithOAuth = async (provider: any) => {
        setHasFirstNameErrors(false);
        setHasLastNameErrors(false);
        if (registration.resident.firstName === undefined || registration.resident.firstName && registration.resident.firstName.length < 3) {
            setHasFirstNameErrors(true);
            return;
        }
        if (registration.resident.lastName === undefined || registration.resident.lastName && registration.resident.lastName.length < 3) {
            setHasLastNameErrors(true);
            return;
        }
        if (!termsAndConditions) {
            setHasTermsAndConditionsError(true);
            return;
        }
        try {
            await auth.createOAuthSession(provider, "/onboarding/oauth-success");
        } catch (err) {
            setHasEmailError(true);
            setEmailErrorMessage("Something went wrong...");
        }
    }

    const [startServiceErrorText, setStartServiceErrorText] = useState("Enter a valid date");

    const toolTipOptions = {
        content:
            "We can only help people online with existing electric accounts in your area, but we can help sign you up over the phone. Give us a call at (646) 847-7885",
        triggers: ["hover", "click"],
    }

    const nextPage = async () => {
        let formErrors = false;

        setHasFirstNameErrors(false);
        setHasLastNameErrors(false);
        setHasEmailError(false);
        setShowSignInLink(false);

        if (registration.resident.firstName === undefined || registration.resident.firstName && registration.resident.firstName.length < 3) {
            setHasFirstNameErrors(true);
            formErrors = true;
        }

        if (registration.resident.lastName === undefined || registration.resident.lastName && registration.resident.lastName.length < 3) {
            setHasLastNameErrors(true);
            formErrors = true;
        }

        if (!validateEmail(email)) {
            setHasEmailError(true);
            formErrors = true;
        }

        if (!formErrors) {
            setIsProcessingAccountCreation(true);
            try {
                await auth.createAccount(email, password);
            } catch (error: any) {
                console.error(error);
                setIsProcessingAccountCreation(false);
                setHasEmailError(true);
                setEmailErrorMessage(error.message);
            }
        }
    }

    const { user } = AppStore();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (user) {
                if (!isCreatingAccount) {
                    setIsCreatingAccount(true);
                    try {
                        await createRegistration(user);
                        useAuth().fetchUserData();
                        // return navigateTo("/app/overview");
                        return router.push("/app/overview");
                    } catch (error: any) {
                        // TODO: Handle error here if API fails
                        console.error(error);
                        setHasEmailError(true);
                        setEmailErrorMessage(error.message);
                        setIsCreatingAccount(false);
                    }
                }
            }
        })();
    }, [user]);

    const previousPage = () => {
        navigateToPreviousPage();
    }
    return (
        <>
            <OnboardingModalAuthRep isOpen={isAuthorizedRepOpen} closeAction={closeAuthorizedRepOpen} />
            <h2 className="text-center leading-tight">Let’s setup your account 🔨</h2>
            <ElementsOnboardingCard>
                <div className="max-w-xl w-full">
                    <div className="full pb-4 md:pb-6">
                        <p className="text-center">Make sure to enter your legal name.</p>
                        <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <BaseInput
                                    inputValue={registration.resident.firstName ?? ""}
                                    inputClass="w-full flex text-left mt-2"
                                    inputName="firstName"
                                    inputControl="flex"
                                    subtext="Enter a valid first name"
                                    hasErrors={hasFirstNameErrors}
                                    showSubtext={hasFirstNameErrors}
                                    onChange={(value) => setResidentFirstName(value)}
                                >
                                    First Name
                                </BaseInput>
                            </div>
                            <div className="sm:col-span-3">
                                <BaseInput
                                    inputValue={registration.resident.lastName ?? ""}
                                    inputClass="w-full flex text-left mt-2"
                                    inputName="lastName"
                                    inputControl="flex"
                                    subtext="Enter a valid last name"
                                    hasErrors={hasLastNameErrors}
                                    showSubtext={hasLastNameErrors}
                                    onChange={(value) => setResidentLastName(value)}
                                >
                                    Last Name
                                </BaseInput>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="relative flex items-center">
                            <div className="flex-grow border-t border-border"></div>
                            <span className="flex-shrink mx-4 text-forrest-700 text-lg font-semibold">Sign up with</span>
                            <div className="flex-grow border-t border-border"></div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row md:flex-start justify-between w-full">
                        <BaseButton type="logo" className="w-full px-2 pt-2" size="large" onClick={() => createAccountWithOAuth('google')}>
                            <BaseIcon icon={<IconGoogle />} className="min-w-fit text-2xl" />
                        </BaseButton>
                        <BaseButton type="logo" className="w-full px-2 pt-2" size="large" onClick={() => createAccountWithOAuth('facebook')}>
                            <BaseIcon icon={<IconFacebook />} className="min-w-fit text-2xl" />
                        </BaseButton>
                    </div>
                    {hasErrorsOauth && <div className="text-rose-600 my-2 max-w-2xl">There was a problem logging in, please try another method</div>}
                    <div className="w-full mt-4">
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-border"></div>
                            <span className="flex-shrink mx-4 text-forrest-700 text-lg font-semibold">Or manually</span>
                            <div className="flex-grow border-t border-border"></div>
                        </div>
                    </div>
                    <form autoComplete="off">
                        <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-6">
                            <input style={{ display: "none" }} type="text" name="fakeusername" />
                            <input style={{ display: "none" }} type="password" name="fakepassword" autoComplete="current-password" />
                            <div className="sm:col-span-6">
                                <BaseInput
                                    inputValue={email}
                                    onChange={(value) => setEmail(value)}
                                    subtext={emailErrorMessage}
                                    hasErrors={hasEmailError || hasPasswordError}
                                    showSubtext={hasEmailError}
                                    inputClass="w-full flex text-left mt-2"
                                    autocomplete="email"
                                    inputName="email"
                                    inputControl="flex"
                                >
                                    Email
                                </BaseInput>
                            </div>
                            {showSignInLink &&
                                <div className="sm:col-span-6 pb-2 pt-2 text-left text-lg">
                                    <a className="text-green-700 font-semibold underline cursor-pointer" href="/signin">Try signing in</a>
                                    instead?
                                </div>}
                            <div className="sm:col-span-6">
                                <BaseInput
                                    inputValue={password}
                                    onChange={(value) => setPassword(value)}
                                    subtext={passwordErrorMessage}
                                    hasErrors={hasPasswordError}
                                    showSubtext={hasPasswordError}
                                    inputClass="w-full flex text-left mt-2"
                                    inputType="password"
                                    autocomplete="off"
                                    inputName="password"
                                    inputControl="flex"
                                >
                                    Password (min 8 characters)
                                </BaseInput>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex flex-row pt-4">
                    <input
                        id="terms-conditions"
                        checked={termsAndConditions}
                        className="form-checkbox text-green-700 w-8 h-8 mr-2 focus:ring-green-700 focus:ring-opacity-25 border border-gray-300 rounded-3xl"
                        aria-describedby="terms-conditions-description"
                        name="terms-conditions"
                        type="checkbox"
                        onChange={(event) => { setTermsAndConditions(event.target.checked); }}
                    />
                    <div className={clsx("text-sm text-textblack/80", hasTermsAndConditionsError ? '!text-rose-700 font-semibold' : '')}>
                        I agree to the
                        <a href="/terms-of-service" target="_blank" className="underline">Terms of Service</a>,
                        <a href="/privacy-policy" target="_blank" className="underline">Privacy Policy</a>, and authorize Cottage Energy to act as an
                        <span className="underline" onClick={() => setIsAuthorizedRepOpen(true)}>Authorized Rep</span>.
                    </div>
                </div>
            </ElementsOnboardingCard>
            <div className="container lg:px-6 pt-4 md:py-4">
                <FormNavigation
                    isNextDisabled={isNextDisabled}
                    processingRequest={isProcessingAccountCreation}
                    processingRequestText="One sec..."
                    nextButtonText="Create Account"
                    navBtnStyle="px-12 lg:px-16 py-3 lg:py-4 text-lg lg:text-xl"
                    nextPage={nextPage}
                    previousPage={previousPage}
                />
            </div>
        </>
    )
}