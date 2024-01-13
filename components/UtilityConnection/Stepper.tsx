"use client";
import { AppStore, ElectricAccountStore, RegServicesStore, RegistrationStore } from "@/store";
import { Database } from "@/types/db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { BaseButton, BaseIcon, BaseInput } from "@/components";
import clsx from "clsx";

import LockIcon from '@/assets/icons/lock.svg'
type StepperProps = {
    connectedAccount: Function;
    cancelAction: Function;
}

export const Stepper: React.FC<Partial<StepperProps>> = ({
    connectedAccount = () => { },
    cancelAction = () => { }
}) => {
    const { serviceGroup } = RegServicesStore();
    const { registration } = RegistrationStore();
    const { electricAccount } = ElectricAccountStore();

    const [utilityUsername, setUtilityUsername] = useState("");
    const [utilityPassword, setUtilityPassword] = useState("");
    const [innerStep, setInnerStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const [progressPercent, setProgressPercent] = useState(0);
    const [interval, _setInterval] = useState<any>(null);
    const [hasCredentialError, setHasCredentialError] = useState(false);

    // const emit = defineEmits(["connectedAccount", "cancelAction"]);
    const { user } = AppStore();
    const supabase = createClientComponentClient<Database>();
    useEffect(() => {
        return () => {
            clearInterval(interval.value);
            setProgress(0);
            setProgressPercent(0);
        }
    }, []);

    const linkAccounts = async () => {
        setInnerStep(2);
        setHasCredentialError(false);
        _setInterval(setInterval(() => {
            if (progress >= 1000) {
                clearInterval(interval);
            } else {
                setProgress(progress + 1);
                setProgressPercent((progress / 1000) * 100);
            }
        }, 10));
        const requestBody = {
            provider: serviceGroup.electricCompanyID.id.toLowerCase(),
            username: utilityUsername,
            password: utilityPassword,
            userId: user?.id,
        };
        try {
            const accountData = await fetch("/api/utility-connect/link", {
                method: "post",
                body: JSON.stringify(requestBody),
            });
            electricAccount.value.accountNumber = accountData.accountNumber;
            electricAccount.value.isAccountLinkedWithUtility = true;
            connectedAccount();
            clearInterval(interval);
            setProgress(0);
            setProgressPercent(0);
        } catch (error) {
            console.error(error);
            setInnerStep(1);
            setHasCredentialError(true);
            setProgress(0);
            setProgressPercent(0);
        }
    }

    const _cancelAction = () => {
        clearInterval(interval);
        cancelAction();
    }
    return (
        <div className="flex flex-col">
            <div className="flex">
                <div className="text-center sm:mt-0 w-full relative">
                    {
                        innerStep == 1 &&
                        <div className="flex flex-col w-full items-center">
                            <p className="text-center pt-4">
                                Enter your <b>{serviceGroup.electricCompanyID.name}</b> login credentials. <br />
                                We always keep your data safe and secure.
                            </p>
                            {
                                hasCredentialError &&
                                <p className="text-rose-600 pt-4 max-w-2xl">
                                    That combination of username / password did not work. Try again.
                                </p>
                            }

                            <form className="w-full max-w-sm pt-4" autoComplete="off">
                                <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-6">
                                    <input style={{ display: "none" }} type="text" name="fakeusername" />
                                    <input style={{ display: "none" }} type="password" name="fakepassword" autoComplete="current-password" />
                                    <div className="sm:col-span-6">
                                        <BaseInput
                                            inputValue={utilityUsername}
                                            onChange={setUtilityUsername}
                                            hasErrors={hasCredentialError}
                                            inputClass="w-full flex text-left mt-2"
                                            autocomplete="email"
                                            inputName="utilityUsername"
                                            inputControl="flex"
                                        >
                                            Username
                                        </BaseInput>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <BaseInput
                                            inputValue={utilityPassword}
                                            onChange={setUtilityPassword}
                                            hasErrors={hasCredentialError}
                                            inputClass="w-full flex text-left mt-2"
                                            inputType="password"
                                            autocomplete="off"
                                            inputName="utilityPassword"
                                            inputControl="flex"
                                        >
                                            Password
                                        </BaseInput>
                                    </div>
                                </div>
                            </form>
                            <BaseButton
                                size="large"
                                style={clsx('w-full font-semibold leading-6 text-white hover:bg-green-200 transition ease-in-out duration-150')}
                                type="primary"
                                className="flex w-full md:w-1/2 mt-4"
                                onClick={linkAccounts}
                            ><BaseIcon icon={<LockIcon />} className="text-base mr-2 -mt-[5px]" />
                                <span>Link</span>
                            </BaseButton>
                        </div>
                    }
                    {
                        innerStep == 2 &&
                        <div >
                            <p className="pt-4">
                                Connecting securely to <b>{serviceGroup.electricCompanyID.name}</b>
                            </p>
                            <div className="flex flex-row py-6 justify-center">
                                <div className="h-2 rounded-full bg-green-200 z-50 w-full max-w-md relative">
                                    <span className="bg-green-700 left-0 top-0 bottom-0 absolute rounded-full" style={{ width: '' + progressPercent + '%' }}></span>
                                </div>
                            </div>
                            <p>Please do not close this screen while we work in the background 🙏</p>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}