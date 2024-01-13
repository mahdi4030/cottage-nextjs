// import Main from "@/components/page/onboarding/address/Main";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("@/components/page/onboarding/address/Main"), {ssr: false});

export default function Onboarding() {
	return (
		<div className="flex flex-col container m-auto items-center md:px-6 xl:max-w-6xl">
			<Main />
		</div>
	);
}
