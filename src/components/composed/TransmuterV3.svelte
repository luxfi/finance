<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { utils, BigNumber, ethers } from 'ethers';

  import Button from '@components/elements/Button.svelte';
  import ComplexInput from '@components/composed/Inputs/ComplexInput.svelte';
  import LoadingIndicator from '@components/elements/LoadingIndicator.svelte';

  import {
    createRedemptionV3,
    claimRedemptionV3,
    fetchTransmuterPositionV3,
  } from '@stores/v3/vaultActions';
  import { VaultTypes, type TransmuterPositionType, type TransmuterV3Type } from '@stores/v3/types';
  import {
    addressStore,
    balancesStore,
    transmuterPositionsStore,
    providerStore,
  } from '@stores/v3/alcxStore';
  import {
    V3_DEFAULT_TIME_TO_TRANSMUTE,
    V3_DEFAULT_TRANSMUTATION_FEE,
    V3_DEFAULT_EXIT_FEE,
    TransmuterNameAliasesV3,
  } from '@stores/v3/constants';

  // Props
  export let transmuter: TransmuterV3Type;
  export let vaultType: VaultTypes;

  // Local state
  let depositAmount = '';
  let isLoading = false;
  let errorMessage = '';
  let activeTab: 'deposit' | 'positions' = 'deposit';

  // Reactive: Get user's positions for this transmuter
  $: userPositions = $transmuterPositionsStore.filter((p) => p.owner === $addressStore);
  $: pendingPositions = userPositions.filter((p) => !p.isMatured);
  $: maturedPositions = userPositions.filter((p) => p.isMatured);

  // Reactive: Parse deposit amount
  $: depositAmountBN = depositAmount
    ? utils.parseUnits(depositAmount, 18)
    : BigNumber.from(0);

  // Reactive: Get synthetic token balance
  $: synthBalance = $balancesStore.find((b) => b.address === transmuter.syntheticToken)?.balance || BigNumber.from(0);

  // Reactive: Check if deposit is valid
  $: isValidDeposit = depositAmountBN.gt(0) && synthBalance.gte(depositAmountBN);

  // Reactive: Calculate estimated yield from arbitrage
  $: estimatedYield = calculateArbitrageYield(depositAmountBN);

  // Calculate arbitrage yield (fixed-rate)
  function calculateArbitrageYield(amount: BigNumber): { apy: number; absoluteYield: BigNumber } {
    // If alToken is trading at 0.98, and duration is 90 days:
    // Effective APY = ((1 - 0.98) / 0.98) * (365 / 90) * 100 = ~8.27%
    // For simplicity, assume 2% discount and 90-day duration
    const discount = 0.02; // 2% discount
    const durationDays = 90;
    const apy = (discount / (1 - discount)) * (365 / durationDays) * 100;
    const absoluteYield = amount.mul(Math.round(discount * 10000)).div(10000);
    return { apy, absoluteYield };
  }

  // Format duration
  function formatDuration(blocks: BigNumber): string {
    const seconds = blocks.toNumber() * 2; // 2s block time
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  }

  // Format date
  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Handle create redemption
  const handleCreateRedemption = async () => {
    if (!$addressStore || !$providerStore) {
      errorMessage = 'Please connect your wallet';
      return;
    }

    if (!isValidDeposit) {
      errorMessage = 'Invalid amount or insufficient balance';
      return;
    }

    isLoading = true;
    errorMessage = '';

    try {
      const signer = $providerStore.getSigner();

      const { tx, nftId } = await createRedemptionV3(
        depositAmountBN,
        signer,
        transmuter.contractAddress,
      );

      console.log('[TransmuterV3] Redemption created:', tx.hash, 'NFT ID:', nftId.toString());

      // Fetch the new position
      const newPosition = await fetchTransmuterPositionV3(nftId, signer, transmuter.contractAddress);
      transmuterPositionsStore.update((positions) => [...positions, newPosition]);

      depositAmount = '';
    } catch (error: any) {
      console.error('[TransmuterV3] Error:', error);
      errorMessage = error.message || 'Failed to create redemption';
    } finally {
      isLoading = false;
    }
  };

  // Handle claim redemption
  const handleClaimRedemption = async (position: TransmuterPositionType) => {
    if (!$providerStore) return;

    isLoading = true;
    errorMessage = '';

    try {
      const signer = $providerStore.getSigner();

      const { tx, amountClaimed } = await claimRedemptionV3(
        position.id,
        signer,
        transmuter.contractAddress,
      );

      console.log('[TransmuterV3] Claimed:', tx.hash, 'Amount:', utils.formatEther(amountClaimed));

      // Remove position from store
      transmuterPositionsStore.update((positions) =>
        positions.filter((p) => !p.id.eq(position.id))
      );
    } catch (error: any) {
      console.error('[TransmuterV3] Error:', error);
      errorMessage = error.message || 'Failed to claim redemption';
    } finally {
      isLoading = false;
    }
  };

  // Set max deposit
  const setMaxDeposit = () => {
    depositAmount = utils.formatEther(synthBalance);
  };
