import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ElectricAccountState {
  loaded: boolean;
  electricAccount: any;

  reset: () => void;
  setElectricAccountStoreValue: (loaded: boolean, electricAccount: number | null) => void;
  setIsAccountLinkedWithUtility: (isAccountLinkedWithUtility:boolean) => void;
}

export const ElectricAccountStore = create<ElectricAccountState>()(
  devtools((set, get) => ({
    loaded: false,
    electricAccount: null,

    reset: () => {
      set({loaded: false, electricAccount: null});
      if (typeof window !== 'undefined') { //!process.server in nuxt
        document.cookie = "electricBill=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }
    },
    setElectricAccountStoreValue: (loaded, electricAccount) => {
      set({loaded: loaded, electricAccount: electricAccount});
    },
    setIsAccountLinkedWithUtility: (isAccountLinkedWithUtility: boolean) => {
      const {electricAccount} = get();
      set({electricAccount: {...Object.assign(electricAccount), isAccountLinkedWithUtility}});
    }
  }))
);
