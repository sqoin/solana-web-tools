
import logonETH from '../assets/ncoinsnova/nEth.png'
import logonSOL from '../assets/coinsSolana/sol.png'
import logonnWBTC from '../assets/ncoinsnova/nWBTC.png'
import logoETH from '../assets/ncoinsnova/ETH.png'
import logoWBTC from '../assets/wBTC-icon.png'
import { configSolanaContrat } from "./solanaConfig";
import akro from '../assets/coinsSolana/akro.png'
import aleph from '../assets/coinsSolana/aleph.png'
import btc from '../assets/coinsSolana/btc.png'
import cope from '../assets/coinsSolana/cope.png'
import cream from '../assets/coinsSolana/cream.png'
import eth from '../assets/coinsSolana/eth.png'
import fida from '../assets/coinsSolana/fida.png'
import front from '../assets/coinsSolana/front.png'
import ftt from '../assets/coinsSolana/ftt.png'
import hget from '../assets/coinsSolana/hget.png'
import hnt from '../assets/coinsSolana/hnt.png'
import hxro from '../assets/coinsSolana/hxro.png'
import kin from '../assets/coinsSolana/kin.png'
import link from '../assets/coinsSolana/link.png'
import lua from '../assets/coinsSolana/lua.png'
import maps from '../assets/coinsSolana/maps.png'
import math from '../assets/coinsSolana/math.png'
import media from '../assets/coinsSolana/media.png'
import mer from '../assets/coinsSolana/mer.png'
import msrm from '../assets/coinsSolana/msrm.png'
import oxy from '../assets/coinsSolana/oxy.png'
import ray from '../assets/coinsSolana/ray.png'
import rope from '../assets/coinsSolana/rope.png'
import sol from '../assets/coinsSolana/sol.png'
import srm from '../assets/coinsSolana/srm.png'
import step from '../assets/coinsSolana/step.png'
import sushi from '../assets/coinsSolana/sushi.png'
import sxp from '../assets/coinsSolana/sxp.png'
import tomo from '../assets/coinsSolana/tomo.png'
import ubxt from '../assets/coinsSolana/ubxt.png'
import uni from '../assets/coinsSolana/uni.png'
import usdc from '../assets/coinsSolana/usdc.png'
import usdt from '../assets/coinsSolana/usdt.png'
import wsol from '../assets/coinsSolana/wsol.png'
import unknown from '../assets/coinsSolana/unknown.png'
import wusdc from '../assets/coinsSolana/wusdc.png'
import wusdt from '../assets/coinsSolana/wusdt.png'
import xrp from '../assets/coinsSolana/xrp.png'
import yfi from '../assets/coinsSolana/yfi.png'

import btcLogo from "../assets/coins/bitcoin_black_and_white.svg";
import rayLogo from "../assets/coins/ray_black_and_white.svg";
import solanaLogo from "../assets/coins/solana_black_and_white.svg";
import usdcLogo from "../assets/coins/usdc_black_and_white.svg";


let adresses: any = configSolanaContrat()

