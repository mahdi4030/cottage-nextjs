"use client";
import { AppStore } from '@/store';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';
import { useEffect, useState } from 'react';
import { useAuth } from '@/composables/useAuth';

let userVar = null as any;

if (AppStore.getState().user) {
	userVar = Object.assign(AppStore.getState().user);
	useAuth().fetchUserData();
}
export const SupabaseUserWatcher = () => {
    const {user, setUser} = AppStore();
    const supabase = createClientComponentClient<Database>();

    const [ userLoaded, setUserLoaded ] = useState(false);
    useEffect(() => {
    	(async()=>{
    		try {
    			setUser((await supabase.auth.getSession()).data.session?.user);
    		} catch(err) {
    		} finally {
    			setUserLoaded(true);
    		}
    	})();
    	const { data: listener} = supabase.auth.onAuthStateChange((event, session) => {
    		console.warn("userchangeevent", "current:", userVar?.id, "new:", session?.user?.id)
    		if (session?.user?.id != userVar?.id) {
    			console.error("sessionchanged", "current:", userVar?.id, "new:", session?.user?.id);
    			setUser(session?.user);
    			if (session?.user) {
    				userVar = Object.assign(session?.user);
    			} else userVar = null;
    		}
    	});
    	return () => {
    		listener.subscription.unsubscribe();
    	}
    }, []);
    return <></>;
}