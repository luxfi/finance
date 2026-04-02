import { writable } from 'svelte/store';

const contracts = writable({
  chainId: undefined,
  lux: {
    alchemist: {
      address: undefined,
      eth: undefined,
      dai: undefined,
    },
    transmuter: {
      address: undefined,
      vaultAdapter: undefined,
      eth: undefined,
      dai: undefined,
      yearnEthVaultAdapter: undefined,
    },
    token: {
      lEth: undefined,
      lUsd: undefined,
      lux: undefined,
      wEth: undefined,
      dai: undefined,
      luxEthSlp: undefined,
    },
    pool: {
      staking: undefined,
    },
  },
  yearn: {
    vaultAdapter: {
      address: undefined,
      eth: undefined,
    },
  },
  curve: {
    gauge: {
      lUsd: undefined,
    },
    minter: undefined,
    rewarder: undefined,
    pool: {
      lUsd: undefined,
    },
  },
  sushi: {
    pool: undefined,
    mcv2: undefined,
    mcv1: undefined,
    onsenRewarder: {
      lux: undefined,
    },
  },
  saddle: {
    pool: {
      lEth: undefined,
    },
  },
});

export default contracts;
