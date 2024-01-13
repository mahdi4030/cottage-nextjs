import dynamic from "next/dynamic";
// import Navigation from "@/components/page/onboarding/layout/Navigation";

const Navigation = dynamic(() => import("@/components/page/onboarding/layout/Navigation"), {ssr: false});

export default function OnboardingLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <div>
            <Navigation />
            <div className="pt-16 md:pt-12 flex flex-col items-center pb-20 w-screen">
                <div className="flex w-full items-start justify-center pt-2 md:pt-4 relative px-3 md:px-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
