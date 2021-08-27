
import { AccountInfo, Connection, PublicKey } from "@solana/web3.js";
import { Token } from "./client/token";
// import { Token } from "../../../src/NToken-solana/js/cli/token"
import { ADAPTABLE_PROGRAMM_ID, MINT_ADDRESS, PORTFOLIO_ACCOUNT_SIZE, PORTFOLIO_MINT_ADDRESS, PORTFOLIO_PROGRAMM_ID, SENTINEL_ACCOUNT_ADDRESS } from "../../pages/WalletUtils";
import Wallet from "@project-serum/sol-wallet-adapter";
import { AccountLayout, PortfolioLayout, u64 } from "./client/nToken";
// import {createPortfolio} from "../../../src/NToken-solana/js/cli/token-test"
// @ts-ignore
const nWBTC = TruffleContract(nWBTCContract);

export async function getAllSolanaPortfolios(
    callback: (error: Error | null, txid: string | null) => any
) {
    try {
        var result: any = {};
        // @ts-ignore
        callback(null, JSON.stringify(result));
    } catch (error) {
        callback(error, null);
    }
}

export async function createPortfolioSolana(
    connection: Connection,
    selectedWallet: any,
    portfolio: any,
    callback: (error: Error | null, txid: string | null) => any
) {
    //try {
    let token = new Token(
        connection,
        new PublicKey(PORTFOLIO_MINT_ADDRESS),
        new PublicKey(PORTFOLIO_PROGRAMM_ID),
        selectedWallet
    )
    // let ntoken: nToken = new nToken(
    //     connection,
    //     new PublicKey(PORTFOLIO_MINT_ADDRESS),
    //     new PublicKey(PORTFOLIO_PROGRAMM_ID),
    //     selectedWallet
    //   );
  
      let owner = selectedWallet.publicKey;
      let metaDataUrl = "aabbcc";
      var metaDataHash = new Uint16Array([123456789]);
      let amountAsset1 = 2;
  
      let account = portfolio ? (portfolio.assets)[0] ? (portfolio.assets)[0].address : null : null;
      //remove that line, don't forget plz
      let addressAsset1 = account;
      let periodAsset1 = new Uint32Array([3]);
      let assetToSoldIntoAsset1 = account;//await (await ntoken.createAccountNew(selectedWallet.publicKey)).publicKey;
      console.log("addressAsset1=> " + addressAsset1, "assetToSoldIntoAsset1 " + assetToSoldIntoAsset1)
  
  
      let amountAsset2 = 0;
      account = portfolio ? (portfolio.assets)[1] ? (portfolio.assets)[1].address : SENTINEL_ACCOUNT_ADDRESS : SENTINEL_ACCOUNT_ADDRESS;
      let addressAsset2 = account;
      let periodAsset2 = new Uint32Array([3]);
      let assetToSoldIntoAsset2 = account;//await (await ntoken.createAccountNew(selectedWallet.publicKey)).publicKey;
      console.log("*******addressAsset2=> " + addressAsset2, "assetToSoldIntoAsset2 " + assetToSoldIntoAsset2)
  
      let amountAsset3 = 0;
      account = portfolio ? (portfolio.assets)[2] ? (portfolio.assets)[2].address : SENTINEL_ACCOUNT_ADDRESS : SENTINEL_ACCOUNT_ADDRESS;
      console.log("acount3=> " + account)
      let addressAsset3 = account;
      let periodAsset3 = new Uint32Array([3]);
      let assetToSoldIntoAsset3 = account;//await (await ntoken.createAccountNew(selectedWallet.publicKey)).publicKey;
  
      let amountAsset4 = 0;
      account = portfolio ? (portfolio.assets)[3] ? (portfolio.assets)[3].address : SENTINEL_ACCOUNT_ADDRESS : SENTINEL_ACCOUNT_ADDRESS;
      console.log("acount4=> " + account)
      let addressAsset4 = account;
      let periodAsset4 = new Uint32Array([3]);
      let assetToSoldIntoAsset4 = account;//await (await ntoken.createAccountNew(selectedWallet.publicKey)).publicKey;
  
      let amountAsset5 = 0;
      account = portfolio ? (portfolio.assets)[4] ? (portfolio.assets)[4].address : SENTINEL_ACCOUNT_ADDRESS : SENTINEL_ACCOUNT_ADDRESS;
      console.log("acount5=> " + account)
      let addressAsset5 = account;
      let periodAsset5 = new Uint32Array([3]);
      let assetToSoldIntoAsset5 = account;//await (await ntoken.createAccountNew(selectedWallet.publicKey)).publicKey;
  
      let amountAsset6 = 0;
      account = portfolio ? (portfolio.assets)[5] ? (portfolio.assets)[5].address : SENTINEL_ACCOUNT_ADDRESS : SENTINEL_ACCOUNT_ADDRESS;
      console.log("acount6=> " + account)
      let addressAsset6 = account;
      let periodAsset6 = new Uint32Array([3]);
      let assetToSoldIntoAsset6 = account;// await (await ntoken.createAccountNew(selectedWallet.publicKey)).publicKey;
  
      let amountAsset7 = 0;
      account = portfolio ? (portfolio.assets)[6] ? (portfolio.assets)[6].address : SENTINEL_ACCOUNT_ADDRESS : SENTINEL_ACCOUNT_ADDRESS;
      console.log("acount7=> " + account)
      let addressAsset7 = account;
      let periodAsset7 = new Uint32Array([3]);
      let assetToSoldIntoAsset7 = account;//await (await ntoken.createAccountNew(selectedWallet.publicKey)).publicKey;
  
      let amountAsset8 = 0;
      account = portfolio ? (portfolio.assets)[7] ? (portfolio.assets)[7].address : SENTINEL_ACCOUNT_ADDRESS : SENTINEL_ACCOUNT_ADDRESS;
      console.log("acount8=> " + account)
      let addressAsset8 = account;
      let periodAsset8 = new Uint32Array([3]);
      let assetToSoldIntoAsset8 = account;
  
      let amountAsset9 = 0;
      account = portfolio ? (portfolio.assets)[8] ? (portfolio.assets)[8].address : SENTINEL_ACCOUNT_ADDRESS : SENTINEL_ACCOUNT_ADDRESS;
      console.log("acount9=> " + account)
      let addressAsset9 = account;
      let periodAsset9 = new Uint32Array([3]);
      let assetToSoldIntoAsset9 = account;
      var newPortfolio = {
        owner, metaDataUrl, metaDataHash,
        amountAsset1, addressAsset1, periodAsset1, assetToSoldIntoAsset1,
        amountAsset2, addressAsset2, periodAsset2, assetToSoldIntoAsset2,
        amountAsset3, addressAsset3, periodAsset3, assetToSoldIntoAsset3,
        amountAsset4, addressAsset4, periodAsset4, assetToSoldIntoAsset4,
        amountAsset5, addressAsset5, periodAsset5, assetToSoldIntoAsset5,
        amountAsset6, addressAsset6, periodAsset6, assetToSoldIntoAsset6,
        amountAsset7, addressAsset7, periodAsset7, assetToSoldIntoAsset7,
        amountAsset8, addressAsset8, periodAsset8, assetToSoldIntoAsset8,
        amountAsset9, addressAsset9, periodAsset9, assetToSoldIntoAsset9
      }
    const portfolioAddress: any = await token.createPortfolio(connection,newPortfolio, selectedWallet, portfolio);
    console.log(" new account Address " + portfolioAddress);
    var p :any = localStorage.getItem("portfolio");
    p = p ? JSON.parse(p): null;
    p.address=portfolioAddress.toBase58();
    localStorage.setItem("portfolio",JSON.stringify(p));

    // const accountInfo = await token.getPortfolioAccountInfo(testAccount);

    callback(null, portfolioAddress);
    // callback(null, "");
    // } catch (error) {
    //     callback(error, "null");
    // }
}


