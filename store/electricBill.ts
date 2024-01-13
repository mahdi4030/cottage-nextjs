import { ElectricBill } from '@/types/models';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ElectricAccountStore } from './electricAccount';
import { ElectricIntegrationType } from '@/types/enums';
import { OccupancyStore } from './occupancy';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';
import { AppStore } from './app';

interface ElectricBillState {
    loaded: boolean;
    fetchingData: boolean;
    bills: ElectricBill[]
    reset: () => void;
    fetchElectricData: () => void;
    getElectricityBills: () => Promise<ElectricBill[]>;
}

export const ElectricBillStore = create<ElectricBillState>()(
    devtools((set, get) => ({
        loaded: false,
        fetchingData: false,
        bills: [] as ElectricBill[],
        reset: () => {
            set({ bills: [] as ElectricBill[], loaded: false });
            if (typeof window !== 'undefined') { //!process.server in nuxt
                document.cookie = "electricBill=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            }
        },
        fetchElectricData: () => {
            const { electricAccount } = ElectricAccountStore.getState();
            const { user } = AppStore.getState();
            if (electricAccount?.isAccountLinkedWithUtility) {
                if (electricAccount.electricCompanyID.electricIntegrationType === ElectricIntegrationType.GREENBUTTON) {
                    const greenButtonBody = {
                        provider: electricAccount.electricCompanyID.id,
                        operations: ["meter readings", "customer data", "billing summaries", "historic data"],
                    };
                    set({fetchingData: true});
                    fetch("/api/_private/sync-green-button", {
                        method: "post",
                        body: JSON.stringify(greenButtonBody),
                    });
                } else if (electricAccount.electricCompanyID.electricIntegrationType === ElectricIntegrationType.AUTOMATION) {
                    const automationBody = {
                        provider: electricAccount.electricCompanyID.id.toLowerCase(),
                        userId: user.id,
                        accountNumber: electricAccount.accountNumber,
                    };
                    set({fetchingData: true})
                    fetch("/api/utility-connect/get-billing-history", {
                        method: "post",
                        body: JSON.stringify(automationBody),
                    });
                }
            }
        },
        getElectricityBills: async (userId?: string): Promise<ElectricBill[]> => {
            const supabase = createClientComponentClient<Database>();
            if (userId === undefined) {
                userId = (await supabase.auth.getUser()).data.user?.id
            }
            const { electricAccount } = ElectricAccountStore.getState();
            const { loaded: loadedOccupancy, getOccupancy } = OccupancyStore.getState();
            if (!loadedOccupancy) {
                await getOccupancy();
            }
            const { data, error } = await supabase
                .from("ElectricBill")
                .select("*")
                .eq("electricAccountID", electricAccount.id)
                .order("startDate", { ascending: false });
            if (error) throw error;
            const {bills} = get()
            set({bills: data.map((bill) => {
                return {
                    ...bill,
                    totalAmountDue: bill.totalAmountDue??0 / 100,
                };
            }), loaded: true});
            return data;
        }
    }))
);
