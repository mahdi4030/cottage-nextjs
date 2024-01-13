"use client";
import clsx from "clsx";
import React, { useEffect, useMemo } from "react";
import { ToastsStore } from "@/store/toast";

import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'


type ToastProps = {
    id: string,
    message: string,
    timeout: number,
    type: string
}

export const Toast: React.FC<Partial<ToastProps>> = ({
    id = "",
    message = "",
    timeout = 4000,
    type = "success"
}) => {
    const classList = useMemo(() => {
        switch (type) {
            case "warning":
                return {
                    outerClass: "bg-rose-50",
                    textClass: "text-rose-700",
                    buttonClass: "bg-rose-50 text-rose-700 hover:bg-rose-200/30 focus:ring-offset-rose-50 focus:ring-rose-600",
                };
            default:
                return {
                    outerClass: "bg-green-50",
                    textClass: "text-green-700",
                    buttonClass: "bg-green-50 text-green-700 hover:bg-green-200/40 focus:ring-offset-green-50 focus:ring-green-700",
                };
        }
    }, [type]);

    const { removeToast } = ToastsStore();

    function dismissToast() {
        removeToast(id);
    }

    useEffect(() => {
        setTimeout(() => {
            // state.isToastVisible = false;
            removeToast(id);
        }, timeout);
    }, []);
    return (
        <div className="toast">
            <div className={clsx("rounded-md p-4 shadow-md", classList.outerClass)}>
                <div className="flex">
                    {
                        type === 'warning' &&
                        <div className="flex-shrink-0">
                            <ExclamationCircleIcon className="h-5 w-5 text-rose-700" aria-hidden="true" />
                        </div>
                    }
                    {
                        type === 'success' &&
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-700" aria-hidden="true" />
                        </div>
                    }
                    <div className="ml-3">
                        <p className={clsx("text-base font-medium", classList.textClass)}>
                            {message}
                        </p>
                    </div>
                    <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                                type="button"
                                className={clsx("inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2", classList.buttonClass)}
                                onClick={dismissToast}
                            >
                                <span className="sr-only">Dismiss</span>
                                <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
}