export function getSolanaNassetCoins(netId: number, exchangeFinance: string) {
  // if (netId && adresses[0][netId]) {
  //  if (exchangeFinance === "novaswap") {
  return [
    {
      name: "nWBTC",
      ticker: "",
      logo: logonnWBTC,
      mintAddress: adresses[0].testnet.nWBTC,
      address: ""
    },
    {
      name: "nETH",
      ticker: "",
      logo: logonETH,
      mintAddress: adresses[0].testnet.nETH,
      address: "",
    },
    {
      name: "nSOL",
      ticker: "",
      logo: logonSOL,
      mintAddress: adresses[0].testnet.nSOL,
      address: "GycmW7oPowkawicvaCuLxvPNTm6JoGB2fp7pVH47ywBX",
    },

  ];
  // }
  //}
  //return []
}
export function getSolanaCoins(netId: number, exchangeFinance: string) {
  // if (netId && adresses[0][netId]) {
  //   if (exchangeFinance === "novaswap") {
  return [
    {

      name: 'WSOL',
      longName: 'Wrapped Solana',
      logo: wsol,
      mintAddress: adresses[0].testnet.origin.SOL,//'So11111111111111111111111111111111111111112',
      decimals: 9,
      address: 'G4wMN8YCYRPHrbdW3HcT1s2noXYBvAoYNzWHugwtW5Rr'//'HTcarLHe7WRxBQCWvhVB8AP56pnEtJUV2jDGvcpY3xo5'
    },
    {
      name: 'BTC',
      longName: 'Wrapped Bitcoin',
      logo: btc,
      mintAddress: adresses[0].testnet.origin.WBTC,
      decimals: 6,
      address: 'GZpS8cY8Nt8HuqxzJh6PXTdSxc38vFUjBmi7eEUkkQtG'
    },
    {
      name: 'ETH',
      longName: 'Wrapped Ethereum',
      logo: eth,
      mintAddress: adresses[0].testnet.origin.ETH,
      decimals: 6,
      address: 'CXPTcSxxh4AT38gtv3SPbLS7oZVgXzLbMb83o4ziXjjN'
    },
    {
      name: 'USDT',
      longName: 'USDT',
      logo: usdt,
      mintAddress: 'Etyhqujgr29JaPgB8M4bV9DbfE46qjTZvXHu1CUq4jW7',
      decimals: 6,
      address: '8DwwDNagph8SdwMUdcXS5L9YAyutTyDJmK6cTKrmNFk3'
    },
    {
      name: 'WUSDT',
      longName: 'Wrapped USDT',
      logo: wusdt,
      mintAddress: 'ET99NzhKquMVbrs372frmGxgFMHW77uLvH1mN2zYsony',
      decimals: 6,
      address: 'CA98hYunCLKgBuD6N8MJSgq1GbW9CXdksLf5mw736tS3'
    },
    {
      name: 'USDC',
      longName: 'USDC',
      logo: wusdc,
      mintAddress: '96rp2mHzKjEiWKjLJVLn1kjdHhVhm6A3Pew46CukmYBc',
      decimals: 6,
      address: '92vdtNjEg6Zth3UU1MgPgTVFjSEzTHx66aCdqWdcRkrg'
    },
    {
      name: 'WUSDC',
      longName: 'Wrapped USDC',
      logo: wusdc,
      mintAddress: 'GjpGrCG9pyk7E3c4CESGHjE3RMU59pXfWyb3shUTdmo6',
      decimals: 6,
      address: ''
    },
    {
      name: 'YFI',
      longName: 'Wrapped YFI',
      logo: yfi,
      mintAddress: 'EzV4itVK2JfpVkFKHWbbZDPCp6jpmsmyKpuC5w64JDRc',
      decimals: 6,
      address: 'DZjgzKfYzZBBSTo5vytMYvGdNF933DvuX8TftDMrThrb'
    },
    {
      name: 'LINK',
      longName: 'Wrapped Chainlink',
      logo: link,
      mintAddress: 'HXH9mhXbxbjckL9kESnJJPxjRbDLBGTgtoc6Hi2gjGq5',
      decimals: 6,
      address: 'DRSKKsYZaPEFkRgGywo7KWBGZikf71R9aDr8tjtpr41V'
    },
    {
      name: 'XRP',
      longName: 'Wrapped XRP',
      logo: xrp,
      mintAddress: '7cyEisQ5PWkSB2UnyugQRKPy5P2pkg6XaC1nJ8RjC8z',
      decimals: 6,
      address: '6NeHPXG142tAE2Ej3gHgT2N66i1KH6PFR6PBZw6RyrwH'
    },
    {
      name: 'SUSHI',
      longName: 'Wrapped SUSHI',
      logo: sushi,
      mintAddress: 'FnwUQjJY63geqYpdMGNAeTGvjsUr5SytiykujBUeLPY2',
      decimals: 6,
      address: '59QxHeHgb28tDc3gStnrW8FNKC9qWuRmRZHBaAqCerJX'
    },
    {
      name: 'ALEPH',
      longName: 'Wrapped ALEPH',
      logo: aleph,
      mintAddress: 'Bhtjr4Pz2ZCyicnPd7Yfy1hifxwwvawBAWkxg2GYLad1',
      decimals: 6,
      address: '8FKAKrenJMDd7V6cxnM5BsymHTjqxgodtHbLwZReMnWW'
    },
    {
      name: 'SXP',
      longName: 'Wrapped SXP',
      logo: sxp,
      mintAddress: 'GKLmQMXbN1qiMCjJoJcfgPRqnyQrJfRnmjbhYf64yPKi',
      decimals: 6,
      address: '97Vyotr284UM2Fyq9gbfQ3azMYtgf7cjnsf8pN1PFfY9'
    },
    {
      name: 'HGET',
      longName: 'Wrapped HGET',
      logo: hget,
      mintAddress: '89i3EoDVTVEUfGzbXf75d4RoNPvuzbKQEHyGQiWrCPja',
      decimals: 6,
      address: 'AGY2wy1ANzLM2jJLSkVxPUYAY5iAYXYsLMQkoQsAhucj'
    },
    {
      name: 'CREAM',
      longName: 'Wrapped CREAM',
      logo: cream,
      mintAddress: 'FXxRw8Zi1ooNze2psfgBEo7N9zGLDimSmfVYnquMAHTM',
      decimals: 6,
      address: '7WPzEiozJ69MQe8bfbss1t2unR6bHR4S7FimiUVRgu7P'
    },
    {
      name: 'UBXT',
      longName: 'Wrapped UBXT',
      logo: ubxt,
      mintAddress: 'GVDEwAxk2tnX4WgoWmRe2Lh1XYvzzCRgq668TDQsnywM',
      decimals: 6,
      address: '9aocFzNkSVj9TCS6cJk2uYyuzEpXPWT7xoBBF9JcZ879'
    },
    {
      name: 'HNT',
      longName: 'Wrapped HNT',
      logo: hnt,
      mintAddress: '3gXKctzkLzq1KyB9K6tKHFUQoGyApgPZV4eCkXv9gwX5',
      decimals: 6,
      address: 'B61oHrGCFh8P75Z2cRDiw2nbEwbMyhVfZhMWiwxU2qCV'
    },
    {
      name: 'FRONT',
      longName: 'Wrapped FRONT',
      logo: front,
      mintAddress: 'GXvibPcv3subCvZ4uNnYRfqzPZEBWY47Dm7Z4RM4YKAi',
      decimals: 6,
      address: 'FnasnCc7c43hd2nanSmRjh9Sf9Cgz6aEvNj6wpDznS5h'
    },
    {
      name: 'AKRO',
      longName: 'Wrapped AKRO',
      logo: akro,
      mintAddress: '6CDh6SXfwnmknaD8oHhP3TxWcjaBKVP1eWBAYzex3kNh',
      decimals: 6,
      address: 'FihBmWJbiLSEvq4QZpPPdjokdMgxqq6pESZ7oMkE1qJH'
    },
    {
      name: 'HXRO',
      longName: 'Wrapped HXRO',
      logo: hxro,
      mintAddress: 'EwAWYvrmtvq5zXWThwVWXuRYCnwumvsfEfZZHKaN5SQc',
      decimals: 6,
      address: '4NgrGZDRCzyqiwYvKPEePTKfQXtWzKmSDBoZJjRw6wNC'
    },
    {
      name: 'UNI',
      longName: 'Wrapped UNI',
      logo: uni,
      mintAddress: 'Hpwg8kYezXhPGZ5ALgBCttWzzqc52mmW4VL2JZibSAHo',
      decimals: 6,
      address: '4ntxDv95ajBbXfZyGy3UhcQDx8xmH1yJ6eKvuNNH466x'
    },
    {
      name: 'SRM',
      longName: 'Serum',
      logo: srm,
      mintAddress: '62sK6dUfVUtAT1L4fgkKh1Yhuocoi5v17rn5dpmDhnJQ',
      decimals: 6,
      address: 'HYxa4Ea1dz7ya17Cx18rEGUA1WbCvKjXjFKrnu8CwugH'
    },
    {
      name: 'FTT',
      longName: 'Wrapped FTT',
      logo: ftt,
      mintAddress: '9n73FBxvepWsBjeiQMXdyKeinh4iy3HJSwVveBrUuHy2',
      decimals: 6,
      address: 'CafpgSh8KGL2GPTjdXfctD3vXngNZDJ3Q92FTfV71Hmt'
    },
    {
      name: 'MSRM',
      longName: 'MegaSerum',
      logo: msrm,
      mintAddress: '5tfkrRMjEBCW1MYnyhg7h78Tt5W9UFcLews8X5G8VCzE',
      decimals: 0,
      address: 'Ge5q9x8gDUNYqqLA1MdnCzWNJGsbj3M15Yxse2cDbw9z'
    },
    {
      name: 'TOMO',
      longName: 'Wrapped TOMO',
      logo: tomo,
      mintAddress: '74ZHJ39xF33kHiJ6MG15d75tDXcE8oNr28eds3JND4xT',
      decimals: 6,
      address: '9fexfN3eZomF5gfenG5L9ydbKRQkPhq6x74rb5iLrvXP'
    },
    {
      name: 'KARMA',
      longName: 'Wrapped KARMA',
      logo: unknown,
      mintAddress: '4MSdzQQaEM1euHeZ9QFaoRyvA7bUYYRZikXiDxE4reBk',
      decimals: 4,
      address: ''
    },
    {
      name: 'LUA',
      longName: 'Wrapped LUA',
      logo: lua,
      mintAddress: '8A1o5SLfS3cDNqjQ1bkxzRFXq16A9MPwdixLX3cVaRMx',
      decimals: 6,
      address: 'HuZwNApjVFuFSDgrwZA8GP2JD7WMby4qt6rkWDnaMo7j'
    },
    {
      name: 'MATH',
      longName: 'Wrapped MATH',
      logo: math,
      mintAddress: '3hCRvKLoVRVrCCcMinsvtAkV8Dvb8J6BiiwFB35zWKta',
      decimals: 6,
      address: 'C9K1M8sJX8WMdsnFT7DuzdiHHunEj79EsLuz4DixQYGm'
    },
    {
      name: 'KEEP',
      longName: 'Wrapped KEEP',
      logo: unknown,
      mintAddress: '6ByEqkfGRu4xLtquasKUmEfM6mxEJzS2fNw7zfvAvTew',
      decimals: 6,
      address: ''
    },
    {
      name: 'SWAG',
      longName: 'Wrapped SWAG',
      logo: unknown,
      mintAddress: '6HzXWuPoxAScCFEbP22PFmmYuEzAvN1oS8rLf1iDMXvR',
      decimals: 6,
      address: ''
    },
    {
      name: 'FIDA',
      longName: 'Bonfida',
      logo: fida,
      mintAddress: '7bkyU7DcFHCdmmNseqN9VvBgTVTW8tbNEuVR6WdjFL2W',
      decimals: 6,
      address: 'AeAsG75UmyPDB271c6NHonHxXAPXfkvhcf2xjfJhReS8'
    },
    {
      name: 'KIN',
      longName: 'KIN',
      logo: kin,
      mintAddress: 'FFb8Q8gBkY28P5pqbN6V34N5L1ZdZSUC1qZnMgqgifYq',
      decimals: 5,
      address: 'AevFXmApVxN2yk1iemSxXc6Wy7Z1udUEfST11kuYKmr9'
    },
    {
      name: 'MAPS',
      longName: 'MAPS',
      logo: maps,
      mintAddress: 'VPvoV1yBHuZhnCtQyLr9myAPCSBa12sgaTdfp6GuTWw',
      decimals: 6,
      address: ''
    },
    {
      name: 'OXY',
      longName: 'OXY',
      logo: oxy,
      mintAddress: 'BtSixkvs2ab7bY13teAHEsvbMT6VvCpQeae1K4iJzok9',
      decimals: 6,
      address: ''

    },
    {
      name: 'RAY',
      longName: 'Raydium',
      logo: ray,
      mintAddress: 'YHHDNQ3wkFWDQErZXGq7xQ4EVAqD2kCqHupkPJ1iSDq',
      decimals: 6,
      address: '33XpMmMQRf6tSPpmYyzpwU4uXpZHkFwCZsusD9dMYkjy'
    },
    {
      name: 'COPE',
      longName: 'COPE',
      logo: cope,
      mintAddress: '6ZqwoU7Xyui9RRZHebbomxUTkyAUfGm1q7bm5QZ3UaLM',
      decimals: 0,
      address: '8DTehuES4tfnd2SrqcjN52XofxWXGjiLZRgM12U9pB6f'
    },
    {
      name: 'STEP',
      longName: 'STEP',
      logo: step,
      mintAddress: 'EBXeqg7ZmrCJKgY7YP6jCS8fEAqQ5DmZcXfPm66Xuk6r',
      decimals: 9,
      address: 'EFQVX1S6dFroDDhJDAnMTX4fCfjt4fJXHdk1eEtJ2uRY'
    },
    {
      name: 'MEDIA',
      longName: 'MEDIA',
      logo: media,
      mintAddress: '59ci8Vxzmgi8JoNX3kpKrwHj68g9L8nuwEy3GryBJffS',
      decimals: 6,
      address: 'AYnaG3AidNWFzjq9U3BJSsQ9DShE8g7FszriBDtRFvsx'

    },
    {
      name: 'ROPE',
      longName: 'ROPE',
      logo: rope,
      mintAddress: 'AHVBtdSs6q7mWkK56K1bJuXaCxH6xReKCqv1LWNizePL',
      decimals: 9,
      address: '5sGVVniBSPLTwRHDETShovq7STRH2rJwbvdvvH3NcVTF'
    },
    {
      name: 'MER',
      longName: 'Mercurial',
      logo: mer,
      mintAddress: 'EDEUegV7JfCG352qix4jRmDApLTbXgS7VdbUFNeuDWb4',
      decimals: 6,
      address: '5sGVVniBSPLTwRHDETShovq7STRH2rJwbvdvvH3NcVTF'
    }
  ];
  // }
  // }
  // return []
}


