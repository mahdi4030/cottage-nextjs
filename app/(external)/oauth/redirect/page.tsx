import { BaseIcon } from "@/components";
import LogoFlattenedAnimated from '@/assets/icons/logo-flattened-animated.svg'
import Main from "@/components/page/oauth/redirect/Main";

export default function Redirect() {
    
    return (
        <div>
            <Main />
            <div className="flex py-12 flex-grow items-center justify-center">
                <BaseIcon icon={<LogoFlattenedAnimated />} style={{ fontSize: "200px", strokeWidth: "4" }} />
            </div>
        </div>
    )
}