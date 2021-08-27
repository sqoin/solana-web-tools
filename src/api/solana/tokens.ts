// import { TokenAmount } from '@/utils/safe-math'
// import { cloneDeep } from 'lodash-es'

// export interface TokenInfo {
//   name: string
//   longName: string

//   mintAddress: string
//   decimals: number
//   totalSupply?: TokenAmount

//   address?: string

//   details?: string
//   docs?: object
//   socials?: object

//   tokenAccountAddress?: string
//   balance?: TokenAmount
// }

// /**
//  * Get token use name

//  * @param {string} name

//  * @returns {TokenInfo | null} tokenInfo
//  */
// export function getTokenByname(name: string): TokenInfo | null {
//   if (name === 'SOL') {
//     return cloneDeep(NATIVE_SOL)
//   }

//   let token = cloneDeep(TOKENS[name])

//   if (!token) {
//     token = null
//   }

//   return token
// }

// /**
//  * Get token use mint addresses

//  * @param {string} mintAddress

//  * @returns {TokenInfo | null} tokenInfo
//  */
// export function getTokenByMintAddress(mintAddress: string): TokenInfo | null {
//   if (mintAddress === NATIVE_SOL.mintAddress) {
//     return cloneDeep(NATIVE_SOL)
//   }

//   let token = null

//   for (const name of Object.keys(TOKENS)) {
//     const info = cloneDeep(TOKENS[name])

//     if (info.mintAddress === mintAddress) {
//       token = info
//     }
//   }

//   return token
// }

interface Tokens {
  [key: string]: any
  [index: number]: any
}

// export const NATIVE_SOL: TokenInfo = {
//   name: 'SOL',
//   longName: 'Native Solana',
//   mintAddress: '11111111111111111111111111111111',
//   decimals: 9
// }

