import { VaultTypes, NetworkTypes, StrategyRiskLevel } from '@stores/v3/types';

/**
 * Liquid V3 Constants for Lux Networks
 *
 * Supports:
 * - LUX Network (xLUX, xETH, xUSD)
 * - Zoo Network (xZOO)
 * - Hanzo Network (xAI)
 * - Pars Network (xPARS)
 */

// V3 Protocol constants
export const V3_MIN_COLLATERALIZATION = 1.1111; // 90% LTV (100/90)
export const V3_GLOBAL_MIN_COLLATERALIZATION = 1.15;
export const V3_COLLATERALIZATION_LOWER_BOUND = 1.05;
export const V3_BLOCKS_PER_YEAR = 15_768_000; // ~2s block time

// Transmuter defaults (in blocks)
export const V3_DEFAULT_TIME_TO_TRANSMUTE = 3_888_000; // ~90 days at 2s blocks
export const V3_DEFAULT_TRANSMUTATION_FEE = 0.005; // 0.5%
export const V3_DEFAULT_EXIT_FEE = 0.02; // 2%

/**
 * V3 Vault Constants - Lux Networks
 */
export const VaultConstantsV3 = {
  [VaultTypes.xLUX]: {
    alchemistContractSelector: 'AlchemistV3_xLUX',
    positionNFTSelector: 'AlchemistV3Position_xLUX',
    transmuterSelector: 'RedeemerV3_LUX',
    mytVaultSelector: 'AlchemistETHVault_LUX',
    curatorSelector: 'AlchemistCurator_LUX',
    allocatorSelector: 'AlchemistAllocator_LUX',
    xToken: 'LiquidToken_xLUX',
    debtTokenSymbol: 'xLUX',
    underlyingSymbol: 'WLUX',
    maxLTV: 0.9, // 90%
  },
  [VaultTypes.xETH]: {
    alchemistContractSelector: 'AlchemistV3_xETH',
    positionNFTSelector: 'AlchemistV3Position_xETH',
    transmuterSelector: 'RedeemerV3_ETH',
    mytVaultSelector: 'AlchemistETHVault_ETH',
    curatorSelector: 'AlchemistCurator_ETH',
    allocatorSelector: 'AlchemistAllocator_ETH',
    xToken: 'LiquidToken_xETH',
    debtTokenSymbol: 'xETH',
    underlyingSymbol: 'WETH',
    maxLTV: 0.9,
  },
  [VaultTypes.xUSD]: {
    alchemistContractSelector: 'AlchemistV3_xUSD',
    positionNFTSelector: 'AlchemistV3Position_xUSD',
    transmuterSelector: 'RedeemerV3_USD',
    mytVaultSelector: 'AlchemistTokenVault_USD',
    curatorSelector: 'AlchemistCurator_USD',
    allocatorSelector: 'AlchemistAllocator_USD',
    xToken: 'LiquidToken_xUSD',
    debtTokenSymbol: 'xUSD',
    underlyingSymbol: 'USDC',
    maxLTV: 0.9,
  },
  [VaultTypes.xZOO]: {
    alchemistContractSelector: 'AlchemistV3_xZOO',
    positionNFTSelector: 'AlchemistV3Position_xZOO',
    transmuterSelector: 'RedeemerV3_ZOO',
    mytVaultSelector: 'AlchemistETHVault_ZOO',
    curatorSelector: 'AlchemistCurator_ZOO',
    allocatorSelector: 'AlchemistAllocator_ZOO',
    xToken: 'LiquidToken_xZOO',
    debtTokenSymbol: 'xZOO',
    underlyingSymbol: 'WZOO',
    maxLTV: 0.9,
  },
  [VaultTypes.xAI]: {
    alchemistContractSelector: 'AlchemistV3_xAI',
    positionNFTSelector: 'AlchemistV3Position_xAI',
    transmuterSelector: 'RedeemerV3_AI',
    mytVaultSelector: 'AlchemistETHVault_AI',
    curatorSelector: 'AlchemistCurator_AI',
    allocatorSelector: 'AlchemistAllocator_AI',
    xToken: 'LiquidToken_xAI',
    debtTokenSymbol: 'xAI',
    underlyingSymbol: 'WHANZO',
    maxLTV: 0.9,
  },
  [VaultTypes.xPARS]: {
    alchemistContractSelector: 'AlchemistV3_xPARS',
    positionNFTSelector: 'AlchemistV3Position_xPARS',
    transmuterSelector: 'RedeemerV3_PARS',
    mytVaultSelector: 'AlchemistETHVault_PARS',
    curatorSelector: 'AlchemistCurator_PARS',
    allocatorSelector: 'AlchemistAllocator_PARS',
    xToken: 'LiquidToken_xPARS',
    debtTokenSymbol: 'xPARS',
    underlyingSymbol: 'WPARS',
    maxLTV: 0.9,
  },
};

