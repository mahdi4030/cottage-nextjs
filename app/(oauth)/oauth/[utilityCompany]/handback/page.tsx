import { BaseIcon, ElementsCard } from "@/components";
import { AppStore, GreenButtonOAuthStore, RegServicesStore, RegistrationStore } from "@/store";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import LogoFlattenedAnimated from '@/assets/icons/logo-flattened-animated.svg'
import { useEffect } from "react";

export default function Handback() {
    // const { loaded: greenButtonLoaded, setLoaded: setGreenButtonLoaded, greenButton, setGreenButton } = GreenButtonOAuthStore();
    // const { registration } = RegistrationStore();
    // const { serviceGroup } = RegServicesStore();
    // const { user } = AppStore();

    // const router = useRouter();
    // const params = useParams();
    // const searchParams = useSearchParams();
    // const { utilityCompany } = params;

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const code = searchParams.get("code");
    //             if (code === undefined || code === null) {
    //                 throw "Code is undefined!";
    //             }
    //             const res = await (await fetch("/oauth/callback/" + utilityCompany, {
    //                 method: "post",
    //                 body: JSON.stringify({
    //                     code,
    //                     user: {
    //                         id: user.id,
    //                         email: user.email,
    //                     },
    //                     greenButton: {
    //                         startDate: greenButton.startDate ?? "",
    //                         endDate: greenButton.endDate ?? "",
    //                     },
    //                     electricCompany: serviceGroup.electricCompanyID.id ?? "",
    //                 }),
    //             })).json();
    //             setGreenButtonLoaded(true);
    //             setGreenButton({ ...greenButton, accessToken: res.accessToken, subscriptionID: res.subscriptionID });

    //             // const isRegistrationComplete = user.value.user_metadata.isRegistrationComplete ?? false;
    //             // if (!isRegistrationComplete) {
    //             // 	registration.value.isUtilityLinkError = false;
    //             // 	registration.value.utilityElectricAccount.isUtilityAccountLinked = true;
    //             // 	return navigateTo("/onboarding/finish");
    //             // } else {
    //             // 	return navigateTo("/oauth/" + utilityCompany + "/success");
    //             // }
    //             return router.push("/oauth/" + utilityCompany + "/success");
    //         } catch (error: any) {

    //             // const isRegistrationComplete = user.value.user_metadata.isRegistrationComplete ?? false;
    //             // if (!isRegistrationComplete) {
    //             // 	registration.value.isUtilityLinkError = true;
    //             // 	registration.value.utilityElectricAccount.isUtilityAccountLinked = false;
    //             // 	return navigateTo("/onboarding/finish");
    //             // } else {
    //             // 	return navigateTo("/oauth/" + utilityCompany + "/error");
    //             // }
    //             return router.push("/oauth/" + utilityCompany + "/error");
    //         }
    //     })();
    // }, []);
    return (
        <div className="w-screen flex flex-col px-4">
            <div className="flex flex-col mt-6 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
                <ElementsCard className="flex text-center md:p-12 shadow-md bg-white rounded-xl max-w-2xl items-center w-full">
                    <h2 className="text-center leading-tight">Connecting the wires...</h2>
                    <div className="flex flex-col md:px-20 py-8 w-full text-center items-center max-w-2xl">
                        <div className="py-12">
                            <BaseIcon icon={<LogoFlattenedAnimated />} style={{fontSize: "160px", strokeWidth: "4"}} />
                        </div>
                    </div>
                </ElementsCard>
            </div>
        </div>
    )
}