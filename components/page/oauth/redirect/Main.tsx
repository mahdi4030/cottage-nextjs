"use client"
import { useAuth } from "@/composables/useAuth";
import { AppStore, ElectricBillStore, OccupancyStore, ResidentStore } from "@/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useEffect } from "react";
export default function Main() {
    const router = useRouter();
    const { getResident } = ResidentStore();
    const { occupancy, getOccupancy } = OccupancyStore();
    const { fetchElectricData } = ElectricBillStore();

    const { user } = AppStore();

    useEffect(() => {
        (async () => {
            if (user) {
                if (process.env.NODE_ENV === "production") {
                    try {
                        posthog.identify(
                            user?.id, // distinct_id, required
                            {
                                email: user?.email,
                            },
                        );
                    } catch (error) {
                        console.error("COULD NOT CREATE PH SESSION", error);
                    }
                }
                try {
                    await Promise.all([getOccupancy(), getResident()]);
                    fetchElectricData();
                    router.push("/app/overview");
                } catch (error) {
                    // TODO: Handle error here if API fails
                    console.error(error);
                    await useAuth().logout();
                    return router.push("/no-account");
                }
            }
        })();
    });

    return (<></>);
}