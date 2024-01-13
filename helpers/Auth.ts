import { User } from "@supabase/gotrue-js";
import posthog from "posthog-js";
// import { supabase } from '@/supabase.js';

import { ResetLogout } from "./ResetLogout";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/db";

export const Auth = () => {
	const supabase = createClientComponentClient<Database>();
	const { auth } = supabase;

	async function createAccount(email: string, password: string): Promise<void | User> {
		const { data, error } = await auth.signUp({
			email,
			password,
		});
		if (error) {
			throw error;
		}
		return data.user as User;
	}

	async function createOAuthSession(provider: string, redirectURL = "/oauth/redirect") {
		// @ts-ignore
		const { error } = await auth.signInWithOAuth({ provider, options: { redirectTo: process.env.SITE_URL + redirectURL } });
		if (error) {
			throw error;
		}
	}

	async function login(email: string, password: string): Promise<User | null | undefined> {
		const { data, error } = await auth.signInWithPassword({ email, password });
		if (error) {
			console.error(error);
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
			ResetLogout();
			await auth.signOut();
			return true;
		} catch (err) {
			return false;
		}
	}

	async function accountRecovery(email: string) {
		const { error } = await auth.resetPasswordForEmail(email);
		if (error) {
			throw error;
		}
	}

	async function confirmRecovery(accessToken: string, password: string) {
		const { error } = await auth.updateUser(
      { password: password },
      // { accessToken: accessToken}
    );
		if (error) {
			throw error;
		}
	}

	return {
		accountRecovery,
		confirmRecovery,
		createAccount,
		login,
		logout,
		createOAuthSession,
	};
};
