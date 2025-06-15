"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { SUPPORTED_CHAINS } from "./chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "your-project-id";

export const config = getDefaultConfig({
    appName: "SharkMe",
    projectId,
    chains: SUPPORTED_CHAINS as any,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
    transports: SUPPORTED_CHAINS.reduce(
        (obj, chain) => ({
            ...obj,
            [chain.id]: http(chain.rpcUrls.default.http[0])
        }),
        {}
    ),
});