"use client";
import { IntercomProvider } from 'react-use-intercom';

export const IntercomProviderClient = ({
    children
}) => {
    return (
        <IntercomProvider appId="n9z0ndsf" autoBoot={true}>
            {children}
        </IntercomProvider>
    );
}