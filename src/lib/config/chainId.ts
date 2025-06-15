/**
 * Chain IDs for different networks
 */
export enum ChainId {
  // Ethereum
  ETHEREUM = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  SEPOLIA = 11155111,
  GÖRLI = 5,
  KOVAN = 42,

  // BSC
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,

  // Polygon
  MATIC = 137,
  MATIC_TESTNET = 80001,

  // Other networks
  FANTOM = 250,
  FANTOM_TESTNET = 4002,
  XDAI = 100,
  ARBITRUM = 42161,
  ARBITRUM_TESTNET = 421613,
  AVALANCHE = 43114,
  AVALANCHE_TESTNET = 43113,
  HECO = 128,
  HECO_TESTNET = 256,
  HARMONY = 1666600000,
  HARMONY_TESTNET = 1666700000,
  OKEX = 66,
  OKEX_TESTNET = 65,
  CELO = 42220,
  PALM = 11297108109,
  PALM_TESTNET = 11297108099,
  MOONRIVER = 1285,
  MOONBEAM = 1284,
  MOONBEAM_TESTNET = 1287,
  FUSE = 122,
  TELOS = 40,
  HARDHAT = 31337,
}

/**
 * Default chain ID based on environment
 */
export const DEFAULT_CHAIN_ID =
  process.env.NEXT_PUBLIC_APP_ENV === 'production'
    ? ChainId.BSC_MAINNET
    : ChainId.BSC_TESTNET;

/**
 * Get chain name by ID
 * @param chainId Chain ID
 * @returns Chain name
 */
export const getChainName = (chainId: number): string => {
  const chainName = Object.entries(ChainId).find(([_, value]) => value === chainId);
  return chainName ? chainName[0] : `Unknown (${chainId})`;
};

// Re-export from chains.ts to avoid circular dependencies
export type { ChainConfig } from './chains';