export const TOKENS: Tokens = {
  WSOL: {
    name: 'WSOL',
    longName: 'Wrapped Solana',
    mintAddress: 'So11111111111111111111111111111111111111112',
    decimals: 9,
    address: 'HTcarLHe7WRxBQCWvhVB8AP56pnEtJUV2jDGvcpY3xo5'
  },
  BTC: {
    name: 'BTC',
    longName: 'Wrapped Bitcoin',
    mintAddress: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
    decimals: 6,
    address: 'GZpS8cY8Nt8HuqxzJh6PXTdSxc38vFUjBmi7eEUkkQtG'
  },
  ETH: {
    name: 'ETH',
    longName: 'Wrapped Ethereum',
    mintAddress: '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk',
    decimals: 6,
    address: 'CXPTcSxxh4AT38gtv3SPbLS7oZVgXzLbMb83o4ziXjjN'
  },
  USDT: {
    name: 'USDT',
    longName: 'USDT',
    mintAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    decimals: 6,
    address: '8DwwDNagph8SdwMUdcXS5L9YAyutTyDJmK6cTKrmNFk3'
  },
  WUSDT: {
    name: 'WUSDT',
    longName: 'Wrapped USDT',
    mintAddress: 'BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4',
    decimals: 6,
    address: 'CA98hYunCLKgBuD6N8MJSgq1GbW9CXdksLf5mw736tS3'
  },
  USDC: {
    name: 'USDC',
    longName: 'USDC',
    mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
    address: '92vdtNjEg6Zth3UU1MgPgTVFjSEzTHx66aCdqWdcRkrg'
  },
  WUSDC: {
    name: 'WUSDC',
    longName: 'Wrapped USDC',
    mintAddress: 'BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW',
    decimals: 6
  },
  YFI: {
    name: 'YFI',
    longName: 'Wrapped YFI',
    mintAddress: '3JSf5tPeuscJGtaCp5giEiDhv51gQ4v3zWg8DGgyLfAB',
    decimals: 6,
    address: 'DZjgzKfYzZBBSTo5vytMYvGdNF933DvuX8TftDMrThrb'
  },
  LINK: {
    name: 'LINK',
    longName: 'Wrapped Chainlink',
    mintAddress: 'CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG',
    decimals: 6,
    address: 'DRSKKsYZaPEFkRgGywo7KWBGZikf71R9aDr8tjtpr41V'
  },
  XRP: {
    name: 'XRP',
    longName: 'Wrapped XRP',
    mintAddress: 'Ga2AXHpfAF6mv2ekZwcsJFqu7wB4NV331qNH7fW9Nst8',
    decimals: 6,
    address: '6NeHPXG142tAE2Ej3gHgT2N66i1KH6PFR6PBZw6RyrwH'
  },
  SUSHI: {
    name: 'SUSHI',
    longName: 'Wrapped SUSHI',
    mintAddress: 'AR1Mtgh7zAtxuxGd2XPovXPVjcSdY3i4rQYisNadjfKy',
    decimals: 6,
    address: '59QxHeHgb28tDc3gStnrW8FNKC9qWuRmRZHBaAqCerJX'
  },
  ALEPH: {
    name: 'ALEPH',
    longName: 'Wrapped ALEPH',
    mintAddress: 'CsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K',
    decimals: 6,
    address: '8FKAKrenJMDd7V6cxnM5BsymHTjqxgodtHbLwZReMnWW'
  },
  SXP: {
    name: 'SXP',
    longName: 'Wrapped SXP',
    mintAddress: 'SF3oTvfWzEP3DTwGSvUXRrGTvr75pdZNnBLAH9bzMuX',
    decimals: 6,
    address: '97Vyotr284UM2Fyq9gbfQ3azMYtgf7cjnsf8pN1PFfY9'
  },
  HGET: {
    name: 'HGET',
    longName: 'Wrapped HGET',
    mintAddress: 'BtZQfWqDGbk9Wf2rXEiWyQBdBY1etnUUn6zEphvVS7yN',
    decimals: 6,
    address: 'AGY2wy1ANzLM2jJLSkVxPUYAY5iAYXYsLMQkoQsAhucj'
  },
  CREAM: {
    name: 'CREAM',
    longName: 'Wrapped CREAM',
    mintAddress: '5Fu5UUgbjpUvdBveb3a1JTNirL8rXtiYeSMWvKjtUNQv',
    decimals: 6,
    address: '7WPzEiozJ69MQe8bfbss1t2unR6bHR4S7FimiUVRgu7P'
  },
  UBXT: {
    name: 'UBXT',
    longName: 'Wrapped UBXT',
    mintAddress: '873KLxCbz7s9Kc4ZzgYRtNmhfkQrhfyWGZJBmyCbC3ei',
    decimals: 6,
    address: '9aocFzNkSVj9TCS6cJk2uYyuzEpXPWT7xoBBF9JcZ879'
  },
  HNT: {
    name: 'HNT',
    longName: 'Wrapped HNT',
    mintAddress: 'HqB7uswoVg4suaQiDP3wjxob1G5WdZ144zhdStwMCq7e',
    decimals: 6,
    address: 'B61oHrGCFh8P75Z2cRDiw2nbEwbMyhVfZhMWiwxU2qCV'
  },
  FRONT: {
    name: 'FRONT',
    longName: 'Wrapped FRONT',
    mintAddress: '9S4t2NEAiJVMvPdRYKVrfJpBafPBLtvbvyS3DecojQHw',
    decimals: 6,
    address: 'FnasnCc7c43hd2nanSmRjh9Sf9Cgz6aEvNj6wpDznS5h'
  },
  AKRO: {
    name: 'AKRO',
    longName: 'Wrapped AKRO',
    mintAddress: '6WNVCuxCGJzNjmMZoKyhZJwvJ5tYpsLyAtagzYASqBoF',
    decimals: 6,
    address: 'FihBmWJbiLSEvq4QZpPPdjokdMgxqq6pESZ7oMkE1qJH'
  },
  HXRO: {
    name: 'HXRO',
    longName: 'Wrapped HXRO',
    mintAddress: 'DJafV9qemGp7mLMEn5wrfqaFwxsbLgUsGVS16zKRk9kc',
    decimals: 6,
    address: '4NgrGZDRCzyqiwYvKPEePTKfQXtWzKmSDBoZJjRw6wNC'
  },
  UNI: {
    name: 'UNI',
    longName: 'Wrapped UNI',
    mintAddress: 'DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw',
    decimals: 6,
    address: '4ntxDv95ajBbXfZyGy3UhcQDx8xmH1yJ6eKvuNNH466x'
  },
  SRM: {
    name: 'SRM',
    longName: 'Serum',
    mintAddress: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
    decimals: 6,
    address: 'HYxa4Ea1dz7ya17Cx18rEGUA1WbCvKjXjFKrnu8CwugH'
  },
  FTT: {
    name: 'FTT',
    longName: 'Wrapped FTT',
    mintAddress: 'AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3',
    decimals: 6,
    address: 'CafpgSh8KGL2GPTjdXfctD3vXngNZDJ3Q92FTfV71Hmt'
  },
  MSRM: {
    name: 'MSRM',
    longName: 'MegaSerum',
    mintAddress: 'MSRMcoVyrFxnSgo5uXwone5SKcGhT1KEJMFEkMEWf9L',
    decimals: 0,
    address: 'Ge5q9x8gDUNYqqLA1MdnCzWNJGsbj3M15Yxse2cDbw9z'
  },
  TOMO: {
    name: 'TOMO',
    longName: 'Wrapped TOMO',
    mintAddress: 'GXMvfY2jpQctDqZ9RoU3oWPhufKiCcFEfchvYumtX7jd',
    decimals: 6,
    address: '9fexfN3eZomF5gfenG5L9ydbKRQkPhq6x74rb5iLrvXP'
  },
  KARMA: {
    name: 'KARMA',
    longName: 'Wrapped KARMA',
    mintAddress: 'EcqExpGNFBve2i1cMJUTR4bPXj4ZoqmDD2rTkeCcaTFX',
    decimals: 4
  },
  LUA: {
    name: 'LUA',
    longName: 'Wrapped LUA',
    mintAddress: 'EqWCKXfs3x47uVosDpTRgFniThL9Y8iCztJaapxbEaVX',
    decimals: 6,
    address: 'HuZwNApjVFuFSDgrwZA8GP2JD7WMby4qt6rkWDnaMo7j'
  },
  MATH: {
    name: 'MATH',
    longName: 'Wrapped MATH',
    mintAddress: 'GeDS162t9yGJuLEHPWXXGrb1zwkzinCgRwnT8vHYjKza',
    decimals: 6,
    address: 'C9K1M8sJX8WMdsnFT7DuzdiHHunEj79EsLuz4DixQYGm'
  },
  KEEP: {
    name: 'KEEP',
    longName: 'Wrapped KEEP',
    mintAddress: 'GUohe4DJUA5FKPWo3joiPgsB7yzer7LpDmt1Vhzy3Zht',
    decimals: 6
  },
  SWAG: {
    name: 'SWAG',
    longName: 'Wrapped SWAG',
    mintAddress: '9F9fNTT6qwjsu4X4yWYKZpsbw5qT7o6yR2i57JF2jagy',
    decimals: 6
  },
  FIDA: {
    name: 'FIDA',
    longName: 'Bonfida',
    mintAddress: 'EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp',
    decimals: 6,
    address: 'AeAsG75UmyPDB271c6NHonHxXAPXfkvhcf2xjfJhReS8'
  },
  KIN: {
    name: 'KIN',
    longName: 'KIN',
    mintAddress: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
    decimals: 5,
    address: 'AevFXmApVxN2yk1iemSxXc6Wy7Z1udUEfST11kuYKmr9'
  },
  MAPS: {
    name: 'MAPS',
    longName: 'MAPS',
    mintAddress: 'MAPS41MDahZ9QdKXhVa4dWB9RuyfV4XqhyAZ8XcYepb',
    decimals: 6
  },
  OXY: {
    name: 'OXY',
    longName: 'OXY',
    mintAddress: 'z3dn17yLaGMKffVogeFHQ9zWVcXgqgf3PQnDsNs2g6M',
    decimals: 6
  },
  RAY: {
    name: 'RAY',
    longName: 'Raydium',
    mintAddress: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    decimals: 6,
    address: '33XpMmMQRf6tSPpmYyzpwU4uXpZHkFwCZsusD9dMYkjy'
  },
  COPE: {
    name: 'COPE',
    longName: 'COPE',
    mintAddress: '3K6rftdAaQYMPunrtNRHgnK2UAtjm2JwyT2oCiTDouYE',
    decimals: 0,
    address: '8DTehuES4tfnd2SrqcjN52XofxWXGjiLZRgM12U9pB6f'
  },
  STEP: {
    name: 'STEP',
    longName: 'STEP',
    mintAddress: 'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT',
    decimals: 9,
    address: 'EFQVX1S6dFroDDhJDAnMTX4fCfjt4fJXHdk1eEtJ2uRY'
  },
  MEDIA: {
    name: 'MEDIA',
    longName: 'MEDIA',
    mintAddress: 'ETAtLmCmsoiEEKfNrHKJ2kYy3MoABhU6NQvpSfij5tDs',
    decimals: 6,
    address: 'AYnaG3AidNWFzjq9U3BJSsQ9DShE8g7FszriBDtRFvsx',

    details:
      'Media Network is a new protocol that bypasses traditional CDN providers’ centralized approach for a self-governed and open source solution where everyone can participate. Media Network creates a distributed bandwidth market that enables service providers such as media platforms to hire resources from the network and dynamically come and go as the demand for last-mile data delivery shifts. It allows anyone to organically serve content without introducing any trust assumptions or pre-authentication requirements. Participants earn MEDIA rewards for their bandwidth contributions, a fixed supply SPL token minted on Solana’s Blockchain.',
    docs: {
      website: 'https://media.network/',
      whitepaper: 'https://media.network/whitepaper.pdf'
    },
    socials: {
      Twitter: 'https://twitter.com/Media_FDN',
      Telegram: 'https://t.me/Media_FDN',
      Medium: 'https://mediafoundation.medium.com/'
    }
  },
  ROPE: {
    name: 'ROPE',
    longName: 'ROPE',
    mintAddress: '8PMHT4swUMtBzgHnh5U564N5sjPSiUz2cjEQzFnnP1Fo',
    decimals: 9,
    address: '5sGVVniBSPLTwRHDETShovq7STRH2rJwbvdvvH3NcVTF'
  },
  MER: {
    name: 'MER',
    longName: 'Mercurial',
    mintAddress: '2nkxLptGxQCfaar541Cr87G4v6VuA6BvVWqxsHNVCYoA',
    decimals: 6,
    address: '5sGVVniBSPLTwRHDETShovq7STRH2rJwbvdvvH3NcVTF',

    details:
      'Mercurial Finance\nMercurial is building DeFi’s first dynamic vaults for stable assets on Solana, providing the technical tools for users to easily deposit, swap and mint stable assets.\n\nInnovations\nMercurial will be introducing several key new technical innovations, including on-chain algorithms to regulate the flow of assets and dynamic fees that tap on the market and price data to assist LPs in optimizing performance. We will also be developing a unique pricing curve that will be the first to combine high efficiency, multi-token support, and generalizability for all types of token sets.\n\nMaximizing Capital Utlilization\nMercurial vaults will dynamically utilize assets for a wide range of use cases, like low slippage swaps, lending, flash loans, and external third-party decentralized protocols. To increase pegged assets availability on Solana, we will allow the creation of synthetics, like mUSD or mBTC, which can be added to our vaults to improve liquidity for other stables and facilitate interaction with other third-party decentralized protocols.\n\nStarting with a vault for the most common stables, for example, USDC, USDT, wUSDC, and wDAI, we will be facilitating low slippage swaps with dynamic fees. Features will be added as key technical and ecosystem pieces become available on Solana, i.e. inter-program composability, price oracles, etc.\n\nMER\nThe MER token will be used to accrue value for the holder via fees from swaps, commission from yield farms, and as collateral for synthetic stables like mUSD. MER will also be intrinsically linked to the governance and growth of Mercurial, playing a crucial role in regulating the system across governance, insurance, and bootstrapping.',
    docs: {
      website: 'https://www.mercurial.finance/',
      whitepaper: 'https://www.mercurial.finance/Mercurial-Lite-Paper-v1.pdf'
    },
    socials: {
      Twitter: 'https://twitter.com/MercurialFi',
      Telegram: 'https://t.me/MercurialFi',
      Medium: 'https://mercurialfi.medium.com/'
    }
  }
}

