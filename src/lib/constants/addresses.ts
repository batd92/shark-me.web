import { ChainId, SUPPORTED_CHAINS } from './chainId';
import { Address } from 'viem';

export type ContractAddresses = {
    COURSE: Address;
    USDT: Address;
    SMA: Address;
    STAKING: Address;
    VESTING: Address;
};

// BSC Mainnet
const BSC_MAINNET: ContractAddresses = {
    COURSE: '0x0000000000000000000000000000000000000000',
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    SMA: '0x0000000000000000000000000000000000000000',
    STAKING: '0x0000000000000000000000000000000000000000',
    VESTING: '0x0000000000000000000000000000000000000000'
};

// BSC Testnet
const BSC_TESTNET: ContractAddresses = {
    COURSE: '0x0000000000000000000000000000000000000000',
    USDT: '0x0000000000000000000000000000000000000000',
    SMA: '0x0000000000000000000000000000000000000000',
    STAKING: '0x0000000000000000000000000000000000000000',
    VESTING: '0x0000000000000000000000000000000000000000'
};

// Sepolia Testnet
const SEPOLIA: ContractAddresses = {
    COURSE: '0x0000000000000000000000000000000000000000',
    USDT: '0x0000000000000000000000000000000000000000',
    SMA: '0x0000000000000000000000000000000000000000',
    STAKING: '0x0000000000000000000000000000000000000000',
    VESTING: '0x0000000000000000000000000000000000000000'
};

// Map chain IDs
const CONTRACT_ADDRESSES: { [chainId: number]: ContractAddresses } = {
    [ChainId.BSC_MAINNET]: BSC_MAINNET,
    [ChainId.BSC_TESTNET]: BSC_TESTNET,
    [ChainId.SEPOLIA]: SEPOLIA,
};

// Default addresses
const DEFAULT_ADDRESSES: ContractAddresses = {
    COURSE: '0x0000000000000000000000000000000000000000',
    USDT: '0x0000000000000000000000000000000000000000',
    SMA: '0x0000000000000000000000000000000000000000',
    STAKING: '0x0000000000000000000000000000000000000000',
    VESTING: '0x0000000000000000000000000000000000000000'
};

/**
 * Get contract addresses for a specific chain ID
 * @param chainId The chain ID to get addresses for
 * @returns Contract addresses for the specified chain or default addresses
 */
export function getAddressForChain(chainId: number | undefined): ContractAddresses {
    if (!chainId) {
        console.warn('No chainId provided, using default addresses');
        return DEFAULT_ADDRESSES;
    }

    if (!SUPPORTED_CHAINS.includes(chainId)) {
        console.warn(`Chain ID ${chainId} is not supported. Using default addresses`);
        return DEFAULT_ADDRESSES;
    }

    return CONTRACT_ADDRESSES[chainId] || DEFAULT_ADDRESSES;
}

export const ADDRESSES = {
    BSC_MAINNET,
    BSC_TESTNET,
    SEPOLIA,
    DEFAULT: DEFAULT_ADDRESSES
} as const;