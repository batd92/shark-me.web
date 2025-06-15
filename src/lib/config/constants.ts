export const ENV = {
    IS_DEV: process.env.NEXT_PUBLIC_APP_ENV === 'development',
    IS_PROD: process.env.NEXT_PUBLIC_APP_ENV === 'production',
    IS_STAGING: process.env.NEXT_PUBLIC_APP_ENV === 'staging',
} as const;

export const CHAINS = {
    MAINNET: 56,
    TESTNET: 97,
} as const;

export const RPC_URLS = {
    [CHAINS.MAINNET]: process.env.NEXT_PUBLIC_BSC_MAINNET_RPC!,
    [CHAINS.TESTNET]: process.env.NEXT_PUBLIC_BSC_TESTNET_RPC!,
} as const;

export const EXPLORER_URLS = {
    [CHAINS.MAINNET]: process.env.NEXT_PUBLIC_BSCSCAN_URL!,
    [CHAINS.TESTNET]: process.env.NEXT_PUBLIC_BSCSCAN_TESTNET_URL!,
} as const;

export const DEFAULT_CHAIN_ID = ENV.IS_PROD ? CHAINS.MAINNET : CHAINS.TESTNET;
