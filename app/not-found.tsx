import { BaseButton, ElementsCard, GlobalExternalHeader, GlobalExternalFooter } from "@/components";
import "@/assets/scss/pages/not-found.scss";
import Link from "next/link";

export default function NotFound() {

	return (
		<div className="flex items-center flex-col min-h-screen bg-tan-200">
			<GlobalExternalHeader showHeaderButtonsProp />
			<main className="flex flex-1 flex-col items-center w-screen flex-grow external-page">
				<div className="w-screen flex flex-col">
					<section className="w-full px-4">
						<div className="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
							<ElementsCard className="flex flex-col text-center justify-center items-center md:p-12 max-w-4xl w-full">
								<h4>404 Error</h4>
								<h1 className="pb-4 my-4">
									Oops!
									<br />I think we messed up
								</h1>
								<div className="max-w-xs text-forrest-700 text-xl">It looks like this page does not exist</div>
								<div className="text-lg md:text-xl text-textblack text-center pt-8">
									Contact support at&nbsp;
									<a href="mailto:support@energybycottage.com" className="text-green-700 font-semibold underline">
										info@energybycottage.com
									</a>
									&nbsp;or&nbsp;
									<a className="underline text-green-700 font-semibold" href="tel:6468477885">
										(646) 847-7885
									</a>
								</div>
								<div className="flex flex-row items-center justify-center w-full pt-6 space-x-4">
									<Link href="/">
										<BaseButton size="base" type="primary" className="flex pt-6" >
											Go back home
										</BaseButton>
									</Link>
								</div>
							</ElementsCard>
						</div>
					</section>
				</div>
			</main>
			<GlobalExternalFooter />
		</div>
	);
}
