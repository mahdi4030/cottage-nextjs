import Image from "next/image";
import Link from "next/link";

import { BaseIcon, TestimonialsCarousel } from "@/components";
import homeCircleTreeImg from "@/assets/img/external/home-circle-trees.png";
import DownArrowIcon from "@/assets/icons/down-arrow.svg";
import LocationIcon from "@/assets/icons/location.svg";
import LinkedIcon from "@/assets/icons/linked.svg";
import GreenEarchIcon from "@/assets/icons/green-earth.svg";
import PrivacyIcon from "@/assets/icons/privacy.svg";
import { AddressPart, ClientShow } from "@/components/page/index";

import "@/assets/scss/pages/home.scss";

const HomePage = () => {
	return (
		<div className="w-screen flex flex-col">
			<section className="bg-forrest-700 text-tan-200 pb-12">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32 mt-12">
					<h1 className="mx-auto max-w-5xl font-display font-medium tracking-tight text-tan-200 text-[2.5rem] leading-none md:text-6xl">
						<span className="z-10"> Power your home with </span>
						<span className="relative whitespace-nowrap text-tan-200">
							<svg
								aria-hidden="true"
								viewBox="0 0 418 42"
								className="absolute top-2/3 left-0 h-[0.58em] w-full fill-green-700/70"
								preserveAspectRatio="none"
							>
								<path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
							</svg>
							<span className="relative"> green energy </span>
						</span>
						<span className="z-10"> without increasing your bill </span>
					</h1>

					<div className="text-base md:text-lg max-w-5xl text-center pt-12 mx-auto leading-tight">
						We think renewable energy should be the standard. And free.
						<br />
						One year on renewable energy is like...
					</div>

					<div className="text-xl md:text-2xl max-w-5xl text-center mx-auto leading-tight h-8 pt-2">
						<span id="type-effect" className="font-bold text-white"> </span>
					</div>
					<AddressPart />

					<div className="flex flex-col font-bold pt-8 relative items-center">
						Learn how to get started
						<BaseIcon icon={<DownArrowIcon />} className="w-auto move-up-and-down" style={{ fontSize: "2rem" }} ></BaseIcon>
					</div>
				</div>
			</section>

			<section className="bg-tan-200 w-full py-16 lg:pt-24">
				<div className="flex flex-col container m-auto px-6 lg:px-0 xl:max-w-6xl">
					<h4 className="pb-4">EASY AND FAST</h4>
					<h2 className="md:pb-8">Sign-up in 3 easy steps</h2>
					<div className="flex flex-col lg:flex-row py-4 space-x-0 md:space-x-16">
						<div className="flex flex-col lg:w-1/3 py-4 lg:py-0">
							<BaseIcon icon={<LocationIcon />} className="mb-3 lg:mb-6" style={{ fontSize: "4rem" }} />

							<h3 className="">Sign-up with your address</h3>
							<div className="text-lg leading-tight py-1">Enter your address for your home or apartment building.</div>
						</div>
						<div className="flex flex-col lg:w-1/3 py-4 lg:py-0">
							<BaseIcon icon={<LinkedIcon />} className="mb-3 lg:mb-6" style={{ fontSize: "4rem" }} />

							<h3 className="">Link your utility account</h3>
							<div className="text-lg leading-tight py-1">
								Link your electric account so that we can match your monthly usage with clean energy
							</div>
						</div>
						<div className="flex flex-col lg:w-1/3 py-4 lg:py-0">
							<BaseIcon icon={<GreenEarchIcon />} className="mb-3 lg:mb-6" style={{ fontSize: "4rem" }} />

							<h3 className="">Hassle free green energy</h3>
							<div className="text-lg leading-tight py-1">
								We secure green energy on your behalf without increasing your bill or needing you to install anything
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-tan-200 w-full pt-8 pb-16 lg:pb-28">
				<div className="flex flex-col container m-auto px-6 lg:px-0 xl:max-w-6xl">
					<h2 className="text-center">What’s the catch? Free can’t mean free... right?</h2>
					<p className="pt-6 max-w-4xl mx-auto text-center">
						Actually, yes. It can be that simple. Our goal is to make it simple for individuals to reduce their carbon footprints and
						contribute to a cleaner world, no matter if you rent or own your home. Everyone has an electricity bill, but not all
						electricity is the same. By simply coming together as a community, we have the power to negotiate how we want our
						electricity to be generated.
					</p>
					<Link
						className="text-center pt-6 text-green-700 underline text-lg font-semibold"
						href={{ pathname: "/how-it-works", hash: "#make-money" }}
					>
						Okay, but how do you make money?
					</Link>
				</div>
			</section>

			<section className="w-full py-16 lg:py-20 bg-tan-500">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-2xl md:text-center">
						<h2 className="text-center">Join the green energy revolution</h2>
						<p className="py-6 max-w-4xl text-center mx-auto">Something better for you and your neighbors</p>
					</div>
					<div className="w-full mx-auto overflow-clip">
						<TestimonialsCarousel />
					</div>
				</div>
			</section>

			<section className="w-full py-16 lg:py-20 bg-white">
				<div className="flex flex-col lg:flex-row container xl:max-w-6xl m-auto items-center justify-center">
					<div>
						<ClientShow>
							<Image className="w-60 h-60" src={homeCircleTreeImg} alt="" />
						</ClientShow>
					</div>
					<div className="flex flex-col p-6 lg:p-12 lg:w-2/3">
						<h4>OUR MISSION</h4>
						<h2 className="py-4">Driven by purpose</h2>
						<div className="text-lg md:text-xl leading-tight">
							We believe that climate change is a threat. We&apos;re on a mission to remove barriers and make choosing electricity
							options equitable and accessible for everyone.
						</div>
					</div>
				</div>
			</section>

			<section className="w-full py-16 lg:py-20">
				<div className="flex flex-row container xl:max-w-6xl mx-auto justify-center items-center">
					<div className="flex flex-col text-center px-6">
						<h4>Above and Beyond for You</h4>
						<h2 className="py-4">Our Pledge</h2>
						<BaseIcon icon={<PrivacyIcon />} className="m-auto" style={{ fontSize: "5rem" }} />

						<div className="text-lg md:text-xl leading-tight py-8">
							Your privacy matters to us. So does your sanity.
							<br />
							We pledge not to sell your personal information, and that means no annoying calls, texts or emails.
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
