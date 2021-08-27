// @flow


import {
  Account,
  Connection,
  PublicKey,
  clusterApiUrl,

} from '@solana/web3.js';

import {
  Token,
  NATIVE_MINT,
  MintInfo
} from '../client/token';

//@ts-ignore
import Wallet from '@project-serum/sol-wallet-adapter';

import {newAccountWithLamports} from '../client/util/new-account-with-lamports';
import {sleep} from '../client/util/sleep';
import { AccountInfo } from '@solana/web3.js';
import { ACCOUNT_ADDRESS, ADAPTABLE_PROGRAMM_ID, ASSOCIATED_PROGRAMM_ID, MINT_ADDRESS, ORIGINE_PROGRAMM_ID, ORIGINE_MINT_ADDRESS, NETWORK_URL, PORTFOLIO_ASSOCIATED_PROGRAMM_ID, PORTFOLIO_PROGRAMM_ID } from '../../../pages/WalletUtils';
import { TokenOrigin } from '../client-origin/token';

// Loaded token program's program id
let programId: PublicKey;
let associatedProgramId: PublicKey;
let wallet: Wallet;

// Accounts setup in createMint and used by all subsequent tests
let testMintAuthority: Account;
let testToken: Token;
let testTokenDecimals: number = 2;
let accountKey : PublicKey;

// Accounts setup in createAccount and used by all subsequent tests
let testAccountOwner: Account;
let testAccount: PublicKey;

function assert(condition:any, message:any) {
  if (!condition) {
    console.log(Error().stack + ':token-test.js');
    throw message || 'Assertion failed';
  }
}


async function didThrow(obj:any, func:any, args:any): Promise<boolean> {
  try {
    await func.apply(testToken, args);
  } catch (e) {
    return true;
  }
  return false;
}

let connection:any;
async function getConnection(): Promise<Connection> {
  if (connection) return connection;
  const network = NETWORK_URL;
  connection = new Connection(network, 'recent');
  const version = await connection.getVersion();

  return connection;
}


async function GetPrograms(connection: Connection): Promise<void> {
  
    programId = new PublicKey(ADAPTABLE_PROGRAMM_ID);
    associatedProgramId = new PublicKey(ASSOCIATED_PROGRAMM_ID);
    let info;
    info = await connection.getAccountInfo(programId);
    //@ts-ignore
    assert(info != null);
    info = await connection.getAccountInfo(associatedProgramId);
    //@ts-ignore
    assert(info != null);
 
}

export async function loadTokenProgram(selectedWallet:any): Promise<void> {
  wallet = selectedWallet;
  const connection = await getConnection();
  await GetPrograms(connection);

  console.log('Token Program ID', programId.toString());
  console.log('Associated Token Program ID', associatedProgramId.toString());
}

export async function createMint(selectedWallet:any , connection:any): Promise<MintInfo> {
  
  //const payer =  wallet.publicKey; // await newAccountWithLamports(connection, 1000000000 /* wag */);
 // testMintAuthority = new Account();
  programId = new PublicKey(PORTFOLIO_PROGRAMM_ID);
  associatedProgramId = new PublicKey(PORTFOLIO_ASSOCIATED_PROGRAMM_ID);
  let testToken = await Token.createMint(
    connection,
    selectedWallet,
    selectedWallet.publicKey,
    selectedWallet.publicKey,
    testTokenDecimals,
    programId,
    programId,
    programId
  );
  // HACK: override hard-coded ASSOCIATED_TOKEN_PROGRAM_ID with corresponding
  // custom test fixture
  testToken.associatedProgramId = associatedProgramId;

  console.log("mint info = " + testToken.publicKey.toBase58());
  const mintInfo = await testToken.getMintInfo();
  if (mintInfo.mintAuthority !== null) {
    //@ts-ignore
    assert(mintInfo.mintAuthority.equals(testMintAuthority.publicKey));
  } else {
    //@ts-ignore
    assert(mintInfo.mintAuthority !== null);
  }
  //@ts-ignore
  assert(mintInfo.supply.toNumber() === 0);
  //@ts-ignore
  assert(mintInfo.decimals === testTokenDecimals);
  //@ts-ignore
  assert(mintInfo.isInitialized === true);
  if (mintInfo.freezeAuthority !== null) {
    //@ts-ignore
    assert(mintInfo.freezeAuthority.equals(testMintAuthority.publicKey));
  } else {
    //@ts-ignore
    assert(mintInfo.freezeAuthority !== null);
  }

 return mintInfo;
}


