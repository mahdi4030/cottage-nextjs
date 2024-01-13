import { GreenButtonOAuth } from '@/types/models';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GreenButtonOAuthState {
    loaded: boolean;
    greenButton: GreenButtonOAuth;
    reset: () => void;
    setLoaded: (loaded: boolean) => void;
    setGreenButton: (greenButton: GreenButtonOAuth) => void;
}

function initGreenButton() {
    return {
        cottageUserID: null,
        provider: "",
        subscriptionID: "",
        accessToken: "",
        refreshToken: "",
        scopes: "",
        accountNumber: "",
        startDate: "",
        endDate: "",
    } as Partial<GreenButtonOAuth>;
}

export const GreenButtonOAuthStore = create<GreenButtonOAuthState>()(
    devtools(
        persist(
            (set, get) => ({
                loaded: false,
                greenButton: initGreenButton() as GreenButtonOAuth,
                reset: () => {
                    set({ greenButton: initGreenButton() as GreenButtonOAuth });
                    if (typeof window === 'undefined') {
                        // TODO: EXPIRE ACCESS TOKENS SO THEY ONLY LAST 1 HOUR
                        document.cookie = "greenbuttonOAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    }
                },
                setLoaded: (loaded: boolean) => {
                    set({loaded});
                },
                setGreenButton: (greenButton: GreenButtonOAuth) => {
                    set({ greenButton: greenButton });
                }
            }),
            { name: "greenButtonOAuth-store" }
        )
    )
);
