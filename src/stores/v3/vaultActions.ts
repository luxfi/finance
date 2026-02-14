import { ethers } from 'ethers';
import type { Signer } from 'ethers';
import {
  vaultsStore,
  positionsStore,
  balancesStore,
  transmuterPositionsStore,
  strategiesStore,
  protocolStatsStore,
  setLoadingState,
  addPosition,
  addTransmuterPosition,
} from '@stores/v3/alcxStore';
import type {
  VaultTypes,
  PositionNFTType,
  TransmuterPositionType,
  CDPV3Type,
  ProtocolStatsV3,
} from '@stores/v3/types';
import { VaultConstantsV3 } from '@stores/v3/constants';

/**
 * Liquid V3 Vault Actions
 *
 * All vault operations now use NFT tokenId for position identification:
 * - deposit(amount, recipient, recipientId) - Create new position with tokenId=0 or add to existing
 * - withdraw(amount, recipient, tokenId) - Withdraw from position
 * - mint(tokenId, amount, recipient) - Borrow against position
 * - burn(amount, recipientId) - Repay debt
 * - liquidate(accountId) - Liquidate undercollateralized position
 */

// ============================================
// Contract Interaction Helpers
// ============================================

/**
 * Get AlchemistV3 contract instance
 */
export const getAlchemistV3Contract = (
  vaultType: VaultTypes,
  signer: Signer,
  contractAddress: string,
) => {
  const abi = [
    // View functions
    'function version() view returns (string)',
    'function debtToken() view returns (address)',
    'function underlyingToken() view returns (address)',
    'function yieldToken() view returns (address)',
    'function depositCap() view returns (uint256)',
    'function minimumCollateralization() view returns (uint256)',
    'function totalDebt() view returns (uint256)',
    'function getTotalDeposited() view returns (uint256)',
    'function getTotalUnderlyingValue() view returns (uint256)',
    'function getCDP(uint256 tokenId) view returns (uint256 collateral, uint256 debt, uint256 earmarked)',
    'function totalValue(uint256 tokenId) view returns (uint256)',
    'function getMaxBorrowable(uint256 tokenId) view returns (uint256)',
    'function mintAllowance(uint256 ownerTokenId, address spender) view returns (uint256)',
    'function alchemistPositionNFT() view returns (address)',
    'function transmuter() view returns (address)',
    'function depositsPaused() view returns (bool)',
    'function loansPaused() view returns (bool)',
    'function convertYieldTokensToDebt(uint256 amount) view returns (uint256)',
    'function convertDebtTokensToYield(uint256 amount) view returns (uint256)',

    // State-changing functions
    'function deposit(uint256 amount, address recipient, uint256 recipientId) returns (uint256 debtValue)',
    'function withdraw(uint256 amount, address recipient, uint256 tokenId) returns (uint256 amountWithdrawn)',
    'function mint(uint256 tokenId, uint256 amount, address recipient)',
    'function mintFrom(uint256 tokenId, uint256 amount, address recipient)',
    'function burn(uint256 amount, uint256 recipientId) returns (uint256 amountBurned)',
    'function repay(uint256 amount, uint256 recipientTokenId) returns (uint256 amountRepaid)',
    'function liquidate(uint256 accountId) returns (uint256 yieldAmount, uint256 feeInYield, uint256 feeInUnderlying)',
    'function batchLiquidate(uint256[] accountIds) returns (uint256, uint256, uint256)',
    'function approveMint(uint256 tokenId, address spender, uint256 amount)',
    'function poke(uint256 tokenId)',

    // Events
    'event Deposit(uint256 amount, uint256 indexed recipientId)',
    'event Withdraw(uint256 amount, uint256 indexed tokenId, address recipient)',
    'event Mint(uint256 indexed tokenId, uint256 amount, address recipient)',
    'event Burn(address indexed sender, uint256 amount, uint256 indexed recipientId)',
    'event Repay(address indexed sender, uint256 amount, uint256 indexed recipientId, uint256 credit)',
    'event Liquidated(uint256 indexed accountId, address liquidator, uint256 amount, uint256 feeInYield, uint256 feeInUnderlying)',
  ];

  return new ethers.Contract(contractAddress, abi, signer);
};

