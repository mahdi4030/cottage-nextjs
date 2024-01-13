import { BaseButton } from "@/components";

import PartnershipsBanner from "@/assets/img/external/partnerships-banner.svg";
import ElectricityIcon from "@/assets/icons/electricity.svg";
import SolarPanelIcon from "@/assets/icons/solar-panel.svg";
import LeafIcon from "@/assets/icons/leaf.svg";

export default function Partnerships() {

	return (
		<div className="w-screen flex flex-col">
			<section className="w-full overflow-hidden relative">
				<div className="flex flex-col mt-40 container m-auto text-left z-10 xl:max-w-6xl px-6 md:px-0 pb-20">
					<div className="flex flex-col md:w-1/2 z-10">
						<h4 className="">We love like-minded people</h4>
						<h1 className="pt-4 pb-8">Partnerships</h1>
						<div className="text-lg md:text-xl leading-tight max-w-3xl pb-8">
							Cottage makes it easy for humans to make an impact. We're committed helping our customers seamlessly access energy, find
							alternative options, and select the best rates. Whether you're an Energy Supply company, or just interested in our mission, we
							want to be your partner on the path to carbon neutrality.
						</div>
						<BaseButton className="w-auto" style="w-1/2" href="mailto:partnerships@energybycottage.com" size="large">
							Let's Chat
						</BaseButton>
					</div>
				</div>
				<PartnershipsBanner className="hidden md:block absolute top-32 -right-20 lg:-top-20 lg:-right-32 z-0 w-3/5 h-auto" />
			</section>
			<section className="bg-tan-500 w-full py-16 lg:py-20">
				<div className="flex flex-col container m-auto items-center px-6 lg:px-0 xl:max-w-6xl">
					<h4 className="pb-4 text-center">Working together to drive sustainable change</h4>
					<h2 className="text-center">Our Partners</h2>
					<div className="flex flex-col py-8">
						<div className="flex flex-col py-4 max-w-3xl">
							<div className="flex flex-row py-4 w-full px-6">
								<ElectricityIcon className="min-w-fit pr-6 w-12 h-12" />
								<div>
									<h3>Electricity Supply Companies</h3>
									<div className="text-lg md:text-xl leading-tight py-1">
										Cottage helps sign-up customers for alternative energy supply with a focus on renewable and mixed renewable
										options. We enroll our customers in fixed rates to help provide predictability and planning that can be used to
										better plan for demand uncertainty.
									</div>
								</div>
							</div>
							<div className="flex flex-row py-4 w-full px-6">
								<SolarPanelIcon className="min-w-fit pr-6 w-12 h-12" />
								<div>
									<h3>Community Solar Farms</h3>
									<div className="text-lg md:text-xl leading-tight py-1">
										Cottage helps you get your community solar projects subscribed without the burden and overhead of direct marketing
										efforts. We help educate our customers on the benefits of community solar while establishing trust and
										transparency.
									</div>
								</div>
							</div>
							<div className="flex flex-row py-4 w-full px-6">
								<LeafIcon className="min-w-fit pr-6 w-12 h-12" />
								<div>
									<h3>Climate Tech Companies</h3>
									<div className="text-lg md:text-xl leading-tight py-1">
										We love to work with other climate tech companies to provide customer-centric innovations. We want to provide as
										many tools and resources for our customers as we can and are always open to new ideas that can create progress
										towards a carbon neutral world.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-tan-200 w-full py-16 lg:pt-20">
				<div className="flex flex-col container m-auto items-center px-6 lg:px-0 xl:max-w-6xl">
					<h2 className="text-center pt-4 pb-8">Have an idea for how you want to work with Cottage? We’d love to chat!</h2>
					<BaseButton className="w-auto" style="my-4" type="secondary" href="mailto:partnerships@energybycottage.com" size="large">
						Contact Us
					</BaseButton>
				</div>
			</section>
		</div>
	);
}
