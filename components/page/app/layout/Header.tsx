"use client";

import { GlobalAccountDropdown } from "@/components";
import { ResidentStore } from "@/store";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Header() {
    const currentRoute = usePathname() ?? "";
    const { resident } = ResidentStore();
    const routeTranslation = useMemo(() => {
        return {
            "/app/account": "Account",
            "/app/insights": "Insights & Usage",
            "/app/power-ups": "Power-Ups",
            "/app/billing": "Billing",
            "/app/services": "Services",
            "/app/overview": "Welcome back, " + resident?.firstName,
            "/app/support": "Support",
        };
    }, [resident]);

    const [isClientShow, setIsClientShow] = useState(false);
    useEffect(() => setIsClientShow(true), []);
    if (!isClientShow) return <></>;
    return (
        <>
            {
                !resident?.isRegistrationComplete && currentRoute === 'app-overview' &&
                <div className="flex flex-row text-center pb-4 relative">
                    <slot name="header"></slot>
                    <h2 className="w-full" style={{ fontSize: "2.6rem", lineHeight: "1.5" }}>Almost there, {resident?.firstName}!</h2>
                    <GlobalAccountDropdown className="hidden sm:block absolute right-0" />
                </div>
            }
            {
                !(!resident?.isRegistrationComplete && currentRoute === 'app-overview') &&
                <div className="flex flex-row justify-between pb-4">
                    <slot name="header"></slot>
                    <h2 style={{ fontSize: "2.6rem", lineHeight: "1.5" }}>
                        {routeTranslation[currentRoute]}
                    </h2>
                    <GlobalAccountDropdown className="hidden sm:block" />
                </div>
            }
        </>
    )
};