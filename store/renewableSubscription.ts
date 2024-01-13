import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PostgrestError } from "@supabase/postgrest-js";

import type { Database } from "@/types/db";
import { RenewableSubscriptions } from "@/types/models";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { OccupancyStore } from './occupancy';
import { RegServicesStore } from './regServices';
import { AppStore } from './app';

interface RenewableSubscriptionState {
    loaded: boolean;
    renewableSubscription: unknown | RenewableSubscriptions;

    reset: () => void;
    getActiveSubscriptionByUnitID: (unit: number) => Promise<RenewableSubscriptions[] | PostgrestError>;
    getActiveSubscriptionByUserID: () => void;
    setEndDateForSubscriptionByID: (id: number, date: string) => Promise<RenewableSubscriptions[] | PostgrestError>;
    createRenewableEnergySubscriptionForResident: (code: string) => Promise<RenewableSubscriptions[] | PostgrestError>;
}

export const RenewableSubscriptionStore = create<RenewableSubscriptionState>()(
    devtools(
        (set) => ({
            loaded: false,
            renewableSubscription: null as unknown as RenewableSubscriptions,

            reset: () => {
                set({ renewableSubscription: null as unknown as RenewableSubscriptions, loaded: false });
                if (typeof window === 'undefined') {
                    document.cookie = "renewableSubscription=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                }
            },
            getActiveSubscriptionByUnitID: async (unit: number) => {
                const supabase = createClientComponentClient<Database>();
                const today = new Date().toLocaleDateString();
                const { data, error } = await supabase
                    .from("RenewableSubscriptions")
                    .select("*")
                    .eq("unit", unit)
                    .lte("startDate", today)
                    .gt("endDate", today);
                if (error) {
                    throw error;
                } else {
                    return data;
                }
            },
            getActiveSubscriptionByUserID: async () => {
                const supabase = createClientComponentClient<Database>();
                const today = new Date().toLocaleDateString();
                try {
                    const { data } = await supabase
                        .from("RenewableSubscriptions")
                        .select("*, renewableSubscriptionPlan(*)")
                        .eq("resident", user.value.id)
                        .lte("startDate", today)
                        .gt("endDate", today)
                        .limit(1)
                        .single();
                    set({ loaded: true, renewableSubscription: data })
                } catch (error) {
                    set({ renewableSubscription: {} });
                }
            },
            setEndDateForSubscriptionByID: async (id: number, date = new Date().toLocaleDateString()) => {
                const supabase = createClientComponentClient<Database>();
                const { data, error } = await supabase
                    .from("RenewableSubscriptions")
                    .update({
                        endDate: date,
                    })
                    .eq("id", id)
                    .select();
                if (error) {
                    throw error;
                } else {
                    set({ renewableSubscription: data[0] });
                }
            },
            createRenewableEnergySubscriptionForResident: async () => {
                const supabase = createClientComponentClient<Database>();
                const { occupancy } = OccupancyStore.getState();
                const { serviceGroup } = RegServicesStore.getState();
                const { user } = AppStore.getState();
                const subscriptionData = {
                    resident: user.id,
                    renewableSubscriptionPlan: serviceGroup.renewableSubscriptionPlan.id,
                    unit: occupancy.unit.id,
                    startDate: new Date().toLocaleDateString(),
                    endDate: "2099-12-31",
                };
                const { data, error } = await supabase.from("RenewableSubscriptions").insert(subscriptionData).select();
                if (error) {
                    throw error;
                }
                set({ renewableSubscription: data[0] });
            }
        }),
        { name: "renewableSubscription-store" }
    )
);
