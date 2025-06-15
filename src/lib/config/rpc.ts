import { ChainId } from "./chainId";

export const DEFAULT_RPC_URLS: Record<number, string> = {
    [ChainId.ETHEREUM]: 'https://eth.llamarpc.com',
    [ChainId.SEPOLIA]: 'https://ethereum-sepolia-rpc.publicnode.com',
    [ChainId.BSC_MAINNET]: 'https://bsc-dataseed.binance.org',
    [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
};

export const DEFAULT_EXPLORER_URLS: Record<number, string> = {
    [ChainId.ETHEREUM]: 'https://etherscan.io',
    [ChainId.SEPOLIA]: 'https://sepolia.etherscan.io',
    [ChainId.BSC_MAINNET]: 'https://bscscan.com',
    [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
};

export class RPC {
    public static env = process.env;

    private static _get(args: {
        key: string;
        err?: string;
        first: true;
        fallback: string
    }): string;

    private static _get(args: {
        key: string;
        err?: string;
        first?: never;
        fallback: string
    }): string[];

    private static _get(args: {
        key: string;
        err?: string;
        first: true;
        fallback?: never
    }): string | undefined;

    private static _get(args: {
        key: string;
        err?: string;
        first?: never;
        fallback?: never
    }): string[] | undefined;

    private static _get(args: {
        key: string;
        err?: string;
        first?: boolean;
        fallback?: string
    }) {
        const value = this.env[args.key] || args.fallback;

        if (!value) {
            console.warn(args.err || `No RPC URL found for key: ${args.key}`);
            return args.fallback ? (args.first ? args.fallback : [args.fallback]) : undefined;
        }

        return args.first ? value : value.split(" ");
    }

    /**
     * Get RPC URL for a specific chain ID
     * @param chainId The chain ID to get RPC URL for
     * @returns RPC URL as string or array of strings
     */
    public static getNodeUrls(chainId: ChainId): string | string[] {
        const defaultRpc = DEFAULT_RPC_URLS[chainId];

        switch (chainId) {
            case ChainId.ETHEREUM:
                return this._get({
                    key: 'NEXT_PUBLIC_ETHEREUM_RPC',
                    fallback: defaultRpc || '',
                    first: true
                });

            case ChainId.SEPOLIA:
                return this._get({
                    key: 'NEXT_PUBLIC_SEPOLIA_RPC',
                    fallback: defaultRpc || '',
                    first: true
                });

            case ChainId.BSC_MAINNET:
                return this._get({
                    key: 'NEXT_PUBLIC_BSC_MAINNET_RPC',
                    fallback: defaultRpc || 'https://bsc-dataseed.binance.org',
                    first: true
                });

            case ChainId.BSC_TESTNET:
                return this._get({
                    key: 'NEXT_PUBLIC_BSC_TESTNET_RPC',
                    fallback: defaultRpc || 'https://data-seed-prebsc-1-s1.binance.org:8545',
                    first: true
                });

            default:
                console.warn(`No RPC configuration for chain ID: ${chainId}`);
                return defaultRpc || '';
        }
    }

    /**
     * Get block explorer URL for a specific chain ID
     * @param chainId The chain ID
     * @returns Block explorer URL as string
     */
    public static getExplorerUrl(chainId: ChainId): string {
        return DEFAULT_EXPLORER_URLS[chainId] || '';
    }
}