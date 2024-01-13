"use client";
import useOnboardingNavigation from '@/composables/useOnboardingNavigation';
import { FormNavigation } from "@/components/Form";

export default function FormNavigationClient() {
    const { navigateToNextPage , navigateToPreviousPage } = useOnboardingNavigation();

    const nextPage = () => {
        navigateToNextPage();
    }

    const previousPage = () => {
        navigateToPreviousPage();
    }
    return (
        <>
            <FormNavigation
                    isNextDisabled={false}
                    showPrevious={false}
                    nextButtonText="Let's Go"
                    navBtnStyle="px-12 lg:px-16 py-3 lg:py-4 text-lg lg:text-xl"
                    nextPage={nextPage}
                    previousPage={previousPage}
                />
        </>
    )
}