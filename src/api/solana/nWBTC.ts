import { Commitment, PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { createMint } from "./solanaLib/token-test";
import { AccountLayout, Token, u64, AccountOrigineLayout } from "./client/token";
import { configSolanaContrat } from "../solanaConfig";
import { ADAPTABLE_PROGRAMM_ID, ACCOUNT_ADDRESS, MINT_ADDRESS, ORIGINE_PROGRAMM_ID } from "../../pages/WalletUtils";
import { TokenOrigin } from "./client-origin/token";
const FAILED_TO_FIND_ACCOUNT = 'Failed to find account';
const INVALID_ACCOUNT_OWNER = 'Invalid account owner'
const providerUrl = "https://www.sollet.io";

export async function solanaMintNWBTC(
    connection: Connection,
    mintAddress: any,
    accountAddress: any,
    amount: any,
    selectedWallet: any,
    callback: (error: Error | null, txid: string | null) => any
) {
    let result: any = {}
    try {
        console.log("solana solanaMintNWBTC")
        let testToken = new Token(
            connection,
            new PublicKey(mintAddress),
            new PublicKey(ADAPTABLE_PROGRAMM_ID),
            selectedWallet
        );

        let account = new PublicKey(accountAddress)
        result = await testToken.createDeposit(connection, account, amount, selectedWallet, 0, mintAddress);

        // @ts-ignore
        callback(null, JSON.stringify(result));
    } catch (error) {
        callback(error, null);
    }
}


export async function solanaMintOriginToken(
    connection: Connection,
    mintAddress: any,
    accountAddress: any,
    amount: any,
    selectedWallet: any,
    callback: (error: Error | null, txid: string | null) => any
) {
    try {
      
        console.log("solana solanaMintNWBTC")
        let token = new TokenOrigin(
            connection,
            new PublicKey(mintAddress),
            new PublicKey(ORIGINE_PROGRAMM_ID),
            //@ts-ignore
            selectedWallet
        );

        await token.mintTo(new PublicKey(accountAddress), selectedWallet, [], amount);
        const mintInfo = await token.getAccountInfo(new PublicKey(accountAddress))
        // @ts-ignore
        callback(null, JSON.stringify(mintInfo));
    } catch (error) {
        callback(error, null);
    }
}


export async function getSolanaFullBalance(
    connection: Connection,
    accountAddress: any,
    callback: (error: Error | null, fullBalance: any | null) => any
) {
    try {
        console.log("solana getSolanaFullBalance")
        var result = {}
        //@ts-ignore
        // var accountAddress = ACCOUNT_ADDRESS
        //@ts-ignore
        const accountInfo: any = await getAccountInfo(new PublicKey(accountAddress), connection, "finalize");
        //console.log("******* " + JSON.stringify(accountInfo))

        let allowance = accountInfo.delegatedAmount.toNumber()
        // console.log("allowance -" + allowance)
        result = { "amount": accountInfo.amount.toNumber(), "usdc": accountInfo.usdc.toNumber(), "asset": accountInfo.asset.toNumber() }
        // @ts-ignore
        callback(null, result);
    } catch (error) {
        callback(error, null);
    }
}


export async function getAccountInfo(
    account: PublicKey,
    connection: Connection,
    commitment?: Commitment,
): Promise<any> {
    const info = await connection.getAccountInfo(account, commitment);
    if (info === null) {
        throw new Error(FAILED_TO_FIND_ACCOUNT);
    }
    // if (!info.owner.equals(this.programId)) {
    //   throw new Error(INVALID_ACCOUNT_OWNER);
    // }
    // if (info.data.length != AccountLayout.span) {
    //   throw new Error(`Invalid account size`);
    // }

    const data = Buffer.from(info.data);
    const accountInfo = AccountLayout.decode(data);
    accountInfo.address = account;
    accountInfo.mint = new PublicKey(accountInfo.mint);
    accountInfo.owner = new PublicKey(accountInfo.owner);
    accountInfo.amount = u64.fromBuffer(accountInfo.amount);
    accountInfo.usdc = u64.fromBuffer(accountInfo.usdc);
    accountInfo.asset = u64.fromBuffer(accountInfo.asset);
    if (accountInfo.delegateOption === 0) {
        accountInfo.delegate = null;
        //@ts-ignore
        accountInfo.delegatedAmount = new u64();
    } else {
        accountInfo.delegate = new PublicKey(accountInfo.delegate);
        accountInfo.delegatedAmount = u64.fromBuffer(accountInfo.delegatedAmount);
    }

    accountInfo.isInitialized = accountInfo.state !== 0;
    accountInfo.isFrozen = accountInfo.state === 2;

    if (accountInfo.isNativeOption === 1) {
        accountInfo.rentExemptReserve = u64.fromBuffer(accountInfo.isNative);
        accountInfo.isNative = true;
    } else {
        accountInfo.rentExemptReserve = null;
        accountInfo.isNative = false;
    }

    if (accountInfo.closeAuthorityOption === 0) {
        accountInfo.closeAuthority = null;
    } else {
        accountInfo.closeAuthority = new PublicKey(accountInfo.closeAuthority);
    }

    /* if (!accountInfo.mint.equals(this.publicKey)) {
      throw new Error(
        `Invalid account mint: ${JSON.stringify(
          accountInfo.mint,
        )} !== ${JSON.stringify(this.publicKey)}`,
      );
    } */
    return accountInfo;
}


export async function solanaWithdraw(
    connection: Connection,
    selectedWallet: any,
    amountIn: string,
    mintAddress: any,
    accountAddress: any,
    callback: (error: TypeError | null, txid: string | null) => any
) {
    var result: any = {};
    try {
        console.log("solana solanaWithdraw")
        let testToken = new Token(
            connection,
            new PublicKey(mintAddress),
            new PublicKey(ADAPTABLE_PROGRAMM_ID),
            selectedWallet
        );
        let account = new PublicKey(accountAddress)
        result = await testToken.createWithDraw(connection, account, 10, selectedWallet);
        // @ts-ignore
        callback(null, JSON.stringify(result));
    } catch (error) {
        callback(error, null);
    }
}

export async function getSolanaPaireFullBalance(
    connection: Connection,
    paireAddress: any,
    callback: (error: Error | null, fullBalance: any | null) => any
) {
    try {

        var result: any = {};

        console.log("solana getSolanaPaireFullBalance")
        // @ts-ignore
        callback(null, result);
    } catch (error) {
        callback(error, null);
    }

}



export async function getProgramAccounts(
    connection: Connection,
    selectedWallet: any,
    mintAddress: any,
    callback: (error: Error | null, result: any | null) => any
) {
    try {
        var result: any = {};
        result = await connection.getProgramAccounts(new PublicKey(ADAPTABLE_PROGRAMM_ID), {
            filters: [
                {
                memcmp: {
                    "offset": 0,
                    bytes: mintAddress
                }
            },
             {
                memcmp: {
                    "offset": 32,
                    bytes: selectedWallet.publicKey + ""
                }
            }]
        })
        let list=decodeReponse(result)
        // @ts-ignore
        callback(null, result);
    } catch (error) {
        callback(error, null);
    }

}


function decodeReponse(accountsInfo: any) {

    let list:any[]=[]
    accountsInfo.forEach((info: any) => {
        
        const data = Buffer.from(info.account.data);
        const accountInfo = AccountLayout.decode(data);
        console.log("accountInfo: "+JSON.stringify(accountInfo))
        // accountInfo.address = new PublicKey(accountInfo.address).toBase58();
        accountInfo.mint = new PublicKey(accountInfo.mint).toBase58();
        accountInfo.owner = new PublicKey(accountInfo.owner);
        accountInfo.amount = u64.fromBuffer(accountInfo.amount);
        accountInfo.usdc = u64.fromBuffer(accountInfo.usdc);
        accountInfo.asset = u64.fromBuffer(accountInfo.asset);
        if (accountInfo.delegateOption === 0) {
            accountInfo.delegate = null;
            //@ts-ignore
            accountInfo.delegatedAmount = new u64();
        } else {
            accountInfo.delegate = new PublicKey(accountInfo.delegate);
            accountInfo.delegatedAmount = u64.fromBuffer(accountInfo.delegatedAmount);
        }

        accountInfo.isInitialized = accountInfo.state !== 0;
        accountInfo.isFrozen = accountInfo.state === 2;

        if (accountInfo.isNativeOption === 1) {
            accountInfo.rentExemptReserve = u64.fromBuffer(accountInfo.isNative);
            accountInfo.isNative = true;
        } else {
            accountInfo.rentExemptReserve = null;
            accountInfo.isNative = false;
        }

        if (accountInfo.closeAuthorityOption === 0) {
            accountInfo.closeAuthority = null;
        } else {
            accountInfo.closeAuthority = new PublicKey(accountInfo.closeAuthority);
        }

        list.push(accountInfo)
        // console.log("/***accountInfo***/: " + JSON.stringify(accountInfo))
    });
    return list;
}



export async function getProgramOrigineAccountsByMint(
    connection: Connection,
    selectedWallet: any,
    mintAddress: any,
    callback: (error: Error | null, result: any | null) => any
) {
    try {
        //console.log("getProgramOrigineAccounts fro mint: "+mintAddress+", selectedWallet:"+selectedWallet.publicKey+"")
        var result: any = {};
        result = await connection.getProgramAccounts(new PublicKey(ORIGINE_PROGRAMM_ID), {
            filters: [{
                memcmp: {
                    "offset": 0,
                    bytes: mintAddress
                }
            }, {
                memcmp: {
                    "offset": 32,
                    bytes: selectedWallet.publicKey + ""
                }
            }]
        })
        result=decodeOringineReponse(result)
        // @ts-ignore
        callback(null, result);
    } catch (error) {
        callback(error, null);
    }

}



function decodeOringineReponse(accountsInfo: any) {
   

    let list:any[]=[]
 
    accountsInfo.forEach((info: any) => {
        const data = Buffer.from(info.account.data);
        const accountInfo = AccountOrigineLayout.decode(data);
        accountInfo.address = info.pubkey._bn;
        accountInfo.mint = new PublicKey(accountInfo.mint).toBase58();
        accountInfo.owner = new PublicKey(accountInfo.owner);
        accountInfo.amount = u64.fromBuffer(accountInfo.amount);
        if (accountInfo.delegateOption === 0) {
            accountInfo.delegate = null;
            //@ts-ignore
            accountInfo.delegatedAmount = new u64();
        } else {
            accountInfo.delegate = new PublicKey(accountInfo.delegate);
            accountInfo.delegatedAmount = u64.fromBuffer(accountInfo.delegatedAmount);
        }
        accountInfo.isInitialized = accountInfo.state !== 0;
        accountInfo.isFrozen = accountInfo.state === 2;

        if (accountInfo.isNativeOption === 1) {
            accountInfo.rentExemptReserve = u64.fromBuffer(accountInfo.isNative);
            accountInfo.isNative = true;
        } else {
            accountInfo.rentExemptReserve = null;
            accountInfo.isNative = false;
        }
        if (accountInfo.closeAuthorityOption === 0) {
            accountInfo.closeAuthority = null;
        } else {
            accountInfo.closeAuthority = new PublicKey(accountInfo.closeAuthority);
        }

        list.push(accountInfo)
      
    });
    return list;
}


export async function getSolanaOriginTokenBalance(
    connection: Connection,
    accountAddress: any,
    callback: (error: Error | null, fullBalance: any | null) => any
) {
    try {
        console.log("solana getSolanaOriginTokenBalance")
        var result = {}
        //@ts-ignore
        //var accountAddress = ACCOUNT_ADDRESS
        //@ts-ignore
        const accountInfo: any = await getOriginAccountInfo(new PublicKey(accountAddress), connection, "finalize");
       console.log("accountInfo: "+JSON.stringify(accountInfo))
        result = { "amount": accountInfo.amount.toNumber() }
        // @ts-ignore
        callback(null, result);
    } catch (error) {
        callback(error, null);
    }
}

export async function getSolanaOriginAccountInfo(
    connection: Connection,
    owner: any,
    callback: (error: Error | null, fullBalance: any | null) => any
) {
    try {
        var result: any = {};
        result = await connection.getTokenAccountsByOwner(owner.publicKey,
        {
          programId: new PublicKey(ORIGINE_PROGRAMM_ID)
        }
        )
      //  result=decodeOringineReponse(result.value)
        // @ts-ignore
        callback(null, result);
    } catch (error) {
        callback(error, null);
    }
}

export async function getOriginAccountInfo(
    account: PublicKey,
    connection: Connection,
    commitment?: Commitment,
): Promise<any> {
    const info = await connection.getAccountInfo(account, commitment);
    if (info === null) {
        throw new Error(FAILED_TO_FIND_ACCOUNT);
    }

    const data = Buffer.from(info.data);
    const accountInfo = AccountOrigineLayout.decode(data);

    accountInfo.address = account;
    accountInfo.mint = new PublicKey(accountInfo.mint);
    accountInfo.owner = new PublicKey(accountInfo.owner);
    accountInfo.amount = u64.fromBuffer(accountInfo.amount);
    if (accountInfo.delegateOption === 0) {
        accountInfo.delegate = null;
        //@ts-ignore
        accountInfo.delegatedAmount = new u64();
    } else {
        accountInfo.delegate = new PublicKey(accountInfo.delegate);
        accountInfo.delegatedAmount = u64.fromBuffer(accountInfo.delegatedAmount);
    }

    accountInfo.isInitialized = accountInfo.state !== 0;
    accountInfo.isFrozen = accountInfo.state === 2;

    if (accountInfo.isNativeOption === 1) {
        accountInfo.rentExemptReserve = u64.fromBuffer(accountInfo.isNative);
        accountInfo.isNative = true;
    } else {
        accountInfo.rentExemptReserve = null;
        accountInfo.isNative = false;
    }

    if (accountInfo.closeAuthorityOption === 0) {
        accountInfo.closeAuthority = null;
    } else {
        accountInfo.closeAuthority = new PublicKey(accountInfo.closeAuthority);
    }

    return accountInfo;
}

