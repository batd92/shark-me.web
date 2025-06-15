import { ChainId } from '../config/chainId';
import { Address } from 'viem';

export type ContractAddresses = {
    [key: string]: Address;
};

export const CONTRACT_NAMES = {
    SMA: 'SMA',
    STAKING: 'STAKING',
    VESTING: 'VESTING',
    USDT: 'USDT',
    COURSE: 'COURSE',
} as const;

const CONTRACT_ADDRESSES: Record<number, ContractAddresses> = {
    [ChainId.BSC_MAINNET]: {
        [CONTRACT_NAMES.SMA]: '0x...',
        [CONTRACT_NAMES.STAKING]: '0x...',
        [CONTRACT_NAMES.VESTING]: '0x...',
        [CONTRACT_NAMES.USDT]: '0x55d398326f99059fF775485246999027B3197955',
        [CONTRACT_NAMES.COURSE]: '0x...',
    },
    [ChainId.BSC_TESTNET]: {
        [CONTRACT_NAMES.SMA]: '0x...',
        [CONTRACT_NAMES.STAKING]: '0x...',
        [CONTRACT_NAMES.VESTING]: '0x...',
        [CONTRACT_NAMES.USDT]: '0x...',
        [CONTRACT_NAMES.COURSE]: '0x...',
    },
};

export const getAddressForChain = (chainId?: number): ContractAddresses => {
    if (!chainId || !CONTRACT_ADDRESSES[chainId]) {
        return CONTRACT_ADDRESSES[ChainId.BSC_TESTNET];
    }
    return CONTRACT_ADDRESSES[chainId];
};

export const getContractAddress = (chainId: number, contractName: string): Address => {
    const addresses = getAddressForChain(chainId);
    const address = addresses[contractName];
    if (!address) {
        throw new Error(`No address found for ${contractName} on chain ${chainId}`);
    }
    return address;
};