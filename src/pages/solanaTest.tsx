import React, { useEffect, useMemo, useState } from "react";
//@ts-ignore
import Wallet from "@project-serum/sol-wallet-adapter";
import {
  Connection,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  PublicKey,
  Account,
  Commitment,
  AccountInfo,
} from "@solana/web3.js";
import {
  mintToken,
  createNewAccount,
  createMintTo,
  createTransfer,
  createNewOrigineAccount,
  mintOrigineToken,
} from "../api/solana/solanaLib/solanaFunctions";
import "./solanaTest.css";
import { Token } from "../api/solana/client/token";
import { newAccountWithLamports } from "../api/solana/client/util/new-account-with-lamports";
import { AccountLayout, u64 } from "../api/solana/client/token";
import {
  getProgramAccounts,
  getSolanaFullBalance,
  solanaMintNWBTC,
  solanaWithdraw,
} from "../api/solana/nWBTC";
import { runDeposit } from "../api/solana/solanaLib/token-test";
import {
  ACCOUNT_ADDRESS,
  ADAPTABLE_PROGRAMM_ID,
  ASSOCIATED_PROGRAMM_ID,
  MINT_ADDRESS,
  NETWORK_URL,
  ORIGINE_MINT_ADDRESS,
  ORIGINE_PROGRAMM_ID,
  WalletsTypes,
} from "./WalletUtils";
import { TokenSwap } from "../api/solana/client/token-swap";
import { createTokenSwap, swap } from "../api/solana/client/token-swap-test";
import { createAccountAndSwapAtomic } from "../api/solana/client-origin/token-swap-test";
import { TokenOrigin } from "../api/solana/client-origin/token";

const fetch = require("node-fetch");