export function getSolanaCoinsForMint(netId: number, exchangeFinance: string) {
  // if (netId && adresses[0][netId]) {
  return [
    {
      name: "nWBTC",
      wrappedName: "WBTC",
      ticker: "",
      logo: logonnWBTC,
      address: adresses[0][netId].novaswap.nWBTC,
      addresswrappedName: adresses[0][netId].novaswap.WBTC,
      logoWapped: logoWBTC,
      mintAddress: adresses[0].testnet.nWBTC,
      originMintAddress: adresses[0].testnet.origin.WBTC
    },
    {
      name: "nETH",
      wrappedName: "ETH",
      ticker: "",
      logo: logonETH,
      address: adresses[0][netId].novaswap.nEtherium,
      addresswrappedName: adresses[0][netId].novaswap.eth,
      logoWapped: eth,
      mintAddress: adresses[0].testnet.nETH,
      originMintAddress: adresses[0].testnet.origin.ETH
    },
    {
      name: "nSOL",
      wrappedName: "SOL",
      ticker: "",
      logo: logonSOL,
      address: adresses[0][netId].novaswap.nWBTC,
      addresswrappedName: adresses[0][netId].novaswap.WBTC,
      logoWapped: sol,
      mintAddress: adresses[0].testnet.nSOL,
      originMintAddress: adresses[0].testnet.origin.SOL,
    }
  ];
  // } else {
  //   return []
  // }
}

