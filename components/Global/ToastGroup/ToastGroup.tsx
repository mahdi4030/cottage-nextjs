"use client";
import React, { useEffect, useState } from "react";
import { BaseToast } from "@/components";
import { ToastsStore } from "@/store/toast";
export default function ToastGroup () {

    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true)
    }, []);


    const { toastQueue } = ToastsStore();
    if (!showChild) {
        return null;
    }
    return (
        <div name="toast" className="fixed top-4 right-4 z-50 max-w-md w-full transition-all space-y-4" >
            {
                toastQueue.map((toast, index) => {
                    return <BaseToast id={toast.id} key={index} message={toast.message} type={toast.type} />
                })
            }
        </div>
    )
}