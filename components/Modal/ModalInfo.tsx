"use client";

import clsx from "clsx";
import { useRef } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { BaseButton, BaseIcon } from '@/components'

import CloseIcon from '@/assets/icons/close.svg'

type ModalInfoProps = {
    className?: string;
    isModalOpen: boolean;
    header: any;
    children: React.ReactNode;
    maxWidth?: string;
    closeType: string
    closeModal: any
};

export const ModalInfo: React.FC<Partial<ModalInfoProps>> = (
    {
        className,
        isModalOpen = false,
        header = "",
        children,
        maxWidth = 'max-w-4xl',
        closeType = 'default',
        closeModal = () => { }
    }
) => {
    const closeButtonRef = useRef(null);
    return (
        <Transition as="div" show={isModalOpen}>
            <Dialog as="div" className="relative z-50" initialFocus={closeButtonRef} onClose={closeModal}>
                <Transition.Child
                    as="div"
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-300 bg-opacity-30 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-start justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as="div"
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className={clsx("relative bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all my-8 w-full px-4 py-4 sm:px-10 sm:py-10", maxWidth)}
                            >
                                <div className="flex">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 w-full relative">
                                        {closeType === 'topCorner' && <div className="absolute -top-2 -right-2" onClick={closeModal}>
                                            <BaseIcon icon={<CloseIcon />} className="text-xl"></BaseIcon>
                                        </div>}
                                        {/* <h2><slot name="header" /></h2> */}
                                        <h2>{header}</h2>
                                        <div className="mt-2">
                                            {/* <slot name="body" /> */}
                                            {children}
                                        </div>
                                    </div>
                                </div>
                                {closeType === 'default' &&
                                    <div className="flex flex-row mt-4 items-center justify-center">
                                        <BaseButton
                                            // ref={closeButtonRef}
                                            className="px-2" style="px-12 text-lg"
                                            type="line"
                                            onClick={() => closeModal()}
                                        >
                                            Close
                                        </BaseButton>
                                    </div>
                                }
                            </Dialog.Panel>
                        </Transition.Child >
                    </div >
                </div >
            </Dialog >
        </Transition >
    );
};
