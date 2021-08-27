import { configContrat } from "./config";
import usdc from '../images/logoUSDc.png'
import logonETH from '../assets/ncoinsnova/nEth.png'
import logonnWBTC from '../assets/ncoinsnova/nWBTC.png'
import logoETH from '../assets/ncoinsnova/ETH.png'
import logoWBTC from '../assets/wBTC-icon.png'


let adresses: any = configContrat();

export function getCoinsETH(netId: number, exchangeFinance: string) {
  if (netId && adresses[0][netId]) {
    if (exchangeFinance === "novaswap") {
      return [
        {
          name: "USDC",
          ticker: "",
          logo: usdc,
          address: adresses[0][netId].novaswap.USDC
        },
        {
          name: "nWBTC",
          ticker: "",
          logo: logonnWBTC,
          address: adresses[0][netId].novaswap.nWBTC
        },
        {
          name: "nETH",
          ticker: "",
          logo: logonETH,
          address: adresses[0][netId].novaswap.nEtherium,
        },
        {
          name: "WBTC",
          ticker: "",
          logo: logoWBTC,
          address: adresses[0][netId].novaswap.WBTC,
        },
        {
          name: "ETH",
          ticker: "",
          logo: logoETH,
          address: adresses[0][netId].novaswap.Eth,
        }
      ];
    }
  }
  return []
}


export function getCoinsForMint(netId: number, exchangeFinance: string) {
  if (netId && adresses[0][netId]) {
    return [
      {
        name: "nWBTC",
        wrappedName: "WBTC",
        ticker: "",
        logo: logonnWBTC,
        address: adresses[0][netId].novaswap.nWBTC,
        addresswrappedName: adresses[0][netId].novaswap.WBTC,
        logoWapped: logoWBTC
      },
      {
        name: "nETH",
        wrappedName: "ETH",
        ticker: "",
        logo: logonETH,
        address: adresses[0][netId].novaswap.nEtherium,
        addresswrappedName: adresses[0][netId].novaswap.eth,
        logoWapped: logoETH
      }
    ];
  } else {
    return []
  }
}

export function getCoinsForDashboard(netId: number, exchangeFinance: string) {
  if (netId && adresses[0][netId]) {
    return [
      {
        name: "nWBTC",
        wrappedName: "WBTC",
        coinUSDC: "USDc",
        ticker: "",
        logo: logonnWBTC,
        addressname: adresses[0][netId].novaswap.nWBTC,
        addresswrappedName: adresses[0][netId].novaswap.WBTC,
        logoWapped: logoWBTC,
        addressCoinUSDC: adresses[0][netId].novaswap.USDC,
        logoCoinUSDC: usdc,
      },
      // {
      //   name: "nETH",
      //   wrappedName: "ETH",
      //   coinUSDC: "USDc",
      //   ticker: "",
      //   logo: logonETH,
      //   addressname: adresses[0][netId].novaswap.nEtherium,
      //   addresswrappedName: adresses[0][netId].novaswap.eth,
      //   logoWapped: logoETH,
      //   addressCoinUSDC: adresses[0][netId].novaswap.USDC,
      //   logoCoinUSDC: usdc,
      // }
    ];
  } else {
    return []
  }
}


export function getCoinsForDashboardHedge(netId: number, exchangeFinance: string) {
  if (netId && adresses[0][netId]) {
    return [
      { name: "nWBTC",
        wrappedName: "tpWBTC",
        value: "$57.399",
        balance: "1.56",
        logoWapped: logoWBTC,
        addresswrappedName: adresses[0][netId].novaswap.WBTC,
      }
    ];
  } else {
    return []
  }
}


export function getAllEtherAssets(netId: number) {
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