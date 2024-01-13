"use client";

import clsx from "clsx";
import Link from "next/link";
import { BaseButton } from "@/components";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import CottageLogoSVG from "@/assets/img/logo/cottage-logo-combined-green.svg";
import styles from "./ExternalHeader.module.scss";

export default function ExternalHeader(props) {
	const { showHeaderButtonsProp = true} = props;
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isLightLinks, setIsLightLinks] = useState(false);
	const [isLightNav, setIsLightNav] = useState(false);
	const [topOfPage, setTopOfPage] = useState(true);

	const pathName = usePathname();
	
	const lightLinkRoutes = ["/", "/about-us"];

	useEffect(() => {
		window.addEventListener("scroll", handleWindowScroll, false);

		return () => {
			window.removeEventListener("scroll", handleWindowScroll, false);
		};
	}, []);

	useEffect(() => {
		setMobileMenuOpen(false);
		setTopOfPage(true);
		if (lightLinkRoutes.includes(pathName)) {
			setIsLightLinks(true);
			setIsLightNav(true);
		} else {
			setIsLightLinks(false);
			setIsLightNav(false);
		}
	}, [pathName]);

	const handleWindowScroll = useCallback(() => {
		const yOffset = window.innerWidth <= 700 ? 50 : 100;
		if (window.pageYOffset > yOffset) {
			// user is scrolled
			if (topOfPage) {
				setTopOfPage(false);
				setIsLightLinks(false);
				setIsLightNav(false);
			}
		} else {
			// user is at top of page
			setTopOfPage(true);
			if (lightLinkRoutes.includes(window.location.pathname)) {
				setIsLightLinks(true);
				setIsLightNav(true);
			} else {
				setIsLightLinks(false);
				setIsLightNav(false);
			}
		}
	}, []);

	const toggleMenu = () => {
		if (window.innerWidth <= 767) {
			setMobileMenuOpen((prevMobileMenuOpen) => !prevMobileMenuOpen);
			if (!mobileMenuOpen) {
				document.body.classList.add("mobile-menu-open");
			} else {
				document.body.classList.remove("mobile-menu-open");
			}
		}
	};

	return (
		<header className={clsx(`absolute left-0 top-2 z-50 w-screen bg-transparent`, styles.header, !topOfPage && styles.scrolled)}>
			<div className="xl:container mx-auto flex items-center flex-wrap flex-row justify-between md:items-center md:space-x-4 py-2 lg:pt-2 px-6 lg:px-6">
				<span className="logo-wrapper z-30">
					<Link href="/">
						<CottageLogoSVG className={clsx(`h-auto w-40 max-h-[42px]`, isLightNav && "white-logo")} />
					</Link>
				</span>
				<button
					className={clsx(`inline-block md:hidden w-11 h-11 bg-green-200/20 font-primary p-1 rounded outside-click-exclude z-50`, isLightNav && "text-white")}
					onClick={toggleMenu}
				>
					<svg
						style={{ transform: "rotate(180deg)" }}
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						className="outside-click-exclude"
					>
						<path
							fillRule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clipRule="evenodd"
						></path>
					</svg>
				</button>
				<nav
					className={clsx(
						`absolute md:visible md:opacity-100 md:flex md:relative top-0 left-0 md:inset-auto z-50 flex flex-col md:flex-row md:space-x-4 font-semibold w-full md:w-auto bg-tan-200 shadow-md md:rounded-none md:shadow-none md:bg-transparent p-6 pt-4 md:p-0 h-screen md:h-auto transition-all duration-300 md:justify-center md:items-center`,
						mobileMenuOpen ? "visible opacity-100 overflow-hidden" : "hidden opacity-0",
					)}
				>
					<div
						className={clsx(
							`flex flex-row justify-between items-center`,
							mobileMenuOpen ? "visible opacity-100 overflow-hidden" : "hidden opacity-0",
						)}
					>
						<span className="logo-wrapper z-30 transition-all duration-500 py-2">
							<Link href="/">
								<CottageLogoSVG className="h-auto w-40" />
							</Link>
						</span>
						<span className="p-2" onClick={toggleMenu}>
							<svg className="text-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
								<path
									fillRule="evenodd"
									d="M6.707 7.293a1 1 0 010 1.414L2.414 12l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0zM21 12a1 1 0 01-1 1H7a1 1 0 010-2h13a1 1 0 011 1z"
									clipRule="evenodd"
								></path>
							</svg>
						</span>
					</div>
					<Link
						href="/how-it-works"
						className={clsx(
							`block mt-4 md:mt-0 py-4 md:py-3 px-2 hover:underline text-3xl md:text-lg transition-all duration-500 relative md:inset-auto`,
							mobileMenuOpen ? "top-0" : "-top-8",
							!mobileMenuOpen && isLightLinks ? "text-white" : "text-forrest-700",
						)}
						onClick={toggleMenu}
					>
						How it Works
					</Link>
					<Link
						href="/about-us"
						className={clsx(
							`block py-4 md:py-3 px-2 hover:underline text-3xl md:text-lg transition-all duration-500 relative md:inset-auto`,
							mobileMenuOpen ? "top-0" : "-top-8",
							!mobileMenuOpen && isLightLinks ? "text-white" : "text-forrest-700",
						)}
						onClick={toggleMenu}
					>
						About
					</Link>
					<Link
						href="/faqs"
						className={clsx(
							`block py-4 md:py-3 px-2 hover:underline text-3xl md:text-lg transition-all duration-500 relative md:inset-auto`,
							mobileMenuOpen ? "top-0" : "-top-8",
							!mobileMenuOpen && isLightLinks ? "text-white" : "text-forrest-700",
						)}
						onClick={toggleMenu}
					>
						FAQs
					</Link>
					{showHeaderButtonsProp && (
						<>
							<BaseButton
								size="base"
								style={[
									"!text-xl md:!text-base px-8  mt-2 md:mt-0 py-2",
									{
										"bg-transparent border-2 border-green-700 !text-green-700 hover:!text-white hover:bg-green-700":
											!isLightLinks && !mobileMenuOpen,
									},
									{ "bg-transparent border-2": topOfPage && !mobileMenuOpen },
									{ "bg-transparent border-2 border-green-700 !text-green-700": !topOfPage && !mobileMenuOpen },
								]}
								href="/signin"
							>
								Sign In
							</BaseButton>
							<BaseButton
								size="base"
								type="primary"
								style={clsx("!text-xl md:!text-base px-8 mt-6 md:mt-0 bg-green-700 py-2")}
								href="/onboarding/start"
							>
								Get Started
							</BaseButton>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};