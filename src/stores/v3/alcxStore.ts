import { writable, derived } from 'svelte/store';
import type { ethers, providers } from 'ethers';
import type {
  VaultTypes,
  BalanceType,
  VaultsV3Type,
  TokensV3Type,
  TransmutersV3Type,
  AdaptersV3Type,
  PositionNFTType,
  TransmuterPositionType,
  MYTStrategyType,
  ProtocolStatsV3,
  FarmStoreType,
  TokenPriceType,
} from '@stores/v3/types';

/**
 * Liquid V3 Svelte Stores
 *
 * Core state management for the V3 protocol with:
 * - NFT-based position tracking
 * - MYT strategy management
 * - Fixed-duration transmuter positions
 * - Multi-network support (Lux, Zoo, Hanzo)
 */

// ============================================
// Core Account Stores
// ============================================

/** Connected wallet address */
export const addressStore = writable<string | undefined>(undefined);

/** Web3 provider instance */
export const providerStore = writable<providers.Web3Provider | undefined>(undefined);

/** Current network ID (hex string) */
export const networkStore = writable<string | undefined>(undefined);

/** User's token balances */
export const balancesStore = writable<BalanceType[]>([]);

// ============================================
// V3 Position NFT Stores
// ============================================

/** User's position NFTs across all vault types */
export const positionsStore = writable<PositionNFTType[]>([]);

/** Currently selected position NFT tokenId */
export const selectedPositionStore = writable<ethers.BigNumber | undefined>(undefined);

// ============================================
// V3 Vault Stores
// ============================================

/** Vault state by vault type */
export const vaultsStore = writable<VaultsV3Type>({});

/** Registered yield and underlying tokens */
export const tokensStore = writable<TokensV3Type>({});

/** Adapter state (yield token pricing) */
export const adaptersStore = writable<AdaptersV3Type>({});

// ============================================
// V3 MYT Strategy Stores
// ============================================

/** Available MYT strategies */
export const strategiesStore = writable<MYTStrategyType[]>([]);

/** User's strategy allocations */
export const userStrategyAllocationsStore = writable<{ [strategyAddress: string]: ethers.BigNumber }>({});

// ============================================
// V3 Transmuter Stores
// ============================================

/** Transmuter state by vault type */
export const transmutersStore = writable<TransmutersV3Type>({});

/** User's transmuter staking positions */
export const transmuterPositionsStore = writable<TransmuterPositionType[]>([]);

// ============================================
// Protocol Stats Store
// ============================================

/** Global protocol statistics */
export const protocolStatsStore = writable<ProtocolStatsV3 | undefined>(undefined);

// ============================================
// Farm & Governance Stores
// ============================================

/** Farm positions */
export const farmsStore = writable<FarmStoreType[]>([]);

/** Token prices */
export const tokenPriceStore = writable<TokenPriceType>({});

// ============================================
// UI State Stores
// ============================================

/** Sentinel (admin) access flag */
export const sentinelStore = writable<boolean>(false);

/** Controller addresses for admin */
export const controllerStore = writable<string[]>([]);

// ============================================
// Loading State Stores
// ============================================

/** Global loading state */
export const isLoadingStore = writable<boolean>(false);

/** Loading state per module */
export const loadingStatesStore = writable<{
  vaults: boolean;
  transmuters: boolean;
  positions: boolean;
  strategies: boolean;
  balances: boolean;
}>({
  vaults: false,
  transmuters: false,
  positions: false,
  strategies: false,
  balances: false,
});

// ============================================
// Derived Stores
// ============================================

/** Total debt across all vault types */
export const totalDebtStore = derived(vaultsStore, ($vaults) => {
  let total = ethers.BigNumber.from(0);
  for (const vaultType in $vaults) {
    if ($vaults[vaultType]?.debt) {
      total = total.add($vaults[vaultType].debt);
    }
  }
  return total;
});

/** Total collateral value across all positions */
export const totalCollateralStore = derived(positionsStore, ($positions) => {
  let total = ethers.BigNumber.from(0);
  for (const position of $positions) {
    if (position.collateral) {
      total = total.add(position.collateral);
    }
  }
  return total;
});

/** User's average health factor */
export const avgHealthFactorStore = derived(positionsStore, ($positions) => {
  if ($positions.length === 0) return ethers.BigNumber.from(0);

  let totalHealth = ethers.BigNumber.from(0);
  let count = 0;

  for (const position of $positions) {
    if (position.healthFactor && position.healthFactor.gt(0)) {
      totalHealth = totalHealth.add(position.healthFactor);
      count++;
    }
  }

  return count > 0 ? totalHealth.div(count) : ethers.BigNumber.from(0);
});

