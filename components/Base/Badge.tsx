import clsx from "clsx";
import Link from "next/link";
import React, { useMemo } from "react";

type BadgeProps = {
    className?: string;
    badgeStyle?: string;
    children?: React.ReactNode;
};

export const Badge: React.FC<BadgeProps> = ({
    className = "",
    badgeStyle = "",
    children
}) => {
    const _badgeStyle = useMemo(() => {
        switch (badgeStyle) {
            case "success":
                return ["bg-green-50", "text-forrest-700", "dark:bg-green-200", "dark:text-green-900"];
            case "disabled":
                return ["bg-gray-100", "text-gray-800", "dark:bg-gray-700", "dark:text-gray-300"];
            case "error":
            case "invalid":
                return ["bg-rose-100", "text-rose-800", "dark:bg-rose-200", "dark:text-rose-900"];
            case "warning":
                return ["bg-yellow-100", "text-yellow-800", "dark:bg-yellow-200", "dark:text-yellow-900"];
            default:
                return ["bg-blue-100", "text-blue-800", "dark:bg-blue-200", "dark:text-blue-800"];
        }
    }, [badgeStyle]);
    return (
        <span className={clsx("text-sm font-semibold mr-2 px-3 py-1 !pt-[6px] rounded-full capitalize text-center", className, ..._badgeStyle)}>
            {children}
        </span>
    );
};
