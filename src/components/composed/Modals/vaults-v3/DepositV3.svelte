<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { utils, BigNumber, ethers } from 'ethers';

  import Button from '@components/elements/Button.svelte';
  import ComplexInput from '@components/composed/Inputs/ComplexInput.svelte';
  import MaxLossController from '@components/composed/MaxLossController.svelte';
  import ToggleSwitch from '@components/elements/ToggleSwitch.svelte';
  import VaultMessage from '@components/elements/VaultMessage.svelte';
  import PositionSelector from './PositionSelector.svelte';

  import { depositV3 } from '@stores/v3/vaultActions';
  import { VaultTypes } from '@stores/v3/types';
  import {
    addressStore,
    balancesStore,
    positionsStore,
    selectedPositionStore,
    networkStore,
    providerStore,
  } from '@stores/v3/alcxStore';
  import { VaultTypesInfosV3, V3_MIN_COLLATERALIZATION } from '@stores/v3/constants';
  import { modalReset } from '@stores/modal';
  import settings from '@stores/settings';

  // Props
  export let vault: any;
  export let capInfo: any;
  export let isPaused: boolean = false;

  // Local state
  let depositAmount = '';
  let maximumLoss = 100; // 0.1% default
  let isNewPosition = true;
  let selectedTokenId: BigNumber = BigNumber.from(0);
  let isLoading = false;
  let errorMessage = '';

  // Reactive: Get user's existing positions for this vault type
  $: userPositions = $positionsStore.filter((p) => p.owner === $addressStore);

  // Reactive: Parse deposit amount
  $: depositAmountBN = depositAmount
    ? utils.parseUnits(depositAmount, vault.decimals || 18)
    : BigNumber.from(0);

  // Reactive: Estimated debt value from deposit (90% LTV)
  $: estimatedDebtValue = depositAmountBN.mul(90).div(100);

  // Reactive: Check if deposit is valid
  $: isValidDeposit = depositAmountBN.gt(0) && !isPaused && !isLoading;

  // Reactive: Get token balance
  $: tokenBalance = $balancesStore.find((b) => b.address === vault.yieldToken)?.balance || BigNumber.from(0);

  // Reactive: Check if user has sufficient balance
  $: hasSufficientBalance = tokenBalance.gte(depositAmountBN);

  // Handle position selection
  const handlePositionSelect = (position: any) => {
    if (position) {
      isNewPosition = false;
      selectedTokenId = position.tokenId;
      selectedPositionStore.set(position.tokenId);
    } else {
      isNewPosition = true;
      selectedTokenId = BigNumber.from(0);
      selectedPositionStore.set(undefined);
    }
  };

  // Handle deposit action
  const handleDeposit = async () => {
    if (!$addressStore || !$providerStore) {
      errorMessage = 'Please connect your wallet';
      return;
    }

    if (!isValidDeposit || !hasSufficientBalance) {
      errorMessage = 'Invalid deposit amount or insufficient balance';
      return;
    }

    isLoading = true;
    errorMessage = '';

    try {
      const signer = $providerStore.getSigner();
      const recipientId = isNewPosition ? BigNumber.from(0) : selectedTokenId;

      const { tx, debtValue } = await depositV3(
        vault.type,
        depositAmountBN,
        $addressStore,
        recipientId,
        signer,
        vault.alchemistAddress,
      );

      console.log('[DepositV3] Transaction successful:', tx.hash);
      console.log('[DepositV3] Debt value:', utils.formatEther(debtValue));

      // Reset form and close modal
      depositAmount = '';
      modalReset();

      // Refresh data
      // TODO: Implement refresh methods
    } catch (error: any) {
      console.error('[DepositV3] Error:', error);
      errorMessage = error.message || 'Deposit failed';
    } finally {
      isLoading = false;
    }
  };

  // Set max deposit
  const setMaxDeposit = () => {
    depositAmount = utils.formatUnits(tokenBalance, vault.decimals || 18);
  };
</script>

