import React from "react";
import { GlobalToastGroup, GlobalExternalFooter } from "@/components";

export default function ExternalLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex items-center flex-col min-h-screen bg-tan-200">
			<GlobalToastGroup />
			<main className="flex flex-1 flex-col items-center w-screen flex-grow">
				{children}
			</main>
			<GlobalExternalFooter />
		</div>
	);
}
