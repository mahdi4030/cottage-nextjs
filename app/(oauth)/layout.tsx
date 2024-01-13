import React from "react";
import { GlobalExternalFooter } from "@/components";
import Link from "next/link";

import CottageLogoSVG from '@/assets/img/logo/cottage-logo-combined-green.svg'

export default function ExternalLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex items-center flex-col min-h-screen bg-tan-200">
            <header className="flex flex-col w-full pt-6 items-center px-4">
                <div>
                    <Link href="/">
                        <CottageLogoSVG className="h-auto w-40" />
                    </Link>
                </div>
            </header>
            <main className="flex flex-1 flex-col items-center w-screen flex-grow">
                {children}
            </main>
            <GlobalExternalFooter />
        </div>
    );
}
