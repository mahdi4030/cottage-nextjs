// import { Metadata } from 'next';
import { IntercomProvider } from 'react-use-intercom';

import Script from "next/script";
import "@/assets/scss/global.scss";
import { AppStore } from '@/store';
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';
import { useEffect, useState } from 'react';
import { useAuth } from '@/composables/useAuth';
import { cookies } from 'next/headers';
import { IntercomProviderClient, SupabaseUserWatcher } from '@/components';

// export const metadata: Metadata = {
// 	// metadataBase: new URL(`${process.env.SITE_URL}`),
// 	// metadataBase: new URL("localhost:3001"),
// 	title: "Cottage - A Smarter Way to Manage Energy!",
// 	description: "We think energy is too complicated. Instead, we manage your electricity bill and ensure you have the best rates. And it is free.",
// 	viewport: {
// 		width: "device-width",
// 		initialScale: 1,
// 		viewportFit: "cover",
// 	},
// 	appleWebApp: {
// 		title: "Apple Web App",
// 		statusBarStyle: "black-translucent",
// 	},
// 	openGraph: {
// 		title: "Cottage - A Smarter Way to Manage Energy",
// 		description: "We think energy is too complicated. Instead, we manage your electricity bill and ensure you have the best rates. And it is free.",
// 		url: process.env.SITE_URL,
// 		siteName: "Next.js",
// 		images: [
// 			{
// 				url: "https://cottage-public-assets.s3.amazonaws.com/img/cottage-social-share.png",
// 				width: 953,
// 				height: 465,
// 			},
// 		],
// 		type: "website",
// 	},
// 	twitter: {
// 		card: 'summary_large_image',
// 		title: "Cottage - A Smarter Way to Manage Energy",
// 		description: "We think energy is too complicated. Instead, we manage your electricity bill and ensure you have the best rates. And it is free.",
// 		images: ["https://cottage-public-assets.s3.amazonaws.com/img/cottage-social-share.png"],
// 		// domain: "energybycotage.com",
// 		// url: process.env.SITE_URL,
// 	},
// };

// let userVar = null as any;

// if (AppStore.getState().user) {
// 	userVar = Object.assign(AppStore.getState().user);
// 	useAuth().fetchUserData();
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const isProd = process.env.NODE_ENV === "production";

	// const {user, setUser} = AppStore();
	// const supabase = createClientComponentClient<Database>();

	// const [ userLoaded, setUserLoaded ] = useState(false);
	// useEffect(() => {
	// 	(async()=>{
	// 		try {
	// 			setUser((await supabase.auth.getSession()).data.session?.user);
	// 		} catch(err) {
	// 		} finally {
	// 			setUserLoaded(true);
	// 		}
	// 	})();
	// 	const { data: listener} = supabase.auth.onAuthStateChange((event, session) => {
	// 		console.warn("userchangeevent", "current:", userVar?.id, "new:", session?.user?.id)
	// 		if (session?.user?.id != userVar?.id) {
	// 			console.error("sessionchanged", "current:", userVar?.id, "new:", session?.user?.id);
	// 			setUser(session?.user);
	// 			if (session?.user) {
	// 				userVar = Object.assign(session?.user);
	// 			} else userVar = null;
	// 		}
	// 	});
	// 	return () => {
	// 		listener.subscription.unsubscribe();
	// 	}
	// }, []);

	return (
		<html lang="en">
			<SupabaseUserWatcher />
			{isProd && <Script src="https://www.googletagmanager.com/gtag/js?id=G-JRMNKB3SHX" async />}

			<body suppressHydrationWarning>
				<IntercomProviderClient>
					{/* {userLoaded && children} */}
					{children}
				</IntercomProviderClient>
				
				{process.env.NODE_ENV === "production" && <Script src="/js/gtag.js" />}
				<Script src="/js/intercom.js" />
			</body>
		</html>
	);
}