export async function createOrigineMint(selectedWallet:any , connection:any)/*: Promise<MintInfo> */{
  programId = new PublicKey(ORIGINE_PROGRAMM_ID);
  alert("before")
  associatedProgramId = new PublicKey(ASSOCIATED_PROGRAMM_ID);
  let testToken = await Token.createMint(
    connection,
    selectedWallet,
    selectedWallet.publicKey,
    selectedWallet.publicKey,
    testTokenDecimals,
    programId,
    programId,
    programId
  );
  alert("after"+testToken)
  testToken.associatedProgramId = associatedProgramId;
  console.log("mint info = " + testToken.publicKey.toBase58());
  const mintInfo = await testToken.getMintInfo();
  if (mintInfo.mintAuthority !== null) {
    //@ts-ignore
    assert(mintInfo.mintAuthority.equals(testMintAuthority.publicKey));
  } else {
    //@ts-ignore
    assert(mintInfo.mintAuthority !== null);
  }
  //@ts-ignore
  assert(mintInfo.supply.toNumber() === 0);
  //@ts-ignore
  assert(mintInfo.decimals === testTokenDecimals);
  //@ts-ignore
  assert(mintInfo.isInitialized === true);
  if (mintInfo.freezeAuthority !== null) {
    //@ts-ignore
    assert(mintInfo.freezeAuthority.equals(testMintAuthority.publicKey));
  } else {
    //@ts-ignore
    assert(mintInfo.freezeAuthority !== null);
  }
 //return mintInfo;
}



//@ts-ignore
export async function createAccount(selectedWallet , connection ,mintAddress ): Promise<AccountInfo> {
  let testToken = new Token(
    connection,
    new PublicKey(mintAddress),//new PublicKey(MINT_ADDRESS),
    new PublicKey(ADAPTABLE_PROGRAMM_ID),
    selectedWallet
  )
  testAccount = await testToken.createAccount(selectedWallet.publicKey );
  console.log(" new n token account Address "  +  testAccount.toBase58());
  const accountInfo = await testToken.getAccountInfo(testAccount);
 

 /* // you can create as many accounts as with same owner
  const testAccount2 = await testToken.createAccount(
    testAccountOwner.publicKey,
  );
  assert(!testAccount2.equals(testAccount));*/

  return accountInfo;
}


//@ts-ignore
export async function createOrigineAccount(selectedWallet , connection ,mintAddress ): Promise<AccountInfo> {
  // let testToken = new Token(
  //   connection,
  //   new PublicKey(mintAddress),
  //   new PublicKey(ORIGINE_PROGRAMM_ID),
  //   selectedWallet
  // )
  // testAccount = await testToken.createAccount(selectedWallet.publicKey );
  // console.log(" new token account Address "  +  testAccount.toBase58());
  // const accountInfo = await testToken.getAccountInfo(testAccount);
  // return accountInfo;
    let tokenOrigin=new TokenOrigin(
      connection,
      new PublicKey(mintAddress),
      new PublicKey(ORIGINE_PROGRAMM_ID),
      //@ts-ignore
      selectedWallet
    )
    //@ts-ignore
    let account= await tokenOrigin.createAccount(selectedWallet.publicKey)
  console.log(" new token account Address "  +  JSON.stringify(account));
  const accountInfo = await tokenOrigin.getAccountInfo(account);
  return accountInfo;
}

