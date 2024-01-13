"use client";
import { nanoid } from "nanoid";
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ToastsState {
    toastQueue: any[],
    reset: () => void;
    addToastToQueue: (toast: any) => void;
    removeToast: (id: any) => void;
}

export const ToastsStore = create<ToastsState>()(
    devtools(
        (set, get) => ({
            toastQueue: [],
            reset: () => {
                set({ toastQueue: [] });
            },
            addToastToQueue: (toast: any) => {
                const { toastQueue } = get();
                while (true) {
                    toast.id = nanoid();
                    const indexToRemove = toastQueue.findIndex((arr) => {
                        return arr.id === toast.id;
                    });
                    if (indexToRemove < 0) break;
                }
                set({ toastQueue: [...toastQueue, toast] })
            },
            removeToast: (id: any) => {
                const { toastQueue } = get();
                const indexToRemove =
                    // toastQueue[
                    toastQueue.findIndex((arr) => {
                        return arr.id === id;
                    });
                if (indexToRemove < 0) return;
                // ];
                set({ toastQueue: [...toastQueue.slice(0, indexToRemove), ...toastQueue.slice(indexToRemove + 1, toastQueue.length)] });
            }
        }),
        { name: "toasts-store" }
    )
);
