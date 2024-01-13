"use client";
import { BaseButton } from "@/components/Base";
import useUtilityIntegration from "@/composables/useUtilityIntegration";
import { RegServicesStore, RegistrationStore } from "@/store";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
type GreenButtonRedirectProps = {
    isModalOpen: boolean;
    maxWidth: string;
    cancelAction: Function;
    confirmAction: Function;
}
export const GreenButtonRedirect: React.FC<Partial<GreenButtonRedirectProps>> = ({
    isModalOpen = false,
    maxWidth = "max-w-4xl",
    cancelAction = () => { },
    confirmAction = () => { }
},) => {
    const { serviceGroup } = RegServicesStore();
    const { registration } = RegistrationStore();

    const [processingGreenButtonRequest, setProcessingGreenButtonRequest] = useState(false);

    async function connectUtilityAccount() {
        setProcessingGreenButtonRequest(true);
        const { oAuthConfig } = useUtilityIntegration();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.location.href = oAuthConfig().REDIRECT_TO_UTILITY;
    }
    return (
        <div>
            <Transition as="template" show={isModalOpen}>
                <Dialog as="div" className="relative z-50" onClose={() => cancelAction()}>
                    <Transition.Child
                        // as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-300 bg-opacity-30 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-start justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                // as="template"
                                enter="ease-out duration-300"
                                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enter-to="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leave-from="opacity-100 translate-y-0 sm:scale-100"
                                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className={clsx("relative bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all my-8 max-w-3xl w-full px-4 py-4 sm:px-10 sm:py-10", maxWidth)}
                                >
                                    <div className="flex">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 w-full">
                                            <h2 className="pb-4">
                                                We are directing you to {serviceGroup.electricCompanyID.name}'s website to complete the process
                                            </h2>
                                            <div className="mt-2">
                                                <div className="flex flex-col w-full items-center">
                                                    <p className="text-lg md:text-xl font-semibold">To connect your account:</p>
                                                    <ul className="list-decimal text-left pt-2 text-base md:text-lg mx-6">
                                                        <li>Sign in with your utility account <b>username</b> and <b>password</b></li>
                                                        <li>Select and approve to share your usage data with <b>Cottage Energy</b></li>
                                                        <li>Finalize and agree to the scopes of usage</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col-reverse md:flex-row mt-4 md:mt-8 justify-center space-y-4 space-y-reverse md:space-y-0 md:space-x-8"
                                    >
                                        <BaseButton className="w-full md:w-72" style="'px-4 text-lg'" type="line" onClick={cancelAction}>
                                            Cancel
                                        </BaseButton>
                                        <BaseButton
                                            className="w-full md:w-64"
                                            style={clsx(
                                                'w-full font-semibold leading-6 text-white hover:bg-green-200 transition ease-in-out duration-150',
                                                processingGreenButtonRequest ? 'cursor-not-allowed' : '')}
                                            onClick={connectUtilityAccount}
                                        >
                                            {
                                                !processingGreenButtonRequest &&
                                                <div>Connect My Account</div>
                                            }
                                            {
                                                processingGreenButtonRequest &&
                                                <div className="inline-flex items-center space-x-2">
                                                    <svg
                                                        className="animate-spin -mt-1 h-6 w-6 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    <span>One second...</span>
                                                </div>
                                            }
                                        </BaseButton>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}