<div class="deposit-v3-modal">
  <div class="modal-header">
    <h2>{$_('vaults.deposit.title')} - V3</h2>
    <p class="text-lightgrey text-sm">
      {$_('vaults.deposit.description')} with up to 90% LTV
    </p>
  </div>

  {#if isPaused}
    <VaultMessage level="warning" message="Deposits are currently paused for this vault." />
  {/if}

  <div class="modal-body">
    <!-- Position Selection -->
    <div class="position-section">
      <label class="section-label">
        <span>{$_('vaults.position.select')}</span>
      </label>

      <div class="position-toggle">
        <ToggleSwitch
          bind:value={isNewPosition}
          label="Create New Position"
          on:change={() => handlePositionSelect(isNewPosition ? null : userPositions[0])}
        />
      </div>

      {#if !isNewPosition && userPositions.length > 0}
        <PositionSelector
          positions={userPositions}
          selectedId={selectedTokenId}
          on:select={(e) => handlePositionSelect(e.detail)}
        />
      {/if}

      {#if !isNewPosition && userPositions.length === 0}
        <p class="text-yellow text-sm">No existing positions found. A new position will be created.</p>
      {/if}
    </div>

    <!-- Deposit Amount -->
    <div class="amount-section">
      <label class="section-label">
        <span>{$_('vaults.deposit.amount')}</span>
        <span class="balance">
          Balance: {utils.formatUnits(tokenBalance, vault.decimals || 18)} {vault.symbol}
        </span>
      </label>

      <ComplexInput
        bind:inputValue={depositAmount}
        tokenAddress={vault.yieldToken}
        tokenSymbol={vault.symbol}
        tokenDecimals={vault.decimals || 18}
        on:max={setMaxDeposit}
      />
    </div>

    <!-- Deposit Preview -->
    {#if depositAmountBN.gt(0)}
      <div class="preview-section">
        <h3>{$_('vaults.deposit.preview')}</h3>

        <div class="preview-row">
          <span>Deposit Amount</span>
          <span>{depositAmount} {vault.symbol}</span>
        </div>

        <div class="preview-row">
          <span>Estimated Borrowable ({V3_MIN_COLLATERALIZATION * 100 - 100}% LTV)</span>
          <span>{utils.formatUnits(estimatedDebtValue, vault.decimals || 18)} al{vault.underlyingSymbol}</span>
        </div>

        <div class="preview-row">
          <span>Position Type</span>
          <span>{isNewPosition ? 'New Position (NFT)' : `Position #${selectedTokenId.toString()}`}</span>
        </div>
      </div>
    {/if}

    <!-- Max Loss Controller -->
    <div class="maxloss-section">
      <MaxLossController bind:maximumLoss />
    </div>

    <!-- Error Message -->
    {#if errorMessage}
      <VaultMessage level="error" message={errorMessage} />
    {/if}

    <!-- Action Buttons -->
    <div class="action-buttons">
      <Button
        label={isLoading ? 'Depositing...' : $_('vaults.deposit.button')}
        borderColor="green"
        backgroundColor={isValidDeposit && hasSufficientBalance ? 'green' : 'grey'}
        disabled={!isValidDeposit || !hasSufficientBalance || isLoading}
        on:clicked={handleDeposit}
      />
    </div>

    <!-- V3 Info -->
    <div class="v3-info">
      <p class="text-sm text-lightgrey">
        <strong>Liquid V3:</strong> Your deposit creates an NFT position. You can borrow up to 90% of your
        collateral value. Yield automatically repays your debt over time.
      </p>
    </div>
  </div>
</div>

<style>
  .deposit-v3-modal {
    padding: 1rem;
  }

  .modal-header {
    margin-bottom: 1.5rem;
  }

  .modal-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
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

  .position-section,
  .amount-section,
  .preview-section,
  .maxloss-section {
    margin-bottom: 1.5rem;
  }

  .position-toggle {
    margin-bottom: 1rem;
  }

  .preview-section {
    background: var(--color-bg-secondary);
    border-radius: 8px;
    padding: 1rem;
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

  .action-buttons {
    margin-top: 1.5rem;
  }

  .v3-info {
    margin-top: 1rem;
    padding: 0.75rem;
    background: var(--color-bg-tertiary);
    border-radius: 6px;
  }

  .text-lightgrey {
    color: var(--color-lightgrey);
  }

  .text-yellow {
    color: var(--color-yellow);
  }

  .text-sm {
    font-size: 0.875rem;
  }
</style>