function toHex(buffer: any) {
  return Array.prototype.map
    .call(buffer, (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

function SolanaTest() {
  const [logs, setLogs] = useState([]);
  //@ts-ignore
  function addLog(log) {
    //@ts-ignore
    setLogs((logs) => [...logs, log]);
  }

  const network = NETWORK_URL;
  const [providerUrl, setProviderUrl] = useState("https://www.sollet.io");
  const connection = useMemo(() => new Connection(network), [network]);
  // const urlWallet = useMemo(
  //   () => new Wallet(providerUrl, network),
  //   [providerUrl, network]
  // );
  const [tokenInfo, setTokenInfo] = useState("no Info");
  const solanaWallet = useMemo(() => {
    try {
      //@ts-ignore
      return new Wallet(window.sollet, network);
    } catch (e) {
      console.log(`Could not create injected wallet: ${e}`);
      return null;
    }
  }, [network]);
  const [, setConnected] = useState(false);
  const [balance, setBalance] = useState("");
  const [fullBalance, seFullBalance] = useState(null);
  const [amountToMint, setAmountToMint] = useState(0);
  const [mintOrigin, setMintOrigin] = useState("");

  const [mintAddress, setMintAddress] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [myWallet, setMyWallet]: any = useState(undefined);
  const [walletType, setWalletType] = useState("");


  useEffect(() => {
    // if (myWallet) {
    //   //@ts-ignore
    //   myWallet.on("connect", () => {
    //     setConnected(true);
    //     //@ts-ignore
    //     console.log("looooooooooool" + myWallet.publicKey);
    //     //@ts-ignore
    //     getBalance(myWallet.publicKey);
    //     //@ts-ignore
    //     addLog("Connected to wallet " + myWallet.publicKey.toBase58());
    //     // getFullBalance();
    //     runGetFullBalance();
    //   });
    //   //@ts-ignore
    //   myWallet.on("disconnect", () => {
    //     setConnected(false);
    //     addLog("Disconnected from wallet");
    //   });
    //   //@ts-ignore
    //   myWallet.connect();
    //   return () => {
    //     //@ts-ignore
    //     myWallet.disconnect();
    //   };
    // }
       solanaHandleConnection();
 
   
  }, [myWallet]);

  function solanaHandleConnection() {
    if (myWallet) {
      myWallet.on("connect", () => {
        setConnected(true);
      });
      myWallet.on("disconnect", () => {
        setConnected(false);
      });
      myWallet.connect();
      return () => {
        myWallet.disconnect();
      };
    }
  }

  function phantomHandleConnection() {
    setWalletType(WalletsTypes.PHANTOM);
    if (myWallet) {
      myWallet.on("connect", () => {
        setConnected(true);
      });
      myWallet.on("disconnect", () => {
        setConnected(false);
      });
      myWallet.connect();
      return () => {
        myWallet.disconnect();
      };
    }
  }
  
  function runGetFullBalance() {
    getSolanaFullBalance(
      connection,
      ACCOUNT_ADDRESS,
      (error: any, res: any) => {
        if (error) {
          console.log("error: " + error);
          return;
        }
        if (res) {
          console.log("fullBalance: " + JSON.stringify(res));
        }
      }
    );
  }

  //@ts-ignore
  async function getBalance(publicKey) {
    let balance = await connection.getBalance(publicKey);
    //@ts-ignore
    setBalance(balance);
  }

  const FAILED_TO_FIND_ACCOUNT = "Failed to find account";
  const INVALID_ACCOUNT_OWNER = "Invalid account owner";

  async function getAccountInfo(
    account: PublicKey,
    commitment?: Commitment
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

  const toHumanReadableBalance = (balance: string) => {
    var getBalanceFloat = parseFloat(balance);
    return (getBalanceFloat / 1000000000).toFixed(3);
  };

  async function sendTransaction() {
    try {
      let transaction = new Transaction().add(
        SystemProgram.transfer({
          //@ts-ignore
          fromPubkey: myWallet.publicKey,
          //@ts-ignore
          toPubkey: myWallet.publicKey,
          lamports: 100,
        })
      );
      addLog("Getting recent blockhash");
      transaction.recentBlockhash = (
        await connection.getRecentBlockhash()
      ).blockhash;
      addLog("Sending signature request to wallet");
      //@ts-ignore
      transaction.feePayer = myWallet.publicKey;
      //@ts-ignore
      let signed = await myWallet.signTransaction(transaction);
      addLog("Got signature, submitting transaction");
      let signature = await connection.sendRawTransaction(signed.serialize());
      addLog("Submitted transaction " + signature + ", awaiting confirmation");
      await connection.confirmTransaction(signature, "singleGossip");
      addLog("Transaction " + signature + " confirmed");
    } catch (e) {
      console.warn(e);
      addLog("Error: " + e.message);
    }
  }

  function createWithDraw(
    connection: Connection,
    myWallet: any,
    accountKey: any
  ) {
    //withDraw(connection,myWallet,accountKey)
    solanaWithdraw(
      connection,
      myWallet,
      0 + "",
      MINT_ADDRESS,
      ACCOUNT_ADDRESS,
      (error, result) => {
        if (error) {
          console.log("error: " + error);
          return;
        }
        if (result) {
          console.log("result: " + result);
        }
      }
    );
  }

  function createDeposit(connection: Connection, myWallet: any) {
    solanaMintNWBTC(
      connection,
      MINT_ADDRESS,
      ACCOUNT_ADDRESS,
      0,
      myWallet,
      (error, result) => {
        if (error) {
          console.log("error: " + error);
          return;
        }
        if (result) {
          console.log("result: " + result);
        }
      }
    );
  }

  function getSolanaProgramAccounts() {
    getProgramAccounts(
      connection,
      myWallet,
      MINT_ADDRESS,
      (error, result) => {
        if (error) {
          console.log("error: " + error);
          return;
        }
        if (result) {
          console.log("result: " + JSON.stringify(result));
        }
      }
    );
  }

  function doMintToken() {
    addLog("loading ... ");
    alert("mint" + amountToMint);
    try {
      mintToken(myWallet, connection)
        .then((token) => {
          addLog(JSON.stringify(token));
        })
        .catch((err) => addLog("" + err));
    } catch (err) {
      addLog("" + err);
    }
    // solanaMintNWBTC("","","",(error,result)=>{
    //   console.log("error: "+error)
    //   console.log("result: "+result)
    // })
  }

  function doCreateAccount() {
    console.log("loading ... ");
    let programId = ADAPTABLE_PROGRAMM_ID;
    createNewAccount(myWallet, connection, MINT_ADDRESS)
      .then((account) => addLog(JSON.stringify(account)))
      .catch((err) => addLog("" + err));
  }

  async function doCreateOrigineAccout() {
    console.log("loading ... ");
    let mint = mintOrigin; //"AFqVJyXLaEXDfhsh4UGr171qRnErpVXgNiyou79TgS4r"
    let tokenOrigin = new TokenOrigin(
      connection,
      new PublicKey(mint),
      new PublicKey(ORIGINE_PROGRAMM_ID),
      //@ts-ignore
      myWallet
    );
    //@ts-ignore
    let account = await tokenOrigin.createAccount(myWallet.publicKey);
    console.log(JSON.stringify(account));
    /* createNewOrigineAccount(myWallet , connection,mintAddress)
      .then((account) => addLog(JSON.stringify(account)))
      .catch((err) => addLog("" + err));*/
  }

  async function doMintOrigineToken() {
    let programId = new PublicKey(ORIGINE_PROGRAMM_ID);

    let testTokenDecimals: number = 2;
    let token = await TokenOrigin.createMint(
      connection,
      myWallet,
      //@ts-ignore
      myWallet.publicKey,
      //@ts-ignore
      myWallet.publicKey,
      testTokenDecimals,
      programId,
      programId,
      programId
    );
    console.log("testToken: " + JSON.stringify(token));
  }

  function swapp() {
    //   let testToken = new Token(
    //     connection,
    //     new PublicKey(ORIGINE_MINT_ADDRESS),
    //     new PublicKey(ORIGINE_PROGRAMM_ID),
    //     //@ts-ignore
    //     myWallet
    // );
    // testToken.createTokenSwap(connection,myWallet)
    //     .then((account) => console.log(JSON.stringify(account)))
    let tokenSwap = swap(connection, myWallet);
    //let swap=createTokenSwap(connection)
  }

  function doMintTo() {
    addLog("loading ... ");
    createMintTo(
      myWallet,
      connection,
      MINT_ADDRESS,
      ACCOUNT_ADDRESS
    ).then((account) => addLog(JSON.stringify(account)));
    // .catch((err) => addLog("" + err));
  }

  async function doMintToOrigin() {
    addLog("loading ... ");
    let mint = mintAddress; //"384es4x7C8gaXRKpLpZhyxLSQFEjjci6As7k46NdTW1P"
    let account = accountAddress; //"Akb9aRfX3ePNvPBsk7VvsoKHwowVgFvqTnHoeD6VZjqn"
    let token = new TokenOrigin(
      connection,
      new PublicKey(mint),
      new PublicKey(ORIGINE_PROGRAMM_ID),
      //@ts-ignore
      myWallet
    );

    // await testToken.mintTo(testAccount, testMintAuthority, [], 1000);
    await token.mintTo(account, myWallet, [], amount);
    const mintInfo = await token.getAccountInfo(new PublicKey(account));
    console.log(mintInfo);

    return;
    // .catch((err) => addLog("" + err));
  }

  function doTransfer() {
    addLog("loading ... ");

    createTransfer(myWallet, connection)
      .then((account) => addLog(JSON.stringify(account)))
      .catch((err) => addLog("" + err));
  }

  async function signMessage() {
    try {
      const message =
        "Please sign this message for proof of address ownership.";
      addLog("Sending message signature request to wallet");
      const data = new TextEncoder().encode(message);
      //@ts-ignore
      const signed = await myWallet.sign(data, "hex");
      addLog("Got signature: " + toHex(signed.signature));
    } catch (e) {
      console.warn(e);
      addLog("Error: " + e.message);
    }
  }

  async function dogetTokensAccount() {
    let accounts = await connection.getParsedTokenAccountsByOwner(
      //@ts-ignore
      myWallet.publicKey,
      {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      },
      "confirmed"
    );

    addLog(JSON.stringify(accounts));
  }

  async function onClickConnectSolana() {
    try {
      //@ts-ignore
      let solanaWallet = new Wallet(window.sollet, network);
      //@ts-ignore
      setMyWallet(solanaWallet);
    } catch (e) {
      console.log(`Could not create injected wallet: ${e}`);
      return null;
    }
  }

  function onClickConnectPhantom() {
    try {
      //@ts-ignore
      const provider = window.solana
      if (!provider || !provider.isPhantom) {
        window.open("https://phantom.app/", "_blank");
        return;
      }
      // Will either automatically connect to Phantom, or do nothing.
      //provider.connect({ onlyIfTrusted: false });
      let phantomWallet = new Wallet(provider, network);
      //@ts-ignore
      setMyWallet(phantomWallet);
    } catch (e) {
      console.log(`Could not create injected wallet: ${e}`);
      return null;
    }
  }

  return (
    <div className="App">
      <h1>Wallet Adapter Demo</h1>
      <div>Network: {network}</div>
      <div>
        Waller provider:{" "}
        <input
          type="text"
          className="wallet-provider"
          value={providerUrl}
          onChange={(e) => setProviderUrl(e.target.value.trim())}
          style={{color:'#819baf !important'}}
        />
      </div>
      {myWallet !== undefined &&
      myWallet !== "undefined" &&
      myWallet !== null ? (
        //@ts-ignore
        myWallet.connected ? (
          <div>
            <div>
              Wallet address:{" "}
              {
                //@ts-ignore
                myWallet.publicKey.toBase58()
              }
              .
            </div>
            <br />
            <button onClick={sendTransaction}>Send Transaction</button>
            <br />
            <button>balance: {balance}</button>
            <br />
            <button>
              getFullBalance:{" "}
              {
                //@ts-ignore
                fullBalance ? fullBalance.amount + "amount, " +  fullBalance.usdc + "usdc, " + fullBalance.asset +
                    "asset"
                  : ""
              }
            </button>
            <br />
            <button>runFullBalance</button>
            <br />
            <button onClick={signMessage}>Sign Message</button>
            <br />
            <button
              onClick={() =>
                //@ts-ignore
                myWallet.disconnect()
              }
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div>
           <button onClick={onClickConnectSolana}>connect to sollet</button>
      <br></br>
      <button onClick={onClickConnectPhantom}>connect to phantom</button>
          </div>
        )
      ) : (
        <div>
         <button onClick={onClickConnectSolana}>connect to sollet</button>
      <br></br>
      <button onClick={onClickConnectPhantom}>connect to phantom</button>
        </div>
      )}
      <hr />
      <div className="logs">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
      <br />
      <button onClick={() => dogetTokensAccount()}>getTokensProgramId</button>
      <br />
      <button onClick={() => doMintToken()}>Mint token</button>
      <br></br>
      <button onClick={() => doCreateAccount()}>Create Account</button>
      <br></br>
      <input
        type="number"
        placeholder="amount"
        value={amountToMint}
        onChange={(e) => setAmountToMint(parseFloat(e.target.value))}
        style={{color:'black'}}
      />
      <button onClick={() => doMintTo()}>Minto Account</button>
      <br></br>
      <button onClick={() => doTransfer()}>Transfer</button>
      <br></br>
      <button onClick={() => createWithDraw(connection, myWallet, "")}>
        createWithDraw
      </button>
      <br></br>
      <button onClick={() => createDeposit(connection, myWallet)}>
        deposit
      </button>
      <br></br>
      <button onClick={() => getSolanaProgramAccounts()}>
        getProgramAccounts
      </button>
      <br></br>
      <button onClick={() => swapp()}>Swap</button>
      <br></br>
      <br></br>
      <label style={{fontSize:"20px",color:"white"}}>********************************** For Program Origin**************************************</label>
      <br></br>
      <button onClick={() => doMintOrigineToken()}>Mint Origine token</button>
      <br></br>
      <input
        type="text"
        placeholder="mint address"
        value={mintOrigin}
        onChange={(e) => setMintOrigin(e.target.value)}
        style={{color:'black'}}
      />
      <button onClick={() => doCreateOrigineAccout()}>
        Create Origine Account
      </button>
      <br></br>

      <input
        type="text"
        placeholder="mint address"
        value={mintAddress}
        onChange={(e) => setMintAddress(e.target.value)}
        style={{color:'black'}}
      />
      <input
        type="text"
        placeholder="account address"
        value={accountAddress}
        onChange={(e) => setAccountAddress(e.target.value)}
        style={{color:'black'}}
      />
      <input
        type="number"
        placeholder="amount"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        style={{color:'black'}}
      />
      <button onClick={() => doMintToOrigin()}>doMintToOrigin</button>
      <br></br>
      
    </div>
  );
}

export default SolanaTest;