/** Total earmarked debt across all vault types */
export const totalEarmarkedStore = derived(vaultsStore, ($vaults) => {
  let total = ethers.BigNumber.from(0);
  for (const vaultType in $vaults) {
    if ($vaults[vaultType]?.earmarked) {
      total = total.add($vaults[vaultType].earmarked);
    }
  }
  return total;
});

/** Pending transmuter redemptions */
export const pendingRedemptionsStore = derived(transmuterPositionsStore, ($positions) => {
  return $positions.filter((p) => !p.isMatured);
});

/** Matured transmuter redemptions ready to claim */
export const maturedRedemptionsStore = derived(transmuterPositionsStore, ($positions) => {
  return $positions.filter((p) => p.isMatured);
});

/** Active MYT strategies */
export const activeStrategiesStore = derived(strategiesStore, ($strategies) => {
  return $strategies.filter((s) => s.isActive);
});

/** Total value locked in strategies */
export const totalStrategyTVLStore = derived(strategiesStore, ($strategies) => {
  let total = ethers.BigNumber.from(0);
  for (const strategy of $strategies) {
    if (strategy.tvl) {
      total = total.add(strategy.tvl);
    }
  }
  return total;
});

// ============================================
// Store Reset Functions
// ============================================

/** Reset all stores to initial state */
export const resetAllStores = () => {
  addressStore.set(undefined);
  providerStore.set(undefined);
  networkStore.set(undefined);
  balancesStore.set([]);
  positionsStore.set([]);
  selectedPositionStore.set(undefined);
  vaultsStore.set({});
  tokensStore.set({});
  adaptersStore.set({});
  strategiesStore.set([]);
  userStrategyAllocationsStore.set({});
  transmutersStore.set({});
  transmuterPositionsStore.set([]);
  protocolStatsStore.set(undefined);
  farmsStore.set([]);
  tokenPriceStore.set({});
  sentinelStore.set(false);
  controllerStore.set([]);
  isLoadingStore.set(false);
  loadingStatesStore.set({
    vaults: false,
    transmuters: false,
    positions: false,
    strategies: false,
    balances: false,
  });
};

/** Reset stores on network change */
export const resetOnNetworkChange = () => {
  balancesStore.set([]);
  positionsStore.set([]);
  selectedPositionStore.set(undefined);
  vaultsStore.set({});
  transmutersStore.set({});
  transmuterPositionsStore.set([]);
  strategiesStore.set([]);
  userStrategyAllocationsStore.set({});
  protocolStatsStore.set(undefined);
};

// ============================================
// Store Update Utilities
// ============================================

/** Update loading state for a specific module */
export const setLoadingState = (module: keyof typeof loadingStatesStore, isLoading: boolean) => {
  loadingStatesStore.update((states) => ({
    ...states,
    [module]: isLoading,
  }));
};

/** Add a position NFT to the store */
export const addPosition = (position: PositionNFTType) => {
  positionsStore.update((positions) => {
    const existing = positions.findIndex((p) => p.tokenId.eq(position.tokenId));
    if (existing >= 0) {
      positions[existing] = position;
      return [...positions];
    }
    return [...positions, position];
  });
};

/** Remove a position NFT from the store */
export const removePosition = (tokenId: ethers.BigNumber) => {
  positionsStore.update((positions) => positions.filter((p) => !p.tokenId.eq(tokenId)));
};

/** Update vault state for a specific vault type */
export const updateVaultState = (vaultType: VaultTypes, state: Partial<VaultsV3Type[number]>) => {
  vaultsStore.update((vaults) => ({
    ...vaults,
    [vaultType]: {
      ...vaults[vaultType],
      ...state,
    },
  }));
};

/** Add a transmuter position */
export const addTransmuterPosition = (position: TransmuterPositionType) => {
  transmuterPositionsStore.update((positions) => {
    const existing = positions.findIndex((p) => p.id.eq(position.id));
    if (existing >= 0) {
      positions[existing] = position;
      return [...positions];
    }
    return [...positions, position];
  });
};

/** Update strategy state */
export const updateStrategy = (address: string, update: Partial<MYTStrategyType>) => {
  strategiesStore.update((strategies) => {
    const idx = strategies.findIndex((s) => s.address === address);
    if (idx >= 0) {
      strategies[idx] = { ...strategies[idx], ...update };
      return [...strategies];
    }
    return strategies;
  });
};

// Import ethers for BigNumber usage
import { ethers } from 'ethers';
