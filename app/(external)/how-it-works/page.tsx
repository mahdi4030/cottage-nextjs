import Link from "next/link";

import { BaseButton } from "@/components";

import LowerBillIcon from "@/assets/icons/lower-bill.svg";
import GreenEarchIcon from "@/assets/icons/green-earth.svg";
import PeaceOfMindIcon from "@/assets/icons/peace-of-mind.svg";
import AddUserIcon from "@/assets/icons/add-user.svg";
import BriefcaseManageIcon from "@/assets/icons/briefcase-manage.svg";
import SwitchIcon from "@/assets/icons/switch.svg";
import BinocularsIcon from "@/assets/icons/binoculars.svg";

export default function HowItWorks() {

	return (
		<div className="w-screen flex flex-col">
			<section className="w-full">
				<div className="flex flex-col mt-36 container w-full m-auto items-center text-left z-10 xl:max-w-6xl px-4 md:px-0 pb-12">
					<div className="flex flex-col text-center justify-center items-center">
						<h4 className="">A different approach to Energy</h4>
						<h1 className="pt-4 pb-8">How it Works</h1>
						<div className="text-lg md:text-xl leading-tight max-w-3xl pb-6">
							Stand up to skyrocketing energy prices by letting us manage your electricity account. We <b>power-up</b> your electricity
							account to help you go green and save money.
						</div>
						<div className="flex flex-col lg:flex-row py-4">
							<div className="flex flex-col lg:w-1/3 py-4 lg:py-0 px-8">
								<LowerBillIcon className="mb-3 lg:mb-8 mx-auto w-16 h-16" />
								<h3 className="text-center">Save money</h3>
								<div className="text-lg md:text-xl leading-tight text-center py-2">
									We monitor the market for local tax and savings incentives. When we find them, we let you know.
								</div>
							</div>
							<div className="flex flex-col lg:w-1/3 py-4 lg:py-0 px-8">
								<GreenEarchIcon className="mb-3 lg:mb-8 mx-auto w-16 h-16" />
								<h3 className="text-center">Go green</h3>
								<div className="text-lg md:text-xl leading-tight text-center py-2">
									Energy supply can be generated from clean sources like solar and wind which impacts emissions.
								</div>
								<Link
									href={{ pathname: "/electric-plan-switching"}}
									className="text-green-700 font-semibold underline pt-2 text-lg md:text-xl leading-tight text-center py-2"
								>
									Learn about electricity switching
								</Link>
							</div>
							<div className="flex flex-col lg:w-1/3 py-4 lg:py-0 px-8">
								<PeaceOfMindIcon className="mb-3 lg:mb-8 mx-auto w-16 h-16" />
								<h3 className="text-center">Stress free</h3>
								<div className="text-lg md:text-xl leading-tight text-center py-2">
									We work with your utility so you don't do anything different. We guarantee no disruption or service interruption.
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-tan-500 w-full py-16 lg:py-20">
				<div className="flex flex-col container xl:max-w-6xl px-6 lg:px-0 m-auto items-center justify-center">
					<div className="flex flex-col">
						<h4 className="text-center">Always on so you don’t have to be</h4>
						<h2 className="py-4 text-center">How Cottage Works for You</h2>
						<div className="text-xl max-w-4xl text-center">
							Cottage is not a utility company.
							<br />
							Our goal is to simplify energy management.
						</div>
					</div>
					<div className="flex flex-col lg:flex-row justify-center items-center">
						<div className="w-full lg:w-1/2 p-8 flex justify-center items-center">
							<div className="flex flex-col p-8 shadow-xl rounded-2xl bg-white relative max-w-sm">
								<AddUserIcon className="self-start w-12 h-12"/>
								<h3 className="pt-2">Create an account</h3>
								<div className="text-lg md:text-xl leading-tight pb-2">Sign up with Cottage and we "power-up" your electric account</div>
							</div>
						</div>
						<div className="flex flex-col pt-8 w-full lg:w-1/2">
							<div className="flex flex-col py-4">
								<div className="flex flex-row py-4">
									<BriefcaseManageIcon className="min-w-fit pr-6 w-12 h-12" />
									<div>
										<h3>We manage the account</h3>
										<div className="text-lg md:text-xl leading-tight py-1">
											We help manage your account with the utility company and can even help you move-in / move-out.
										</div>
									</div>
								</div>
								<div className="flex flex-row py-4">
									<SwitchIcon className="min-w-fit pr-6 w-12 h-12" />
									<div>
										<h3>We seamlessly work in the background</h3>
										<div className="text-lg md:text-xl leading-tight py-1">
											We find ways to "power-up" your electricity with renewable energy and savings without the hassle.
										</div>
									</div>
								</div>
								<div className="flex flex-row py-4">
									<BinocularsIcon className="min-w-fit pr-6 w-12 h-12" />
									<div>
										<h3>We lookout for savings incentives</h3>
										<div className="text-lg md:text-xl leading-tight py-1">
											We constantly scout for ways to lower the cost of your energy bill. As soon as we find them, we build them
											into Cottage and pass the savings on to you.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id="make-money" className="bg-tan-200 w-full py-16 lg:py-20">
				<div className="flex flex-col container xl:max-w-5xl px-6 lg:px-0 m-auto items-center justify-center">
					<div className="flex flex-col md:flex-row w-full">
						<div className="flex flex-col lg:p-6 w-full lg:w-2/5">
							<h4>Everyone Wins</h4>
							<h2 className="py-4">How We Make Money</h2>
							<div className="text-xl py-1">
								Cottage is
								<b>free to sign-up</b>
								and
								<b>always will be</b>
								for customers.
							</div>
						</div>
						<div className="w-full lg:w-3/5 p-6">
							<div className="flex flex-col py-4">
								<div className="flex flex-row py-4">
									<div
										style={{minWidth: "40px"}}
										className="text-3xl text-white bg-green-700 w-10 h-10 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg flex items-center justify-center font-cooper mr-4"
									>
										1
									</div>
									<div className="text-lg md:text-xl leading-tight">
										We monitor the market for "power-ups", dig into the details of the fine print in the terms and conditions, and
										choose partners that share our mission.
									</div>
								</div>
								<div className="flex flex-row py-4">
									<div
										style={{minWidth: "40px"}}
										className="text-3xl text-white bg-green-700 w-10 h-10 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg flex items-center justify-center font-cooper mr-4"
									>
										2
									</div>
									<div className="text-lg md:text-xl leading-tight">
										We make it easier for our partners to find customers, so they spend less on advertising, and can pass through the
										cost of green energy to you for no extra cost.
									</div>
								</div>
								<div className="flex flex-row py-4">
									<div
										style={{minWidth: "40px"}}
										className="text-3xl text-white bg-green-700 w-10 h-10 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg flex items-center justify-center font-cooper mr-4"
									>
										3
									</div>
									<div className="text-lg md:text-xl leading-tight">
										To cover our costs, our partners pay us a small referral for bringing them new customers. They pay us so you don’t
										have to.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-tan-500 w-full py-16 lg:py-20">
				<div className="flex flex-col lg:flex-row container xl:max-w-6xl m-auto items-end justify-center p-6 lg:p-12">
					<div className="flex flex-col lg:w-2/3">
						<h2 className="py-4">Partner with Us</h2>
						<div className="text-lg: md:text-xl">
							Have an idea for a power-up that can help people better manage their electricity or simply want to join with our mission?
							Become a Cottage partner! Reach out to learn how we can work together to green the planet. Let's start the conversation about
							sustainability and get on the path to carbon neutrality.
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
