"use client";
import { BaseButton } from "@/components";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function GoToDashboard() {
    const router = useRouter();
    const [electricCompany] = useCookies(["electricCompany"]);
    const goToDashboard = async () => {

        const greenButtonBody = {
            provider: electricCompany,
            operations: ["meter readings", "customer data", "billing summaries", "historic data"],
        };
        fetch("/api/_private/sync-green-button", {
            method: "post",
            body: JSON.stringify(greenButtonBody),
        });
        router.push("/app/overview");
    }
    return (
        <BaseButton type="primary" style="w-full" className="flex mt-8 w-full" size="large" onClick={goToDashboard}>
            Go to Dashboard
        </BaseButton>
    )
}