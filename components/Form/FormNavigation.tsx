import clsx from 'clsx';
import { Disclosure } from '@headlessui/react'

import { HiPlusSmall } from 'react-icons/hi2';
import { HiMinusSmall } from 'react-icons/hi2';

import { BaseButton } from '@/components/Base'

type FormNavigationProps = {
	isNextDisabled: boolean;
	nextButtonText: string;
	navBtnStyle: string;
	showPrevious: boolean;
	showNext: boolean;
	processingRequest: boolean;
	processingRequestText: string;
	isFixedToBottom: boolean;
	nextPage: any;
	previousPage: any;
};

export const FormNavigation: React.FC<Partial<FormNavigationProps>> = (
	{
		isNextDisabled,
		nextButtonText = "Continue",
		navBtnStyle = "",
		showPrevious = true,
		showNext = true,
		processingRequest = false,
		processingRequestText = "Processing...",
		isFixedToBottom = true,
		nextPage = () => { },
		previousPage = () => { }
	}
) => {
	const navigateNext = () => {
		nextPage();
	}
	const navigatePrevious = () => {
		previousPage();
	}

	return (
		<div
			className={clsx("md:mt-4 flex md:flex-row items-start md:items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-8 flex-col-reverse space-y-reverse", !showPrevious || !showNext ? ' justify-center' : ' justify-between ', isFixedToBottom
				? 'fixed bottom-0 bg-white left-0 px-4 z-50 py-4 border-t-2 border-border md:bg-transparent md:relative md:px-0 md:py-0 md:border-0'
				: '')}
		>
			{showPrevious &&
				<BaseButton className={!isFixedToBottom ? 'w-full md:w-56' : 'w-72 md:w-56'}
					size="large"
					type="transparent"
					onClick={navigatePrevious}
				>Back</BaseButton>}
			{showNext && <BaseButton
				className={showPrevious ? 'w-full md:w-56' : 'w-72 md:w-56'}
				disabled={isNextDisabled}
				size="large"
				style={clsx('font-semibold leading-6 text-white hover:bg-green-200 transition ease-in-out duration-150', processingRequest ? 'cursor-not-allowed' : '')}
				onClick={navigateNext}
			>
				{!processingRequest && <div >{nextButtonText}</div>}
				{processingRequest && <div className="inline-flex items-center space-x-2">
					<svg className="animate-spin -mt-1 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<span>{processingRequestText}</span>
				</div>}
			</BaseButton >}
		</div >
	);
};
