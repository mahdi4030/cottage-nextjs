"use client";
import { useState, useMemo } from 'react';
import Router from "next/router";
import { Auth as AuthHelper } from "@/helpers";
import { validateEmail } from "@/utils/validation";
import Link from 'next/link';
import { useAuth } from '@/composables/useAuth';
import { BaseButton, BaseInput } from '@/components';
export default function Main() {
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
	const [hasErrorsEmail, setErrorsEmail] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [hasGeneralError, setGeneralError] = useState(false);

	// const router = useRouter();
	// const { oauthFail } = router.query;
	const services = useAuth();

	const isSendDisabled = useMemo(() => {
		if (forgotPasswordEmail.length <= 4) {
			return true;
		}
		return false;
	}, [forgotPasswordEmail]);

	async function recoverAccount() {
		setGeneralError(false);
		setErrorsEmail(false);
	
		if (validateEmail(forgotPasswordEmail)) {
			const recoveryRequestSuccess = await services.accountRecovery(forgotPasswordEmail);
			if (recoveryRequestSuccess) {
				Router.push("/forgot-password-check-email");
			} else {
				setErrorsEmail(true);
			}
		} else {
			setErrorsEmail(true);
		}
	}
    return (
        <div className="flex flex-col items-center md:flex-start justify-between w-full">
            <BaseInput
                inputValue={forgotPasswordEmail}
                inputClass="pt-6 w-full flex text-left"
                inputControl="flex"
                inputName="forgotPasswordEmail"
                subtext="Sorry, we couldn’t find your email in our records"
                hasErrors={hasErrorsEmail}
                showSubtext={hasErrorsEmail}
                onChange={(value: string) => { setForgotPasswordEmail(value) }}
            >
                Email
            </BaseInput>
            <BaseButton
                size="large"
                style="w-full"
                type="primary"
                className="w-full flex pt-6"
                disabled={isSendDisabled}
                onClick={recoverAccount}
            >
                Send Reset Link
            </BaseButton>
            {hasGeneralError &&
                <div className="my-2 text-rose-600">
                    {errorMessage}
                </div>
            }
        </div>
    )
}