export async function runGetFullBalance(account = testAccount) {
  console.log("run get full balance");
  const accountInfo :any= await testToken.getAccountInfo(account);
  console.log("amount:" + accountInfo.amount.toNumber(), "usdc:" + accountInfo.usdc.toNumber(), "asset:" + accountInfo.asset.toNumber())
  //@ts-ignore
  return ({ "amount": accountInfo.amount.toNumber(), "usdc": accountInfo.usdc.toNumber(), "asset": accountInfo.asset.toNumber() })
}


//@ts-ignore
export async function withDraw(connection , selectedWallet , accountKey) {
  console.log("run test withdraw");
  // const connection = await getConnection();
  // let res = await createMint(connection)
  let testToken = new Token(
    connection,
    new PublicKey(MINT_ADDRESS),
    new PublicKey(ADAPTABLE_PROGRAMM_ID),
    selectedWallet
  );
  let account = new PublicKey(ACCOUNT_ADDRESS)
  console.log("before withDraw: "+account)
  await testToken.createWithDraw(connection,account, 10, selectedWallet);
  console.log("after withDraw: "+account);


}

export async function createAssociatedAccount(): Promise<void> {
  let info;
  const connection = await getConnection();

  const owner = new Account();
  const associatedAddress = await Token.getAssociatedTokenAddress(
    associatedProgramId,
    programId,
    testToken.publicKey,
    owner.publicKey,
  );

  // associated account shouldn't exist
  info = await connection.getAccountInfo(associatedAddress);
  assert(info == null,"");

  const createdAddress = await testToken.createAssociatedTokenAccount(
    owner.publicKey,
  );
  assert(createdAddress.equals(associatedAddress),"");

  // associated account should exist now
  info = await testToken.getAccountInfo(associatedAddress);
  assert(info != null,"");
  assert(info.mint.equals(testToken.publicKey),"");
  assert(info.owner.equals(owner.publicKey),"");
  assert(info.amount.toNumber() === 0,"");

  // creating again should cause TX error for the associated token account
  assert(
    await didThrow(testToken, testToken.createAssociatedTokenAccount, [
      owner.publicKey,
    ]),""
  );
}

export async function mintTo(selectedWallet:any , connection:any,mintAddress:any,accountAddress:any): Promise<void> {
  let testToken = new Token(
    connection,
    new PublicKey(mintAddress),
    new PublicKey(ADAPTABLE_PROGRAMM_ID),
    selectedWallet
);

  // await testToken.mintTo(testAccount, testMintAuthority, [], 1000);
  await testToken.mintTo(accountAddress, selectedWallet, [], 1000);
  const mintInfo = await testToken.getAccountInfo(new PublicKey(accountAddress))
  console.log(mintInfo)

  return ;
}

export async function mintToChecked(): Promise<void> {
  assert(
    await didThrow(testToken, testToken.mintToChecked, [
      testAccount,
      testMintAuthority,
      [],
      1000,
      1,
    ]),""
  );

  await testToken.mintToChecked(testAccount, testMintAuthority, [], 1000, 2);

  const mintInfo = await testToken.getMintInfo();
  assert(mintInfo.supply.toNumber() === 2000,"");

  const accountInfo = await testToken.getAccountInfo(testAccount);
  assert(accountInfo.amount.toNumber() === 2000,"");
}

export async function transfer(): Promise<void> {
  const destOwner = new Account();
  const dest = await testToken.createAccount(destOwner.publicKey);

  await testToken.transfer(testAccount, dest, testAccountOwner, [], 100);

  const mintInfo = await testToken.getMintInfo();
  assert(mintInfo.supply.toNumber() === 1000,"");

  let destAccountInfo = await testToken.getAccountInfo(dest);
  assert(destAccountInfo.amount.toNumber() === 100,"");

  let testAccountInfo = await testToken.getAccountInfo(testAccount);
  assert(testAccountInfo.amount.toNumber() === 900,"");

  //return mintInfo;
}