// export const LP_TOKENS: Tokens = {
//   'RAY-WUSDT': {
//     name: 'RAY-WUSDT',
//     longName: 'RAY-WUSDT V2 LP',
//     coin: { ...TOKENS.RAY },
//     pc: { ...TOKENS.WUSDT },

//     mintAddress: 'CzPDyvotTcxNqtPne32yUiEVQ6jk42HZi1Y3hUu7qf7f',
//     decimals: TOKENS.RAY.decimals
//   },
//   'RAY-SOL': {
//     name: 'RAY-SOL',
//     longName: 'RAY-SOL LP',
//     coin: { ...TOKENS.RAY },
//     pc: { ...NATIVE_SOL },

//     mintAddress: '134Cct3CSdRCbYgq5SkwmHgfwjJ7EM5cG9PzqffWqECx',
//     decimals: TOKENS.RAY.decimals
//   },
//   'LINK-WUSDT': {
//     name: 'LINK-WUSDT',
//     longName: 'LINK-WUSDT LP',
//     coin: { ...TOKENS.LINK },
//     pc: { ...TOKENS.WUSDT },

//     mintAddress: 'EVDmwajM5U73PD34bYPugwiA4Eqqbrej4mLXXv15Z5qR',
//     decimals: TOKENS.LINK.decimals
//   },
//   'ETH-WUSDT': {
//     name: 'ETH-WUSDT',
//     longName: 'ETH-WUSDT LP',
//     coin: { ...TOKENS.ETH },
//     pc: { ...TOKENS.WUSDT },

