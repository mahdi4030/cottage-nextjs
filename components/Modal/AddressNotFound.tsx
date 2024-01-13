"use client";

import clsx from "clsx";
import React, { ReactElement, useRef } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { BaseButton, BaseIcon } from '@/components'
import { ModalInfo } from "./ModalInfo";

import CloseIcon from '@/assets/icons/close.svg'
import { useIntercom } from "react-use-intercom";

type AddressNotFoundProps = {
    isOpen: boolean;
    closeAction: any;
};

export default function AddressNotFound (
    {
        isOpen = false,
        closeAction = () => { }
    }
) {
    const { showNewMessage } = useIntercom();
    function openChat() {
        showNewMessage("I can't find my address");
    }
    return (
        <ModalInfo isModalOpen={isOpen} closeModal={closeAction} max-width="max-w-2xl" header={"Address not listed in the dropdown?"}>
            <div className="flex flex-col pt-4 md:px-16 text-center">
                <p className="text-lg md:text-xl">Give us a call at <span className="text-green-700">(646) 847-7885</span></p>
                <p className="py-2 text-lg md:text-xl">or</p>
                <p className="text-green-700 underline font-bold text-lg md:text-xl cursor-pointer" onClick={openChat}>Open a Chat</p>
            </div>
        </ModalInfo>
    );
};
