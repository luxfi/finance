<script>
  import { fade, fly } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';
  import { _ } from 'svelte-i18n';
  import ViewContainer from '../components/elements/ViewContainer.svelte';
  import settings from '../stores/settings';
  import { routerGuard } from '@helpers/routerGuard.js';

  // Monochrome - uses CSS variables

  // Liquid Protocol x-tokens
  let xTokens = [
    {
      name: 'xETH',
      underlying: 'ETH',
      ltv: '90',
      icon: 'eth',
      strategies: ['wstETH', 'rETH', 'sfrxETH'],
      description: 'Self-repaying ETH loans',
    },
    {
      name: 'xUSD',
      underlying: 'USDC',
      ltv: '90',
      icon: 'usdc',
      strategies: ['aUSDC', 'yvUSDC'],
      description: 'Self-repaying USD loans',
    },
    {
      name: 'xLUX',
      underlying: 'LUX',
      ltv: '90',
      icon: 'lux',
      strategies: ['stLUX'],
      description: 'Self-repaying LUX loans',
    },
    {
      name: 'xBTC',
      underlying: 'WBTC',
      ltv: '90',
      icon: 'btc',
      strategies: ['yvWBTC'],
      description: 'Self-repaying BTC loans',
    },
  ];

  // Stats
  let stats = [
    { value: '$125M+', label: 'Total Value Locked' },
    { value: '90%', label: 'Max LTV' },
    { value: '0', label: 'Liquidations' },
    { value: '50+', label: 'Networks' },
  ];

  // Features
  let features = [
    {
      icon: '🔒',
      title: 'No Liquidations',
      description: 'Your collateral is never at risk. Yield from your deposits automatically repays your loan.',
    },
    {
      icon: '⚡',
      title: 'Up to 90% LTV',
      description: 'Borrow up to 90% of your collateral value. The highest LTV in DeFi lending.',
    },
    {
      icon: '🔄',
      title: 'Self-Repaying',
      description: 'Your loan repays itself over time using yield generated from your collateral.',
    },
    {
      icon: '🌐',
      title: 'Multi-Chain',
      description: 'Available on LUX Network, Zoo, Hanzo, and EVM chains via cross-chain bridges.',
    },
    {
      icon: '🛡️',
      title: 'Non-Custodial',
      description: 'Your keys, your coins. Fully permissionless and decentralized protocol.',
    },
    {
      icon: '📈',
      title: 'Yield Strategies',
      description: 'Multiple yield strategies per vault: Lido, Rocket Pool, Frax, AAVE, and more.',
    },
  ];

  // Hero carousel
  let carouselItems = [
    'Borrow against your assets without liquidation risk',
    'Your loan repays itself using yield from your collateral',
    'Access up to 90% of your collateral value instantly',
  ];
  let carouselIndex = 0;
  let carouselTimer;

  function carousel() {
    carouselTimer = setInterval(() => {
      carouselIndex = (carouselIndex + 1) % carouselItems.length;
    }, 4000);
  }

  // Terminal animation
  let terminalLines = [];
  let terminalIndex = 0;
  const terminalCommands = [
    { type: 'command', text: '$ liquid deposit --asset ETH --amount 10' },
    { type: 'info', text: 'Depositing 10 ETH to xETH vault...' },
    { type: 'success', text: '✓ Deposited 10 ETH (via wstETH strategy)' },
    { type: 'command', text: '$ liquid borrow --amount 9 --token xETH' },
    { type: 'info', text: 'Minting 9 xETH (90% LTV)...' },
    { type: 'success', text: '✓ Borrowed 9 xETH - no liquidation risk' },
    { type: 'highlight', text: '→ Loan auto-repays via staking yield' },
  ];

  function animateTerminal() {
    if (terminalIndex < terminalCommands.length) {
      setTimeout(() => {
        terminalLines = [...terminalLines, terminalCommands[terminalIndex]];
        terminalIndex++;
        animateTerminal();
      }, 800);
    }
  }

  onMount(() => {
    carousel();
    setTimeout(animateTerminal, 500);
  });

  onDestroy(() => {
    clearInterval(carouselTimer);
  });
</script>