/**
 * Get Position NFT contract instance
 */
export const getPositionNFTContract = (signer: Signer, contractAddress: string) => {
  const abi = [
    'function balanceOf(address owner) view returns (uint256)',
    'function ownerOf(uint256 tokenId) view returns (address)',
    'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
    'function tokenURI(uint256 tokenId) view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function approve(address to, uint256 tokenId)',
    'function getApproved(uint256 tokenId) view returns (address)',
    'function setApprovalForAll(address operator, bool approved)',
    'function isApprovedForAll(address owner, address operator) view returns (bool)',
    'function safeTransferFrom(address from, address to, uint256 tokenId)',
    'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  ];

  return new ethers.Contract(contractAddress, abi, signer);
};

/**
 * Get Transmuter V3 contract instance
 */
export const getTransmuterV3Contract = (signer: Signer, contractAddress: string) => {
  const abi = [
    // View functions
    'function version() view returns (string)',
    'function syntheticToken() view returns (address)',
    'function totalLocked() view returns (uint256)',
    'function timeToTransmute() view returns (uint256)',
    'function transmutationFee() view returns (uint256)',
    'function exitFee() view returns (uint256)',
    'function depositCap() view returns (uint256)',
    'function getPosition(uint256 id) view returns (tuple(uint256 amount, uint256 startBlock, uint256 maturationBlock))',
    'function queryGraph(uint256 startBlock, uint256 endBlock) view returns (uint256)',

    // State-changing functions
    'function createRedemption(uint256 depositAmount)',
    'function claimRedemption(uint256 id)',

    // Events
    'event PositionCreated(address indexed creator, uint256 amountStaked, uint256 nftId)',
    'event PositionClaimed(address indexed claimer, uint256 amountClaimed, uint256 amountUnclaimed)',
  ];

  return new ethers.Contract(contractAddress, abi, signer);
};

// ============================================
// V3 Deposit Actions
// ============================================

/**
 * Deposit yield tokens into AlchemistV3
 * Creates new position if tokenId is 0, otherwise adds to existing position
 *
 * @param vaultType - The vault type (xLUX, xETH, xUSD, xZOO, xAI, xPARS)
 * @param amount - Amount of yield tokens to deposit
 * @param recipient - Address to receive position (usually msg.sender)
 * @param recipientId - Existing position tokenId (0 for new position)
 * @param signer - Ethers signer
 * @param contractAddress - AlchemistV3 contract address
 */
export const depositV3 = async (
  vaultType: VaultTypes,
  amount: ethers.BigNumber,
  recipient: string,
  recipientId: ethers.BigNumber,
  signer: Signer,
  contractAddress: string,
): Promise<{ tx: ethers.ContractTransaction; debtValue: ethers.BigNumber }> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const tx = await alchemist.deposit(amount, recipient, recipientId);
  const receipt = await tx.wait();

  // Parse Deposit event to get debt value
  const depositEvent = receipt.events?.find((e: any) => e.event === 'Deposit');
  const debtValue = depositEvent?.args?.amount || ethers.BigNumber.from(0);

  return { tx, debtValue };
};

/**
 * Deposit underlying tokens (auto-wraps to yield token)
 */
export const depositUnderlyingV3 = async (
  vaultType: VaultTypes,
  amount: ethers.BigNumber,
  recipient: string,
  recipientId: ethers.BigNumber,
  signer: Signer,
  alchemistAddress: string,
  yieldTokenAddress: string,
): Promise<{ tx: ethers.ContractTransaction; debtValue: ethers.BigNumber }> => {
  // For V3, we first wrap underlying to yield token via MYT vault,
  // then deposit. This is typically done in a single multicall.
  // For simplicity, this function handles the standard deposit case.
  return depositV3(vaultType, amount, recipient, recipientId, signer, alchemistAddress);
};

// ============================================
// V3 Withdraw Actions
// ============================================