</script>

<div class="transmuter-v3">
  <div class="transmuter-header">
    <div class="title-section">
      <h2>
        {TransmuterNameAliasesV3[vaultType === VaultTypes.alLUX ? 'lux' : vaultType === VaultTypes.alETH ? 'eth' : 'usd']}
        <span class="subtitle">Transmuter V3</span>
      </h2>
      <p class="description">
        Fixed-duration redemptions for {transmuter.debtTokenSymbol || 'alTokens'}
      </p>
    </div>

    <div class="stats-section">
      <div class="stat">
        <span class="stat-label">Total Locked</span>
        <span class="stat-value">{utils.formatEther(transmuter.totalLocked || 0)}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Duration</span>
        <span class="stat-value">{formatDuration(transmuter.timeToTransmute || BigNumber.from(V3_DEFAULT_TIME_TO_TRANSMUTE))}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Exit Fee</span>
        <span class="stat-value">{(V3_DEFAULT_EXIT_FEE * 100).toFixed(1)}%</span>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs">
    <button
      class="tab"
      class:active={activeTab === 'deposit'}
      on:click={() => (activeTab = 'deposit')}
    >
      Create Redemption
    </button>
    <button
      class="tab"
      class:active={activeTab === 'positions'}
      on:click={() => (activeTab = 'positions')}
    >
      My Positions ({userPositions.length})
    </button>
  </div>

  <!-- Deposit Tab -->
  {#if activeTab === 'deposit'}
    <div class="deposit-section">
      <div class="info-card">
        <h3>How Fixed-Duration Redemptions Work</h3>
        <ol>
          <li>Deposit your synthetic tokens (e.g., alETH, alUSD)</li>
          <li>Wait for the fixed duration (~90 days)</li>
          <li>Claim 1:1 redemption for underlying tokens</li>
          <li>Earn fixed yield from arbitrage if alToken trades below peg</li>
        </ol>
      </div>

      <div class="input-section">
        <label class="section-label">
          <span>Deposit Amount</span>
          <span class="balance">
            Balance: {utils.formatEther(synthBalance)} {transmuter.debtTokenSymbol || 'alToken'}
          </span>
        </label>

        <ComplexInput
          bind:inputValue={depositAmount}
          tokenSymbol={transmuter.debtTokenSymbol || 'alToken'}
          tokenDecimals={18}
          on:max={setMaxDeposit}
        />
      </div>

      {#if depositAmountBN.gt(0)}
        <div class="preview-section">
          <h3>Redemption Preview</h3>

          <div class="preview-row">
            <span>Deposit Amount</span>
            <span>{depositAmount} {transmuter.debtTokenSymbol}</span>
          </div>

          <div class="preview-row">
            <span>Maturation Date</span>
            <span>{formatDate(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))}</span>
          </div>

          <div class="preview-row">
            <span>Redemption Amount</span>
            <span>{depositAmount} (1:1)</span>
          </div>

          <div class="preview-row highlight">
            <span>Estimated Fixed Yield APY</span>
            <span class="text-green">{estimatedYield.apy.toFixed(2)}%</span>
          </div>

          <p class="note">
            * Yield depends on the current alToken discount. You can exit early with a {(V3_DEFAULT_EXIT_FEE * 100).toFixed(1)}% fee.
          </p>
        </div>
      {/if}

      {#if errorMessage}
        <div class="error-message">{errorMessage}</div>
      {/if}

      <Button
        label={isLoading ? 'Creating...' : 'Create Redemption'}
        borderColor="green"
        backgroundColor={isValidDeposit ? 'green' : 'grey'}
        disabled={!isValidDeposit || isLoading}
        on:clicked={handleCreateRedemption}
      />
    </div>
  {/if}

  <!-- Positions Tab -->
  {#if activeTab === 'positions'}
    <div class="positions-section">
      {#if userPositions.length === 0}
        <div class="empty-state">
          <p>No redemption positions yet.</p>
          <p class="text-sm">Create a redemption to start earning fixed yield.</p>
        </div>
      {:else}
        <!-- Matured Positions -->
        {#if maturedPositions.length > 0}
          <div class="positions-group">
            <h3 class="group-title text-green">Ready to Claim ({maturedPositions.length})</h3>
            {#each maturedPositions as position}
              <div class="position-card matured">
                <div class="position-info">
                  <span class="position-id">Position #{position.id.toString()}</span>
                  <span class="position-amount">{utils.formatEther(position.amount)}</span>
                </div>
                <div class="position-dates">
                  <span>Matured: {formatDate(position.estimatedMaturationDate)}</span>
                </div>
                <Button
                  label={isLoading ? 'Claiming...' : 'Claim'}
                  borderColor="green"
                  backgroundColor="green"
                  disabled={isLoading}
                  on:clicked={() => handleClaimRedemption(position)}
                />
              </div>
            {/each}
          </div>
        {/if}

        <!-- Pending Positions -->
        {#if pendingPositions.length > 0}
          <div class="positions-group">
            <h3 class="group-title">Pending ({pendingPositions.length})</h3>
            {#each pendingPositions as position}
              <div class="position-card pending">
                <div class="position-info">
                  <span class="position-id">Position #{position.id.toString()}</span>
                  <span class="position-amount">{utils.formatEther(position.amount)}</span>
                </div>
                <div class="position-dates">
                  <span>Matures: {formatDate(position.estimatedMaturationDate)}</span>
                </div>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    style="width: {calculateProgress(position)}%"
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      {/if}
    </div>
  {/if}
</div>

<script context="module" lang="ts">
  function calculateProgress(position: TransmuterPositionType): number {
    const now = Date.now();
    const start = position.startBlock.toNumber() * 2000; // Approximate start time
    const end = position.estimatedMaturationDate.getTime();
    const total = end - start;
    const elapsed = now - start;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }
</script>

<style>
  .transmuter-v3 {
    padding: 1.5rem;
    background: var(--color-bg-primary);
    border-radius: 12px;
  }

  .transmuter-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .title-section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .subtitle {
    font-size: 0.875rem;
    color: var(--color-lightgrey);
    font-weight: normal;
  }

  .description {
    color: var(--color-lightgrey);
    font-size: 0.875rem;
  }

  .stats-section {
    display: flex;
    gap: 1.5rem;
  }

  .stat {
    text-align: right;
  }

  .stat-label {
    display: block;
    font-size: 0.75rem;
    color: var(--color-lightgrey);
    margin-bottom: 0.25rem;
  }

  .stat-value {
    font-size: 1rem;
    font-weight: 600;
  }

  .tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0.5rem;
  }

  .tab {
    padding: 0.5rem 1rem;
    background: none;
    border: none;
    color: var(--color-lightgrey);
    cursor: pointer;
    font-size: 0.875rem;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .tab:hover {
    background: var(--color-bg-secondary);
    color: var(--color-text);
  }

  .tab.active {
    background: var(--color-primary);
    color: white;
  }

  .info-card {
    background: var(--color-bg-secondary);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  .info-card h3 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  .info-card ol {
    padding-left: 1.25rem;
    font-size: 0.875rem;
    color: var(--color-lightgrey);
  }

  .info-card li {
    margin-bottom: 0.5rem;
  }

  .input-section {
    margin-bottom: 1.5rem;
  }

  .section-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }

  .balance {
    color: var(--color-lightgrey);
  }

  .preview-section {
    background: var(--color-bg-secondary);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  .preview-section h3 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--color-lightgrey);
  }

  .preview-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  .preview-row:last-child {
    border-bottom: none;
  }

  .preview-row.highlight {
    background: rgba(var(--color-green-rgb), 0.1);
    margin: 0.5rem -1rem;
    padding: 0.75rem 1rem;
    border-radius: 4px;
  }

  .note {
    font-size: 0.75rem;
    color: var(--color-lightgrey);
    margin-top: 0.75rem;
  }

  .error-message {
    background: rgba(255, 0, 0, 0.1);
    color: var(--color-red);
    padding: 0.75rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }

  .empty-state {
    text-align: center;
    padding: 3rem;
    background: var(--color-bg-secondary);
    border-radius: 8px;
  }

  .positions-group {
    margin-bottom: 1.5rem;
  }

  .group-title {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  .position-card {
    background: var(--color-bg-secondary);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.75rem;
  }

  .position-card.matured {
    border-left: 3px solid var(--color-green);
  }

  .position-card.pending {
    border-left: 3px solid var(--color-yellow);
  }

  .position-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .position-id {
    font-weight: 600;
  }

  .position-amount {
    font-weight: 600;
  }

  .position-dates {
    font-size: 0.75rem;
    color: var(--color-lightgrey);
    margin-bottom: 0.75rem;
  }

  .progress-bar {
    height: 4px;
    background: var(--color-bg-tertiary);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--color-yellow);
    transition: width 0.3s ease;
  }

  .text-green {
    color: var(--color-green);
  }

  .text-sm {
    font-size: 0.875rem;
    color: var(--color-lightgrey);
  }
</style>
