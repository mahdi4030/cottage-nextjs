"use client"

import { useEffect, useState } from "react";

export default function ClientShow(props) {
    const [showClient, setShowClient] = useState(false);
    useEffect(() => {
        setShowClient(true);
    }, []);
    if (!showClient) return <></>;
    return <>{props.client}</>;
}