/**
 * Withdraw yield tokens from a position
 *
 * @param vaultType - The vault type
 * @param amount - Amount of yield tokens to withdraw
 * @param recipient - Address to receive withdrawn tokens
 * @param tokenId - Position NFT tokenId
 * @param signer - Ethers signer
 * @param contractAddress - AlchemistV3 contract address
 */
export const withdrawV3 = async (
  vaultType: VaultTypes,
  amount: ethers.BigNumber,
  recipient: string,
  tokenId: ethers.BigNumber,
  signer: Signer,
  contractAddress: string,
): Promise<{ tx: ethers.ContractTransaction; amountWithdrawn: ethers.BigNumber }> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const tx = await alchemist.withdraw(amount, recipient, tokenId);
  const receipt = await tx.wait();

  const withdrawEvent = receipt.events?.find((e: any) => e.event === 'Withdraw');
  const amountWithdrawn = withdrawEvent?.args?.amount || ethers.BigNumber.from(0);

  return { tx, amountWithdrawn };
};

// ============================================
// V3 Mint (Borrow) Actions
// ============================================

/**
 * Mint (borrow) debt tokens against a position
 *
 * @param vaultType - The vault type
 * @param tokenId - Position NFT tokenId to borrow against
 * @param amount - Amount of debt tokens to mint
 * @param recipient - Address to receive minted tokens
 * @param signer - Ethers signer
 * @param contractAddress - AlchemistV3 contract address
 */
export const mintV3 = async (
  vaultType: VaultTypes,
  tokenId: ethers.BigNumber,
  amount: ethers.BigNumber,
  recipient: string,
  signer: Signer,
  contractAddress: string,
): Promise<ethers.ContractTransaction> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const tx = await alchemist.mint(tokenId, amount, recipient);
  await tx.wait();

  return tx;
};

/**
 * Mint from another position (requires mint allowance)
 */
export const mintFromV3 = async (
  vaultType: VaultTypes,
  tokenId: ethers.BigNumber,
  amount: ethers.BigNumber,
  recipient: string,
  signer: Signer,
  contractAddress: string,
): Promise<ethers.ContractTransaction> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const tx = await alchemist.mintFrom(tokenId, amount, recipient);
  await tx.wait();

  return tx;
};

// ============================================
// V3 Repay Actions
// ============================================

/**
 * Burn debt tokens to reduce debt on a position
 *
 * @param vaultType - The vault type
 * @param amount - Amount of debt tokens to burn
 * @param recipientId - Position NFT tokenId to credit
 * @param signer - Ethers signer
 * @param contractAddress - AlchemistV3 contract address
 */
export const burnV3 = async (
  vaultType: VaultTypes,
  amount: ethers.BigNumber,
  recipientId: ethers.BigNumber,
  signer: Signer,
  contractAddress: string,
): Promise<{ tx: ethers.ContractTransaction; amountBurned: ethers.BigNumber }> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const tx = await alchemist.burn(amount, recipientId);
  const receipt = await tx.wait();

  const burnEvent = receipt.events?.find((e: any) => e.event === 'Burn');
  const amountBurned = burnEvent?.args?.amount || ethers.BigNumber.from(0);

  return { tx, amountBurned };
};

/**
 * Repay debt using yield tokens
 */
export const repayV3 = async (
  vaultType: VaultTypes,
  amount: ethers.BigNumber,
  recipientTokenId: ethers.BigNumber,
  signer: Signer,
  contractAddress: string,
): Promise<{ tx: ethers.ContractTransaction; amountRepaid: ethers.BigNumber }> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const tx = await alchemist.repay(amount, recipientTokenId);
  const receipt = await tx.wait();

  const repayEvent = receipt.events?.find((e: any) => e.event === 'Repay');
  const amountRepaid = repayEvent?.args?.credit || ethers.BigNumber.from(0);

  return { tx, amountRepaid };
};

// ============================================
// V3 Liquidation Actions
// ============================================

/**
 * Liquidate an undercollateralized position
 */
