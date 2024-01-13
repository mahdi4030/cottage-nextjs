import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  locationLoaded: boolean;
  location: any;
  user: any;
  isSidebarHidden: boolean;
  fetch: () => void;
  setUser: (user: any) => void;
  toggleSidebar: () => void;
}

export const AppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        locationLoaded: false,
        location: {},
        user: null,
        isSidebarHidden: false,
        fetch: async () => {
          try {
            const res = await fetch("https://api.ipdata.co/?api-key=bd6873a58504e73b1db772ae8344272ad95e18ba91f7de57d0d8885e", {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
            });

            set({locationLoaded: true, location: await res.json()});
          } catch (error) {
            console.error(error);
          }
        },
        setUser: (user: any) => {
          set({user});
        },
        toggleSidebar: () => {
          const { isSidebarHidden } = get();
          set({isSidebarHidden: !isSidebarHidden});
        }
      }),
      {name: "app-store"}
    )
  )
);
