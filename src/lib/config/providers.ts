import { JsonRpcProvider } from "ethers";
import { ChainId } from "../constants/chainId";
import { RPC } from "./rpc";
export class Providers {
    private static _providerCache = {} as Record<ChainId, JsonRpcProvider>;

    /**
     * Returns a provider url for a given network
     */
    public static getProviderUrl(chainId: ChainId) {
        const urls = RPC.getNodeUrls(chainId);
        if (!urls || urls.length === 0) {
            throw new Error(`No URLs found for chainId ${chainId}`);
        }
        const [url] = urls;
        return url;
    }

    /**
     * Returns a static provider for a given network
     */
    public static getStaticProvider(chainId: ChainId) {
        if (!this._providerCache[chainId])
            this._providerCache[chainId] = new JsonRpcProvider(this.getProviderUrl(chainId));

        return this._providerCache[chainId];
    }
}