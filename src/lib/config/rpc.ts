import { env } from "../constants/env";
import { ChainId } from "../constants/chainId";

export class RPC {
    public static env = process.env;

    private static _get(args: { key: string; err?: string; first: true; fallback: string }): string;
    private static _get(args: { key: string; err?: string; first?: never; fallback: string }): string[];
    private static _get(args: { key: string; err?: string; first: true; fallback?: never }): string | undefined;
    private static _get(args: { key: string; err?: string; first?: never; fallback?: never }): string[] | undefined;
    private static _get(args: { key: string; err?: string; first?: boolean; fallback?: string }) {
        const value = this.env[args.key] || args.fallback;

        if (!value) console.warn(args.err);

        if (value === undefined) return value;

        return args.first ? value : value.split(" ");
    }
    public static getNodeUrls = (chainId: ChainId) => {
        switch (chainId) {
            case ChainId.ETHEREUM:
                return this._get({
                    key: `REACT_APP_ETHEREUM_NODE_URL`,
                    fallback: `https://eth-mainnet.alchemyapi.io/v2/${env.alchemyId}`,
                });
            case ChainId.RINKEBY:
                return this._get({
                    key: `REACT_APP_RINKEBY_NODE_URL`,
                    fallback: `https://eth-rinkeby.alchemyapi.io/v2/${env.alchemyId}`,
                });
            case ChainId.SEPOLIA:
                return this._get({
                    key: `REACT_APP_SEPOLIA_NODE_URL`,
                    fallback: `https://sepolia.infura.io/v3/d6b88b54f02148b5b7e56c0c85364a3d`,
                });
        }
    };
}