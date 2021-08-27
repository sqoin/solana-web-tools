
import { Connection } from "@solana/web3.js";
import { approveDoingImpl, approveMint, getAllowanceImpl, getAllowanceMinter } from "./solana/approve";
import { getBalancePairImpl, getBalanceTokenImpl } from "./solana/balanceToken";
import { getPairAddressImpl } from "./solana/pairAddress";
import { getReserveImpl } from "./solana/reserve";
import { swapExactTokensForETHImpl, swapExactETHForTokensImpl, swapExactTokensForTokensImpl } from "./solana/swap";




export async function getSolanaReserve(
  connection: Connection,
  from: string,
  to: string,
  selectSwap: string,
  callback: (error: Error | null, txid: string | null) => any
) {
    return getReserveImpl(connection,from,to,selectSwap,callback)
}

export async function getSolanaPairAddress(
  connection: Connection,
  from: string,
  to: string,
  selectSwap: string,
  callback: (error: Error | null, txid: string | null) => any
) {
      return getPairAddressImpl(connection,from,to,selectSwap,callback)
}

/*-------------------------------------------*/

export async function solanaApproveDoing(
  connection: Connection,
  from: string,
  amount1: string,
  selectSwap: string,
  callback: (error: Error | null, txid: string | null) => any
) {
  return approveDoingImpl(connection,from,amount1,selectSwap,callback)
}

/************ approve Minter *****/
export async function solanaApproveMinter( 
  connection:Connection,
  solanaAccount:any,
  amount:any,
  callback: (error: Error | null, txid: string | null) => any
) {

  return approveMint(connection,solanaAccount,amount,callback)
}

  export async function getSolanaAllowance(
    connection: Connection,
    from: string,
    hedgeAddress: string,
    callback: (error: Error | null, allowance: string | null) => any
  ) {
    console.log("solana getSolanaAllowance")
    return getAllowanceMinter(connection,from,hedgeAddress,callback)
  }
  

  /********** get Allowance mint ***/
export async function getSolanaAllowanceMint(
  connection: Connection,
  from: string,
  hedgeAddress: string,
  callback: (error: Error | null, allowance: string | null) => any) {
    return getAllowanceImpl(connection,from,hedgeAddress,callback)
}



// function get pair Balance
export async function getSolanaBalancePair(
  connection: Connection,
  coin: string,
  callback: (error: Error | null, txid: string | null) => any
) {
  return getBalancePairImpl(connection , coin , callback)
}


/********** get balance  ***/
export async function getSolanaBalance(
  connection: Connection,
  address: string,
  callback: (error: Error | null, txid: string | null) => any
) {
    return getBalanceTokenImpl(connection,address,callback)
}
  
 // tokens to tokens  without ethereum
export async function solanaSwapExactTokensForTokens(
  connection: Connection,
  from: string,
  to: string,
  amount1: string,
  selectSwap: string,
  amountMin: string,
  callback: (error: Error | null, txid: string | null) => any
) {
  console.log("**solanaSwapExactTokensForTokens** from: "+from+" to:"+to+" amount1:"+amount1+" selectSwap"+selectSwap+" amountMin:"+amountMin)
    return swapExactTokensForTokensImpl(connection,from,to,amount1,selectSwap,amountMin,callback)
  }


  export async function solanaSwapExactTokensForETH(
    connection: Connection,
    from: string,
    to: string,
    amount1: string,
    amountMin: string,
    selectSwap: string,
    callback: (error: Error | null, txid: string | null) => any
  ) {
      return swapExactTokensForETHImpl(connection,from,to,amount1,amountMin,selectSwap,callback)
  }

  
  export async function solanaSwapExactETHForTokens(
    connection: Connection,
    from: string,
    to: string,
    amount1: string,
    amount2: string,
    selectSwap: string,
    amountMin: string,
    callback: (error: Error | null, txid: string | null) => any
  ) {
      return swapExactETHForTokensImpl(connection,from,to,amount1,amount2,amountMin,selectSwap,callback)
  }

