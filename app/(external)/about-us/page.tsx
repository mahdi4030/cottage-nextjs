import { BaseButton } from "@/components";

import LogoCottage from "@/assets/img/logo/cottage-logo-white.svg";
import EquilityIcon from "@/assets/icons/equality.svg";
import GreenEarchIcon from "@/assets/icons/green-earth.svg";
import ThinkDifferentIcon from "@/assets/icons/think-different.svg";

export default function AboutUs() {

	return (
		<div className="w-screen flex flex-col">
			<section className="bg-forrest-700 w-full">
				<div className="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl px-4 md:px-0 pb-16">
					<div className="flex flex-col text-center justify-center items-center">
						<h4 className="text-tan-200">About Us</h4>
						<h1 className="text-tan-200 py-4">Our Mission</h1>
						<div className="text-lg md:text-xl text-tan-200 font-medium max-w-3xl">
							We believe that climate change is a threat. We're on a mission to remove barriers and make choosing electricity options
							equitable and accessible for everyone.
						</div>
						<div className="py-8">
							<LogoCottage className="w-auto h-20" />
						</div>
					</div>
				</div>
			</section>
			<section className="bg-tan-500 w-full py-16 lg:py-20">
				<div className="flex flex-col container m-auto items-center px-6 lg:px-0 xl:max-w-6xl">
					<h4 className="text-center">WILdly passionate about making a difference</h4>
					<h2 className="text-center pt-4 pb-8">Our Values</h2>
					<div className="flex flex-col lg:flex-row">
						<div className="lg:w-1/3 py-4 md:pr-4">
							<div className="flex flex-col p-8 shadow-xl rounded-2xl bg-white h-full">
								<EquilityIcon className="mb-4 lg:mb-8 w-10 h-10" />
								<h3>Equality</h3>
								<div className="text-lg md:text-xl leading-tight py-2">
									We are committed to give all humans equitable access to low cost energy.
								</div>
							</div>
						</div>
						<div className="lg:w-1/3 py-4 md:px-2">
							<div className="flex flex-col p-8 shadow-xl rounded-2xl bg-white h-full">
								<ThinkDifferentIcon className="mb-4 lg:mb-8 w-10 h-10" />
								<h3>Think Different</h3>
								<div className="text-lg md:text-xl leading-tight py-2">
									We continuously strive to re-think and innovate the energy industry that has been plagued by complacency.
								</div>
							</div>
						</div>
						<div className="lg:w-1/3 py-4 md:pl-4">
							<div className="flex flex-col p-8 shadow-xl rounded-2xl bg-white h-full">
								<GreenEarchIcon className="mb-4 lg:mb-8 w-10 h-10" />
								<h3>Earth Focused</h3>
								<div className="text-lg md:text-xl leading-tight py-2">
									We strive to create a balance between traditional energy and green energy sources for a sustainable way to interact
									with the planet.
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full py-16 lg:py-20">
				<div className="flex flex-col lg:flex-row container xl:max-w-6xl m-auto items-end justify-center p-6 lg:p-12">
					<div className="flex flex-col lg:w-2/3">
						<h2 className="py-4">Partner with Us</h2>
						<div className="text-lg md:text-xl leading-tight">
							Are you a Landlord, Electricity Supply company, or simply want to join with our mission? Become a Cottage partner! Reach out
							to learn how we can work together to green the planet. Let's start the conversation about sustainability and get on the path
							to carbon neutrality.
						</div>
					</div>
					<div className="w-full px-8 lg:w-1/4 pt-4 lg:pt-0">
						<BaseButton className="w-auto" style="my-4" href={'/partnerships'} size="large">Learn More</BaseButton>
						<BaseButton className="w-auto" style="my-4" type="secondary" href={'mailto:partnerships@energybycottage.com'} size="large">Contact Us</BaseButton>
					</div>
				</div>
			</section>
		</div>
	);
}
