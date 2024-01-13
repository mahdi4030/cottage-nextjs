import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// import { supabase } from '@/supabase.js';
import { Resident } from '@/types/models';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';
import { AppStore } from './app';

interface ResidentState {
  loaded: boolean;
  resident: Resident;
  isResidentIdentityLoaded: boolean;
  isResidentIdentityComplete: boolean;

  reset: () => void;
  getResident: (returnData?: boolean, userID?: any) => {};
  checkResidentIdentity: (cottageUserID: string) => void;
  updateResident: (updates: object, updateObject?: boolean) => void;
  setIsResidentIdentityComplete: (isResidentIdentityComplete: boolean) => void;
}

function initResident() {
  return {
    id: -1,
    cottageUserID: null,
    firstName: "",
    lastName: "",
    phone: "",
    startServiceDate: "",
    isRegistrationComplete: false,
  } as Resident;
}

export const ResidentStore = create<ResidentState>()(
  devtools((set, get) => ({
    loaded: false,
    resident: initResident() as Resident,
    isResidentIdentityLoaded: false,
    isResidentIdentityComplete: false,

    reset: () => {
      set({ loaded: false, resident: initResident() });
      if (typeof window !== 'undefined') { //!process.server in nuxt
        document.cookie = "resident=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }
    },
    getResident: async (returnData = false, userID) => {
      const supabase = createClientComponentClient<Database>();
      const {user} = AppStore.getState();
      // const user = (await supabase.auth.getSession()).data.session?.user;
      // const user = Object.assign(supabase.auth.getUser());
      if (!userID)
          userID = user?.id
      const id = !!userID ? userID : user?.id;
      const { data, error } = await supabase.from("Resident").select("*").eq("cottageUserID", userID).maybeSingle();
      if (error) {
        throw error;
      }
      if (returnData) {
        return data;
      } else {
        set({ loaded: true, resident: data as Resident });
      }
    },
    checkResidentIdentity: async (cottageUserID) => {
      const supabase = createClientComponentClient<Database>();
      const { data, error } = await supabase.from("ResidentIdentity").select("*").eq("cottageUserID", cottageUserID).maybeSingle();
      if (error) {
        throw error;
      }
      if (data) {
        set({ isResidentIdentityComplete: true, isResidentIdentityLoaded: true });
      } else {
        set({ isResidentIdentityComplete: false, isResidentIdentityLoaded: true });
      }
    },
    updateResident: async (updates: object, updateObject = true) => {
      const supabase = createClientComponentClient<Database>();
      const {user} = AppStore.getState();
      // const user = (await supabase.auth.getSession()).data.session?.user;
      const { data, error } = await supabase.from("Resident").update(updates).eq("cottageUserID", user?.id);
      if (error) {
        throw error;
      }
      if (updateObject) {
        const resident = get().resident;
        set({ resident: { ...Object.assign(resident), ...updates } as Resident });
      }
    },
    setIsResidentIdentityComplete: (isResidentIdentityComplete: boolean) => {
      set({ isResidentIdentityComplete });
    }
  }))
);