/**
 * V3 Transmuter Constants
 */
export const TransmuterConstantsV3 = {
  [VaultTypes.xLUX]: {
    transmuterContractSelectors: ['RedeemerV3_LUX'],
    fixedDuration: true,
    defaultDurationDays: 90,
  },
  [VaultTypes.xETH]: {
    transmuterContractSelectors: ['RedeemerV3_ETH'],
    fixedDuration: true,
    defaultDurationDays: 90,
  },
  [VaultTypes.xUSD]: {
    transmuterContractSelectors: ['RedeemerV3_USD'],
    fixedDuration: true,
    defaultDurationDays: 90,
  },
  [VaultTypes.xZOO]: {
    transmuterContractSelectors: ['RedeemerV3_ZOO'],
    fixedDuration: true,
    defaultDurationDays: 90,
  },
  [VaultTypes.xAI]: {
    transmuterContractSelectors: ['RedeemerV3_AI'],
    fixedDuration: true,
    defaultDurationDays: 90,
  },
  [VaultTypes.xPARS]: {
    transmuterContractSelectors: ['RedeemerV3_PARS'],
    fixedDuration: true,
    defaultDurationDays: 90,
  },
};

/**
 * MYT Strategy Configurations
 * These are the default yield strategies available for each vault type
 */
export const MYTStrategyConfigs = {
  [VaultTypes.xLUX]: {
    strategies: [
      {
        name: 'Lux Staking',
        symbol: 'stLUX',
        riskLevel: StrategyRiskLevel.CONSERVATIVE,
        expectedApy: 5.0,
        description: 'Native Lux staking rewards',
      },
    ],
  },
  [VaultTypes.xETH]: {
    strategies: [
      {
        name: 'Lido stETH',
        symbol: 'wstETH',
        riskLevel: StrategyRiskLevel.CONSERVATIVE,
        expectedApy: 4.0,
        description: 'Liquid staking via Lido',
      },
      {
        name: 'Rocket Pool',
        symbol: 'rETH',
        riskLevel: StrategyRiskLevel.CONSERVATIVE,
        expectedApy: 3.5,
        description: 'Decentralized ETH staking',
      },
      {
        name: 'Frax sfrxETH',
        symbol: 'sfrxETH',
        riskLevel: StrategyRiskLevel.MODERATE,
        expectedApy: 5.0,
        description: 'Frax liquid staking',
      },
      {
        name: 'EigenLayer EETH',
        symbol: 'eETH',
        riskLevel: StrategyRiskLevel.MODERATE,
        expectedApy: 6.0,
        description: 'EigenLayer restaking',
      },
      {
        name: 'Tokemak Auto ETH',
        symbol: 'tokeETH',
        riskLevel: StrategyRiskLevel.AGGRESSIVE,
        expectedApy: 8.0,
        description: 'Tokemak yield optimization',
      },
    ],
  },
  [VaultTypes.xUSD]: {
    strategies: [
      {
        name: 'AAVE USDC',
        symbol: 'aUSDC',
        riskLevel: StrategyRiskLevel.CONSERVATIVE,
        expectedApy: 3.0,
        description: 'AAVE lending',
      },
      {
        name: 'Yearn USDC',
        symbol: 'yvUSDC',
        riskLevel: StrategyRiskLevel.MODERATE,
        expectedApy: 5.0,
        description: 'Yearn yield aggregation',
      },
      {
        name: 'Morpho USDC',
        symbol: 'mUSDC',
        riskLevel: StrategyRiskLevel.MODERATE,
        expectedApy: 6.0,
        description: 'Morpho optimized lending',
      },
    ],
  },
  [VaultTypes.xZOO]: {
    strategies: [
      {
        name: 'Zoo Staking',
        symbol: 'stZOO',
        riskLevel: StrategyRiskLevel.CONSERVATIVE,
        expectedApy: 8.0,
        description: 'Native Zoo network staking',
      },
    ],
  },
  [VaultTypes.xAI]: {
    strategies: [
      {
        name: 'Hanzo AI Compute',
        symbol: 'stAI',
        riskLevel: StrategyRiskLevel.MODERATE,
        expectedApy: 12.0,
        description: 'AI compute staking rewards',
      },
    ],
  },
  [VaultTypes.xPARS]: {
    strategies: [
      {
        name: 'Pars Staking',
        symbol: 'stPARS',
        riskLevel: StrategyRiskLevel.CONSERVATIVE,
        expectedApy: 6.0,
        description: 'Native Pars network staking',
      },
    ],
  },
};

