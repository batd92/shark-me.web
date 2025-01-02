"use client";

import { WagmiProvider, cookieToInitialState } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "../config/wagmi";
import { useMemo } from "react";


type Props = {
    children: React.ReactNode;
    cookie?: string | null;
};

export default function Providers({ children, cookie }: Props) {
    const initialState = useMemo(() => cookieToInitialState(config, cookie), [cookie]);
    const queryClient = useMemo(() => new QueryClient(), []);

    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}