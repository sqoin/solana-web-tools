import { Connection, PublicKey } from "@solana/web3.js";
import { getAccountInfo } from "../../api/solana/nWBTC";
import { OLD_ACCOUNT_ADDRESS } from "../../pages/WalletUtils";

export async function approveDoingImpl(
  connection: Connection,
  from: string, // user address 
  amount1: string, // amount to spend
  selectSwap: string, // spender ()
  callback: (error: Error | null, txid: string | null) => any
) {
  try {
    console.log("solana approveDoingImpl")
    var result: any = {};

    callback(null, JSON.stringify(result));
  } catch (error) {
    callback(error, null);
  }
}

export async function approveMint(
  connection: Connection,
  solanaAccount: any,
  amount: any,
  callback: (error: Error | null, txid: string | null) => any
) {
  try {
    console.log("solana approveMint")
  } catch (error) {
    callback(error, null);
  }
}

export async function getAllowanceImpl(
  connection: Connection,
  from: string,
  selectSwap: string,
  callback: (error: Error | null, allowance: string | null) => any
) {
  var approved = "0";
  try {
    console.log("solana getAllowanceImpl")
    //@ts-ignore
    var accountAddress = OLD_ACCOUNT_ADDRESS
    //@ts-ignore
    const accountInfo: any = await getAccountInfo(new PublicKey(accountAddress), connection, "finalize");
    let allowance = accountInfo.delegatedAmount.toNumber()
    console.log("allowance -" + allowance)
    approved = allowance + ""
    // @ts-ignore
    callback(null, approved);
  } catch (error) {
    callback(error, null);
  }

  return approved;
}


export async function getAllowanceMinter(
  connection: Connection,
  from: string,
  NAsset: string,
  callback: (error: Error | null, allowance: string | null) => any
) {
  try {
    console.log("solana getAllowanceMinter")

    var approved = "0"

    callback(null, approved);

  } catch (error) {
    callback(error, null);
  }

}