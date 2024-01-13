"use client";
import { BaseButton, BaseIcon, BaseInput, ElementsCard } from "@/components";
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from "@/composables/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import WarningIcon from '@/assets/icons/warning.svg'

export default function Main() {
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const services = useAuth();
    const currentTimestamp = Math.round(new Date().getTime() / 1000);
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");
    const expire = searchParams.get("expire");

    const [passwordResetError, setPasswordResetError] = useState(false);
    const [passwordResetMessage, setPasswordResetMessage] = useState("Both passwords must match.");

    useEffect(() => {
        if (expire != null && currentTimestamp > parseInt(expire ?? "0".toString())) {
            router.push("/forgot-password?error=expired");
        }
    }, []);

    const isResetDisabled = useMemo(() => {
        if (newPassword.length < 8 || newPasswordConfirm.length < 8) {
            return true;
        }
        return false;
    }, [newPassword, newPasswordConfirm]);

    const _setNewPassword = async () => {
        setPasswordResetError(false);
        if (newPassword.length < 8) {
            setPasswordResetError(true);
            setPasswordResetMessage("Password must be over 8 characters");
        } else if (newPassword !== newPasswordConfirm) {
            setPasswordResetError(true);
            setPasswordResetMessage("Both passwords must match.");
        } else {
            const recoverySuccess = await services.confirmRecovery(userId.toString(), secret.toString(), newPassword, newPasswordConfirm);
            if (recoverySuccess) {
                router.push("/app");
            } else {
                // Todo: To refine failed login UX
                setPasswordResetMessage("Something went wrong. Please try again.");
            }
        }
    }
    return (
        <>
            <BaseInput
                inputValue={newPassword}
                onChange={setNewPassword}
                inputClass="w-full flex text-left mt-4"
                inputControl="flex"
                inputName="newPassword"
                inputType="password"
            >
                New Password
            </BaseInput>
            <BaseInput
                inputValue={newPasswordConfirm}
                onChange={setNewPasswordConfirm}
                inputClass="w-full flex text-left mt-2"
                inputControl="flex"
                inputName="newPasswordConfirm"
                inputType="password"
            >
                Confirm New Password
            </BaseInput>
            {passwordResetError &&
                <div
                    className="flex text-rose-600 mt-4 text-lg items-center px-4 py-2 text-left bg-rose-50 border-2 border-rose-600 rounded-xl w-full max-w-2xl"
                >
                    <BaseIcon icon={<WarningIcon />} className="min-w-fit text-xl pr-2" />
                    {passwordResetMessage}
                </div>}
            <BaseButton
                size="large"
                style="w-full"
                type="primary"
                className="w-full flex pt-6"
                disabled={isResetDisabled}
                onClick={_setNewPassword}
            >
                Set New Password
            </BaseButton>
        </>
    )
}