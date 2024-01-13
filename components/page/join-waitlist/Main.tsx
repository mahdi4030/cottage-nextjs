"use client";
import { BaseButton, BaseInput, ElementsOnboardingCard } from "@/components";
import { useAuth } from "@/composables/useAuth";
import { RegistrationStore } from "@/store";
import { ToastsStore } from "@/store/toast";
import { Database } from "@/types/db"
import { validateEmail } from "@/utils/validation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Main() {
    const supabase = createClientComponentClient<Database>();
    const { addToastToQueue } = ToastsStore();
    const auth = useAuth();
    const [waitListEmail, setWaitListEmail] = useState("");
    const [hasEmailError, setHasEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("Enter a valid email");
    const [name, setName] = useState("");
    const [reference, setReference] = useState("");
    const { registration } = RegistrationStore();
    const [startJoinWaitlist, setStartJoinWaitlist] = useState(false);

    const router = useRouter();

    const submitWaitList = async () => {
        setHasEmailError(false);

        if (validateEmail(waitListEmail)) {
            setStartJoinWaitlist(true);
            try {
                const { data, error } = await supabase.from("WaitList").insert({
                    name: name,
                    email: waitListEmail,
                    reference: reference,
                    address: registration.displayAddress,
                    zip: registration.unit?.zip,
                    isForBeta: false,
                });

                const alertBody = {
                    message: `New WAIT LIST added for ${name} 
                    at ${registration.displayAddress} 
                    at ${new Date().toLocaleString()}`,
                    channel: "wait-list",
                };

                // useLazyFetch("/api/send-alert", {
                //     method: "post",
                //     body: alertBody,
                // });

                router.push(`/join-waitlist-success?email=${waitListEmail}`);
            } catch (err) {
                console.error("CATCHING THE ERRR", err);
                setStartJoinWaitlist(false);
                addToastToQueue({
                    message: "Something went wrong. Please try again later.",
                    type: "warning",
                });
            }
        } else {
            setHasEmailError(true);
        }
    };
    return (
        <>
            <ElementsOnboardingCard className="text-center items-center">
                <div className="text-lg md:text-xl text-center">
                    But we are planning on getting there soon!
                    <br />
                    Join our waiting list so we can keep you posted.
                </div>
                <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-6 w-full max-w-md">
                    <div className="sm:col-span-6">
                        <BaseInput inputValue={name} onChange={setName} inputClass="w-full flex text-left mt-2" inputName="name" inputControl="flex">Name</BaseInput>
                    </div>
                    <div className="sm:col-span-6">
                        <BaseInput
                            inputValue={waitListEmail}
                            onChange={setWaitListEmail}
                            subtext={emailErrorMessage}
                            hasErrors={hasEmailError}
                            showSubtext={hasEmailError}
                            inputClass="w-full flex text-left mt-1"
                            autocomplete="email"
                            inputName="email"
                            inputControl="flex"
                        >
                            Email
                        </BaseInput>
                    </div>
                    <div className="sm:col-span-6">
                        <BaseInput inputValue={reference} onChange={setReference} inputClass="w-full flex text-left mt-2" inputName="reference" inputControl="flex">
                            How did you find out about us?
                        </BaseInput>
                    </div>
                </div>
            </ElementsOnboardingCard>
            <div
                className="mt-8 flex md:flex-row items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-8 flex-col-reverse space-y-reverse justify-center"
            >
                <BaseButton className="w-full md:w-56" href="/onboarding/address" size="large" type="transparent">Back</BaseButton>
                <BaseButton
                    className="w-full md:w-56"
                    size="large"
                    processingRequest={startJoinWaitlist}
                    processingRequestText="Submitting..."
                    onClick={submitWaitList}
                >
                    Join Waitlist
                </BaseButton>
            </div>
        </>
    )
}