/**
 * Transmuter Name Aliases (V3)
 */
export const TransmuterNameAliasesV3 = {
  lux: 'Hermes',
  eth: 'Van Helmont',
  usd: 'Ge Hong',
  zoo: 'Chimera',
  ai: 'Prometheus',
  pars: 'Zarathustra',
};

/**
 * Allowed vault types per network
 */
export const AllowedVaultTypesV3 = {
  [NetworkTypes.LUX_MAINNET]: [VaultTypes.xLUX, VaultTypes.xETH, VaultTypes.xUSD],
  [NetworkTypes.LUX_TESTNET]: [VaultTypes.xLUX, VaultTypes.xETH, VaultTypes.xUSD],
  [NetworkTypes.ZOO_MAINNET]: [VaultTypes.xZOO],
  [NetworkTypes.ZOO_TESTNET]: [VaultTypes.xZOO],
  [NetworkTypes.HANZO_MAINNET]: [VaultTypes.xAI],
  [NetworkTypes.HANZO_TESTNET]: [VaultTypes.xAI],
  [NetworkTypes.PARS_MAINNET]: [VaultTypes.xPARS],
  [NetworkTypes.PARS_TESTNET]: [VaultTypes.xPARS],
};

/**
 * Chain configurations for Lux Networks
 */
export const chainIdsV3 = [
  {
    id: '0x17871', // 96369
    legacyId: NetworkTypes.LUX_MAINNET,
    name: 'Lux Mainnet',
    icon: 'lux',
    abiPath: 'lux',
    rpcUrl: 'https://api.lux.network/ext/bc/C/rpc',
    wsUrl: 'wss://api.lux.network/ext/bc/C/ws',
    explorer: 'https://explore.lux.network/',
    token: {
      symbol: 'LUX',
      name: 'Lux',
      decimals: 18,
    },
    vaultTypes: [VaultTypes.xLUX, VaultTypes.xETH, VaultTypes.xUSD],
    isTestnet: false,
  },
  {
    id: '0x17870', // 96368
    legacyId: NetworkTypes.LUX_TESTNET,
    name: 'Lux Testnet',
    icon: 'lux',
    abiPath: 'lux-testnet',
    rpcUrl: 'https://api.testnet.lux.network/ext/bc/C/rpc',
    wsUrl: 'wss://api.testnet.lux.network/ext/bc/C/ws',
    explorer: 'https://explore.testnet.lux.network/',
    token: {
      symbol: 'LUX',
      name: 'Lux',
      decimals: 18,
    },
    vaultTypes: [VaultTypes.xLUX, VaultTypes.xETH, VaultTypes.xUSD],
    isTestnet: true,
  },
  {
    id: '0x30e38', // 200200
    legacyId: NetworkTypes.ZOO_MAINNET,
    name: 'Zoo Mainnet',
    icon: 'zoo',
    abiPath: 'zoo',
    rpcUrl: 'https://api.zoo.network/ext/bc/Zoo/rpc',
    wsUrl: 'wss://api.zoo.network/ext/bc/Zoo/ws',
    explorer: 'https://explore.zoo.network/',
    token: {
      symbol: 'ZOO',
      name: 'Zoo',
      decimals: 18,
    },
    vaultTypes: [VaultTypes.xZOO],
    isTestnet: false,
  },
  {
    id: '0x30e39', // 200201
    legacyId: NetworkTypes.ZOO_TESTNET,
    name: 'Zoo Testnet',
    icon: 'zoo',
    abiPath: 'zoo-testnet',
    rpcUrl: 'https://api.testnet.zoo.network/ext/bc/Zoo/rpc',
    wsUrl: 'wss://api.testnet.zoo.network/ext/bc/Zoo/ws',
    explorer: 'https://explore.testnet.zoo.network/',
    token: {
      symbol: 'ZOO',
      name: 'Zoo',
      decimals: 18,
    },
    vaultTypes: [VaultTypes.xZOO],
    isTestnet: true,
  },
  {
    id: '0x9063', // 36963
    legacyId: NetworkTypes.HANZO_MAINNET,
    name: 'Hanzo Mainnet',
    icon: 'hanzo',
    abiPath: 'hanzo',
    rpcUrl: 'https://api.hanzo.network/ext/bc/Hanzo/rpc',
    wsUrl: 'wss://api.hanzo.network/ext/bc/Hanzo/ws',
    explorer: 'https://explore.hanzo.network/',
    token: {
      symbol: 'HANZO',
      name: 'Hanzo',
      decimals: 18,
    },
    vaultTypes: [VaultTypes.xAI],
    isTestnet: false,
  },
  {
    id: '0x9062', // 36962
    legacyId: NetworkTypes.HANZO_TESTNET,
    name: 'Hanzo Testnet',
    icon: 'hanzo',
    abiPath: 'hanzo-testnet',
    rpcUrl: 'https://api.testnet.hanzo.network/ext/bc/Hanzo/rpc',
    wsUrl: 'wss://api.testnet.hanzo.network/ext/bc/Hanzo/ws',
    explorer: 'https://explore.testnet.hanzo.network/',
    token: {
      symbol: 'HANZO',
      name: 'Hanzo',
      decimals: 18,
    },
    vaultTypes: [VaultTypes.xAI],
    isTestnet: true,
  },
  {
    id: '0x46a7', // 18071
    legacyId: NetworkTypes.PARS_MAINNET,
    name: 'Pars Mainnet',
    icon: 'pars',
    abiPath: 'pars',
    rpcUrl: 'https://api.pars.network/ext/bc/Pars/rpc',
    wsUrl: 'wss://api.pars.network/ext/bc/Pars/ws',
    explorer: 'https://explore.pars.network/',
    token: {
      symbol: 'PARS',
      name: 'Pars',
      decimals: 18,
    },
    vaultTypes: [VaultTypes.xPARS],
    isTestnet: false,
  },
  {
    id: '0x46a8', // 18072
    legacyId: NetworkTypes.PARS_TESTNET,
    name: 'Pars Testnet',
    icon: 'pars',
    abiPath: 'pars-testnet',
    rpcUrl: 'https://api.testnet.pars.network/ext/bc/Pars/rpc',
    wsUrl: 'wss://api.testnet.pars.network/ext/bc/Pars/ws',
    explorer: 'https://explore.testnet.pars.network/',
    token: {
      symbol: 'PARS',
      name: 'Pars',
      decimals: 18,
    },
    vaultTypes: [VaultTypes.xPARS],
    isTestnet: true,
  },
];

