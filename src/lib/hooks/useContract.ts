import { Contract, Interface } from "ethers";
import { ChainId, defaultChainId } from "../constants/chainId";
import { Providers } from "../config/providers";
import { useMemo } from "react";

// new smart contract by address and chainId
export const createStaticContract = <TContract extends Contract = Contract>(ABI: Interface) => {
    return (address: string, chainId: ChainId) => {
        const provider = Providers.getStaticProvider(chainId);
        return useMemo(() => new Contract(address, ABI, provider) as TContract, [address, provider]);
    };
};