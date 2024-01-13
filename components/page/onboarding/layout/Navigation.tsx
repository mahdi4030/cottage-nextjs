"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { BaseIcon, ModalAction } from "@/components";

import CottageLogoSVG from "@/assets/img/logo/cottage-logo-combined-green.svg";
import RestartIcon from '@/assets/icons/restart.svg';
import { useResetOnboarding } from "@/helpers/ResetLogout";
import { useAuth } from "@/composables/useAuth";

export default function Navigation() {
    const routingLogic = [
        {
            "path": "/onboarding/start",
            "requiredFields": {}
        },
        {
            "path": "/onboarding/address",
            "requiredFields": {}
        },
        {
            "path": "/onboarding/service",
            "requiredFields": {}
        },
        {
            "path": "/onboarding/create-account",
            "requiredFields": {
                "NEW": ["resident.firstName", "resident.lastName"],
                "EXISTING": ["resident.firstName", "resident.lastName"]
            }
        }
    ]
    const pathName = usePathname();
    const progressPercent = useMemo(() => {
        const currentRoute = pathName;
        const totalPages = routingLogic.length;
        const currentIndex = routingLogic.findIndex((arr) => {
            return arr.path === currentRoute;
        });
        const progress = ((currentIndex + 1) / totalPages) * 100;
        return progress;
    }, [pathName]);

    const showNavigation = useMemo(() => {
        const currentRoute = pathName;
        if (currentRoute === "/onboarding/success" || currentRoute === "/onboarding/partner-start") {
            return false;
        }
        return true;
    }, [pathName]);
    let isPartnerStart = useMemo(() => {
        const currentRoute = pathName;
        if (currentRoute === "/onboarding/partner-start") {
            return true;
        }
    }, [pathName]);

    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const discardApplication = async () => {
        useResetOnboarding();
        try {
            await useAuth().logout();
        } catch (error) {
            console.error("No logged in account", error);
        }
        router.push("/");
    }
    return (
        <>
            <div>
                <ModalAction isModalOpen={isModalOpen} cancelAction={closeModal} confirmAction={discardApplication} header="Discard your application?">
                    <p className="text-lg text-center">
                        This will
                        <b> clear your answers </b>
                        and take you back to our home page.
                    </p>
                </ModalAction>
            </div>

            {showNavigation && <div className="h-[.375rem] bg-green-200 z-50 w-full relative">
                <span
                    className="bg-green-700 left-0 top-0 bottom-0 absolute transition-all duration-500"
                    style={{ width: '' + progressPercent + '%' }}
                ></span>
            </div>}
            {!isPartnerStart && <header className="left-0 top-[.375rem] w-screen z-40 absolute">
                <div className="h-14 lg:px-14 flex justify-center items-center mx-auto relative">
                    <span className="absolute left-4 md:left-8 lg:left-14">
                        <a onClick={() => setIsModalOpen(true)}>
                            <CottageLogoSVG className="h-auto w-32 md:w-32 cursor-pointer" />
                        </a>
                    </span>
                    {showNavigation && <div className="cursor-pointer absolute right-6 lg:right-14" onClick={() => setIsModalOpen(true)}>
                        <BaseIcon icon={<RestartIcon />} className="text-2xl md:text-3xl"></BaseIcon>
                    </div>}
                </div>
            </header>}
        </>
    )
}