<style>
  .hero-glow {
    box-shadow: 0 0 60px 20px rgba(255, 255, 255, 0.05);
  }

  .cta-button {
    background: var(--foreground);
    color: var(--background);
    font-weight: 600;
    padding: 1rem 2rem;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
    opacity: 0.9;
  }

  .secondary-button {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--foreground);
    font-weight: 500;
    padding: 1rem 2rem;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .secondary-button:hover {
    background: var(--accent);
    border-color: var(--muted-foreground);
  }

  .feature-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.2s ease;
  }

  .feature-card:hover {
    background: var(--accent);
    border-color: var(--muted-foreground);
    transform: translateY(-4px);
  }

  .token-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .token-card:hover {
    background: var(--accent);
    border-color: var(--muted-foreground);
    transform: translateY(-2px);
  }

  .stat-item {
    text-align: center;
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--foreground);
    line-height: 1.2;
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    margin-top: 0.5rem;
  }

  .terminal {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    font-family: ui-monospace, 'SF Mono', monospace;
  }

  .terminal-header {
    background: var(--secondary);
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px solid var(--border);
  }

  .terminal-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .terminal-body {
    padding: 1rem;
    min-height: 200px;
    font-size: 0.875rem;
    line-height: 1.8;
  }

  .terminal-line {
    white-space: pre-wrap;
  }

  .terminal-command { color: var(--foreground); }
  .terminal-info { color: var(--muted-foreground); }
  .terminal-success { color: #22C55E; }
  .terminal-highlight { color: var(--foreground); font-weight: 600; }

  .dashboard-mock {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .badge {
    background: var(--secondary);
    border: 1px solid var(--border);
    color: var(--foreground);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .section-title {
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: var(--foreground);
  }

  .section-subtitle {
    font-size: 1.125rem;
    color: var(--muted-foreground);
    max-width: 600px;
  }

  @media (max-width: 768px) {
    .stat-value {
      font-size: 1.75rem;
    }
    .section-title {
      font-size: 1.75rem;
    }
  }
</style>

<ViewContainer>
  <div class="flex flex-col space-y-20">

    <!-- Hero Section -->
    <section class="relative py-8">
      <div class="flex flex-col lg:flex-row gap-12 items-center">
        <!-- Left: Hero Content -->
        <div class="flex-1 space-y-8">
          <div class="inline-flex gap-2">
            <span class="badge">Liquid Protocol</span>
            <span class="badge">V3</span>
          </div>

          <h1 class="text-4xl lg:text-5xl font-bold leading-tight">
            Self-Repaying Loans
            <br />
            <span class="text-foreground">Without Liquidation Risk</span>
          </h1>

          <p class="text-xl opacity-70 max-w-lg" transition:fade={{ duration: 300 }}>
            {carouselItems[carouselIndex]}
          </p>

          <div class="flex flex-wrap gap-4">
            <button class="cta-button" on:click={() => routerGuard('vaults')}>
              Launch App
            </button>
            <a
              href="https://docs.lux.finance"
              target="_blank"
              rel="noopener noreferrer"
              class="secondary-button inline-block"
            >
              Documentation
            </a>
          </div>

          <!-- Stats Row -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {#each stats as stat}
              <div class="stat-item">
                <div class="stat-value">{stat.value}</div>
                <div class="stat-label">{stat.label}</div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Right: Terminal/Dashboard Mock -->
        <div class="flex-1 w-full max-w-lg">
          <div class="terminal hero-glow">
            <div class="terminal-header">
              <div class="terminal-dot" style="background: #FF5F56;"></div>
              <div class="terminal-dot" style="background: #FFBD2E;"></div>
              <div class="terminal-dot" style="background: #27CA40;"></div>
              <span class="ml-4 text-xs opacity-50">liquid-cli — zsh</span>
            </div>
            <div class="terminal-body">
              {#each terminalLines as line, i}
                <div
                  class="terminal-line terminal-{line.type}"
                  in:fly={{ y: 10, duration: 200 }}
                >
                  {line.text}
                </div>
              {/each}
              {#if terminalLines.length < terminalCommands.length}
                <div class="terminal-line opacity-50">
                  <span class="animate-pulse">▌</span>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- x-Tokens Section -->
    <section class="space-y-8">
      <div class="text-center space-y-4">
        <h2 class="section-title">Multiplied Yield Tokens</h2>
        <p class="section-subtitle mx-auto">
          Deposit collateral, borrow x-tokens up to 90% LTV. Your loan repays itself via yield strategies.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each xTokens as token}
          <div
            class="token-card"
            on:click={() => routerGuard('vaults')}
            on:keypress={(e) => e.key === 'Enter' && routerGuard('vaults')}
            role="button"
            tabindex="0"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <img
                  src="./images/icons/{token.icon}.svg"
                  alt="{token.name}"
                  class="w-8 h-8"
                  on:error={(e) => e.target.style.display = 'none'}
                />
              </div>
              <div>
                <div class="font-semibold text-lg">{token.name}</div>
                <div class="text-sm opacity-50">{token.underlying}</div>
              </div>
            </div>
            <div class="text-sm opacity-70 mb-3">{token.description}</div>
            <div class="flex items-center justify-between text-sm">
              <span class="opacity-50">Max LTV</span>
              <span class="text-foreground font-semibold">{token.ltv}%</span>
            </div>
            <div class="flex flex-wrap gap-1 mt-3">
              {#each token.strategies as strat}
                <span class="text-xs px-2 py-0.5 bg-white/5 rounded">{strat}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="space-y-8">
      <div class="text-center space-y-4">
        <h2 class="section-title">How It Works</h2>
        <p class="section-subtitle mx-auto">
          The simplest way to unlock your crypto's potential without selling.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center space-y-4">
          <div class="w-16 h-16 mx-auto rounded-full bg-secondary border border-border flex items-center justify-center">
            <span class="text-2xl font-bold text-foreground">1</span>
          </div>
          <h3 class="text-xl font-semibold">Deposit Collateral</h3>
          <p class="opacity-60">
            Deposit ETH, USDC, LUX, or other supported assets into a vault.
            Choose your preferred yield strategy.
          </p>
        </div>

        <div class="text-center space-y-4">
          <div class="w-16 h-16 mx-auto rounded-full bg-secondary border border-border flex items-center justify-center">
            <span class="text-2xl font-bold text-foreground">2</span>
          </div>
          <h3 class="text-xl font-semibold">Borrow x-Tokens</h3>
          <p class="opacity-60">
            Instantly borrow up to 90% of your deposit as synthetic x-tokens.
            No credit checks, no KYC, no restrictions.
          </p>
        </div>

        <div class="text-center space-y-4">
          <div class="w-16 h-16 mx-auto rounded-full bg-secondary border border-border flex items-center justify-center">
            <span class="text-2xl font-bold text-foreground">3</span>
          </div>
          <h3 class="text-xl font-semibold">Auto-Repay</h3>
          <p class="opacity-60">
            Yield from your collateral automatically repays your loan over time.
            Zero liquidation risk, ever.
          </p>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="space-y-8">
      <div class="text-center space-y-4">
        <h2 class="section-title">Why Liquid Protocol</h2>
        <p class="section-subtitle mx-auto">
          The most capital-efficient, risk-free way to leverage your crypto assets.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each features as feature}
          <div class="feature-card">
            <div class="text-3xl mb-4">{feature.icon}</div>
            <h3 class="text-lg font-semibold mb-2">{feature.title}</h3>
            <p class="text-sm opacity-60">{feature.description}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Yield Strategies Section -->
    <section class="space-y-8">
      <div class="text-center space-y-4">
        <h2 class="section-title">Multiple Yield Strategies</h2>
        <p class="section-subtitle mx-auto">
          Choose from battle-tested yield strategies to maximize your collateral's earning potential.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {#each ['wsteth', 'reth', 'sfrxeth', 'aave', 'yearn', 'morpho'] as protocol}
          <div class="feature-card text-center py-6">
            <img
              src="./images/icons/{protocol}.svg"
              alt="{protocol}"
              class="w-12 h-12 mx-auto mb-2 {$settings.invertColors ? 'filter invert' : ''}"
              on:error={(e) => e.target.style.display = 'none'}
            />
            <span class="text-sm font-medium uppercase">{protocol}</span>
          </div>
        {/each}
      </div>
    </section>

    <!-- Networks Section -->
    <section class="space-y-8">
      <div class="text-center space-y-4">
        <h2 class="section-title">Multi-Chain DeFi</h2>
        <p class="section-subtitle mx-auto">
          Available on LUX Network and expanding to major EVM chains.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        {#each [
          { name: 'LUX Network', icon: 'lux', active: true },
          { name: 'Zoo Network', icon: 'zoo', active: true },
          { name: 'Hanzo Network', icon: 'hanzo', active: true },
          { name: 'Ethereum', icon: 'ethereum', active: false },
          { name: 'Arbitrum', icon: 'arbitrum', active: false },
          { name: 'Optimism', icon: 'optimism', active: false },
        ] as network}
          <div
            class="feature-card flex items-center gap-3 px-6 {network.active ? '' : 'opacity-50'}"
          >
            <img
              src="./images/icons/{network.icon}.svg"
              alt="{network.name}"
              class="w-6 h-6"
              on:error={(e) => e.target.style.display = 'none'}
            />
            <span class="font-medium">{network.name}</span>
            {#if !network.active}
              <span class="text-xs opacity-50">(Coming)</span>
            {/if}
          </div>
        {/each}
      </div>
    </section>

    <!-- CTA Section -->
    <section class="text-center space-y-8 py-12 border-t border-white/10">
      <h2 class="section-title">Ready to unlock your future yield?</h2>
      <p class="section-subtitle mx-auto">
        Join thousands of users earning yield while accessing liquidity without selling their assets.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <button class="cta-button" on:click={() => routerGuard('vaults')}>
          Launch App
        </button>
        <a
          href="https://docs.lux.finance"
          target="_blank"
          rel="noopener noreferrer"
          class="secondary-button inline-block"
        >
          Read the Docs
        </a>
      </div>
    </section>

  </div>
</ViewContainer>