export function getSolanaCoinsForDashboard(netId: number, exchangeFinance: string) {
  // if (netId && adresses[0][netId]) {
  return [
    {
      name: "nWBTC",
      wrappedName: "WBTC",
      coinUSDC: "USDC",
      ticker: "",
      logo: logonnWBTC,
      addressname: adresses[0][netId].novaswap.nWBTC,
      addresswrappedName: adresses[0][netId].novaswap.WBTC,
      logoWapped: logoWBTC,
      addressCoinUSDC: adresses[0][netId].novaswap.USDC,
      logoCoinUSDC: usdc,
      mintAddress: adresses[0].testnet.nWBTC,
    },
    {
      name: "nETH",
      wrappedName: "ETH",
      coinUSDC: "USDC",
      ticker: "",
      logo: logonETH,
      addressname: adresses[0][netId].novaswap.nEtherium,
      addresswrappedName: adresses[0][netId].novaswap.eth,
      logoWapped: eth,
      addressCoinUSDC: adresses[0][netId].novaswap.USDC,
      logoCoinUSDC: usdc,
      mintAddress: adresses[0].testnet.nETH,
    },
    {
      name: "nSOL",
      wrappedName: "SOL",
      ticker: "",
      logo: logonSOL,
      address: adresses[0][netId].novaswap.nWBTC,
      addresswrappedName: adresses[0][netId].novaswap.WBTC,
      logoWapped: sol,
      coinUSDC: "USDc",
      addressname: adresses[0][netId].novaswap.nWBTC,
      addressCoinUSDC: adresses[0][netId].novaswap.USDC,
      logoCoinUSDC: usdc,
      mintAddress: adresses[0].testnet.nSOL
    }
  ];
  // } else {

  //   return []
  // }
}


