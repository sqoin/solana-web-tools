import { Connection } from '@solana/web3.js';
import { configSolanaContrat } from '../solanaConfig';

export async function swapExactTokensForTokensImpl(
  connection: Connection,
  from: string,
  to: string,
  amount1: string,
  selectSwap: string,
  amountMin: string,
  callback: (error: Error | null, txid: string | null) => any
) {
  try {

    console.log("solana swapExactTokensForTokensImpl")
    let result = {}

    callback(null, JSON.stringify(result));
  } catch (error) {
    callback(error, null);
  }
}

export async function swapExactTokensForETHImpl(
  connection: Connection,
  from: string,
  to: string,
  amount1: string,
  amountMin: string,
  selectSwap: string,
  callback: (error: Error | null, txid: string | null) => any
) {
  try {
    console.log("solana swapExactTokensForETHImpl")
    var result: any = {};
    callback(null, JSON.stringify(result));

  } catch (error) {
    callback(error, null);
  }
}

export async function swapExactETHForTokensImpl(
  connection: Connection,
  from: string,
  to: string,
  amount1: string,
  amount2: string,
  selectSwap: string,
  amountMin: string,
  callback: (error: Error | null, txid: string | null) => any
) {
  try {
    console.log("solana swapExactETHForTokensImpl")
    var result: any = {};
    callback(null, JSON.stringify(result));
  } catch (error) {
    callback(error, null);
  }
}