"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { BaseIcon } from "@/components";

import CottageLogoSVG from "@/assets/img/logo/cottage-logo-combined-green.svg";
import RestartIcon from '@/assets/icons/restart.svg';
import { ModalAction } from '@/components/Modal';
import useResetState from "@/composables/useResetState";
import { useAuth } from "@/composables/useAuth";
export default function Main(props) {
    const router = useRouter();

    const { useResetOnboarding } = useResetState();

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

    let isPartnerStart = false;
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const discardApplication = async () => {
        useResetOnboarding();
        try {
            await useAuth().logout();
        } catch (error) {
            console.error("No logged in account", error);
        }
        router.push("/");
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    return (
        <>
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
            <div className="pt-16 md:pt-12 flex flex-col items-center pb-20 w-screen">
                <ModalAction isModalOpen={isModalOpen} cancelAction={closeModal} confirmAction={discardApplication} header="Discard your application?">
                    <p className="text-lg text-center">
                        This will
                        <b> clear your answers </b>
                        and take you back to our home page.
                    </p>
                </ModalAction>
                <div className="flex w-full items-start justify-center pt-2 md:pt-4 relative px-3 md:px-4">
                    {props.children}
                </div>
            </div>
        </>
    )
}