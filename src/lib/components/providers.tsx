"use client";

import { useTheme } from "next-themes";
import { WagmiProvider, cookieToInitialState } from "wagmi";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { config } from "../config/wagmi";
import { ThemeProvider } from '@/lib/components/theme-provider';

type Props = {
    children: React.ReactNode;
    cookie?: string | null;
};

export default function Providers({ children, cookie }: Props) {
    const { theme } = useTheme();
    const initialState = useMemo(() => cookieToInitialState(config, cookie), [cookie]);
    const queryClient = useMemo(() => new QueryClient(), []);

    const rainbowKitTheme = theme === "dark" ? darkTheme() : lightTheme();

    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <RainbowKitProvider theme={rainbowKitTheme}>
                    {children}
                </RainbowKitProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
