// import { supabase } from '@/supabase';
import { Database } from '@/types/db';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// import { supabase } from '@/supabase.js';

interface AddressState {
  getAddressIdByGooglePlaceID: (googlePlaceID: string | null) => {};
}

export const AddressStore = create<AddressState>()(
  devtools(
    persist(
      (set) => ({
        getAddressIdByGooglePlaceID: async (googlePlaceID) => {
          const supabase = createClientComponentClient<Database>();
          const { data, error } = await supabase.from("Address").select("id").eq("googlePlaceID", googlePlaceID).maybeSingle();
          if (error) {
            console.error(error);
            return null;
          }
          // If a record exists, return its id field
          if (data) {
            return data.id;
          }
          // If no record exists with the given googlePlaceID, return null
          return null;
        }
      }),
      {name: "address-store"}
    )
  )
);