//     mintAddress: 'KY4XvwHy7JPzbWYAbk23jQvEb4qWJ8aCqYWREmk1Q7K',
//     decimals: TOKENS.ETH.decimals
//   },
//   'RAY-USDC': {
//     name: 'RAY-USDC',
//     longName: 'RAY-USDC LP',
//     coin: { ...TOKENS.RAY },
//     pc: { ...TOKENS.USDC },

//     mintAddress: 'FgmBnsF5Qrnv8X9bomQfEtQTQjNNiBCWRKGpzPnE5BDg',
//     decimals: TOKENS.RAY.decimals
//   },
//   'RAY-SRM': {
//     name: 'RAY-SRM',
//     longName: 'RAY-SRM LP',
//     coin: { ...TOKENS.RAY },
//     pc: { ...TOKENS.SRM },

//     mintAddress: '5QXBMXuCL7zfAk39jEVVEvcrz1AvBGgT9wAhLLHLyyUJ',
//     decimals: TOKENS.RAY.decimals
//   },
//   // v3
//   'RAY-WUSDT-V3': {
//     name: 'RAY-WUSDT',
//     longName: 'RAY-WUSDT V3 LP',
//     coin: { ...TOKENS.RAY },
//     pc: { ...TOKENS.WUSDT },

//     mintAddress: 'FdhKXYjCou2jQfgKWcNY7jb8F2DPLU1teTTTRfLBD2v1',
//     decimals: TOKENS.RAY.decimals
//   },
//   'RAY-USDC-V3': {
//     name: 'RAY-USDC',
//     longName: 'RAY-USDC LP',
//     coin: { ...TOKENS.RAY },
//     pc: { ...TOKENS.USDC },

