import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
// import { supabase } from '@/supabase.js';
import { PostgrestError } from "@supabase/postgrest-js";

import type { Database } from "@/types/db";
import { ElectricSupplyPlan, ServiceGroup, ElectricCompany, Building, RenewableSubscriptionPlan } from "@/types/models";
import { CommunitySolarAvailabilityTypes, ServiceGroupStatus } from "@/types/enums";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface RegServicesState {
  loaded: boolean;
  serviceGroup: ServiceGroup;
  buildingList: any;
  building: Building;
  partnerCode: string;
  partner: Object;

  reset: () => void;
  resetPartnerCode: () => void;
  getServiceGroup: (zip: string) => {};
  checkBuilding: (googlePlaceID: string) => {};
  getBuildingListByReferrerCode: (code: string) => {};
  setPartnerCode: (partnerCode: string) => void;
  setPartner: (partner: Object) => void;
}

function initServiceGroup() {
	return {
		id: "",
		status: null,
		communitySolarAvailability: null,
		electricCompanyID: "",
		activeSupplyPlanID: null,
		renewableSubscriptionPlanID: null,
		isActiveReferralProgram: false,
		referralProgramAmount: null,
	} as Partial<ServiceGroup>;
}
export const RegServicesStore = create<RegServicesState>()(
  devtools(
    persist(
      (set) => ({
        loaded: false,
        serviceGroup: initServiceGroup() as ServiceGroup,
        buildingList: [],
        building: {} as Building,
        partnerCode: "",
        partner: {},

        reset: () => {
          set({loaded: false, buildingList: [], building: {} as Building, serviceGroup: initServiceGroup() as ServiceGroup});

          if (typeof window !== 'undefined') { //!process.server in nuxt
            document.cookie = "regServices=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          }
        },
        resetPartnerCode: () => {
          set({partnerCode: ""});
        },
        getServiceGroup: async (zip: string) => {
          const supabase = createClientComponentClient<Database>();
          let status = ServiceGroupStatus.NOT_ACTIVE;
          const { data, error } = await supabase
            .from("ServiceZip")
            .select("*, serviceGroup(*, electricCompanyID(*))")
            .eq("id", zip)
            .limit(1)
            .single();
          if (!error) {
            set({serviceGroup: data.serviceGroup});
            status = data.serviceGroup.status;
          }
          return status;
        },
        checkBuilding: async (googlePlaceID: string) => {
          const supabase = createClientComponentClient<Database>();
          let isBuilding = false;
          const { data } = await supabase.from("Building").select("*").eq("googlePlaceID", googlePlaceID);
          if (data?.length == 1) {
            set({building: data[0] as Building});
            isBuilding = true;
          }
          return isBuilding;
        },
        getBuildingListByReferrerCode: async (code: string) => {
          const supabase = createClientComponentClient<Database>();
          const { data, error } = await supabase
            .from("ReferralPartner_Building")
            .select("ReferralPartner (id, code), Building (id, name, addressID (id, street, city, state, zip, googlePlaceID))")
            .filter("ReferralPartner.code", "eq", code);

          if (!error) {
            set({buildingList: data.map((item) => item.Building)});
          }
          if (error) {
            console.error(error);
          }
        },
        setPartnerCode: (partnerCode: string) => {
          set({partnerCode});
        },
        setPartner: (partner: Object) => {
          set({partner});
        }
      }),
      {name: "regServices-store"}
    )
  )
);