export function getSolanaCoinsForDashboardHedge(netId: number, exchangeFinance: string) {
  return [
    {
      wrappedName: "tpWBTC",
      value: "$57.399",
      balance: "1.56",
      logoWapped: logoWBTC,
      mintAddress: adresses[0].testnet.nWBTC
    },
    {
      wrappedName: "tpETH",
      value: "$49.345",
      balance: "1.02",
      logoWapped: eth,
      mintAddress: adresses[0].testnet.nETH
    },
    {
      wrappedName: "tpSol",
      value: "$40.244",
      balance: "1.77",
      logoWapped: sol,
      mintAddress: adresses[0].testnet.nSOL
    }
  ];
}


export function getAllSolanaAssets(netId: number) {
  if (netId && adresses[0][netId]) {
    return [
      {
        name: "nWBTC",
        address: adresses[0][netId].novaswap.nWBTC,
        logo: logonnWBTC,
        wrappedName: "WBTC",
        addresswrappedName: adresses[0][netId].novaswap.WBTC,
        logoWapped: logoWBTC,
        ticker: "",
        assets: [{
          name: "WBTC",
          address: adresses[0][netId].novaswap.WBTC,
          logo: logoWBTC,
          percent: "90%"
        }, {
          name: "USDc",
          address: adresses[0][netId].novaswap.USDC,
          logo: usdc,
          percent: "10%"
        }],
        yiled: [{
          name: "WBTC",
          address: adresses[0][netId].novaswap.WBTC,
          logo: logoWBTC,
          percent: "10%"
        },
        {
          name: "USDc",
          address: adresses[0][netId].novaswap.USDC,
          logo: usdc,
          percent: "2%"
        }]
      },
      {
        name: "nETH",
        address: adresses[0][netId].novaswap.nEtherium,
        logo: logonETH,
        wrappedName: "ETH",
        addresswrappedName: adresses[0][netId].novaswap.eth,
        logoWapped: logoETH,
        ticker: "",
        assets: [{
          name: "ETH",
          address: adresses[0][netId].novaswap.eth,
          logo: logoETH,
          percent: "90%"
        },
        {
          name: "USDc",
          address: adresses[0][netId].novaswap.USDC,
          logo: usdc,
          percent: "10%"
        }],
        yiled: [{
          name: "WBTC",
          address: adresses[0][netId].novaswap.WBTC,
          logo: logoWBTC,
          percent: "10%"
        },
        {
          name: "USDc",
          address: adresses[0][netId].novaswap.USDC,
          logo: usdc,
          percent: "2%"
        }]
      }
    ];
  } else {
    return []
  }
}

export function getAllSolanaPortfolioAssets(netId: number) {
  if (netId) {
    return [
      {
        name: "WBTC",
        mintAddress: adresses[0].devnet.WBTC,
        logo: btcLogo,
        tag: "Mature Crypto",
        color: "blue",
      },
      {
        name: "Solana",
        mintAddress: adresses[0].devnet.Solana,
        logo: solanaLogo,
        tag: "Mature Crypto",
        color: "blue",
      },
      {
        name: "USDC",
        mintAddress: adresses[0].devnet.USDC,
        logo: usdcLogo,
        tag: "Stablecoin",
        color: "pink",
      },
      {
        name: "MSFT",
        mintAddress: adresses[0].devnet.MSFT,
        logo: "",
        tag: "Stock",
        color: "orange",
      },
      {
        name: "Raydium",
        mintAddress: adresses[0].devnet.Raydium,
        logo: rayLogo,
        tag: "Altcoin",
        color: "green",
      }
    ]
  } else {
    return []
  }
}