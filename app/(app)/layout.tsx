import React from "react"

import { redirect } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/db";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";

import SidebarWithHeader from "@/components/page/app/layout/SidebarWithHeader";
import Header from "@/components/page/app/layout/Header";
import Main from "@/components/page/app/layout/Main";

import "@/assets/scss/layout/app.scss"
import { SupabasePrivateWatcher } from "@/components";

const ToastGroup = dynamic(() => import('@/components/Global/ToastGroup/ToastGroup'), {ssr: false});

export default function AppLayout({ children }: {
    children: any
}) {

    const user = createServerComponentClient<Database>({ cookies });
    if (!user) redirect("/signin");

    return (
        <>
            <SupabasePrivateWatcher />
            <div className="flex flex-col min-h-screen bg-tan-200">
                {/* <ClientOnly> */}
                <ToastGroup />
                {/* </ClientOnly> */}
                <SidebarWithHeader />
                <Main>
                    <div className="p-4 md:p-10 w-full">
                        <Header />
                        {children}
                    </div>
                </Main>
            </div >
        </>
    );
}
