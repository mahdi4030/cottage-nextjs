import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
// import { supabase } from '@/supabase.js';

import { Property } from '@/types/models';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';

interface PropertyState {
  loaded: boolean;
  property: Property;
  reset: () => void;
  getPropertyIDByAddressId: (addressID: string, unitNumber: string | null | undefined) => {};
  setPropertyStoreValue: (loaded: boolean, propertyID: Property) => void
}

function initProperty() {
	return {
    id: -1,
    addressID: "",
    type: null,
    unitNumber: ""
  } as Partial<Property>;
}

export const PropertyStore = create<PropertyState>()(
  devtools(
    persist(
      (set, get) => ({
        loaded: false,
        property: initProperty() as Property,

        reset: () => {
          set({loaded: false, property: initProperty() as Property});

          if (typeof window !== 'undefined') { //!process.server in nuxt
            document.cookie = "property=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          }
        },
        getPropertyIDByAddressId: async (addressID: string, unitNumber: string | null | undefined) => {
          const supabase = createClientComponentClient<Database>();
          try {
            let query = supabase.from("Property").select("id").eq("addressID", addressID);
            if (!!unitNumber) {
              query = query.or("unitNumber.eq.null");
            } else {
              query = query.eq("unitNumber", unitNumber);
            }
            const { data, error } = await query;
            if (error) {
              console.error("Error fetching property:", error);
              return null;
            }
            if (!(data) || data.length === 0) {
              console.log("No property found with the provided addressID and unitNumber");
              return null;
            }
            return data[0].id;
          } catch (err) {
            console.error("Unexpected error:", err);
            return null;
          }
        },
        setPropertyStoreValue: (loaded: boolean, property: Property) => {
          // const { property } = get();
          // set({loaded: loaded, property: {...property, id: propertyId ? propertyId : -1}});
          set({loaded: loaded, property});
        }

      }),
      {name: "property-store"}
    )
  )
);
