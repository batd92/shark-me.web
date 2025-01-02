"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { sepolia, bscTestnet, blastSepolia, mainnet } from "wagmi/chains";
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = "fe1a8424a43c2a990f595862bd4bc5b8";

const supportedChains: Chain[] = [mainnet, sepolia, bscTestnet, blastSepolia];

export const config = getDefaultConfig({
    appName: "SharkMe",
    projectId,
    chains: supportedChains as any,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
    transports: supportedChains.reduce(
        (obj, chain) => ({ ...obj, [chain.id]: http() }),
        {}
    ),
});