//     mintAddress: 'BZFGfXMrjG2sS7QT2eiCDEevPFnkYYF7kzJpWfYxPbcx',
//     decimals: TOKENS.RAY.decimals
//   },
//   'RAY-SRM-V3': {
//     name: 'RAY-SRM',
//     longName: 'RAY-SRM LP',
//     coin: { ...TOKENS.RAY },
//     pc: { ...TOKENS.SRM },

//     mintAddress: 'DSX5E21RE9FB9hM8Nh8xcXQfPK6SzRaJiywemHBSsfup',
//     decimals: TOKENS.RAY.decimals
//   },
//   'RAY-SOL-V3': {
//     name: 'RAY-SOL',
//     longName: 'RAY-SOL LP',
//     coin: { ...TOKENS.RAY },
//     pc: { ...NATIVE_SOL },

//     mintAddress: 'F5PPQHGcznZ2FxD9JaxJMXaf7XkaFFJ6zzTBcW8osQjw',
//     decimals: TOKENS.RAY.decimals
//   },
//   'RAY-ETH-V3': {
//     name: 'RAY-ETH',
//     longName: 'RAY-ETH LP',
//     coin: { ...TOKENS.RAY },
//     pc: { ...TOKENS.ETH },

//     mintAddress: '8Q6MKy5Yxb9vG1mWzppMtMb2nrhNuCRNUkJTeiE3fuwD',
//     decimals: TOKENS.RAY.decimals
//   },
//   // v4
//   'FIDA-RAY-V4': {
//     name: 'FIDA-RAY',
//     longName: 'FIDA-RAY LP',
//     coin: { ...TOKENS.FIDA },
//     pc: { ...TOKENS.RAY },

//     mintAddress: 'DsBuznXRTmzvEdb36Dx3aVLVo1XmH7r1PRZUFugLPTFv',
//     decimals: TOKENS.FIDA.decimals
//   },
//   'OXY-RAY-V4': {
//     name: 'OXY-RAY',
//     longName: 'OXY-RAY LP',
//     coin: { ...TOKENS.OXY },
//     pc: { ...TOKENS.RAY },

//     mintAddress: 'FwaX9W7iThTZH5MFeasxdLpxTVxRcM7ZHieTCnYog8Yb',
//     decimals: TOKENS.OXY.decimals
//   },
//   'MAPS-RAY-V4': {
//     name: 'MAPS-RAY',
//     longName: 'MAPS-RAY LP',
//     coin: { ...TOKENS.MAPS },
//     pc: { ...TOKENS.RAY },

