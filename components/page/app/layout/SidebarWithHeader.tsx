"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

import GreenCottageLogo from "@/assets/img/logo/cottage-logo-green.svg"
import { GlobalAccountDropdown, GlobalAppSidebar } from "@/components";
import { AppStore } from "@/store";
import { usePathname } from "next/navigation";

export default function SidebarWithHeader() {
    const {isSidebarHidden, toggleSidebar} = AppStore();
    const [isAtTop, setIsAtTop] = useState(true);
    const mobileScreenWidth = 768;

    const currentRoute = usePathname();

    useEffect(() => {
        if (isMobile()) {
            window.addEventListener("scroll", onScroll);
        };
        return () => {
            if (isMobile()) {
                window.removeEventListener("scroll", onScroll);
            }
        }
    }, []);

    const isMobile = (): boolean => {
        return window.innerWidth <= mobileScreenWidth;
    };

    const checkIfScrollbarIsAtTop = () => {
        if (!isMobile()) return;
        setIsAtTop(window.pageYOffset <= 30);
    };

    const onScroll = () => {
        checkIfScrollbarIsAtTop();
    };

    return (
        <>
            <div className={clsx("flex flex-row sm:hidden items-center justify-between px-4 py-2 bg-tan-200 fixed w-full z-50", isAtTop ? '' : 'shadow')}>
                <button className="inline-block md:hidden w-11 h-11 bg-green-50 font-primary p-1 rounded outside-click-exclude z-50" onClick={toggleSidebar}>
                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="outside-click-exclude">
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <span className="logo-wrapper z-30">
                    <GreenCottageLogo className="h-10 w-auto" />
                </span>
                <GlobalAccountDropdown />
            </div>
            <GlobalAppSidebar className="z-[60]" isHidden={isSidebarHidden} activeRoute={currentRoute} toggleSidebar={toggleSidebar} />
        </>
    );
}