import type {Connection} from '@solana/web3.js';
import {PublicKey} from '@solana/web3.js';
import { Buffer } from 'buffer';

export async function loadAccount(
  connection: Connection,
  address: PublicKey,
  programId: PublicKey,
):
//@ts-ignore 
Buffer {
  const accountInfo = await connection.getAccountInfo(address);
  if (accountInfo === null) {
    throw new Error('Failed to find account');
  }

  if (!accountInfo.owner.equals(programId)) {
    throw new Error(`Invalid owner: ${JSON.stringify(accountInfo.owner)}`);
  }

  return Buffer.from(accountInfo.data);
}
