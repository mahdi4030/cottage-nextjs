"use client";
import { BaseButton, BaseInput } from "@/components";
import { ElementsOnboardingCard } from "@/components/Elements";
import { useAuth } from "@/composables/useAuth";
import { RegistrationStore } from "@/store"
import { ToastsStore } from "@/store/toast";
import { Database } from "@/types/db"
import { validateEmail } from "@/utils/validation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useIntercom } from "react-use-intercom";

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
    const [startJoinBetaList, setStartJoinBetaList] = useState(false);
    const { showNewMessage } = useIntercom();
    const openChat = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        showNewMessage("I need to sign up for electricity today and want to use Cottage");
    }

    const router = useRouter();

    const submitBetaList = async () => {
        setHasEmailError(false);

        if (validateEmail(waitListEmail)) {
            setStartJoinBetaList(true);
            try {
                const { data, error } = await supabase.from("WaitList").insert({
                    name: name,
                    email: waitListEmail,
                    reference: reference,
                    address: registration.displayAddress,
                    zip: registration.unit.zip,
                    isForBeta: true,
                });

                const alertBody = {
                    message: `New BETA added for ${name} 
                    at ${registration.displayAddress}
                    at ${new Date().toLocaleString()}`,
                    channel: "wait-list",
                };

                // useLazyFetch("/api/send-alert", {
                //     method: "post",
                //     body: alertBody,
                // });

                router.push(`/join-waitlist-success?beta=${waitListEmail}`);
            } catch (err) {
                console.error("CATCHING THE ERRR", err);
                setStartJoinBetaList(false);
                addToastToQueue({
                    message: "Something went wrong. Please try again later.",
                    type: "warning",
                });
            }
        } else {
            setHasEmailError(true);
        }
    }
    return (
        <>
            <ElementsOnboardingCard className="text-center items-center">
                <p className="pb-2">Submit your info and we will reach out with registration details.</p>
                <p className="text-center">Need electricity today?</p>
                <div className="flex flex-row space-x-1 pb-4">
                    <p>
                        <a className="underline text-green-700 font-semibold cursor-pointer" onClick={openChat}>Open a chat</a>
                    </p>
                    <p>give us a call at</p>
                    <p>
                        <a className="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a>
                        .
                    </p>
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
                        <BaseInput inputValue={reference} onChange={setReference} inputClass="w-full flex text-left mt-2" inpuName="reference" inputControl="flex">
                            How did you find Cottage?
                        </BaseInput>
                    </div>
                </div >
            </ElementsOnboardingCard >
            <div
                className="mt-8 flex md:flex-row items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-8 flex-col-reverse space-y-reverse justify-center"
            >
                <BaseButton className="w-full md:w-56" href="/onboarding/address" size="large" type="transparent">Back</BaseButton>
                <BaseButton
                    className="w-full md:w-56"
                    size="large"
                    // processingRequest={startJoinBetaList}
                    processing-request-text="Submitting..."
                    onClick={submitBetaList}
                >
                    Submit
                </BaseButton>
            </div >
        </>
    )
}