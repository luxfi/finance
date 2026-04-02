<script>
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { globalHistory } from 'svelte-routing/src/history';
  import { _ } from 'svelte-i18n';
  import Wallet from './Wallet.svelte';
  import { routerGuard } from '@helpers/routerGuard';
  import { sentinelStore, networkStore } from '@stores/v2/liquidStore';
  import settings from '@stores/settings';
  import { sidebarSetup } from '@stores/sidebarSetup';
  import secret from '@stores/secret';

  import navigationStore, { updatePath } from '@stores/navigation';
</script>

<style>
  .section-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted-foreground);
    margin-bottom: 12px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.15s ease;
    color: var(--muted-foreground);
    background: transparent;
    border: 1px solid transparent;
    margin-bottom: 8px;
  }

  .nav-item:hover {
    color: var(--foreground);
    background: var(--accent);
    border-color: var(--border);
  }

  .nav-item.active {
    color: var(--foreground);
    background: var(--accent);
    border-color: var(--border);
  }

  .nav-item.active:hover {
    background: var(--secondary);
    border-color: var(--muted-foreground);
  }

  .nav-label {
    font-size: 14px;
    font-weight: 500;
  }

  .nav-icon {
    width: 22px;
    height: 22px;
    opacity: 0.7;
  }

  .nav-item.active .nav-icon {
    opacity: 1;
  }

  /* Light mode - uses CSS variables which auto-invert */

  :global(.inverseBg) .nav-item.active {
    color: var(--foreground);
    background: var(--accent);
    border-color: var(--border);
  }

  :global(.inverseBg) .nav-item.active:hover {
    background: var(--secondary);
    border-color: var(--muted-foreground);
  }
</style>

<aside class="flex flex-col gap-6">
  <!-- Wallet Section -->
  <div>
    <p class="section-title">{$_('wallet')}</p>
    <Wallet />
  </div>

  <!-- Navigation Section -->
  <nav class="sticky top-4">
    <p class="section-title">{$_('navigation')}</p>
    <ul>
      {#each sidebarSetup()
        .filter((key) => key.label !== 'sentinel')
        .filter((key) => key.label !== 'Cows')
        .filter((key) => key.supportedChains.includes($networkStore)) as sidebarItem}
        <li
          class="nav-item"
          class:active={$navigationStore.currentPathname === `${sidebarItem.path}`}
          on:click="{() => updatePath(sidebarItem.path, (pathname) => routerGuard(pathname))}"
        >
          <span class="nav-label">{$_(sidebarItem.label)}</span>
          <img
            src="./images/icons/{sidebarItem.icon}"
            class="nav-icon {$settings.invertColors ? 'invertIcons' : ''}"
            alt="{sidebarItem.label}"
          />
        </li>
      {/each}

      <!-- Utilities -->
      <li
        class="nav-item"
        class:active={$navigationStore.currentPathname === 'utilities'}
        on:click="{() => updatePath('utilities', (pathname) => routerGuard(pathname))}"
      >
        <span class="nav-label">{$_('utilities')}</span>
        <img
          src="./images/icons/utilities_med.svg"
          class="nav-icon {$settings.invertColors ? 'invertIcons' : ''}"
          alt="{$_('utilities')}"
        />
      </li>

      <!-- Sentinel (conditional) -->
      {#each sidebarSetup()
        .filter((key) => key.label === 'sentinel')
        .filter((key) => key.supportedChains.includes($networkStore)) as sidebarItem}
        {#if $sentinelStore}
          <li
            class="nav-item"
            class:active={$navigationStore.currentPathname === `${sidebarItem.path}`}
            on:click="{() => updatePath(sidebarItem.path, (pathname) => routerGuard(pathname))}"
            transition:fade|local
          >
            <span class="nav-label">{$_(sidebarItem.label)}</span>
            <img
              src="./images/icons/{sidebarItem.icon}"
              class="nav-icon {$settings.invertColors ? 'invertIcons' : ''}"
              alt="{sidebarItem.label}"
            />
          </li>
        {/if}
      {/each}

      <!-- Secret section (conditional) -->
      {#each sidebarSetup().filter((key) => key.label === 'Cows') as sidebarItem}
        {#if $secret.unlocked}
          <li
            class="nav-item"
            class:active={$navigationStore.currentPathname.slice(1) === `${sidebarItem.path}`}
            on:click="{() => updatePath(sidebarItem.path, (pathname) => routerGuard(pathname))}"
            transition:fade|local
          >
            <span class="nav-label">{$_(sidebarItem.label)}</span>
            <img
              src="./images/icons/{sidebarItem.icon}"
              class="nav-icon {$settings.invertColors ? 'invertIcons' : ''}"
              alt="{sidebarItem.label}"
            />
          </li>
        {/if}
      {/each}
    </ul>
  </nav>
</aside>
