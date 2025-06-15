import { CHAINS, RPC_URLS, EXPLORER_URLS } from './constants';
import type { Chain } from 'wagmi/chains';

export type ChainConfig = Chain & {
    network?: string;
    contracts?: {
        [key: string]: {
            address: string;
        };
    };
};

export const CHAIN_CONFIGS: Record<number, ChainConfig> = {
    [CHAINS.MAINNET]: {
        id: CHAINS.MAINNET,
        name: 'BNB Smart Chain',
        network: 'bsc',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        rpcUrls: {
            default: { http: [RPC_URLS[CHAINS.MAINNET]] },
            public: { http: [RPC_URLS[CHAINS.MAINNET]] },
        },
        blockExplorers: {
            default: { name: 'BscScan', url: EXPLORER_URLS[CHAINS.MAINNET] },
        },
    },
    [CHAINS.TESTNET]: {
        id: CHAINS.TESTNET,
        name: 'BNB Smart Chain Testnet',
        network: 'bsc-testnet',
        nativeCurrency: {
            name: 'tBNB',
            symbol: 'tBNB',
            decimals: 18,
        },
        rpcUrls: {
            default: { http: [RPC_URLS[CHAINS.TESTNET]] },
            public: { http: [RPC_URLS[CHAINS.TESTNET]] },
        },
        blockExplorers: {
            default: { name: 'BscScan Testnet', url: EXPLORER_URLS[CHAINS.TESTNET] },
        },
    },
    // Multilayer
} as const;

export const getChainConfig = (chainId: number): ChainConfig => {
    const config = CHAIN_CONFIGS[chainId as keyof typeof CHAIN_CONFIGS];
    if (!config) {
        throw new Error(`Unsupported chain ID: ${chainId}`);
    }
    return config;
};

export const SUPPORTED_CHAINS = Object.values(CHAIN_CONFIGS);