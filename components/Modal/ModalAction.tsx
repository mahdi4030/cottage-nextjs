"use client";

import clsx from "clsx";
import React, { useRef } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { BaseButton, BaseIcon } from '@/components'

import CloseIcon from '@/assets/icons/close.svg'

type ModalInfoProps = {
    className?: string;
    isModalOpen: boolean;
    children: React.ReactNode;
    maxWidth?: string;
    closeType: string;
    showButtons: boolean;
    cancelButtonText: string;
    confirmButtonText: string;
    confirmButtonType?: string;
    header?: any;
    cancelAction: any;
    confirmAction: any;
};

export default function ModalAction (
    {
        className,
        isModalOpen = false,
        children,
        maxWidth = "max-w-3xl",
        closeType = "default",
        showButtons = true,
        cancelButtonText = "Cancel",
        confirmButtonText = "Discard",
        confirmButtonType = "warning",
        header,
        cancelAction = () => { },
        confirmAction = () => { }
    }
) {
    return (
        <Transition as="div" show={isModalOpen}>
            <Dialog as="div" className="relative z-10" onClose={cancelAction}>
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
                                className={clsx("relative bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all my-8 max-w-3xl w-full px-4 py-4 sm:px-10 sm:py-10", maxWidth)}
                            >
                                <div className="flex">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 w-full relative">
                                        {closeType === 'topCorner' && <div className="absolute -top-4 -right-4" onClick={() => cancelAction()}>
                                            <BaseIcon icon={<CloseIcon />} className="text-xl"></BaseIcon>
                                        </div>}
                                        <h2 className="pb-4">
                                            {/* <slot name="header" /> */}
                                            {header && header}
                                        </h2>
                                        <div className="mt-2">
                                            {/* <slot name="body" /> */}
                                            {children}
                                        </div>
                                    </div>
                                </div>
                                {showButtons &&
                                    <div className="flex flex-col md:flex-row mt-8 justify-center space-y-4 md:space-y-0 md:space-x-8">
                                        {closeType !== 'topCorner' &&
                                            <BaseButton
                                                className="w-full md:w-72"
                                                style="px-4 text-lg"
                                                type="line"
                                                onClick={() => cancelAction()}
                                            >
                                                {cancelButtonText}
                                            </BaseButton>}
                                        <BaseButton
                                            className="w-full md:w-72"
                                            style="px-4 text-lg"
                                            type={confirmButtonType}
                                            onClick={confirmAction}
                                        >
                                            {confirmButtonText}
                                        </BaseButton>
                                    </div>}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
