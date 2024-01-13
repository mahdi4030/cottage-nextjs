import { OAuthSuccess } from "@/components";

export default function OauthSuccess() {
    return (
        <div className="flex flex-col container m-auto items-center md:px-6 xl:max-w-6xl">
            <h2 className="text-center leading-tight">Creating your profile...</h2>
            {/* <ClientOnly> */}
            <OAuthSuccess />
            {/* <template #fallback> */}
            {/* <div className="flex flex-col md:px-20 py-8 w-full text-center items-center max-w-2xl">
                <div className="py-12">
                    <BaseIcon icon={LogoFlattenedAnimated} style={{ fontSize: "160px", strokeWidth: 4 }} />
                </div>
            </div> */}
            {/* </template> */}
            {/* </ClientOnly> */}
        </div>
    );
}