//     mintAddress: 'CcKK8srfVdTSsFGV3VLBb2YDbzF4T4NM2C3UEjC39RLP',
//     decimals: TOKENS.MAPS.decimals
//   },
//   'KIN-RAY-V4': {
//     name: 'KIN-RAY',
//     longName: 'KIN-RAY LP',
//     coin: { ...TOKENS.KIN },
//     pc: { ...TOKENS.RAY },

//     mintAddress: 'CHT8sft3h3gpLYbCcZ9o27mT5s3Z6VifBVbUiDvprHPW',
//     decimals: 6
//   },
//   'RAY-USDT-V4': {
//     name: 'RAY-USDT',
//     longName: 'RAY-USDT LP',
//     coin: { ...TOKENS.RAY },
//     pc: { ...TOKENS.USDT },

//     mintAddress: 'C3sT1R3nsw4AVdepvLTLKr5Gvszr7jufyBWUCvy4TUvT',
//     decimals: TOKENS.RAY.decimals
//   },
//   'SOL-USDC-V4': {
//     name: 'SOL-USDC',
//     longName: 'SOL-USDC LP',
//     coin: { ...NATIVE_SOL },
//     pc: { ...TOKENS.USDC },

//     mintAddress: '8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu',
//     decimals: NATIVE_SOL.decimals
//   },
//   'YFI-USDC-V4': {
//     name: 'YFI-USDC',
//     longName: 'YFI-USDC LP',
//     coin: { ...TOKENS.YFI },
//     pc: { ...TOKENS.USDC },

//     mintAddress: '865j7iMmRRycSYUXzJ33ZcvLiX9JHvaLidasCyUyKaRE',
//     decimals: TOKENS.YFI.decimals
//   },
//   'SRM-USDC-V4': {
//     name: 'SRM-USDC',
//     longName: 'SRM-USDC LP',
//     coin: { ...TOKENS.SRM },
//     pc: { ...TOKENS.USDC },

//     mintAddress: '9XnZd82j34KxNLgQfz29jGbYdxsYznTWRpvZE3SRE7JG',
//     decimals: TOKENS.SRM.decimals
//   },
//   'FTT-USDC-V4': {
//     name: 'FTT-USDC',
//     longName: 'FTT-USDC LP',
//     coin: { ...TOKENS.FTT },
//     pc: { ...TOKENS.USDC },

//     mintAddress: '75dCoKfUHLUuZ4qEh46ovsxfgWhB4icc3SintzWRedT9',
//     decimals: TOKENS.FTT.decimals
//   },
//   'BTC-USDC-V4': {
//     name: 'BTC-USDC',
//     longName: 'BTC-USDC LP',
//     coin: { ...TOKENS.BTC },
//     pc: { ...TOKENS.USDC },

//     mintAddress: '2hMdRdVWZqetQsaHG8kQjdZinEMBz75vsoWTCob1ijXu',
//     decimals: TOKENS.BTC.decimals
//   },
//   'SUSHI-USDC-V4': {
//     name: 'SUSHI-USDC',
//     longName: 'SUSHI-USDC LP',
//     coin: { ...TOKENS.SUSHI },
//     pc: { ...TOKENS.USDC },

//     mintAddress: '2QVjeR9d2PbSf8em8NE8zWd8RYHjFtucDUdDgdbDD2h2',
//     decimals: TOKENS.SUSHI.decimals
//   },
//   'TOMO-USDC-V4': {
//     name: 'TOMO-USDC',
//     longName: 'TOMO-USDC LP',
//     coin: { ...TOKENS.TOMO },
//     pc: { ...TOKENS.USDC },

//     mintAddress: 'CHyUpQFeW456zcr5XEh4RZiibH8Dzocs6Wbgz9aWpXnQ',
//     decimals: TOKENS.TOMO.decimals
//   },
//   'LINK-USDC-V4': {
//     name: 'LINK-USDC',
//     longName: 'LINK-USDC LP',
//     coin: { ...TOKENS.LINK },
//     pc: { ...TOKENS.USDC },

//     mintAddress: 'BqjoYjqKrXtfBKXeaWeAT5sYCy7wsAYf3XjgDWsHSBRs',
//     decimals: TOKENS.LINK.decimals
//   },
//   'ETH-USDC-V4': {
//     name: 'ETH-USDC',
//     longName: 'ETH-USDC LP',
//     coin: { ...TOKENS.ETH },
//     pc: { ...TOKENS.USDC },

