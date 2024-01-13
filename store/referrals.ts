import { Database } from '@/types/db';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ReferralsState {
    loaded: boolean;
    referrals: any;
    reset: () => void;
    fetchReferrals: (id: string) => void;
    createReferral: (refferrer_id: string, referred_id: string) => void;
}

export const ReferralsStore = create<ReferralsState>()(
    devtools(
        (set, get) => ({
            loaded: false,
            referrals: null,
            user: null,
            reset: async () => {
                set({ referrals: null, loaded: false });
                if (typeof window !== 'undefined') {
                    document.cookie = "referrals=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                }
            },
            fetchReferrals: async (id: string) => {
                const { referrals } = get();
                const data = await (await fetch("/api/referrals/get-referrals/" + id, {
                    method: "get",
                })).json();
                set({ referrals: data });
            },
            createReferral: async (refferrer_id: string, referred_id: string) => {
                const supabase = createClientComponentClient<Database>();
                const { error } = await supabase.from("Referrals").insert({
                    referredBy: refferrer_id,
                    referred: referred_id,
                });
                if (error) throw error;
                return true;
            }
        }),
        { name: "app-store" }
    )
);
