"use client";

import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { ResidentStore } from '@/store';

import { useRouter } from "next/navigation";

import WhiteCottageLogo from '@/assets/img/logo/cottage-logo-white.svg'
import WhiteCottageText from '@/assets/img/logo/cottage-text-white.svg'
import ArrowFromRight from '@/assets/icons/arrow-from-right.svg'

import "@/assets/scss/components/Global/AppSidebar.scss";
import { BaseIcon } from "../Base";
import dynamic from "next/dynamic";
import OverViewIcon from '@/assets/icons/overview.svg';
import BarGraphIcon from '@/assets/icons/bar-graph.svg';
import LifesaverMenuIcon from '@/assets/icons/lifesaver-menu.svg';
import ServicesIcon from '@/assets/icons/services.svg';
type AppSidebarProps = {
    className: string;
    activeRoute: string;
    isHidden: boolean;
    toggleSidebar: Function;
}

export const AppSidebar: React.FC<Partial<AppSidebarProps>> = ({
    className="",
    activeRoute = "",
    isHidden = true,
    toggleSidebar = () => { }
}) => {
    const { resident } = ResidentStore();
    const [isDisabledLinks, setIsDisabledLinks] = useState(true);
    useEffect(() => {
        setIsDisabledLinks(!resident?.isRegistrationComplete);
    }, [resident]);

    const router = useRouter();

    const navigateToRoute = (route) => {
        if (!route.isEnabledPreReg && !resident?.isRegistrationComplete) {
            return;
        }
        router.push(route.route);
    }

    const routes = /*useMemo(() => {
        return*/ [
            {
                routeName: "/app/overview",
                route: "/app/overview",
                title: "Overview",
                icon: OverViewIcon,
                iconName: "overview",
                isEnabledPreReg: true,
            },
            // {
            // 	routeName: "app-power-ups",
            // 	route: "/app/power-ups",
            // 	title: "Power-Ups",
            // 	iconName: "power-up",
            // },
            {
                routeName: "/app/insights",
                route: "/app/insights",
                title: "Insights",
                icon: BarGraphIcon,
                iconName: "bar-graph",
                isEnabledPreReg: false,
            },
            // {
            // 	routeName: "app-billing",
            // 	route: "/app/billing",
            // 	title: "Billing",
            // 	iconName: "card",
            // },
            {
                routeName: "/app/support",
                route: "/app/support",
                title: "Support",
                icon: LifesaverMenuIcon,
                iconName: "lifesaver-menu",
                isEnabledPreReg: true,
            },
            {
                routeName: "/app/services",
                route: "/app/services",
                title: "Services",
                icon: ServicesIcon,
                iconName: "services",
                isEnabledPreReg: false,
            },
        ];
    // }, []);
    // const currentRoute = toRef(props, "activeRoute");
    const currentRoute = activeRoute;
    return (
        <div className={className}>
            <div className={clsx("bg-forrest-700 side-bar", isHidden ? 'collapsed' : '')}>
                <div className="cursor-pointer relative flex flex-row items-baseline text-left justify-left mr-4 my-5 ml-6" onClick={() => toggleSidebar()}>
                    <div>
                        <WhiteCottageLogo className={clsx("w-auto h-10 mx-1", isHidden ? 'hidden sm:block' : '')} />
                    </div>
                    <div className="logo-transition">
                        <WhiteCottageText width="108" height="26"/>
                    </div>
                    <button className="logo-name__button transition">
                        <BaseIcon id="logo-name__icon" icon={<ArrowFromRight />} className="logo-name__icon" filled={true}></BaseIcon>
                    </button>
                </div>
                {
                    routes.map((route, index) => (
                        <div
                            key={index}
                            className={clsx("nav-item", currentRoute == route.routeName ? 'bg-[#125650]' : 'bg-forrest-700 ', isHidden ? 'hidden sm:block' : '')}
                        >
                            {currentRoute == route.routeName &&
                                <div className="bg-green-700 w-2 rounded-r-lg absolute h-[3.7rem]">&nbsp;</div>
                            }
                            <a onClick={() => navigateToRoute(route)}>
                                <div className={clsx("p-4 flex pl-8 relative", !route.isEnabledPreReg && isDisabledLinks ? 'opacity-50 cursor-not-allowed' : '')}>
                                    <BaseIcon icon={<route.icon />} className="block min-w-fit text-2xl mx-1" filled={true} />
                                    <span
                                        className={clsx("text-lg text-white ml-2 transition", currentRoute == route.routeName ? 'font-bold whitespace-nowrap' : '', isHidden ? 'hidden' : '')}
                                    >
                                        {route.title}
                                    </span>
                                    <span className="tooltip">{route.title}</span>
                                </div>
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}