export async function transferChecked(): Promise<void> {
  const destOwner = new Account();
  const dest = await testToken.createAccount(destOwner.publicKey);

  assert(
    await didThrow(testToken, testToken.transferChecked, [
      testAccount,
      dest,
      testAccountOwner,
      [],
      100,
      testTokenDecimals - 1,
    ]),""
  );

  await testToken.transferChecked(
    testAccount,
    dest,
    testAccountOwner,
    [],
    100,
    testTokenDecimals,
  );

  const mintInfo = await testToken.getMintInfo();
  assert(mintInfo.supply.toNumber() === 2000,"");

  let destAccountInfo = await testToken.getAccountInfo(dest);
  assert(destAccountInfo.amount.toNumber() === 100,"");

  let testAccountInfo = await testToken.getAccountInfo(testAccount);
  assert(testAccountInfo.amount.toNumber() === 1800,"");
}

export async function transferCheckedAssociated(): Promise<void> {
  const dest = new Account().publicKey;
  let associatedAccount;

  associatedAccount = await testToken.getOrCreateAssociatedAccountInfo(dest);
  assert(associatedAccount.amount.toNumber() === 0,"");

  await testToken.transferChecked(
    testAccount,
    associatedAccount.address,
    testAccountOwner,
    [],
    123,
    testTokenDecimals,
  );

  associatedAccount = await testToken.getOrCreateAssociatedAccountInfo(dest);
  assert(associatedAccount.amount.toNumber() === 123,"");
}

export async function approveRevoke(): Promise<void> {
  const delegate = new Account().publicKey;

  await testToken.approve(testAccount, delegate, testAccountOwner, [], 42,connection);

  let testAccountInfo = await testToken.getAccountInfo(testAccount);
  assert(testAccountInfo.delegatedAmount.toNumber() === 42,"");
  if (testAccountInfo.delegate === null) {
    throw new Error('delegate should not be null');
  } else {
    assert(testAccountInfo.delegate.equals(delegate),"");
  }

  await testToken.revoke(testAccount, testAccountOwner, []);

  testAccountInfo = await testToken.getAccountInfo(testAccount);
  assert(testAccountInfo.delegatedAmount.toNumber() === 0,"");
  if (testAccountInfo.delegate !== null) {
    throw new Error('delegate should be null');
  }
}

export async function failOnApproveOverspend(): Promise<void> {
  const owner = new Account();
  const account1 = await testToken.createAccount(owner.publicKey);
  const account2 = await testToken.createAccount(owner.publicKey);
  const delegate = new Account();

  await testToken.transfer(testAccount, account1, testAccountOwner, [], 10);

  await testToken.approve(account1, delegate.publicKey, owner, [], 2,connection);

  let account1Info = await testToken.getAccountInfo(account1);
  assert(account1Info.amount.toNumber() == 10,"");
  assert(account1Info.delegatedAmount.toNumber() == 2,"");
  if (account1Info.delegate === null) {
    throw new Error('delegate should not be null');
  } else {
    assert(account1Info.delegate.equals(delegate.publicKey),"");
  }

  await testToken.transfer(account1, account2, delegate, [], 1);

  account1Info = await testToken.getAccountInfo(account1);
  assert(account1Info.amount.toNumber() == 9,"");
  assert(account1Info.delegatedAmount.toNumber() == 1,"");

  await testToken.transfer(account1, account2, delegate, [], 1);

  account1Info = await testToken.getAccountInfo(account1);
  assert(account1Info.amount.toNumber() == 8,"");
  assert(account1Info.delegate === null,"");
  assert(account1Info.delegatedAmount.toNumber() == 0,"");

  assert(
    await didThrow(testToken, testToken.transfer, [
      account1,
      account2,
      delegate,
      [],
      1,
    ]),""
  );
}

export async function setAuthority(): Promise<void> {
  const newOwner = new Account();
  await testToken.setAuthority(
    testAccount,
    newOwner.publicKey,
    'AccountOwner',
    testAccountOwner,
    [],
  );
  assert(
    await didThrow(testToken, testToken.setAuthority, [
      testAccount,
      newOwner.publicKey,
      'AccountOwner',
      testAccountOwner,
      [],
    ]),""
  );
  await testToken.setAuthority(
    testAccount,
    testAccountOwner.publicKey,
    'AccountOwner',
    newOwner,
    [],
  );
}

