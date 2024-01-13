import { User } from "@supabase/gotrue-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import posthog from "posthog-js";
import useResetState from './useResetState';
import type { Database } from "@/types/db";
import { AppStore, ElectricAccountStore, ElectricBillStore, OccupancyStore, PropertyStore, RegServicesStore, ResidentStore } from "@/store";
import { useStore } from "zustand";

export const useAuth = () => {
	// const supabaseAuthClient = useSupabaseAuthClient();
	// const config = useRuntimeConfig();
	// const config = process.env;
	const supabase = createClientComponentClient<Database>();
	const { useResetLogout } = useResetState();
	async function createAccount(email: string, password: string): Promise<void | User> {
		// const { data, error } = await supabaseAuthClient.auth.signUp({
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) {
			throw error;
		}
		return data.user as User;
	}

	async function createOAuthSession(provider: string, redirectURL = "/oauth/redirect") {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// const { error } = await supabaseAuthClient.auth.signInWithOAuth({ provider, options: { redirectTo: config.SITE_URL + redirectURL } });
		const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: process.env.NEXT_PUBLIC_SITE_URL + redirectURL } });
		if (error) {
			throw error;
		}
	}

	async function login(email: string, password: string): Promise<void | User> {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			throw error;
		} else {
			if (process.env.NODE_ENV === "production") {
				try {
					posthog.identify(
						data?.user.id, // distinct_id, required
						{
							email: data?.user.email,
						},
					);
				} catch (error) {
					console.error("COULD NOT CREATE PH SESSION", error);
				}
			}
			return data?.user;
		}
	}

	async function logout(): Promise<boolean> {
		try {
			if (process.env.NODE_ENV === "production") {
				posthog.reset();
			}
			useResetLogout();
			await supabase.auth.signOut();
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	async function accountRecovery(email: string) {
		// const { error } = await supabaseAuthClient.auth.api.resetPasswordForEmail(email);
		const { error } = await supabase.auth.resetPasswordForEmail(email);
		if (error) {
			throw error;
		}
	}

	async function confirmRecovery(accessToken: string, password: string) {
		// const { error } = await supabaseAuthClient.auth.api.updateUser(accessToken, {
		// 	password,
		// });
		const { error } = await supabase.auth.updateUser({
			password,
		});
		if (error) {
			throw error;
		}
	}

	async function fetchUserData() {
		const { user } = AppStore.getState();
		const { getOccupancy } = OccupancyStore.getState();
		const { getResident } = ResidentStore.getState();
		const { fetchElectricData } = ElectricBillStore.getState();
		const { loaded: loadedServiceGroup, getServiceGroup } = RegServicesStore.getState();
		if (user) {
			await Promise.all([getOccupancy(), getResident()]);
			fetchElectricData();
			if (!loadedServiceGroup) {
				const { property } = PropertyStore.getState();
				await getServiceGroup(property.addressID.zip);
			}
		}
	}

	return {
		accountRecovery,
		confirmRecovery,
		createAccount,
		login,
		logout,
		createOAuthSession,
		fetchUserData
	};
};
