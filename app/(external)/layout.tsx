import React from "react";
import { GlobalExternalFooter } from "@/components";
import dynamic from "next/dynamic";

const GlobalExternalHeader = dynamic(() => import('@/components/Global/ExternalHeader/ExternalHeader'), {ssr: false});

export default function ExternalLayout({children}: {
	children: any
}) {
	return (
		<div className="flex items-center flex-col min-h-screen bg-tan-200">
			<GlobalExternalHeader />
			<main className="flex flex-1 flex-col items-center w-screen flex-grow external-page">
				{children}
			</main>
			<GlobalExternalFooter />
		</div>
	);
}
