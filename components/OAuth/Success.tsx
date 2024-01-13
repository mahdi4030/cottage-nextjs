"use client";

import posthog from 'posthog-js'
import { BaseIcon } from "../Base";

import LogoFlattenedAnimated from '@/assets/icons/logo-flattened-animated.svg'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';
import { AppStore, CottageUserStore, RegServicesStore, RegistrationStore } from '@/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function Success() {
    const supabase = createClientComponentClient<Database>();
    const { registration, createRegistration } = RegistrationStore();
    const { getCottageUserByID } = CottageUserStore();
    const { serviceGroup } = RegServicesStore();

    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    let timeout = null;
    const { user } = AppStore();

    const router = useRouter();
    const handleLogin = async () => {
        try {
            let cottageUser = null;
            try {
                cottageUser = await getCottageUserByID(user.value.id);
            } catch (error) {
                console.error("COULD NOT FIND COTTAGE USER", error);
            }
            if (cottageUser) {
                return router.push("/account-already-exists");
            } else {
                await createRegistration(user.value);
            }
            timeout = setTimeout(() => {
                if (process.env.NODE_ENV === "production") {
                    try {
                        posthog.identify(
                            user?.value.id, // distinct_id, required
                            {
                                email: user?.value.email,
                            },
                        );
                    } catch (error) {
                        console.error("COULD NOT CREATE PH SESSION", error);
                    }
                }
                return router.push("/app/overview");
            }, 300);
        } catch (error) {
            // TODO: Handle error here if API fails
            console.error(error);
        }
    }

    useEffect(() => {
        (async () => {
            if (user) {
                if (!isCreatingAccount) {
                    setIsCreatingAccount(true);
                    await handleLogin();
                }
            }
        })();
    }, [user])

    return (
        <div className="flex flex-col md:px-20 py-8 w-full text-center items-center max-w-2xl">
            <div className="py-12">
                <BaseIcon icon={<LogoFlattenedAnimated />} style={{ fontSize: "160px", strokeWidth: 4 }} />
            </div>
        </div>
    )
}