export async function burn(): Promise<void> {
  let accountInfo = await testToken.getAccountInfo(testAccount);
  const amount = accountInfo.amount.toNumber();

  await testToken.burn(testAccount, testAccountOwner, [], 1);

  accountInfo = await testToken.getAccountInfo(testAccount);
  assert(accountInfo.amount.toNumber() == amount - 1,"");
}

export async function burnChecked(): Promise<void> {
  let accountInfo = await testToken.getAccountInfo(testAccount);
  const amount = accountInfo.amount.toNumber();

  assert(
    await didThrow(testToken, testToken.burnChecked, [
      testAccount,
      testAccountOwner,
      [],
      1,
      1,
    ]),""
  );

  await testToken.burnChecked(testAccount, testAccountOwner, [], 1, 2);

  accountInfo = await testToken.getAccountInfo(testAccount);
  assert(accountInfo.amount.toNumber() == amount - 1,"");
}

export async function freezeThawAccount(): Promise<void> {
  let accountInfo = await testToken.getAccountInfo(testAccount);
  const amount = accountInfo.amount.toNumber();

  await testToken.freezeAccount(testAccount, testMintAuthority, []);

  const destOwner = new Account();
  const dest = await testToken.createAccount(destOwner.publicKey);

  assert(
    await didThrow(testToken, testToken.transfer, [
      testAccount,
      dest,
      testAccountOwner,
      [],
      100,
    ]),""
  );

  await testToken.thawAccount(testAccount, testMintAuthority, []);

  await testToken.transfer(testAccount, dest, testAccountOwner, [], 100);

  let testAccountInfo = await testToken.getAccountInfo(testAccount);
  assert(testAccountInfo.amount.toNumber() === amount - 100,"");
}

export async function closeAccount(): Promise<void> {
  const closeAuthority = new Account();

  await testToken.setAuthority(
    testAccount,
    closeAuthority.publicKey,
    'CloseAccount',
    testAccountOwner,
    [],
  );
  let accountInfo = await testToken.getAccountInfo(testAccount);
  if (accountInfo.closeAuthority === null) {
    assert(accountInfo.closeAuthority !== null,"");
  } else {
    assert(accountInfo.closeAuthority.equals(closeAuthority.publicKey),"");
  }

  const dest = await testToken.createAccount(new Account().publicKey);
  const remaining = accountInfo.amount.toNumber();

  // Check that accounts with non-zero token balance cannot be closed
  assert(
    await didThrow(testToken, testToken.closeAccount, [
      testAccount,
      dest,
      closeAuthority,
      [],
    ]),""
  );

  const connection = await getConnection();
  let tokenRentExemptAmount;
  let info = await connection.getAccountInfo(testAccount);
  if (info != null) {
    tokenRentExemptAmount = info.lamports;
  } else {
    throw new Error('Account not found');
  }

  // Transfer away all tokens
  await testToken.transfer(testAccount, dest, testAccountOwner, [], remaining);

  // Close for real
  await testToken.closeAccount(testAccount, dest, closeAuthority, []);

  info = await connection.getAccountInfo(testAccount);
  assert(info === null,"");

  let destInfo = await connection.getAccountInfo(dest);
  if (destInfo !== null) {
    assert(destInfo.lamports === 2 * tokenRentExemptAmount,"");
  } else {
    throw new Error('Account not found');
  }

  let destAccountInfo = await testToken.getAccountInfo(dest);
  assert(destAccountInfo.amount.toNumber() === remaining,"");
}

