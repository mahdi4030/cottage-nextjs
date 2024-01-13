"use client";
import { useEffect, useMemo, useState } from "react";

type TabProps = {
    id: string;
    name: string;
    isDisabled: boolean;
    callback: Function;
    children: any,
    registerChild: Function;
    unregisterChild: Function
}

export const Tab: React.FC<Partial<TabProps>> = ({
    id = null,
    name,
    isDisabled = false,
    callback = () => { },
    children,
    registerChild,
    unregisterChild
}) => {
    const [isActive, setIsActive] = useState(false);

    const hash = useMemo(() => {
        return `#${id?.toLowerCase().replace(/ /g, "-")}`;
    }, [id]);

    // const { registerChild, unregisterChild } = inject("TabContainer");
    // const instance = getCurrentInstance();
    const childInfo = {
        id: id,
        name: name,
        isDisabled: isDisabled,
        callback: callback,
        isActive,
        hash,
        // content: instance.slots.default,
        content: children,
        setIsActive
    };
    useEffect(() => {
        registerChild(childInfo);
        return () => {
            unregisterChild(childInfo);
        }
    }, []);

    return (
        <>
            {isActive &&
                <section id={hash} aria-hidden={!isActive} className="tabs-container">
                    {children}
                </section>
            }
        </>
    );
}