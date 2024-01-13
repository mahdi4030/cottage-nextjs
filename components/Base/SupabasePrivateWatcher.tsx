"use client";

import { AppStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const SupabasePrivateWatcher = () => {
	const {user} = AppStore();
	const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push("/signin");
        }
    }, [user])
    return <></>;
}