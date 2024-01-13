"use client";

import { AppStore } from "@/store";
import clsx from "clsx";

export default function Main(props) {
    const { isSidebarHidden } = AppStore();
    return (
        <main
            className={clsx("flex flex-1 h-full flex-col items-center w-screen bg-tan-200 mt-16 sm:mt-0", isSidebarHidden ? 'sidebar-collapsed' : 'sidebar-open')}
        >
            <div
                className={clsx("transition-all duration-200", !isSidebarHidden ? 'z-30 bg-black opacity-20 h-screen w-screen fixed top-0 bottom-0 sm:hidden' : 'opacity-0')}
            ></div>
            {props.children}
        </main >
    )
}