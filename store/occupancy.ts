import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// import { supabase } from '@/supabase.js';
import { Occupancy } from '@/types/models';
import { AppStore, ElectricAccountStore, PropertyStore } from "@/store";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';
import { isNoSubstitutionTemplateLiteral } from 'typescript';

interface OccupancyState {
  loaded: boolean;
  occupancy: Occupancy;

  reset: () => void;
  getOccupancy: (returnData?: boolean, userID?: string) => {};
  getActiveOccupancyRecordByUnitID: (unitID: number) => Promise<Occupancy | boolean>;
  setOccupancy: (occupancy: Occupancy) => void;
}

function initOccupancy() {
	return {
		id: -1,
		cottageUserID: "",
		propertyID: -1,
		electricAccountID: -1,
		startDate: "",
		endDate: "",
		isActive: false,
	} as Partial<Occupancy>;
}


export const OccupancyStore = create<OccupancyState>()(
  devtools((set, get) => ({
    loaded: false,
    occupancy: initOccupancy() as Occupancy,

    reset: () => {
      set({loaded: false, occupancy: initOccupancy() as Occupancy});
      if (typeof window !== 'undefined') { //!process.server in nuxt
        document.cookie = "occupancy=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }
    },
    getOccupancy: async (returnData = false, userID) => {
      const supabase = createClientComponentClient<Database>();
      // const user = Object.assign(supabase.auth.getUser());
      const {user} = AppStore.getState();
      // const user = (await supabase.auth.getSession()).data.session?.user;
      if (!userID) {
        if (user) {
          userID = user.id
        }
      }
      const { data, error } = await supabase
        .from("Occupancy")
        .select("*, propertyID(*, addressID(*)), electricAccountID(*, electricCompanyID(*)), cottageUserID(*)")
        .eq("cottageUserID", userID)
        .is("isActive", true)
        .limit(1)
        .single();
      if (error) {
        throw error;
      }
      if (returnData) {
        return data;
      } else {
        const { id, startDate, endDate, isActive, electricAccountID, propertyID } = data as Occupancy;
        set({
          loaded: true,
          occupancy: {
            id,
            startDate,
            endDate,
            isActive,
            electricAccountID,
            propertyID
          } as Occupancy
        });
        const {setElectricAccountStoreValue} = ElectricAccountStore.getState();
        // const { setElectricAccountStoreValue } = ElectricAccountStore(state => state);
        setElectricAccountStoreValue(true, electricAccountID);
        const { setPropertyStoreValue } = PropertyStore.getState();
        setPropertyStoreValue(true, propertyID);
      }
    },
    getActiveOccupancyRecordByUnitID: async (unitID: number) => {
      const supabase = createClientComponentClient<Database>();
      const { data, error } = await supabase.from("Occupancy").select("*").eq("unit", unitID).eq("isActive", true);
      if (error) {throw error;}
      if (data.length > 0) {
        return data[0] as Occupancy;
      } else {
        return false;
      }
    },
    setOccupancy: (occupancy: Occupancy) => {
      set({occupancy: occupancy});
    }
  }))
);