//     mintAddress: '13PoKid6cZop4sj2GfoBeujnGfthUbTERdE5tpLCDLEY',
//     decimals: TOKENS.ETH.decimals
//   },
//   'COPE-USDC-V4': {
//     name: 'COPE-USDC',
//     longName: 'COPE-USDC LP',
//     coin: { ...TOKENS.COPE },
//     pc: { ...TOKENS.USDC },

//     mintAddress: '2Vyyeuyd15Gp8aH6uKE72c4hxc8TVSLibxDP9vzspQWG',
//     decimals: TOKENS.COPE.decimals
//   },
//   'SOL-USDT-V4': {
//     name: 'SOL-USDT',
//     longName: 'SOL-USDT LP',
//     coin: { ...NATIVE_SOL },
//     pc: { ...TOKENS.USDT },

//     mintAddress: 'Epm4KfTj4DMrvqn6Bwg2Tr2N8vhQuNbuK8bESFp4k33K',
//     decimals: NATIVE_SOL.decimals
//   },
//   'YFI-USDT-V4': {
//     name: 'YFI-USDT',
//     longName: 'YFI-USDT LP',
//     coin: { ...TOKENS.YFI },
//     pc: { ...TOKENS.USDT },

//     mintAddress: 'FA1i7fej1pAbQbnY8NbyYUsTrWcasTyipKreDgy1Mgku',
//     decimals: TOKENS.YFI.decimals
//   },
//   'SRM-USDT-V4': {
//     name: 'SRM-USDT',
//     longName: 'SRM-USDT LP',
//     coin: { ...TOKENS.SRM },
//     pc: { ...TOKENS.USDT },

//     mintAddress: 'HYSAu42BFejBS77jZAZdNAWa3iVcbSRJSzp3wtqCbWwv',
//     decimals: TOKENS.SRM.decimals
//   },
//   'FTT-USDT-V4': {
//     name: 'FTT-USDT',
//     longName: 'FTT-USDT LP',
//     coin: { ...TOKENS.FTT },
//     pc: { ...TOKENS.USDT },

//     mintAddress: '2cTCiUnect5Lap2sk19xLby7aajNDYseFhC9Pigou11z',
//     decimals: TOKENS.FTT.decimals
//   },
//   'BTC-USDT-V4': {
//     name: 'BTC-USDT',
//     longName: 'BTC-USDT LP',
//     coin: { ...TOKENS.BTC },
//     pc: { ...TOKENS.USDT },

//     mintAddress: 'DgGuvR9GSHimopo3Gc7gfkbKamLKrdyzWkq5yqA6LqYS',
//     decimals: TOKENS.BTC.decimals
//   },
//   'SUSHI-USDT-V4': {
//     name: 'SUSHI-USDT',
//     longName: 'SUSHI-USDT LP',
//     coin: { ...TOKENS.SUSHI },
//     pc: { ...TOKENS.USDT },

//     mintAddress: 'Ba26poEYDy6P2o95AJUsewXgZ8DM9BCsmnU9hmC9i4Ki',
//     decimals: TOKENS.SUSHI.decimals
//   },
//   'TOMO-USDT-V4': {
//     name: 'TOMO-USDT',
//     longName: 'TOMO-USDT LP',
//     coin: { ...TOKENS.TOMO },
//     pc: { ...TOKENS.USDT },

//     mintAddress: 'D3iGro1vn6PWJXo9QAPj3dfta6dKkHHnmiiym2EfsAmi',
//     decimals: TOKENS.TOMO.decimals
//   },
//   'LINK-USDT-V4': {
//     name: 'LINK-USDT',
//     longName: 'LINK-USDT LP',
//     coin: { ...TOKENS.LINK },
//     pc: { ...TOKENS.USDT },

//     mintAddress: 'Dr12Sgt9gkY8WU5tRkgZf1TkVWJbvjYuPAhR3aDCwiiX',
//     decimals: TOKENS.LINK.decimals
//   },
//   'ETH-USDT-V4': {
//     name: 'ETH-USDT',
//     longName: 'ETH-USDT LP',
//     coin: { ...TOKENS.ETH },
//     pc: { ...TOKENS.USDT },

//     mintAddress: 'nPrB78ETY8661fUgohpuVusNCZnedYCgghzRJzxWnVb',
//     decimals: TOKENS.ETH.decimals
//   },
//   'YFI-SRM-V4': {
//     name: 'YFI-SRM',
//     longName: 'YFI-SRM LP',
//     coin: { ...TOKENS.YFI },
//     pc: { ...TOKENS.SRM },

