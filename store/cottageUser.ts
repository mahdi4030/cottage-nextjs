import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// import { supabase } from '@/supabase.js';
import { CottageUsers } from "@/types/models";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';


interface CottageUserState {
  loaded: boolean;
  cottageUser: CottageUsers;
  referralCode: string;

  reset: () => void;
  getCottageUserByID: (id: string) => {};
  getReferralCode: (id: string) => {};
  setCottageUser: (cottageUser: CottageUsers) => void
}

function initCottageUser() {
	return {
		id: "",
		email: "",
		referralCode: "",
		cottageConnectUserType: null,
	} as CottageUsers;
}

export const CottageUserStore = create<CottageUserState>()(
  devtools((set) => ({
    loaded: false,
    cottageUser: initCottageUser(),
    referralCode: "",

    reset: () => {
      set({loaded: false, cottageUser: initCottageUser()});
      if (typeof window !== 'undefined') { //!process.server in nuxt
        document.cookie = "cottageUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }
    },
    getCottageUserByID: async (id: string) => {
      try {
        const supabase = createClientComponentClient<Database>();
        const { data, error, status } = await supabase.from("CottageUsers").select("*").eq("id", id).maybeSingle();
        console.log("FROM GET COTTAGE USER BY ID", "data", data, "error", error, "status", status);
        if (error && status !== 406) {
          throw new Error(error.message);
        }
        return data ? data.id : null;
      } catch (error) {
        console.error(`Error fetching CottageUser with ID ${id}:`, error);
        throw error;
      }
    },
    getReferralCode: async (id: string) => {
      try {
        const supabase = createClientComponentClient<Database>();
        const { data, error, status } = await supabase.from("CottageUsers").select("referralCode").eq("id", id).maybeSingle();
        if (error && status !== 406) {
          throw new Error(error.message);
        }
        set({referralCode: data ? data.referralCode : ""});
      } catch (error) {
        console.error(`Error fetching Referral Code with ID ${id}:`, error);
        throw error;
      }
    },
    setCottageUser: (cottageUser: CottageUsers) => {
      set({cottageUser: cottageUser});
    }
  }))
);