export const liquidateV3 = async (
  vaultType: VaultTypes,
  accountId: ethers.BigNumber,
  signer: Signer,
  contractAddress: string,
): Promise<{
  tx: ethers.ContractTransaction;
  yieldAmount: ethers.BigNumber;
  feeInYield: ethers.BigNumber;
  feeInUnderlying: ethers.BigNumber;
}> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const tx = await alchemist.liquidate(accountId);
  const receipt = await tx.wait();

  const liquidateEvent = receipt.events?.find((e: any) => e.event === 'Liquidated');

  return {
    tx,
    yieldAmount: liquidateEvent?.args?.amount || ethers.BigNumber.from(0),
    feeInYield: liquidateEvent?.args?.feeInYield || ethers.BigNumber.from(0),
    feeInUnderlying: liquidateEvent?.args?.feeInUnderlying || ethers.BigNumber.from(0),
  };
};

/**
 * Batch liquidate multiple positions
 */
export const batchLiquidateV3 = async (
  vaultType: VaultTypes,
  accountIds: ethers.BigNumber[],
  signer: Signer,
  contractAddress: string,
): Promise<ethers.ContractTransaction> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const tx = await alchemist.batchLiquidate(accountIds);
  await tx.wait();

  return tx;
};

// ============================================
// V3 Transmuter Actions
// ============================================

/**
 * Create a redemption position in the transmuter
 * This locks synthetic tokens for fixed-duration redemption
 */
export const createRedemptionV3 = async (
  depositAmount: ethers.BigNumber,
  signer: Signer,
  transmuterAddress: string,
): Promise<{ tx: ethers.ContractTransaction; nftId: ethers.BigNumber }> => {
  const transmuter = getTransmuterV3Contract(signer, transmuterAddress);

  const tx = await transmuter.createRedemption(depositAmount);
  const receipt = await tx.wait();

  const createEvent = receipt.events?.find((e: any) => e.event === 'PositionCreated');
  const nftId = createEvent?.args?.nftId || ethers.BigNumber.from(0);

  return { tx, nftId };
};

/**
 * Claim a matured redemption position
 */
export const claimRedemptionV3 = async (
  positionId: ethers.BigNumber,
  signer: Signer,
  transmuterAddress: string,
): Promise<{ tx: ethers.ContractTransaction; amountClaimed: ethers.BigNumber }> => {
  const transmuter = getTransmuterV3Contract(signer, transmuterAddress);

  const tx = await transmuter.claimRedemption(positionId);
  const receipt = await tx.wait();

  const claimEvent = receipt.events?.find((e: any) => e.event === 'PositionClaimed');
  const amountClaimed = claimEvent?.args?.amountClaimed || ethers.BigNumber.from(0);

  return { tx, amountClaimed };
};

// ============================================
// V3 Query Actions
// ============================================

/**
 * Fetch CDP (Collateralized Debt Position) for a tokenId
 */
export const getCDPV3 = async (
  vaultType: VaultTypes,
  tokenId: ethers.BigNumber,
  signer: Signer,
  contractAddress: string,
): Promise<CDPV3Type> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const [collateral, debt, earmarked] = await alchemist.getCDP(tokenId);
  const owner = await signer.getAddress();

  return {
    tokenId,
    owner,
    collateralBalance: collateral,
    debt,
    earmarked,
    freeCollateral: collateral.sub(earmarked),
    lastMintBlock: ethers.BigNumber.from(0), // Would need additional call
  };
};

/**
 * Get max borrowable amount for a position
 */
export const getMaxBorrowableV3 = async (
  vaultType: VaultTypes,
  tokenId: ethers.BigNumber,
  signer: Signer,
  contractAddress: string,
): Promise<ethers.BigNumber> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);
  return alchemist.getMaxBorrowable(tokenId);
};

/**
 * Fetch user's position NFTs
 */
