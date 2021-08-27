/**
 * Exercises the token program
 *
 * @flow
 */

import { ACCOUNT_ADDRESS, MINT_ADDRESS } from '../../../pages/WalletUtils';
import connection from '../../../redux/reducers/connection';
import {
  loadTokenProgram,
  createMint,
  createAccount,
  createAssociatedAccount,
  transfer,
  transferChecked,
  transferCheckedAssociated,
  approveRevoke,
  failOnApproveOverspend,
  setAuthority,
  mintTo,
  mintToChecked,
  multisig,
  burn,
  burnChecked,
  freezeThawAccount,
  closeAccount,
  nativeToken,
  createOrigineAccount,
  createOrigineMint,
} from './token-test';

export async function solanaFunctions(selectedWallet:any) {
  console.log('Run test: loadTokenProgram');
  await loadTokenProgram(selectedWallet);
  console.log('Run test: createMint');
 
  console.log('Run test: createAccount');
  await createAccount(selectedWallet,connection,MINT_ADDRESS);
  console.log('Run test: createAssociatedAccount');
  await createAssociatedAccount();
  console.log('Run test: mintTo');
  await mintTo("","",MINT_ADDRESS,ACCOUNT_ADDRESS);
  console.log('Run test: mintToChecked');
  await mintToChecked();
  console.log('Run test: transfer');
  await transfer();
  console.log('Run test: transferChecked');
  await transferChecked();
  console.log('Run test: transferCheckedAssociated');
  await transferCheckedAssociated();
  console.log('Run test: approveRevoke');
  await approveRevoke();
  console.log('Run test: failOnApproveOverspend');
  await failOnApproveOverspend();
  console.log('Run test: setAuthority');
  await setAuthority();
  console.log('Run test: burn');
  await burn();
  console.log('Run test: burnChecked');
  await burnChecked();
  console.log('Run test: freezeThawAccount');
  await freezeThawAccount();
  console.log('Run test: closeAccount');
  await closeAccount();
  console.log('Run test: multisig');
  await multisig();
  console.log('Run test: nativeToken');
  await nativeToken();
  console.log('Success\n');
}

export async function mintToken(selectedWallet:any , connection:any) {  
  return createMint(selectedWallet , connection);
}

export async function mintOrigineToken(selectedWallet:any , connection:any) {  
  return createOrigineMint(selectedWallet , connection);
}

export async function createNewAccount(selectedWallet:any , connection:any,mintAddress:any) {  
 //@ts-ignore
  return createAccount(selectedWallet , connection,mintAddress);
}

export async function createNewOrigineAccount(selectedWallet:any , connection:any,mintAddress:any) {  
  //@ts-ignore
   return createOrigineAccount(selectedWallet , connection,mintAddress);
 }

export async function createMintTo(selectedWallet:any , connection:any, mintAddress:any, accountAddress:any) {  
  return mintTo(selectedWallet,connection,mintAddress, accountAddress);
}

export async function createTransfer(selectedWallet:any , connection:any) {  
  return transfer();
}

export async function createSwap(selectedWallet:any , connection:any) {  
  return createMint(selectedWallet , connection);
}

