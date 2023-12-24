<script>
  import { fade } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';
  import { _ } from 'svelte-i18n';
  import ViewContainer from '../components/elements/ViewContainer.svelte';
  import settings from '../stores/settings';
  import { routerGuard } from '@helpers/routerGuard.js';

  const playVideo = () => {
    window.open('https://www.youtube.com/embed/FlWP9FC8C3c?autoplay=1', '_blank');
  };

  let assets = [
    {
      name: 'ETH',
      ltv: '50',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      price: '',
    },
    {
      name: 'WSTETH',
      ltv: '50',
      address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
      price: '',
    },
    {
      name: 'RETH',
      ltv: '50',
      address: '0xae78736Cd615f374D3085123A210448E74Fc6393',
      price: '',
    },
    {
      name: 'DAI',
      ltv: '50',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      price: '',
    },
    {
      name: 'USDC',
      ltv: '50',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      price: '',
    },
    {
      name: 'USDT',
      ltv: '50',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      price: '',
    },
  ];

  let carouselItems = ['intro_subtitle_0', 'intro_subtitle_1', 'intro_subtitle_2'];
  let carouselItem = carouselItems[0];

  let carouselTimer;

  function carousel() {
    carouselTimer = setTimeout(() => {
      const index = carouselItems.findIndex((entry) => entry === carouselItem);
      const isLast = index + 1 === carouselItems.length;
      if (isLast) {
        carouselItem = carouselItems[0];
      } else {
        carouselItem = carouselItems[index + 1];
      }
      carousel();
    }, 5000);
  }

  onMount(() => {
    carousel();
  });

  onDestroy(() => {
    clearTimeout(carouselTimer);
  });
</script>

<style>
  .glow {
    box-shadow: 0 0 15px 0 rgba(245, 192, 154, 0.5);
  }

  .glow:hover {
    box-shadow: 0 0 15px 9px rgba(245, 192, 154, 0.6);
  }
</style>

<ViewContainer>
  <div class="flex flex-col space-y-14">
    <p class="text-center opacity-50 font-thin text-3xl" transition:fade>
      {$_(`landing.${carouselItem}`)}
    </p>

    <div class="flex justify-center">
      <button
        class="glow
        h-max
        w-max
        font-alcxTitles
        px-4
        py-2
        text-xl
        rounded-lg
        border-2
        border-orange4
        transition-all
        tracking-wider"
        on:click="{() => routerGuard('vaults')}"
      >
        <span class="flex flex-row space-x-4 self-center content-center h-max text-orange4">
          <span class="self-center {$settings.invertColors ? 'text-white2inverse' : 'text-white2'}"
            >{$_('landing.button_label')}</span
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 self-center"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"
            ></path>
          </svg>
        </span>
      </button>
    </div>

    <div class="w-full flex flex-col">
      <img
        class="w-3/4 self-center {$settings.invertColors ? 'filter invert' : ''}"
        src="./images/landing-page/diagram.svg"
        alt="A diagram depicting the possibilities of Lux"
      />
      <a class="text-center underline" href="https://luxdefi.gitbook.io/v2/">{$_('landing.learn_more')}</a>
    </div>

    <div
      class="w-full border-t border-b {$settings.invertColors
        ? 'border-grey5inverse'
        : 'border-grey5'} flex flex-col space-y-4 py-8"
    >
      <p class="text-center font-alcxTitles text-3xl opacity-75">{$_('landing.leverage_headline')}</p>
      <div class="flex flex-col lg:flex-row gap-2 justify-center">
        {#each assets as asset}
          <div
            class="flex flex-row space-x-4 lg:w-max w-full border {$settings.invertColors
              ? 'border-grey1inverse bg-grey15inverse'
              : 'border-grey1 bg-grey15'} p-4 rounded-lg"
          >
            <img src="./images/icons/{asset.name.toLowerCase()}.svg" class="w-16" alt="{asset.name} Logo" />
            <div>
              <p>{asset.name}</p>
              <p>
                {asset.price}
              </p>
              <p>{asset.ltv}% LTV</p>
            </div>
          </div>
        {/each}
      </div>
      <a class="text-center underline" href="https://luxdefi.gitbook.io/v2/">{$_('landing.learn_more')}</a>
    </div>

    <div class="w-full flex flex-col space-y-4">
      <p class="text-center font-alcxTitles text-3xl opacity-75">{$_('landing.benefits_headline')}</p>
      <div class="flex flex-col md:flex-row w-full">
        <div
          class="flex-1 p-4 pb-16 border {$settings.invertColors
            ? 'border-grey1inverse bg-grey15inverse'
            : 'border-grey1 bg-grey15'} flex flex-col space-y-4 relative"
        >
          <p class="text-2xl font-light font-alcxTitles text-orange4">
            {$_('landing.benefit_leverage_title')}
          </p>
          <p class="font-light text-lg opacity-75 mb">{$_('landing.benefit_leverage_blurb')}</p>
          <a href="https://luxdefi.gitbook.io/v2/" class="text-center absolute bottom-4 inset-x-0 underline"
            >{$_('landing.learn_more')}</a
          >
        </div>
        <div
          class="flex-1 p-4 pb-16 border {$settings.invertColors
            ? 'border-grey1inverse bg-grey15inverse'
            : 'border-grey1 bg-grey15'} flex flex-col space-y-4 relative"
        >
          <p class="text-2xl font-light font-alcxTitles text-orange4">{$_('landing.benefit_range_title')}</p>
          <p class="font-light text-lg opacity-75">{$_('landing.benefit_range_blurb')}</p>
          <a href="https://luxdefi.gitbook.io/v2/" class="absolute bottom-4 inset-x-0 text-center underline"
            >{$_('landing.learn_more')}</a
          >
        </div>
        <div
          class="flex-1 p-4 pb-16 border {$settings.invertColors
            ? 'border-grey1inverse bg-grey15inverse'
            : 'border-grey1 bg-grey15'} flex flex-col space-y-4 relative"
        >
          <p class="text-2xl font-light font-alcxTitles text-orange4">
            {$_('landing.benefit_liquidations_title')}
          </p>
          <p class="font-light text-lg opacity-75">{$_('landing.benefit_liquidations_blurb')}</p>
          <a href="https://luxdefi.gitbook.io/v2/" class="text-center absolute inset-x-0 bottom-4 underline"
            >{$_('landing.learn_more')}</a
          >
        </div>
        <div
          class="flex-1 p-4 pb-16 border {$settings.invertColors
            ? 'border-grey1inverse bg-grey15inverse'
            : 'border-grey1 bg-grey15'} flex flex-col space-y-4 relative"
        >
          <p class="text-2xl font-light font-alcxTitles text-orange4">
            {$_('landing.benefit_flexible_title')}
          </p>
          <p class="font-light text-lg opacity-75">{$_('landing.benefit_flexible_blurb')}</p>
          <a href="https://luxdefi.gitbook.io/v2/" class="text-center absolute bottom-4 inset-x-0 underline"
            >{$_('landing.learn_more')}</a
          >
        </div>
      </div>
    </div>

    <div class="flex justify-center text-bronze4">
      <button
        class="glow
        h-max
        w-max
        font-alcxTitles
        px-4
        py-2
        text-xl
        rounded-lg
        border-2
        border-orange4
        transition-all
        tracking-wider"
        on:click="{() => routerGuard('vaults')}"
      >
        <span class="flex flex-row space-x-4 self-center content-center h-max text-orange4">
          <span class="self-center {$settings.invertColors ? 'text-white2inverse' : 'text-white2'}"
            >{$_('landing.button_label')}</span
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 self-center"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
</ViewContainer>