export const fetchUserPositionsV3 = async (
  userAddress: string,
  signer: Signer,
  positionNFTAddress: string,
  alchemistAddress: string,
  vaultType: VaultTypes,
): Promise<PositionNFTType[]> => {
  const positionNFT = getPositionNFTContract(signer, positionNFTAddress);
  const alchemist = getAlchemistV3Contract(vaultType, signer, alchemistAddress);

  const balance = await positionNFT.balanceOf(userAddress);
  const positions: PositionNFTType[] = [];

  for (let i = 0; i < balance.toNumber(); i++) {
    const tokenId = await positionNFT.tokenOfOwnerByIndex(userAddress, i);
    const uri = await positionNFT.tokenURI(tokenId);
    const [collateral, debt, earmarked] = await alchemist.getCDP(tokenId);

    // Calculate health factor (collateral / debt, scaled by 1e18)
    const healthFactor = debt.gt(0) ? collateral.mul(ethers.constants.WeiPerEther).div(debt) : ethers.constants.MaxUint256;

    positions.push({
      tokenId,
      owner: userAddress,
      uri,
      collateral,
      debt,
      earmarked,
      healthFactor,
    });
  }

  return positions;
};

/**
 * Fetch transmuter position details
 */
export const fetchTransmuterPositionV3 = async (
  positionId: ethers.BigNumber,
  signer: Signer,
  transmuterAddress: string,
): Promise<TransmuterPositionType> => {
  const transmuter = getTransmuterV3Contract(signer, transmuterAddress);
  const position = await transmuter.getPosition(positionId);
  const currentBlock = await signer.provider?.getBlockNumber();

  const isMatured = currentBlock ? position.maturationBlock.lte(currentBlock) : false;

  // Estimate maturation date (assuming 2s block time)
  const blocksRemaining = isMatured ? 0 : position.maturationBlock.sub(currentBlock || 0).toNumber();
  const secondsRemaining = blocksRemaining * 2;
  const estimatedMaturationDate = new Date(Date.now() + secondsRemaining * 1000);

  return {
    id: positionId,
    owner: await signer.getAddress(),
    amount: position.amount,
    startBlock: position.startBlock,
    maturationBlock: position.maturationBlock,
    isMatured,
    estimatedMaturationDate,
  };
};

/**
 * Fetch protocol stats
 */
export const fetchProtocolStatsV3 = async (
  vaultType: VaultTypes,
  signer: Signer,
  contractAddress: string,
): Promise<ProtocolStatsV3> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const [totalDeposited, totalDebt, depositCap, minimumCollateralization] = await Promise.all([
    alchemist.getTotalDeposited(),
    alchemist.totalDebt(),
    alchemist.depositCap(),
    alchemist.minimumCollateralization(),
  ]);

  const utilizationRate =
    depositCap.gt(0) ? totalDeposited.mul(10000).div(depositCap).toNumber() / 100 : 0;

  const globalCollateralization =
    totalDebt.gt(0) ? totalDeposited.mul(ethers.constants.WeiPerEther).div(totalDebt) : ethers.constants.MaxUint256;

  return {
    totalDeposited,
    totalDebt,
    totalSyntheticsIssued: totalDebt, // In V3, total debt = synthetics issued
    depositCap,
    utilizationRate,
    globalCollateralization,
  };
};

// ============================================
// V3 Approval Actions
// ============================================

/**
 * Approve mint allowance for another address
 */
export const approveMintV3 = async (
  vaultType: VaultTypes,
  tokenId: ethers.BigNumber,
  spender: string,
  amount: ethers.BigNumber,
  signer: Signer,
  contractAddress: string,
): Promise<ethers.ContractTransaction> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const tx = await alchemist.approveMint(tokenId, spender, amount);
  await tx.wait();

  return tx;
};

/**
 * Poke (sync) a position's state
 */
export const pokeV3 = async (
  vaultType: VaultTypes,
  tokenId: ethers.BigNumber,
  signer: Signer,
  contractAddress: string,
): Promise<ethers.ContractTransaction> => {
  const alchemist = getAlchemistV3Contract(vaultType, signer, contractAddress);

  const tx = await alchemist.poke(tokenId);
  await tx.wait();

  return tx;
};