export async function getSolanaPortfolioDetails(
    callback: (error: Error | null, txid: string | null) => any
) {
    try {
        var result: any = {};
        // @ts-ignore
        callback(null, JSON.stringify(result));
    } catch (error) {
        callback(error, null);
    }
}


export async function depositOnSolanaPortfolio(

    callback: (error: Error | null, txid: string | null) => any
) {
    try {

        var result: any = {};
        // @ts-ignore
        callback(null, JSON.stringify(result));
    } catch (error) {
        callback(error, null);
    }
}

export async function getSolanaProgramPortfolios(
    connection: Connection,
    callback: (error: Error | null, result: any | null) => any
) {
    // try {
    var result: any = {};
    result = await connection.getProgramAccounts(new PublicKey(PORTFOLIO_PROGRAMM_ID), {
        //     filters: [
        //         {
        //         memcmp: {
        //             "offset": 195,
        //             bytes: "??"
        //         }
        //     }
        // ]
        "encoding": "base64"
    })
    let list = decodeReponse(result)
    // @ts-ignore
    //callback(null, result);
    // } catch (error) {
    //     callback(error, null);
    // }

}

function decodeReponse(accountsInfo: any) {
    //console.log("*********decodeReponse********" );
    let list: any[] = []
    // console.log("accountsInfo**" + JSON.stringify(accountsInfo));
    // return;
    accountsInfo.forEach((info: any) => {
       
        try {


            const data = Buffer.from(info.account.data);
            const portfolioInfo = PortfolioLayout.decode(data);
            console.log("portfolioInfo.owner: "+new PublicKey(portfolioInfo.owner).toBase58())
            console.log("portfolioInfo.addressAsset1: "+new PublicKey(portfolioInfo.addressAsset1).toBase58())
            console.log("portfolioInfo.creatorAccount: "+new PublicKey(portfolioInfo.creatorAccount).toBase58())

            /*
            portfolioInfo.owner = new PublicKey(portfolioInfo.owner).toBase58();

            portfolioInfo.addressAsset1 = new PublicKey(portfolioInfo.addressAsset1).toBase58();
            portfolioInfo.amountAsset1 = u64.fromBuffer(portfolioInfo.amountAsset1);

            portfolioInfo.addressAsset2 = new PublicKey(portfolioInfo.addressAsset2).toBase58();
            portfolioInfo.amountAsset2 = u64.fromBuffer(portfolioInfo.amountAsset2);

            portfolioInfo.addressAsset3 = new PublicKey(portfolioInfo.addressAsset3).toBase58();
            portfolioInfo.amountAsset3 = u64.fromBuffer(portfolioInfo.amountAsset3);

            portfolioInfo.addressAsset4 = new PublicKey(portfolioInfo.addressAsset4).toBase58();
            portfolioInfo.amountAsset4 = u64.fromBuffer(portfolioInfo.amountAsset4);

            portfolioInfo.addressAsset5 = new PublicKey(portfolioInfo.addressAsset5).toBase58();
            portfolioInfo.amountAsset5 = u64.fromBuffer(portfolioInfo.amountAsset5);

            portfolioInfo.addressAsset6 = new PublicKey(portfolioInfo.addressAsset6).toBase58();
            portfolioInfo.amountAsset6 = u64.fromBuffer(portfolioInfo.amountAsset6);

            portfolioInfo.addressAsset7 = new PublicKey(portfolioInfo.addressAsset7).toBase58();
            portfolioInfo.amountAsset7 = u64.fromBuffer(portfolioInfo.amountAsset7);

            portfolioInfo.addressAsset8 = new PublicKey(portfolioInfo.addressAsset8).toBase58();
            portfolioInfo.amountAsset8 = u64.fromBuffer(portfolioInfo.amountAsset8);
*/
            // console.log("portfolioInfo: " + new PublicKey(portfolioInfo.owner).toBase58())

        } catch (error) {
            //console.log("error decoding" + error)
        }

        // list.push(portfolioInfo)
        // console.log("/***accountInfo***/: " + JSON.stringify(accountInfo))
    });
    return list;
}
