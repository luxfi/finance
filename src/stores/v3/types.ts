import type { ethers } from 'ethers';

/**
 * Liquid V3 Type Definitions
 *
 * Key changes from V2:
 * - NFT-based position management (tokenId instead of address)
 * - Earmarking system for debt tracking
 * - Fixed-duration transmuter with staking positions
 * - MYT (Mix-Yield Token) strategies
 * - 90% LTV (up from 50%)
 */

export enum VaultTypes {
  xLUX = 0,   // Lux native
  xETH = 1,   // ETH-denominated
  xUSD = 2,   // USD-denominated
  xZOO = 3,   // Zoo native
  xAI = 4,    // Hanzo AI native
  xPARS = 5,  // Pars native
}

export enum NetworkTypes {
  LUX_MAINNET = 96369,
  LUX_TESTNET = 96368,
  ZOO_MAINNET = 200200,
  ZOO_TESTNET = 200201,
  HANZO_MAINNET = 36963,
  HANZO_TESTNET = 36962,
  PARS_MAINNET = 18071,
  PARS_TESTNET = 18072,
}

export enum StrategyRiskLevel {
  CONSERVATIVE = 0,
  MODERATE = 1,
  AGGRESSIVE = 2,
}

export enum FarmTypes {
  INTERNAL = 0,
  SUSHI = 1,
  CRV = 2,
  MYT = 3, // New: Mix-Yield Token strategies
}

export enum FarmStatus {
  Active = 0,
  Retired = 1,
}

/**
 * V3 CDP (Collateralized Debt Position)
 * Now identified by NFT tokenId instead of address
 */
export interface CDPV3Type {
  tokenId: ethers.BigNumber;
  owner: string;
  collateralBalance: ethers.BigNumber;
  debt: ethers.BigNumber;
  earmarked: ethers.BigNumber;
  freeCollateral: ethers.BigNumber;
  lastMintBlock: ethers.BigNumber;
}

/**
 * V3 Position NFT metadata
 */
export interface PositionNFTType {
  tokenId: ethers.BigNumber;
  owner: string;
  uri: string;
  collateral: ethers.BigNumber;
  debt: ethers.BigNumber;
  earmarked: ethers.BigNumber;
  healthFactor: ethers.BigNumber;
}

/**
 * V3 Transmuter Staking Position
 * Fixed-duration redemptions
 */
export interface TransmuterPositionType {
  id: ethers.BigNumber;
  owner: string;
  amount: ethers.BigNumber;
  startBlock: ethers.BigNumber;
  maturationBlock: ethers.BigNumber;
  isMatured: boolean;
  estimatedMaturationDate: Date;
}

/**
 * V3 Transmuter state
 */
export interface TransmuterV3Type {
  type: VaultTypes;
  contractAddress: string;
  alchemistAddress: string;
  syntheticToken: string;
  totalLocked: ethers.BigNumber;
  timeToTransmute: ethers.BigNumber;
  transmutationFee: ethers.BigNumber;
  exitFee: ethers.BigNumber;
  depositCap: ethers.BigNumber;
  userPositions: TransmuterPositionType[];
}

/**
 * MYT Strategy
 */
export interface MYTStrategyType {
  address: string;
  name: string;
  symbol: string;
  underlyingToken: string;
  yieldToken: string;
  tvl: ethers.BigNumber;
  apy: number;
  riskLevel: StrategyRiskLevel;
  isActive: boolean;
  allocation: ethers.BigNumber; // Percentage of MYT allocated to this strategy
}

/**
 * V3 Vault Body (individual yield position)
 */
export interface BodyVaultV3Type {
  type: VaultTypes;
  address: string;
  tokenId: ethers.BigNumber; // NFT position ID
  balance: ethers.BigNumber;
  yieldPerShare: ethers.BigNumber;
  underlyingAddress: string;
  underlyingPerShare: ethers.BigNumber;
  yieldAmount: ethers.BigNumber;
  underlyingAmount: ethers.BigNumber;
  tvl: ethers.BigNumber;
  apy: number;
  debtToken: string;
  strategies: MYTStrategyType[]; // MYT strategies
}

/**
 * V3 Vault state (account-level)
 */
export interface VaultsV3Type {
  [key: number]: {
    debt: ethers.BigNumber;
    maxDebt: ethers.BigNumber;
    earmarked: ethers.BigNumber;
    freeCollateral: ethers.BigNumber;
    ratio: ethers.BigNumber;
    debtTokenAddress: string;
    positions: PositionNFTType[];
    vaultBody: BodyVaultV3Type[];
  };
}

/**
 * V3 Tokens registry
 */
export interface TokensV3Type {
  [key: number]: {
    yieldTokens: string[];
    underlyingTokens: string[];
    mytToken: string; // Mix-Yield Token address
  };
}

/**
 * V3 Adapter state
 */
export interface AdapterV3Type {
  type: VaultTypes;
  contractSelector: string;
  yieldToken: string;
  price: ethers.BigNumber;
  strategy: MYTStrategyType;
}

/**
 * V3 Transmuters collection
 */
export interface TransmutersV3Type {
  [key: number]: {
    transmuters: TransmuterV3Type[];
  };
}

/**
 * V3 Adapters collection
 */
export interface AdaptersV3Type {
  [key: number]: {
    adapters: AdapterV3Type[];
  };
}

/**
 * Balance type (unchanged from V2)
 */
export type BalanceType = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: ethers.BigNumber;
};

/**
 * Token price type
 */
export interface TokenPriceType {
  [address: string]: {
    symbol: string;
    address: string;
    price: ethers.BigNumber;
  };
}

/**
 * Farm store type
 */
export interface FarmStoreType {
  type: FarmTypes;
  body: any;
}

/**
 * V3 Alchemist initialization params (for reference)
 */
export interface AlchemistV3InitParams {
  admin: string;
  debtToken: string;
  underlyingToken: string;
  yieldToken: string;
  depositCap: ethers.BigNumber;
  blocksPerYear: ethers.BigNumber;
  minimumCollateralization: ethers.BigNumber;
  globalMinimumCollateralization: ethers.BigNumber;
  collateralizationLowerBound: ethers.BigNumber;
  tokenAdapter: string;
  transmuter: string;
  protocolFee: ethers.BigNumber;
  protocolFeeReceiver: string;
  liquidatorFee: ethers.BigNumber;
  repaymentFee: ethers.BigNumber;
}

/**
 * V3 Protocol stats
 */
export interface ProtocolStatsV3 {
  totalDeposited: ethers.BigNumber;
  totalDebt: ethers.BigNumber;
  totalSyntheticsIssued: ethers.BigNumber;
  depositCap: ethers.BigNumber;
  utilizationRate: number;
  globalCollateralization: ethers.BigNumber;
}

// Type casting utilities
export const castToMYTStrategy = (strategy: any): MYTStrategyType => {
  return strategy as MYTStrategyType;
};

export const castToTransmuterPosition = (position: any): TransmuterPositionType => {
  return position as TransmuterPositionType;
};

export const castToPositionNFT = (position: any): PositionNFTType => {
  return position as PositionNFTType;
};

export const castToCDP = (cdp: any): CDPV3Type => {
  return cdp as CDPV3Type;
};
