
import { Connection, PublicKey } from '@solana/web3.js';
import { configSolanaContrat } from '../solanaConfig';

const balanceCache = new Map<string, string>();


export async function getBalanceTokenImpl(
  connection: Connection,
  address: string,
  callback: (error: Error | null, txid: string | null) => any
) {
  try {
    console.log("solana getBalanceTokenImpl")
    let balance = await connection.getBalance(new PublicKey(address));
    callback(null, balance.toString());
  } catch (error) {
    callback(error, null);
  }
}
// function get pair Balance
export async function getBalancePairImpl(
  connection: Connection,
  coin: string,
  callback: (error: Error | null, txid: string | null) => any
) {
  try {
    if (balanceCache.has(coin)) {
      callback(null, "" + balanceCache.get(coin));
      return;
    }
    var balance=""
    console.log("solana getBalancePairImpl")
   

    callback(null, balance.toString());
  } catch (error) {
    callback(error, null);
  }
}