export async function multisig(): Promise<void> {
  const m = 2;
  const n = 5;

  let signerAccounts = [];
  for (var i = 0; i < n; i++) {
    signerAccounts.push(new Account());
  }
  let signerPublicKeys :any[]= [];
  signerAccounts.forEach(account => signerPublicKeys.push(account.publicKey));
  const multisig = await testToken.createMultisig(m, signerPublicKeys);
  const multisigInfo = await testToken.getMultisigInfo(multisig);
  assert(multisigInfo.m === m,"");
  assert(multisigInfo.n === n,"");
  assert(multisigInfo.signer1.equals(signerPublicKeys[0]),"");
  assert(multisigInfo.signer2.equals(signerPublicKeys[1]),"");
  assert(multisigInfo.signer3.equals(signerPublicKeys[2]),"");
  assert(multisigInfo.signer4.equals(signerPublicKeys[3]),"");
  assert(multisigInfo.signer5.equals(signerPublicKeys[4]),"");

  const multisigOwnedAccount = await testToken.createAccount(multisig);
  const finalDest = await testToken.createAccount(multisig);

  await testToken.mintTo(multisigOwnedAccount, testMintAuthority, [], 1000);

  // Transfer via multisig
  await testToken.transfer(
    multisigOwnedAccount,
    finalDest,
    multisig,
    signerAccounts,
    1,
  );
  await sleep(500);
  let accountInfo = await testToken.getAccountInfo(finalDest);
  assert(accountInfo.amount.toNumber() == 1,"");

  // Approve via multisig
  {
    const delegate = new PublicKey(0);
    await testToken.approve(
      multisigOwnedAccount,
      delegate,
      multisig,
      signerAccounts,
      1,
      connection
    );
    const accountInfo = await testToken.getAccountInfo(multisigOwnedAccount);
    assert(accountInfo.delegate != null,"");
    if (accountInfo.delegate != null) {
      assert(accountInfo.delegate.equals(delegate),"");
      assert(accountInfo.delegatedAmount.toNumber() == 1,"");
    }
  }

  // SetAuthority of account via multisig
  {
    const newOwner = new PublicKey(0);
    await testToken.setAuthority(
      multisigOwnedAccount,
      newOwner,
      'AccountOwner',
      multisig,
      signerAccounts,
    );
    const accountInfo = await testToken.getAccountInfo(multisigOwnedAccount);
    assert(accountInfo.owner.equals(newOwner),"");
  }
}

export async function nativeToken(): Promise<void> {
  const connection = await getConnection();
  // this user both pays for the creation of the new token account
  // and provides the lamports to wrap
  const payer = await newAccountWithLamports(connection, 2000000000 /* wag */);
  const lamportsToWrap = 1000000000;

  const token = new Token(connection, NATIVE_MINT, programId, payer);
  const owner = new Account();
  const native = await Token.createWrappedNativeAccount(
    connection,
    programId,
    owner.publicKey,
    payer,
    lamportsToWrap,
  );
  let accountInfo = await token.getAccountInfo(native);
  assert(accountInfo.isNative,"");

  // check that the new account has wrapped native tokens.
  assert(accountInfo.amount.toNumber() === lamportsToWrap,"");

  let balance;
  let info = await connection.getAccountInfo(native);
  if (info != null) {
    balance = info.lamports;
  } else {
    throw new Error('Account not found');
  }

  const balanceNeeded = await connection.getMinimumBalanceForRentExemption(0);
  const dest = await newAccountWithLamports(connection, balanceNeeded);
  await token.closeAccount(native, dest.publicKey, owner, []);
  info = await connection.getAccountInfo(native);
  if (info != null) {
    throw new Error('Account not burned');
  }
  info = await connection.getAccountInfo(dest.publicKey);
  if (info != null) {
    assert(info.lamports == balanceNeeded + balance,"");
  } else {
    throw new Error('Account not found');
  }
}

export async function runDeposit(connection:Connection,selectedWallet:any): Promise<void> {
  console.log("run test deposit");
  let testToken = new Token(
    connection,
    new PublicKey(MINT_ADDRESS),
    new PublicKey(ADAPTABLE_PROGRAMM_ID),
    selectedWallet
  );
 
  let account = new PublicKey(ACCOUNT_ADDRESS)
  await testToken.createDeposit(connection, account ,  100 , selectedWallet,0,MINT_ADDRESS  );

}



//@ts-ignore
 