//     mintAddress: 'EGJht91R7dKpCj8wzALkjmNdUUUcQgodqWCYweyKcRcV',
//     decimals: TOKENS.YFI.decimals
//   },
//   'FTT-SRM-V4': {
//     name: 'FTT-SRM',
//     longName: 'FTT-SRM LP',
//     coin: { ...TOKENS.FTT },
//     pc: { ...TOKENS.SRM },

//     mintAddress: 'AsDuPg9MgPtt3jfoyctUCUgsvwqAN6RZPftqoeiPDefM',
//     decimals: TOKENS.FTT.decimals
//   },
//   'BTC-SRM-V4': {
//     name: 'BTC-SRM',
//     longName: 'BTC-SRM LP',
//     coin: { ...TOKENS.BTC },
//     pc: { ...TOKENS.SRM },

//     mintAddress: 'AGHQxXb3GSzeiLTcLtXMS2D5GGDZxsB2fZYZxSB5weqB',
//     decimals: TOKENS.BTC.decimals
//   },
//   'SUSHI-SRM-V4': {
//     name: 'SUSHI-SRM',
//     longName: 'SUSHI-SRM LP',
//     coin: { ...TOKENS.SUSHI },
//     pc: { ...TOKENS.SRM },

//     mintAddress: '3HYhUnUdV67j1vn8fu7ExuVGy5dJozHEyWvqEstDbWwE',
//     decimals: TOKENS.SUSHI.decimals
//   },
//   'TOMO-SRM-V4': {
//     name: 'TOMO-SRM',
//     longName: 'TOMO-SRM LP',
//     coin: { ...TOKENS.TOMO },
//     pc: { ...TOKENS.SRM },

//     mintAddress: 'GgH9RnKrQpaMQeqmdbMvs5oo1A24hERQ9wuY2pSkeG7x',
//     decimals: TOKENS.TOMO.decimals
//   },
//   'LINK-SRM-V4': {
//     name: 'LINK-SRM',
//     longName: 'LINK-SRM LP',
//     coin: { ...TOKENS.LINK },
//     pc: { ...TOKENS.SRM },

//     mintAddress: 'GXN6yJv12o18skTmJXaeFXZVY1iqR18CHsmCT8VVCmDD',
//     decimals: TOKENS.LINK.decimals
//   },
//   'ETH-SRM-V4': {
//     name: 'ETH-SRM',
//     longName: 'ETH-SRM LP',
//     coin: { ...TOKENS.ETH },
//     pc: { ...TOKENS.SRM },

//     mintAddress: '9VoY3VERETuc2FoadMSYYizF26mJinY514ZpEzkHMtwG',
//     decimals: TOKENS.ETH.decimals
//   },
//   'SRM-SOL-V4': {
//     name: 'SRM-SOL',
//     longName: 'SRM-SOL LP',
//     coin: { ...TOKENS.SRM },
//     pc: { ...NATIVE_SOL },

//     mintAddress: 'AKJHspCwDhABucCxNLXUSfEzb7Ny62RqFtC9uNjJi4fq',
//     decimals: TOKENS.SRM.decimals
//   },
//   'STEP-USDC-V4': {
//     name: 'STEP-USDC',
//     longName: 'STEP-USDC LP',
//     coin: { ...TOKENS.STEP },
//     pc: { ...TOKENS.USDC },

//     mintAddress: '3k8BDobgihmk72jVmXYLE168bxxQUhqqyESW4dQVktqC',
//     decimals: TOKENS.STEP.decimals
//   },
//   'MEDIA-USDC-V4': {
//     name: 'MEDIA-USDC',
//     longName: 'MEDIA-USDC LP',
//     coin: { ...TOKENS.MEDIA },
//     pc: { ...TOKENS.USDC },

//     mintAddress: 'A5zanvgtioZGiJMdEyaKN4XQmJsp1p7uVxaq2696REvQ',
//     decimals: TOKENS.MEDIA.decimals
//   },
//   'ROPE-USDC-V4': {
//     name: 'ROPE-USDC',
//     longName: 'ROPE-USDC LP',
//     coin: { ...TOKENS.ROPE },
//     pc: { ...TOKENS.USDC },

//     mintAddress: 'Cq4HyW5xia37tKejPF2XfZeXQoPYW6KfbPvxvw5eRoUE',
//     decimals: TOKENS.ROPE.decimals
//   }
// }