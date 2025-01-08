import { useChainId } from "wagmi";
import { useMemo } from "react";
import { StakingSMAService } from "../services/blockchains/StakingSMAService";
import { Staking } from "../constants/abis";
import { Interface } from "ethers";
const ADDRESS_SMA = '0x6c35a1F5db9d41Bd448c092Ab0a3Db2f66177Ea7';

export const useStakingSMAService = () => {
    const chainId = useChainId();
    const ABI = getABIByChainId(chainId);

    return useMemo(() => {
        if (!chainId) return null;
        return new StakingSMAService(ADDRESS_SMA, ABI, chainId);
    }, [ADDRESS_SMA, ABI, chainId]);
};

const getABIByChainId = (chainId: number) => {
    // get ABI by ChainId
    return new Interface(Staking);
  };