<script>
  import { Link, navigate } from 'svelte-routing';
  import { connect, disconnect } from '@helpers/walletManager';
  import { setCurrency, setGas } from '@helpers/userSettings';
  import { _ } from 'svelte-i18n';

  import governance from '@stores/governance';
  import account from '@stores/account';
  import settings from '../../stores/settings';
  import global from '../../stores/global';
  import toastConfig from '../../stores/toast.js';
  import backgroundLoading from '../../stores/backgroundLoading';
  import Toast from '../elements/Toast.svelte';
  import Dropdown from '../elements/Dropdown.svelte';
  import GasCard from '../elements/GasCard.svelte';
  import LoadingIndicator from '../elements/LoadingIndicator.svelte';

  let _governance;
  governance.subscribe((val) => {
    _governance = val;
  });

  function goToSettings() {
    if (window.location.pathname.slice(1) !== 'settings') {
      navigate(`/settings`, { replace: false });
    }
  }

  const goToHelp = () => {
    window.open('https://docs.lux.finance', '_blank');
  };

  const reportBug = () => {
    window.open(
      'https://github.com/luxfi/finance/issues/new?assignees=&labels=bug&template=BUG-REPORT.yml&title=%5BBUG%5D+',
      '_blank',
    );
  };

  const userGas = (selector) => {
    return typeof selector === 'number' ? selector : selector.baseFeePerGas + selector.maxPriorityFeePerGas;
  };

  const goToVote = () => {
    _governance.activeVotes = $governance.activeVotes.map((prop) => {
      return {
        id: prop.id,
        mute: prop.mute ? prop.mute : true,
      };
    });
    governance.set({ ..._governance });
    if (window.location.pathname.slice(1) !== 'governance') {
      navigate('/governance', { replace: false });
    }
  };

  $: hasActiveVotes = $governance.activeVotes.filter((prop) => !prop.mute).length > 0;
</script>

<style>
  .header-btn {
    height: 36px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--muted-foreground);
    transition: all 0.15s ease;
    cursor: pointer;
  }

  .header-btn:hover {
    background: var(--accent);
    color: var(--foreground);
    border-color: var(--muted-foreground);
  }

  .header-btn svg {
    width: 16px;
    height: 16px;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: var(--foreground);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-icon span {
    font-weight: 700;
    font-size: 16px;
    color: var(--background);
  }

  .logo-text {
    font-weight: 600;
    font-size: 18px;
    color: var(--foreground);
    letter-spacing: -0.02em;
  }

  .notification-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--destructive);
    top: -2px;
    right: -2px;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .connect-btn {
    background: var(--foreground);
    color: var(--background);
    font-weight: 600;
    border: none;
  }

  .connect-btn:hover {
    background: var(--muted-foreground);
    color: var(--background);
  }

  .dropdown-menu {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .dropdown-item {
    padding: 10px 16px;
    font-size: 13px;
    color: var(--muted-foreground);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .dropdown-item:hover {
    background: var(--accent);
    color: var(--foreground);
  }

  /* Light mode - already handled by CSS variables */
</style>

<Toast
  isOpen="{$toastConfig.visible}"
  kind="{$toastConfig.kind}"
  title="{$toastConfig.title}"
  subTitle="{$toastConfig.subtitle}"
  showSpinner="{$toastConfig.spinner}"
  showOpenButton="{$toastConfig.showOpenButton}"
  showCloseButton="{$toastConfig.showCloseButton}"
  closeTimeoutMs="{$toastConfig.closeTimeout}"
  closeOnMount="{$toastConfig.closeOnMount}"
  forceCloseToast="{$toastConfig.forceClose}"
/>

<header class="flex flex-col md:flex-row gap-4 p-4 md:p-0 items-center justify-between">
  <!-- Logo -->
  <div class="flex-1 flex items-center">
    <Link to="/">
      <div class="logo-container">
        <div class="logo-icon">
          <span>L</span>
        </div>
        <span class="logo-text">Liquid</span>
      </div>
    </Link>
  </div>

  <!-- Right Controls -->
  <div class="flex flex-row items-center gap-3">
    {#if $backgroundLoading.active}
      <LoadingIndicator />
    {/if}

    <!-- Notifications -->
    <button
      class="header-btn relative"
      class:has-notifications={hasActiveVotes}
      on:click="{() => goToVote()}"
      aria-label="Notifications"
    >
      {#if hasActiveVotes}
        <div class="notification-dot"></div>
      {/if}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    </button>

    <!-- Gas Dropdown -->
    <Dropdown>
      <button slot="label" class="header-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 19V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v8h2a2 2 0 0 1 2 2v4a1 1 0 0 0 2 0v-7h-2a1 1 0 0 1-1-1V6.414l-1.657-1.657 1.414-1.414 4.95 4.95A.997.997 0 0 1 22 9v9a3 3 0 0 1-6 0v-4h-2v5h1v2H2v-2h1zM5 5v6h7V5H5z" />
        </svg>
        <span>{userGas($global.gasPrices[`${$settings.defaultGas}`])}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div slot="options" class="dropdown-menu flex flex-col gap-3 p-4 w-64">
        {#each Object.entries($global.gasPrices).filter((entry) => entry[0] !== 'eip1559') as gas}
          <GasCard
            cardColor="{$global.gasColor[`${gas[0]}`]}"
            description="{gas[0]}"
            gasFee="{gas[1]}"
            isActive="{$settings.defaultGas === gas[0]}"
            compactView="{true}"
            on:gasSelected="{() => setGas(gas[0])}"
          />
        {/each}
      </div>
    </Dropdown>

    <!-- Settings Dropdown -->
    <Dropdown>
      <button slot="label" class="header-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div slot="options" class="dropdown-menu">
        <div class="dropdown-item" on:click="{goToSettings}">
          {$_('settings')}
        </div>
        <div class="dropdown-item" on:click="{() => goToHelp()}">
          {$_('help')}
        </div>
        <div class="dropdown-item" on:click="{() => reportBug()}">
          {$_('report_bug')}
        </div>
      </div>
    </Dropdown>

    <!-- Connect Wallet -->
    <button
      class="header-btn {$account.signer ? '' : 'connect-btn'}"
      on:click="{$account.signer ? disconnect : connect}"
    >
      {#if $account.signer}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
        </svg>
        <span>{$_('disconnect')}</span>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
        </svg>
        <span>{$_('connect')}</span>
      {/if}
    </button>
  </div>
</header>