/**
 * V3 Vault messages/warnings
 */
export const vaultMessagesV3 = [
  {
    vaultType: VaultTypes.xETH,
    level: 1, // Info
    message: 'Liquid V3 supports up to 90% LTV with MYT yield strategies.',
  },
];

/**
 * V3 Vault type infos with MYT configurations
 */
export const VaultTypesInfosV3 = {
  [VaultTypes.xLUX]: {
    name: 'xLUX',
    icon: './images/icons/xlux.svg',
    description: 'Multiplied LUX - self-repaying loans backed by LUX',
    maxLTV: 90,
    mytEnabled: true,
  },
  [VaultTypes.xETH]: {
    name: 'xETH',
    icon: './images/icons/xeth.svg',
    description: 'Multiplied ETH - self-repaying loans backed by ETH',
    maxLTV: 90,
    mytEnabled: true,
    strategies: ['wstETH', 'rETH', 'sfrxETH', 'eETH'],
  },
  [VaultTypes.xUSD]: {
    name: 'xUSD',
    icon: './images/icons/xusd.svg',
    description: 'Multiplied USD - self-repaying loans backed by stablecoins',
    maxLTV: 90,
    mytEnabled: true,
    strategies: ['aUSDC', 'yvUSDC', 'mUSDC'],
  },
  [VaultTypes.xZOO]: {
    name: 'xZOO',
    icon: './images/icons/xzoo.svg',
    description: 'Multiplied ZOO - self-repaying loans backed by ZOO',
    maxLTV: 90,
    mytEnabled: true,
  },
  [VaultTypes.xAI]: {
    name: 'xAI',
    icon: './images/icons/xai.svg',
    description: 'Multiplied AI - self-repaying loans backed by HANZO',
    maxLTV: 90,
    mytEnabled: true,
  },
  [VaultTypes.xPARS]: {
    name: 'xPARS',
    icon: './images/icons/xpars.svg',
    description: 'Multiplied PARS - self-repaying loans backed by PARS',
    maxLTV: 90,
    mytEnabled: true,
  },
};

/**
 * Helper to get vault constants by type
 */
export const getVaultConstantsV3 = (vaultType: VaultTypes) => {
  return VaultConstantsV3[vaultType];
};

/**
 * Helper to get chain config by ID
 */
export const getChainConfigV3 = (chainId: string | number) => {
  const id = typeof chainId === 'number' ? `0x${chainId.toString(16)}` : chainId;
  return chainIdsV3.find((chain) => chain.id === id || chain.legacyId === Number(chainId));
};

/**
 * Helper to get allowed vault types for a network
 */
export const getAllowedVaultTypesForNetwork = (networkId: NetworkTypes): VaultTypes[] => {
  return AllowedVaultTypesV3[networkId] || [];
};
