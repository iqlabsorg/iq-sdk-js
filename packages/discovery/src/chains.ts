import { IQChains } from './types';

// Add new chains here to make the available via discovery services.
// see: https://github.com/ethereum-lists/chains
export const chains: IQChains = {
  'eip155:56': {
    name: 'Binance Smart Chain Mainnet',
    chain: 'BSC',
    network: 'mainnet',
    rpc: [
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed2.binance.org',
      'https://bsc-dataseed3.binance.org',
      'https://bsc-dataseed4.binance.org',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed2.defibit.io',
      'https://bsc-dataseed3.defibit.io',
      'https://bsc-dataseed4.defibit.io',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed2.ninicoin.io',
      'https://bsc-dataseed3.ninicoin.io',
      'https://bsc-dataseed4.ninicoin.io',
      'wss://bsc-ws-node.nariox.org',
    ],
    faucets: [],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18,
    },
    infoURL: 'https://www.binance.org',
    shortName: 'bnb',
    chainId: 56,
    networkId: 56,
    explorers: [
      {
        name: 'bscscan',
        url: 'https://bscscan.com',
        standard: 'EIP3091',
      },
    ],
  },
  'eip155:97': {
    name: 'Binance Smart Chain Testnet',
    chain: 'BSC',
    network: 'Chapel',
    rpc: [
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
      'https://data-seed-prebsc-1-s2.binance.org:8545',
      'https://data-seed-prebsc-2-s2.binance.org:8545',
      'https://data-seed-prebsc-1-s3.binance.org:8545',
      'https://data-seed-prebsc-2-s3.binance.org:8545',
    ],
    faucets: ['https://testnet.binance.org/faucet-smart'],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'tBNB',
      decimals: 18,
    },
    infoURL: 'https://testnet.binance.org/',
    shortName: 'bnbt',
    chainId: 97,
    networkId: 97,
    explorers: [
      {
        name: 'bscscan-testnet',
        url: 'https://testnet.bscscan.com',
        standard: 'EIP3091',
      },
    ],
  },
  'eip155:80001': {
    name: 'Polygon Testnet Mumbai',
    chain: 'Polygon',
    network: 'testnet',
    rpc: [
      'https://matic-mumbai.chainstacklabs.com',
      'https://rpc-mumbai.maticvigil.com',
      'https://matic-testnet-archive-rpc.bwarelabs.com',
    ],
    faucets: ['https://faucet.polygon.technology/'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    infoURL: 'https://polygon.technology/',
    shortName: 'maticmum',
    chainId: 80001,
    networkId: 80001,
    explorers: [
      {
        name: 'polygonscan',
        url: 'https://mumbai.polygonscan.com/',
        standard: 'EIP3091',
      },
    ],
  },
  'eip155:137': {
    name: 'Polygon Mainnet',
    chain: 'Polygon',
    network: 'mainnet',
    rpc: [
      'https://polygon-rpc.com/',
      'https://rpc-mainnet.matic.network',
      'https://matic-mainnet.chainstacklabs.com',
      'https://rpc-mainnet.maticvigil.com',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet-full-rpc.bwarelabs.com',
    ],
    faucets: [],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    infoURL: 'https://polygon.technology/',
    shortName: 'MATIC',
    chainId: 137,
    networkId: 137,
    explorers: [
      {
        name: 'polygonscan',
        url: 'https://polygonscan.com/',
        standard: 'EIP3091',
      },
    ],
  },
};
