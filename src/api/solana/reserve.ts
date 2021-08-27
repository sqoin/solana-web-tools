import { Connection } from "@solana/web3.js";

const cache = new Map<string, string>();

export async function getReserveImpl(
    connection: Connection,
    from: string,
    to: string,
    selectSwap: string,
    callback: (error: Error | null, txid: string | null) => any
  ) {
    try {
      console.log("solana getReserveImpl")
      if (cache.has(from + ":" + to)) {
        callback(null, cache.get(from + ":" + to) + "");
       
      }
  
      let reserves={}
  
      callback(null, JSON.stringify(reserves));
    } catch (error) {
      callback(error, null);
    }
  }