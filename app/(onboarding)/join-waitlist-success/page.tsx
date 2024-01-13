import { ReactElement } from 'react';
import Link from "next/link";
import { BaseIcon, ElementsOnboardingCard, BaseButton } from "@/components";
import ConfettiIcon from '@/assets/icons/confetti.svg'
import CottageLogoSVG from '@/assets/img/logo/cottage-logo-combined-green.svg'
import { OpenChat } from '@/components/page/join-wait-success';

function JoinWaitlistSuccess({searchParams}) {
	const { type, email } = searchParams;

	let pageText;

	if (type && type != "" && type === "beta") {
		pageText = {
			pageTitle: "Success! We will be in touch soon",
			pageBody: "You should hear from us in less than 24 hours (even on weekends) but if you have any questions, feel free to reach out.",
		};
	} else {
		pageText = {
			pageTitle: "You're on the list!",
			pageBody: "We will make sure you are the first to know when we come to town.",
		};
	}
	return (
		<div>
			<header className="left-0 top-0 w-screen z-40">
				<div className="h-20 px-14 flex justify-center items-center mx-auto relative">
					<span className="lg:absolute lg:left-14">
						<Link href={{ pathname: "/" }}>
							<CottageLogoSVG className="h-auto w-40" />
						</Link>
					</span>
				</div>
			</header>
			<div className="w-full max-w-4xl m-auto flex flex-col items-center">
				<h2 className="text-center leading-tight">{pageText.pageTitle}</h2>
				<ElementsOnboardingCard className="text-center items-center">
					<BaseIcon icon={<ConfettiIcon />} className="pb-4" style={{fontSize: "5rem"}} />
					<p className="text-center py-2 md:px-20">{pageText.pageBody}</p>
					<div className="flex flex-row space-x-1 py-4">
						{/* <p>
							<a className="underline text-green-700 font-semibold cursor-pointer" onClick={openChat}>Open a chat</a>
						</p> */}
						<OpenChat />
						<p>give us a call at</p>
						<p>
							<a className="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a>
							<b> </b>.
						</p>
					</div>
				</ElementsOnboardingCard>
				<div
					className="mt-8 flex md:flex-row items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-8 flex-col-reverse space-y-reverse justify-center"
				>
					<BaseButton className="w-full md:w-48 mx-4" href="/" size="large">Back to Home</BaseButton>
				</div>
			</div >
		</div >
	);
}

JoinWaitlistSuccess.getLayout = (page: ReactElement) => page

export default JoinWaitlistSuccess;