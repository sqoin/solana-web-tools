import { Connection } from "@solana/web3.js";

const cache = new Map<string, string>();



export async function getPairAddressImpl(
  connection: Connection,
  from: string,
  to: string,
  selectSwap: string,
  callback: (error: Error | null, txid: string | null) => any
) {
  try {
    if (cache.has(from + ":" + to)) {
      callback(null, cache.get(from + ":" + to) + "");
      return;
    }

    console.log("solana getPairAddressImpl")
    
    let pairaddress={}

 
    callback(null, JSON.stringify(pairaddress));
  } catch (error) {
    callback(error, null);
  }
}
