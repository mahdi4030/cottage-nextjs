"use client";

import clsx from "clsx";
import React, { ReactElement, useRef } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { BaseButton, BaseIcon } from '@/components'
import { ModalInfo } from "../../Modal";

import CloseIcon from '@/assets/icons/close.svg'
import { useIntercom } from "react-use-intercom";

type AddressNotFoundProps = {
    isOpen: boolean;
    closeAction: any;
};

export const AuthRep: React.FC<Partial<AddressNotFoundProps>> = (
    { 
        isOpen = false,
        closeAction = () => {}
    }
) => {
    return (
        <ModalInfo isModalOpen={isOpen} closeModal={closeAction} header="What can an authorized rep do?">
			<div className="flex flex-col pt-8 md:px-16 mx-auto text-left">
				You authorize Cottage to act on your behalf regarding selecting and enrolling in energy supply services and to create, retrieve,
				store, and use a distribution utility account for your residence and your account credentials to provide our services. You give
				express permission for Cottage to be the owner/authorized manager of any ESCO or distribution utility accounts for your residence. By
				submitting your information, you certify and confirm that you are entitled to disclose the utility account information and that you
				are an authorized user of your utility account. Cottage makes no effort to review your utility account information for accuracy.
				<br />
				<br />
				To allow Cottage to retrieve and use your utility account Information, you understand that you may need to provide Cottage with your
				utility account credentials. You acknowledge that Cottage may need to periodically change or update your utility account Information
				and utility account credentials in order to use the services. You agree to allow Cottage to make such changes to your utility
				account(s) on your behalf and as your agent including, but not limited to, changes to your login information, your email address, and
				your account security questions. You represent, warrant, acknowledge, and agree that you are solely responsible for the accuracy of
				your utility account credentials.
				<br />
				<br />
				You acknowledge that Cottage may also need to modify or update your utility account statement delivery preferences in order to provide
				services, which could include modifying your e-billing or auto payment preferences.
				<br />
				<br />
				You agree to notify Cottage of any changes to your utility account information or credentials. By providing your utility account
				credentials you certify that you or another member of your household owns the utility account associated with your residence
				<br />
				<br />
				You acknowledge and agree that when Cottage is accessing and retrieving your utility account information from third-party sites,
				Cottage is acting as your agent and not as the agent for or on behalf of the third party.
				<br />
				<br />
				You further acknowledge and agree that Cottage may analyze your utility account information as set forth in the privacy policy.
				<br />
				<br />
				You authorize Cottage to receive utility or supplier notices on your behalf, where permitted, and you understand and agree that we may
				not pass along any or all of these notices to your. You agree that Cottage shall not be liable for any delays, failure to deliver or
				misdirected delivery of any utility or supplier account notices.
			</div>
	</ModalInfo>
    );
};
