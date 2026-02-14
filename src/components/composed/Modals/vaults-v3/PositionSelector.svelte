<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { utils, BigNumber } from 'ethers';
  import type { PositionNFTType } from '@stores/v3/types';

  export let positions: PositionNFTType[] = [];
  export let selectedId: BigNumber = BigNumber.from(0);

  const dispatch = createEventDispatcher();

  // Calculate health factor display
  const getHealthStatus = (healthFactor: BigNumber): { label: string; color: string } => {
    const hf = parseFloat(utils.formatEther(healthFactor));
    if (hf >= 1.5) return { label: 'Healthy', color: 'green' };
    if (hf >= 1.2) return { label: 'Moderate', color: 'yellow' };
    if (hf >= 1.0) return { label: 'At Risk', color: 'orange' };
    return { label: 'Liquidatable', color: 'red' };
  };

  // Format large numbers
  const formatAmount = (amount: BigNumber, decimals: number = 18): string => {
    const formatted = parseFloat(utils.formatUnits(amount, decimals));
    if (formatted >= 1000000) return `${(formatted / 1000000).toFixed(2)}M`;
    if (formatted >= 1000) return `${(formatted / 1000).toFixed(2)}K`;
    return formatted.toFixed(4);
  };

  const handleSelect = (position: PositionNFTType) => {
    dispatch('select', position);
  };
</script>

<div class="position-selector">
  <div class="positions-list">
    {#each positions as position}
      <button
        class="position-card"
        class:selected={selectedId.eq(position.tokenId)}
        on:click={() => handleSelect(position)}
      >
        <div class="position-header">
          <span class="position-id">Position #{position.tokenId.toString()}</span>
          <span
            class="health-badge"
            style="background-color: var(--color-{getHealthStatus(position.healthFactor).color})"
          >
            {getHealthStatus(position.healthFactor).label}
          </span>
        </div>

        <div class="position-details">
          <div class="detail-row">
            <span class="label">Collateral</span>
            <span class="value">{formatAmount(position.collateral)}</span>
          </div>
          <div class="detail-row">
            <span class="label">Debt</span>
            <span class="value">{formatAmount(position.debt)}</span>
          </div>
          <div class="detail-row">
            <span class="label">Earmarked</span>
            <span class="value">{formatAmount(position.earmarked)}</span>
          </div>
          <div class="detail-row">
            <span class="label">Health Factor</span>
            <span class="value">{parseFloat(utils.formatEther(position.healthFactor)).toFixed(2)}x</span>
          </div>
        </div>

        {#if selectedId.eq(position.tokenId)}
          <div class="selected-indicator">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.5 4.5L6.5 11.5L2.5 7.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        {/if}
      </button>
    {/each}
  </div>

  {#if positions.length === 0}
    <div class="no-positions">
      <p>No existing positions found.</p>
      <p class="text-sm">A new position NFT will be minted when you deposit.</p>
    </div>
  {/if}
</div>

<style>
  .position-selector {
    width: 100%;
  }

  .positions-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 300px;
    overflow-y: auto;
  }

  .position-card {
    position: relative;
    width: 100%;
    padding: 1rem;
    background: var(--color-bg-secondary);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .position-card:hover {
    border-color: var(--color-primary);
    background: var(--color-bg-tertiary);
  }

  .position-card.selected {
    border-color: var(--color-green);
    background: rgba(var(--color-green-rgb), 0.1);
  }

  .position-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .position-id {
    font-weight: 600;
    font-size: 1rem;
  }

  .health-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
  }

  .position-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
  }

  .label {
    color: var(--color-lightgrey);
    font-size: 0.75rem;
  }

  .value {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .selected-indicator {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: var(--color-green);
  }

  .no-positions {
    padding: 2rem;
    text-align: center;
    background: var(--color-bg-secondary);
    border-radius: 8px;
  }

  .no-positions p {
    margin-bottom: 0.5rem;
  }

  .text-sm {
    font-size: 0.875rem;
    color: var(--color-lightgrey);
  }
</style>
