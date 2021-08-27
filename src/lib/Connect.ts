
import {
  setNetworkId,
  setBalances,
  setScanLink
} from "../redux/actions";
import store from "../redux/store";
import Web3 from "web3";
// const { pending, error, call } = useAsync(unlockAccount);
// test
function saveLinkName(netId: number) {
  if (netId === 42) {
    store.dispatch(setScanLink("https://kovan.etherscan.io/tx/"));
  } else if (netId === 4) {
    store.dispatch(setScanLink("https://rinkeby.etherscan.io/tx/"));
  }
}
export async function onClickConnect(call: any) {
  // const { pending, error, call } = useAsync(unlockAccount);
  const { networkId, web3: web3State } = store.getState().connection;
  console.info(web3State);
  const { error: errorCall, data } = await call(null);
  //    { web3 } = data;
  store.dispatch(setNetworkId(0));
  const web3 = data ? data.web3 : "";
  if (errorCall) {
  }
  if (web3) {
    // setWeb3(data.web3);
    saveLinkName(networkId);
    // setTolerance(""+localStorage.getItem('Tolerance'));

    //// netId pour la

    // if (location.state) {
    //   getBalancePair(data.web3, "" + selected1, (err, balancePair) => {
    //     if (!err) {
    //       //@ts-ignore
    //       balances.set(
    //         selected1,
    //         "" + toHumanReadableBalance("" + balancePair.toString(), "")
    //       );
    //     } else return;
    //   });
    // }

    // //@ts-ignore
    // getCoins(reseauId, swaplink).map(coin => {
    //   getBalance(data.web3, coin.address, reseauId, (error, b) => {
    //     if (error) {
    //       return;
    //     }

    //     if (b) {
    //       balances.set(coin.address, toHumanReadableBalance(b.toString(), ""));
    //     }
    //   });

    //   if (coin.address !== "ETH") {
    //     getAllowance(data.web3, coin.address, swaplink, reseauId, (error, b) => {
    //       if (error) {
    //         return;
    //       }

    //       if (b) {
    //         allowances.set(
    //           coin.address,
    //           toHumanReadableBalance(b.toString(), "")
    //         );
    //       }
    //     });
    //   }
    //   if (location.state) {
    //     getReserveSwap(
    //       data.web3,

    //       getCoinAddress(JSON.parse(JSON.stringify(location.state)).paireOne),
    //       getCoinAddress(JSON.parse(JSON.stringify(location.state)).paireTwo)
    //     );
    //   }
    // });

    // //    setAccount({account: data.account , balance: balance });
    // updateAccount(data);
  }
}
