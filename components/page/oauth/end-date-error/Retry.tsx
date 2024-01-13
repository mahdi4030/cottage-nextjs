"use client";
import { BaseButton, ElementsCard } from "@/components";
import useUtilityIntegration from "@/composables/useUtilityIntegration";
export default function Retry() {
    const { oAuthConfig } = useUtilityIntegration();
    function navigateToRedirect() {
        window.location.href = oAuthConfig().SCOPES_REDIRECT_URL;
    }
    return (
        <BaseButton type="primary" style="w-full" className="flex mt-8 w-full" size="large" onClick={navigateToRedirect}>
            Retry
        </BaseButton>
    )
}