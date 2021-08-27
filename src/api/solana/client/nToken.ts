/**
 * @flow
 */

 import { Buffer } from 'buffer';
 import assert from 'assert';
 //@ts-ignore
 import * as BufferLayout from 'buffer-layout';
 import {
     Account,
     PublicKey,
     SystemProgram,
     Transaction,
     TransactionInstruction,
     SYSVAR_RENT_PUBKEY,
 } from '@solana/web3.js';
//@ts-ignore
import { blob, u } from 'buffer-layout'
 import type {
     Connection,
     Commitment,
     TransactionSignature,
 } from '@solana/web3.js';
 
 import * as Layout from './layout';
 import { sendAndConfirmTransaction } from './util/send-and-confirm-transaction';
import { PORTFOLIO_ACCOUNT_SIZE } from '../../../pages/WalletUtils';
import BN from 'bn.js';
 
 export const TOKEN_PROGRAM_ID: PublicKey = new PublicKey(
     'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
 );
 
 export const ASSOCIATED_TOKEN_PROGRAM_ID: PublicKey = new PublicKey(
     'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
 );
 const MAX_ASSET_PER_PORTFOLIO = 10;
 
 const FAILED_TO_FIND_ACCOUNT = 'Failed to find account';
 const INVALID_ACCOUNT_OWNER = 'Invalid account owner';
 const pubkey_swap = "SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8";
 /**
  * Unfortunately, BufferLayout.encode uses an `instanceof` check for `Buffer`
  * which fails when using `publicKey.toBuffer()` directly because the bundled `Buffer`
  * class in `@solana/web3.js` is different from the bundled `Buffer` class in this package
  */
 function pubkeyToBuffer(publicKey: PublicKey): any {
     return Buffer.from(publicKey.toBuffer());
 }
 
 /**
  * 64-bit value
  */
 export class u64 extends BN {
     /**
      * Convert to Buffer representation
      */
     
     toBuffer():any{
         const a = super.toArray().reverse();
         const b = Buffer.from(a);
         if (b.length === 8) {
             
             return b;
         }
         assert(b.length < 8, 'u64 too large');
 
         const zeroPad = Buffer.alloc(8);
         b.copy(zeroPad);
         
         return zeroPad;
     }
 
     /**
      * Construct a u64 from Buffer representation
      */
     static fromBuffer(buffer: typeof Buffer): u64 {
         assert(buffer.length === 8, `Invalid buffer length: ${buffer.length}`);
         return new u64(
             //@ts-ignore
             [...buffer]
             .reverse()
             .map(i => `00${i.toString(16)}`.slice(-2))
             .join(''),
             16,
         );
     }
 }
 
 function isAccount(accountOrPublicKey: any): boolean {
     return 'publicKey' in accountOrPublicKey;
 }
 
 type AuthorityType = |
     'MintTokens' |
     'FreezeAccount' |
     'AccountOwner' |
     'CloseAccount';
 
 const AuthorityTypeCodes = {
     MintTokens: 0,
     FreezeAccount: 1,
     AccountOwner: 2,
     CloseAccount: 3,
 };
 
 // The address of the special mint for wrapped native token.
 export const NATIVE_MINT: PublicKey = new PublicKey(
     'So11111111111111111111111111111111111111112',
 );
 
 /**
  * Information about the mint
  */
 type MintInfo = {
     /**
      * Optional authority used to mint new tokens. The mint authority may only be provided during
      * mint creation. If no mint authority is present then the mint has a fixed supply and no
      * further tokens may be minted.
      */
     mintAuthority: null | PublicKey,
 
     /**
      * Total supply of tokens
      */
     supply: u64,
 
     /**
      * Number of base 10 digits to the right of the decimal place
      */
     decimals: number,
 
     /**
      * Is this mint initialized
      */
     isInitialized: boolean,
 
     /**
      * Optional authority to freeze token accounts
      */
     freezeAuthority: null | PublicKey,
 
 };
 
 export const MintLayout: typeof BufferLayout.Structure = BufferLayout.struct([
      
     BufferLayout.u32('mintAuthorityOption'),
     Layout.publicKey('mintAuthority'),
     Layout.uint64('supply'),
     
     BufferLayout.u8('decimals'),
     
     BufferLayout.u8('isInitialized'),
     
     BufferLayout.u32('freezeAuthorityOption'),
     Layout.publicKey('freezeAuthority'),
     
     BufferLayout.u32('mintIdAssetOption'),
     Layout.publicKey('mintIdAsset'),
     
     BufferLayout.u32('pubkeySwapOption'),
     Layout.publicKey('pubkeySwap'),
 ]);
 
 /**
  * Information about an account
  */
 type AccountInfo = {
     /**
      * The address of this account
      */
     address: PublicKey,
 
     /**
      * The mint associated with this account
      */
     mint: PublicKey,
 
     /**
      * Owner of this account
      */
     owner: PublicKey,
 
     /**
      * Amount of tokens this account holds
      */
     amount: u64,
 
     /**
      * The delegate for this account
      */
     delegate: null | PublicKey,
 
     /**
      * The amount of tokens the delegate authorized to the delegate
      */
     delegatedAmount: u64,
 
     /**
      * Is this account initialized
      */
     isInitialized: boolean,
 
     /**
      * Is this account frozen
      */
     isFrozen: boolean,
 
     /**
      * Is this a native token account
      */
     isNative: boolean,
 
     /**
      * If this account is a native token, it must be rent-exempt. This
      * value logs the rent-exempt reserve which must remain in the balance
      * until the account is closed.
      */
     rentExemptReserve: null | u64,
 
     /**
      * Optional authority to close the account
      */
     closeAuthority: null | PublicKey,
 
     /**
      * Amount usdc of tokens this account holds
      */
     usdc: u64,
 
     /**
      * Amount asset of tokens this account holds
      */
     asset: u64,
 
 
 };
 
 /**
  * @private
  */
 export const AccountLayout: typeof BufferLayout.Structure = BufferLayout.struct(
     [
         Layout.publicKey('mint'), //  32
         Layout.publicKey('owner'), //32
         Layout.uint64('amount'), // 8
         BufferLayout.u32('delegateOption'),
         Layout.publicKey('delegate'), // 36
         BufferLayout.u8('state'), // 1
         BufferLayout.u32('isNativeOption'),
         Layout.uint64('isNative'), //12
         Layout.uint64('delegatedAmount'), // 8
         BufferLayout.u32('closeAuthorityOption'),
         Layout.publicKey('closeAuthority'), //36
         Layout.uint64('usdc'), // 8
         Layout.uint64('asset'), // 8
     ],
 );
 
 /**
  * @private
  */
 export const AccountLayoutNew: typeof BufferLayout.Structure = BufferLayout.struct(
     [
         Layout.publicKey('mint'), //  32
         Layout.publicKey('owner'), //32
         Layout.uint64('amount'), // 8
         BufferLayout.u32('delegateOption'),
         Layout.publicKey('delegate'), // 36
         BufferLayout.u8('state'), // 1
         BufferLayout.u32('isNativeOption'),
         Layout.uint64('isNative'), //12
         Layout.uint64('delegatedAmount'), // 8
         BufferLayout.u32('closeAuthorityOption'),
         Layout.publicKey('closeAuthority'), //36
 
     ],
 );
 
 /**
  * Information about an account
  */
 type PortfolioInfo = {
 
     /**
      * The address of this account
      */
     address: PublicKey,
     /**
      * Owner of this account
      */
     owner: PublicKey,
 
     /**
      * metadata hash
      */
      //@ts-ignore
     metadataHash: u32,
     /**
      * metadata url
      */
     //metadataUrl: BufferLayout.blob,
     /**
      * Amount usdc of tokens this account holds
      */
      //@ts-ignore
      creatorAccount: publicKey,
     /**
      * The amount of first asset
      */
     amountAsset1: null | u64,
     /**
      * The address of first asset
      */
     addressAsset1: null | PublicKey,
     /**
      * The period of first asset
      */
     periodAsset1: null | u64,
     /**
      * The asset solde of first asset
      */
     //@ts-ignore
     assetToSoldIntoAsset1: null | PublicKey,
     /**
      * The amount of asset
      */
     amountAsset2: null | u64,
     /**
      * The address of  asset
      */
     addressAsset2: null | PublicKey,
     /**
      * The period of  asset
      */
     periodAsset2: null | u64,
     /**
      * The asset solde of asset
      */
     assetToSoldIntoAsset2: null | PublicKey,
 
     /**
      * The amount of asset
      */
     amountAsset3: null | u64,
     /**
      * The address of  asset
      */
     addressAsset3: null | PublicKey,
     /**
      * The period of  asset
      */
     periodAsset3: null | u64,
     /**
      * The asset solde of asset
      */
     assetToSoldIntoAsset3: null | PublicKey,
     /**
      * The amount of asset
      */
     amountAsset4: null | u64,
     /**
      * The address of  asset
      */
     addressAsset4: null | PublicKey,
     /**
      * The period of  asset
      */
     periodAsset4: null | u64,
     /**
      * The asset solde of asset
      */
     assetToSoldIntoAsset4: null | PublicKey,
     /**
      * The amount of asset
      */
     amountAsset5: null | u64,
     /**
      * The address of  asset
      */
     addressAsset5: null | PublicKey,
     /**
      * The period of  asset
      */
     periodAsset5: null | u64,
     /**
      * The asset solde of asset
      */
     assetToSoldIntoAsset5: null | PublicKey,
 
     /**
      * The amount of first asset
      */
     amountAsset6: null | u64,
     /**
      * The address of first asset
      */
     addressAsset6: null | PublicKey,
     /**
      * The period of first asset
      */
     periodAsset6: null | u64,
     /**
      * The asset solde of first asset
      */
     assetToSoldIntoAsset6: null | PublicKey,
     /**
      * The amount of asset
      */
     amountAsset7: null | u64,
     /**
      * The address of  asset
      */
     addressAsset7: null | PublicKey,
     /**
      * The period of  asset
      */
     periodAsset7: null | u64,
     /**
      * The asset solde of asset
      */
     assetToSoldIntoAsset7: null | PublicKey,
 
     /**
      * The amount of asset
      */
     amountAsset8: null | u64,
     /**
      * The address of  asset
      */
     addressAsset8: null | PublicKey,
     /**
      * The period of  asset
      */
     periodAsset8: null | u64,
     /**
      * The asset solde of asset
      */
     assetToSoldIntoAsset8: null | PublicKey,
     /**
      * The amount of asset
      */
     amountAsset9: null | u64,
     /**
      * The address of  asset
      */
     addressAsset9: null | PublicKey,
     /**
      * The period of  asset
      */
     periodAsset9: null | u64,
     /**
      * The asset solde of asset
      */
     assetToSoldIntoAsset9: null | PublicKey,
     /**
      * The amount of asset
  //   amountAsset10: null | u64,
     /**
      * The address of  asset
      */
    // addressAsset10: null | PublicKey,
     /**
      * The period of  asset
      */
   //  periodAsset10: null | u64,
     /**
      * The asset solde of asset
      */
    // assetToSoldIntoAsset10: null | PublicKey
 };
 
 /**
  * @private
  */
 
 export const PortfolioLayout: typeof BufferLayout.Structure = BufferLayout.struct(
     [
 
         Layout.publicKey('owner'), //32
        // BufferLayout.blob(128, 'metadataUrl'), //128
         BufferLayout.u16('metadataHash'), //2
         Layout.publicKey('creatorAccount'), //32
 
         BufferLayout.u8('amountAsset1'), //1
         Layout.publicKey('addressAsset1'), //32
         BufferLayout.u8('periodAsset1'), //1
         Layout.publicKey('assetToSoldIntoAsset1'), //32
 
 
         BufferLayout.u8('amountAsset2'), //1
         Layout.publicKey('addressAsset2'), //32
         BufferLayout.u8('periodAsset2'), //1
         Layout.publicKey('assetToSoldIntoAsset2'), //32
 
 
         BufferLayout.u8('amountAsset3'), //1
         Layout.publicKey('addressAsset3'), //32
         BufferLayout.u8('periodAsset3'), //1
         Layout.publicKey('assetToSoldIntoAsset3'), //32
 
 
         BufferLayout.u8('amountAsset4'), //1
         Layout.publicKey('addressAsset4'), //32
         BufferLayout.u8('periodAsset4'), //1
         Layout.publicKey('assetToSoldIntoAsset4'), //32
 
        
         BufferLayout.u8('amountAsset5'), //1
         Layout.publicKey('addressAsset5'), //32
         
         BufferLayout.u8('periodAsset5'), //1
         Layout.publicKey('assetToSoldIntoAsset5'), //32
 
        
         BufferLayout.u8('amountAsset6'), //1
         Layout.publicKey('addressAsset6'), //32
         
         BufferLayout.u8('periodAsset6'), //1
         Layout.publicKey('assetToSoldIntoAsset6'), //32
 
        
         BufferLayout.u8('amountAsset7'), //1
         Layout.publicKey('addressAsset7'), //32
         
         BufferLayout.u8('periodAsset7'), //1
         Layout.publicKey('assetToSoldIntoAsset7'), //32
 
        
         BufferLayout.u8('amountAsset8'), //1
         Layout.publicKey('addressAsset8'), //32
         
         BufferLayout.u8('periodAsset8'), //1
         Layout.publicKey('assetToSoldIntoAsset8'), //32
 
        
         BufferLayout.u8('amountAsset9'), //1
         Layout.publicKey('addressAsset9'), //32
         
         BufferLayout.u8('periodAsset9'), //1
         Layout.publicKey('assetToSoldIntoAsset9'), //32
 
 
       /*  Layout.u8('amountAsset10'), //8
         Layout.publicKey('addressAsset10'), //32
         Layout.u32('periodAsset10'), //32
         Layout.publicKey('assetToSoldIntoAsset10'), //32*/
     ],
 );
 
 /**
  * Information about an user portfolio
  */
 type UserPortfolioInfo = {
         /**
          * The address of this account
          */
         address: PublicKey,
         /**
          * Owner of this account
          */
         owner: PublicKey,
 
         /**
          * Owner of this account
          */
         portfolioAddress: PublicKey,
 
         /**
         * The delegate for this account
          */
          delegate: null | PublicKey,
 
         /**
         * The amount of tokens the delegate authorized to the delegate
         */
          delegatedAmount: u64,
         /**
          * Value of this assets
          */
         //@ts-ignore
         valueAsset1: null | uint64,
         /**
          * publickey of this assets
          */
         addressAsset1: null | PublicKey,
         /**
          * Value of this assets
          */
         
         //@ts-ignore
         valueAsset2: null | uint64,
         /**
          * publickey of this assets
          */
         addressAsset2: null | PublicKey,
         /**
          * Value of this assets
          */
          //@ts-ignore
         valueAsset3: null | uint64,
         /**
          * publickey of this assets
          */
         addressAsset3: null | PublicKey,
         /**
          * Value of this assets
          */
          //@ts-ignore
         valueAsset4: null | uint64,
         /**
          * publickey of this assets
          */
         addressAsset4: null | PublicKey,
         /**
          * Value of this assets
          */
          //@ts-ignore
         valueAsset5: null | uint64,
         /**
          * publickey of this assets
          */
         addressAsset5: null | PublicKey,
         /**
          * Value of this assets
          */
          //@ts-ignore
         valueAsset6: null | uint64,
         /**
          * publickey of this assets
          */
         addressAsset6: null | PublicKey,
         /**
          * Value of this assets
          */
          //@ts-ignore
         valueAsset7: null | uint64,
         /**
          * publickey of this assets
          */
         addressAsset7: null | PublicKey,
         /**
          * Value of this assets
          */
          //@ts-ignore
         valueAsset8: null | uint64,
         /**
          * publickey of this assets
          */
         addressAsset8: null | PublicKey,
         /**
          * Value of this assets
          */
          //@ts-ignore
         valueAsset9: null | uint64,
         /**
          * publickey of this assets
          */
         addressAsset9: null | PublicKey,
         /**
          * Value of this assets
          */
         //valueAsset10: null | uint64,
         /**
          * publickey of this assets
          */
        // addressAsset10: null | PublicKey,
 
 
     }
     /**
      * @private
      */
 export const UserPortfolioLayout: typeof BufferLayout.Structure = BufferLayout.struct(
     [
         Layout.publicKey('owner'), //32
         Layout.publicKey('portfolioAddress'), //32
         BufferLayout.u32('delegateOption'),
         Layout.publicKey('delegate'), // 36
         Layout.uint64('delegatedAmount'), //5
 
         Layout.uint64('valueAsset1'), //5
         Layout.publicKey('addressAsset1'), //32
 
         Layout.uint64('valueAsset2'), //5
         Layout.publicKey('addressAsset2'), //32
 
         Layout.uint64('valueAsset3'), //5
         Layout.publicKey('addressAsset3'), //32
 
         Layout.uint64('valueAsset4'), //5
         Layout.publicKey('addressAsset4'), //32
 
         Layout.uint64('valueAsset5'), //5
         Layout.publicKey('addressAsset5'), //32
 
         Layout.uint64('valueAsset6'), //5
         Layout.publicKey('addressAsset6'), //32
 
         Layout.uint64('valueAsset7'), //5
         Layout.publicKey('addressAsset7'), //32
 
         Layout.uint64('valueAsset8'), //5
         Layout.publicKey('addressAsset8'), //32
 
         Layout.uint64('valueAsset9'), //5
         Layout.publicKey('addressAsset9'), //32
 
         //Layout.uint64('valueAsset10'), //5
        // Layout.publicKey('addressAsset10'), //32
 
 
     ],
 );
 
 /**
  * Information about an multisig
  */
 type MultisigInfo = {
     /**
      * The number of signers required
      */
     m: number,
 
     /**
      * Number of possible signers, corresponds to the
      * number of `signers` that are valid.
      */
     n: number,
 
     /**
      * Is this mint initialized
      */
     initialized: boolean,
 
     /**
      * The signers
      */
     signer1: PublicKey,
     signer2: PublicKey,
     signer3: PublicKey,
     signer4: PublicKey,
     signer5: PublicKey,
     signer6: PublicKey,
     signer7: PublicKey,
     signer8: PublicKey,
     signer9: PublicKey,
     signer10: PublicKey,
     signer11: PublicKey,
 
 };
 
 /**
  * @private
  */
 const MultisigLayout = BufferLayout.struct([
     BufferLayout.u8('m'),
     BufferLayout.u8('n'),
     BufferLayout.u8('is_initialized'),
     Layout.publicKey('signer1'),
     Layout.publicKey('signer2'),
     Layout.publicKey('signer3'),
     Layout.publicKey('signer4'),
     Layout.publicKey('signer5'),
     Layout.publicKey('signer6'),
     Layout.publicKey('signer7'),
     Layout.publicKey('signer8'),
     Layout.publicKey('signer9'),
     Layout.publicKey('signer10'),
     Layout.publicKey('signer11'),
 ]);
 
 /**
  * An ERC20-like nToken
  */
 export class nToken {
     /**
      * @private
      */
      //@ts-ignore
     connection: Connection;
 
     /**
      * The public key identifying this mint
      */
      //@ts-ignore
     publicKey: PublicKey;
 
     /**
      * Program Identifier for the nToken program
      */
      //@ts-ignore
     programId: PublicKey;
 
     /**
      * Program Identifier for the Associated nToken program
      */
      //@ts-ignore
     associatedProgramId: PublicKey;
 
     /**
      * Fee payer
      */
      
     payer: any;
 
      //@ts-ignore
     accountTest: Account;
 
     /**
      * Create a nToken object attached to the specific mint
      *
      * @param connection The connection to use
      * @param token Public key of the mint
      * @param programId token programId
      * @param payer Payer of fees
      */
     constructor(
         connection: Connection,
         publicKey: PublicKey,
         programId: PublicKey,
         payer: Account,
     ) {
         Object.assign(this, {
             connection,
             publicKey,
             programId,
             payer,
             // Hard code is ok; Overriding is needed only for tests
             associatedProgramId: ASSOCIATED_TOKEN_PROGRAM_ID,
         });
     }
 
     /**
      * Get the minimum balance for the mint to be rent exempt
      *
      * @return Number of lamports required
      */
     static async getMinBalanceRentForExemptMint(
         connection: Connection,
     ): Promise < number > {
         return await connection.getMinimumBalanceForRentExemption(MintLayout.span);
     }
 
     /**
      * Get the minimum balance for the account to be rent exempt
      *
      * @return Number of lamports required
      */
     static async getMinBalanceRentForExemptAccount(
         connection: Connection,
     ): Promise < number > {
         return await connection.getMinimumBalanceForRentExemption(
             PORTFOLIO_ACCOUNT_SIZE,
         );
     }
 
     /**
      * Get the minimum balance for the multsig to be rent exempt
      *
      * @return Number of lamports required
      */
     static async getMinBalanceRentForExemptMultisig(
         connection: Connection,
     ): Promise < number > {
         return await connection.getMinimumBalanceForRentExemption(
             MultisigLayout.span,
         );
     }
 
 
 
     /**
      * Create and initialize a token.
      *
      * @param connection The connection to use
      * @param payer Fee payer for transaction
      * @param mintAuthority Account or multisig that will control minting
      * @param freezeAuthority Optional account or multisig that can freeze token accounts
      * @param decimals Location of the decimal place
      * @param programId Optional token programId, uses the system programId by default
      * @return nToken object for the newly minted token
      */
     static async createMint(
         connection: Connection,
         payer: Account,
         mintAuthority: PublicKey,
         freezeAuthority: PublicKey | null,
         decimals: number,
         programId: PublicKey,
         mintIdAsset: PublicKey,
         pubkeySwap: PublicKey
     ): Promise < nToken > {
         const mintAccount = new Account();
         const token = new nToken(
             connection,
             mintAccount.publicKey,
             programId,
             payer
         );
 
         // Allocate memory for the account
         const balanceNeeded = await nToken.getMinBalanceRentForExemptMint(
             connection,
         );
 
         const transaction = new Transaction();
         console.log("space is " + MintLayout.span);
         transaction.add(
             SystemProgram.createAccount({
                 fromPubkey: payer.publicKey,
                 newAccountPubkey: mintAccount.publicKey,
                 lamports: balanceNeeded,
                 space: MintLayout.span,
                 programId,
             }),
         );
 
         let instruction = nToken.createInitMintInstruction(
             programId,
             mintAccount.publicKey,
             decimals,
             mintAuthority,
             freezeAuthority,
             mintIdAsset,
             pubkeySwap,
         );
         transaction.add(
             instruction
         );
 
         // Send the two instructions
         await sendAndConfirmTransaction(
             'createAccount and InitializeMint',
             connection,
             transaction,
             payer,
             mintAccount,
         );
 
         return token;
     }
 
     /**
      * Create Deposit.
      *
      * @param userSource Source account
      * @param userDestination Destination account
      * @param userAuthority Owner of the source account
      * @param amount   Number of tokens to deposit
      * @param volatility volatility of tokens to deposit
      * @return nToken object for the newly minted token
      */
     async createDeposit(
             userSource: Account,
             userDestination: Account,
             userAuthority: Account,
             amount: any,
             volatility: any
         ){
 
             const newAccount = new Account();
 
 
             // Allocate memory for the account
             const balanceNeeded = await nToken.getMinBalanceRentForExemptAccount(
                 this.connection,
             );
             let tokenSwap = new PublicKey("8vT1aMoP3Xdq6JyFfZXUhbjuVgoyR5fG68HGPibDridU");
 
             let tokenSwapAccount = new Account();
             let programAddress;
             let nonce;
             [programAddress, nonce] = await PublicKey.findProgramAddress(
                 [tokenSwap.toBuffer()],
                 this.programId,
             );
 
 
             const transaction = new Transaction();
 
             console.log("payer in createDeposit  " + this.payer.publicKey)
 
             transaction.add(
                 nToken.createDepositInstruction(
                     this.programId,
                     this.payer.publicKey,
                     userAuthority.publicKey,
                     amount,
                     volatility,
                     nonce,
                     programAddress,
                     userSource.publicKey,
                     userDestination.publicKey
                 ),
             );
             console.log("payer : ", this.payer.publicKey);
             console.log("user Authority : ", userAuthority.publicKey);
             // Send the two instructions
             await sendAndConfirmTransaction(
                 'createAccount and InitializeMint',
                 this.connection,
                 transaction,
                 this.payer,
                 userAuthority
                 //newAccount
             );
 
 
         }
 
 
 
         /********************Deposit portfolio**************/
     /**
      * Create Deposit Portfolio.
      *
      * @param userSource Source account
      * @param userDestination Destination account
      * @param userAuthority Owner of the source account
      * @param amountAsset1   Number of tokens to deposit
      * @param addressAsset1   address of tokens to deposit
      * @param amountAsset2   Number of tokens to deposit
      * @param addressAsset2   address of tokens to deposit
      * @param amountAsset3   Number of tokens to deposit
      * @param addressAsset3   address of tokens to deposit
      * @param amountAsset4   Number of tokens to deposit
      * @param addressAsset4   address of tokens to deposit
      * @param amountAsset5   Number of tokens to deposit
      * @param addressAsset5   address of tokens to deposit
      * @param amountAsset6   Number of tokens to deposit
      * @param addressAsset6   address of tokens to deposit
      * @param amountAsset7   Number of tokens to deposit
      * @param addressAsset7   address of tokens to deposit
      * @param amountAsset8   Number of tokens to deposit
      * @param addressAsset8   address of tokens to deposit
      * @param amountAsset9   Number of tokens to deposit
      * @param addressAsset9   address of tokens to deposit
      * @param volatility volatility of tokens to deposit
      * @return nToken object for the newly minted token
      */
     async depositPortfolio(
             userSource: Account,
             userDestination: Account,
             userAuthority: Account,
             valueAsset1: number,
             addressAsset1:PublicKey | null,
             valueAsset2: number,
             addressAsset2:PublicKey | null,
             valueAsset3: number,
             addressAsset3:PublicKey | null,
             valueAsset4: number,
             addressAsset4:PublicKey | null,
             valueAsset5: number,
             addressAsset5:PublicKey | null,
             valueAsset6: number,
             addressAsset6:PublicKey | null,
             valueAsset7: number,
             addressAsset7:PublicKey | null,
             valueAsset8: number,
             addressAsset8:PublicKey | null,
             valueAsset9: number,
             addressAsset9:PublicKey | null,
             volatility: number
         ){
 
 
 
             // Allocate memory for the account
             const balanceNeeded = await nToken.getMinBalanceRentForExemptAccount(
                 this.connection,
             );
             let tokenSwap = new PublicKey("8vT1aMoP3Xdq6JyFfZXUhbjuVgoyR5fG68HGPibDridU");
 
             let programAddress;
             let nonce;
             [programAddress, nonce] = await PublicKey.findProgramAddress(
                 [tokenSwap.toBuffer()],
                 this.programId,
             );
 
 
             const transaction = new Transaction();
 
             console.log("payer in createDeposit  " + this.payer.publicKey)
 
             transaction.add(
                 nToken.createDepositInstruction(
                     this.programId,
                     this.payer.publicKey,
                     userAuthority.publicKey,
                     0,
                     volatility,
                     nonce,
                     programAddress,
                     userSource.publicKey,
                     userDestination.publicKey
                 ),
             );
             console.log("payer : ", this.payer.publicKey);
             console.log("user Authority : ", userAuthority.publicKey);
             // Send the two instructions
             await sendAndConfirmTransaction(
                 'createAccount and InitializeMint',
                 this.connection,
                 transaction,
                 this.payer,
                 userAuthority
 
             );
 
 
         }
 
 
 
 
 
 
 
         /**
          * WithDraw tokens
          *
          * @param account Account to WithDraw tokens from
          * @param owner Account owner
          * @param multiSigners Signing accounts if `owner` is a multiSig
          * @param amount Amount to createWithDraw
          */
 
 
     async createWithDraw(
         account: PublicKey,
         amount: number | u64,
         payer: Account,
     ): Promise < void > {
 
         // Allocate memory for the account
         const balanceNeeded = await nToken.getMinBalanceRentForExemptMint(
             this.connection,
         );
 
 
         const transaction = new Transaction();
 
 
         transaction.add(
             nToken.createWithdrawInstruction(
                 this.programId,
                 this.accountTest.publicKey,
                 this.payer,
                 amount
             ),
         );
 
         // Send the two instructions
         await sendAndConfirmTransaction(
             'createAccount and withDraw',
             this.connection,
             transaction,
             this.payer,
 
 
 
         );
     }
 
 
     /**
      * Create and initialize a new portfolio.
      *
      * This portfolio may then be used as a `transfer()` or `approve()` destination
      *
      * @param owner User account that will own the new portfolio
      * @return Public key of the new empty portfolio
      */
      async createPortfolio(
       owner: Account,
       metaDataUrl : any,
       //@ts-ignore
       metaDataHash : u32 ,
       //creatorAccount : Account,
       amountAsset1 : number ,
       addressAsset1 : PublicKey| null ,
       periodAsset1 : any ,
       assetToSoldIntoAsset1 : PublicKey| null,
       amountAsset2 : number ,
       addressAsset2 : PublicKey| null ,
       periodAsset2 : any ,
       assetToSoldIntoAsset2 : PublicKey| null,
       amountAsset3 : number ,
       addressAsset3 : PublicKey| null ,
       periodAsset3 : any ,
       assetToSoldIntoAsset3 : PublicKey| null,
       amountAsset4 : number ,
       addressAsset4 : PublicKey| null ,
       periodAsset4 : any ,
       assetToSoldIntoAsset4 : PublicKey| null,
       amountAsset5 : number ,
       addressAsset5 : PublicKey| null ,
       periodAsset5 : any ,
       assetToSoldIntoAsset5 : PublicKey| null,
       amountAsset6 : number ,
       addressAsset6 : PublicKey | null,
       periodAsset6 : any ,
       assetToSoldIntoAsset6 : PublicKey| null,
       amountAsset7 : number ,
       addressAsset7 : PublicKey| null ,
       periodAsset7 : any ,
       assetToSoldIntoAsset7 : PublicKey| null,
       amountAsset8 : number ,
       addressAsset8 : PublicKey| null ,
       periodAsset8 : any ,
       assetToSoldIntoAsset8 : PublicKey| null,
       amountAsset9 : number ,
       addressAsset9 : PublicKey| null ,
       periodAsset9 : any ,
       assetToSoldIntoAsset9 : PublicKey| null,
 
       // amountAsset10 : number ,
       // addressAsset10 : Publickey | null,
       // periodAsset10 : number ,
       // assetToSoldIntoAsset10 : PublicKey| null,
       ): Promise<PublicKey> {

       // Allocate memory for the account
       const balanceNeeded = await nToken.getMinBalanceRentForExemptAccount(
         this.connection,
       );
 
 
       const newAccountPortfolio = new Account();
       
       console.log ("Account Portfolio",newAccountPortfolio.publicKey.toString());
       const transaction = new Transaction();
       transaction.add(
           SystemProgram.createAccount({
               fromPubkey: this.payer.publicKey,
               newAccountPubkey: newAccountPortfolio.publicKey,
               lamports: balanceNeeded,
               space: PORTFOLIO_ACCOUNT_SIZE,
               programId: this.programId,
           }),
       );
 
 
         //const mintPublicKey = this.publicKey;
         transaction.add(
             nToken.createInitPortfolioInstruction(
                 this.programId,
                 // mintPublicKey,
                 this.payer.publicKey,
                 metaDataUrl,
                 metaDataHash,
                 newAccountPortfolio.publicKey,
                 amountAsset1,
                 addressAsset1,
                 periodAsset1,
                 assetToSoldIntoAsset1,
                 amountAsset2,
                 addressAsset2,
                 periodAsset2,
                 assetToSoldIntoAsset2,
                 amountAsset3,
                 addressAsset3,
                 periodAsset3,
                 assetToSoldIntoAsset3,
                 amountAsset4,
                 addressAsset4,
                 periodAsset4,
                 assetToSoldIntoAsset4,
                 amountAsset5,
                 addressAsset5,
                 periodAsset5,
                 assetToSoldIntoAsset5,
                 amountAsset6,
                 addressAsset6,
                 periodAsset6,
                 assetToSoldIntoAsset6,
                 amountAsset7,
                 addressAsset7,
                 periodAsset7,
                 assetToSoldIntoAsset7,
                 amountAsset8,
                 addressAsset8,
                 periodAsset8,
                 assetToSoldIntoAsset8,
                 amountAsset9,
                 addressAsset9,
                 periodAsset9,
                 assetToSoldIntoAsset9,
 
                 // amountAsset10,
                 // addressAsset10,
                 // periodAsset10,
                 // assetToSoldIntoAsset10
             ),
         );
 
                 console.log("owner : ", this.payer.publicKey.toString());
 
                 transaction.recentBlockhash = (
                    await this.connection.getRecentBlockhash()
                ).blockhash;
                transaction.feePayer = this.payer.publicKey;
                transaction.partialSign(newAccountPortfolio);
        
                let signed = await this.payer.signTransaction(transaction);
        
                let signature = await this.connection.sendRawTransaction(signed.serialize());
        
                await this.connection.confirmTransaction(signature, 'max');
                console.log("newAccountPortfolio: " + newAccountPortfolio.publicKey)
                return newAccountPortfolio.publicKey;
     }
 
 
 
 
     /**
      * Create and initialize a new UserPortfolio.
      *
      * This account may then be used as a `transfer()` or `approve()` destination
      *
      * @param owner User account that will own the new account*
      * @param portfolioAddress prtfolioAddress
      * @param valueAsset1 number of asset 1..10 
      * @param addressAsset1 adddress of asset 1..10
      * @return UserPortfolio of the new empty account
      */
      async createUserPortfolio(
       owner:Account,
       portfolioAddress: PublicKey,
       delegate: PublicKey | null,
       delegated_amount: number | null,
       valueAsset1: number,
       addressAsset1: PublicKey,
       valueAsset2: number | null,
       addressAsset2: PublicKey | null,
       valueAsset3: number | null,
       addressAsset3: PublicKey | null,
       valueAsset4: number | null,
       addressAsset4: PublicKey | null,
       valueAsset5: number | null,
       addressAsset5: PublicKey | null,
       valueAsset6: number | null,
       addressAsset6: PublicKey | null,
       valueAsset7: number | null,
       addressAsset7: PublicKey | null,
       valueAsset8: number | null,
       addressAsset8: PublicKey | null,
       valueAsset9: number | null,
       addressAsset9: PublicKey | null,
      // valueAsset10: number | null,
       //addressAsset10: PublicKey| null,
   ): Promise < Account > {
       // Allocate memory for the account
       const balanceNeeded = await nToken.getMinBalanceRentForExemptAccount(
           this.connection,
       );
 
       const userPortfolioAccount = new Account();
       const transaction = new Transaction();
       transaction.add(
           SystemProgram.createAccount({
               fromPubkey: owner.publicKey,
               newAccountPubkey: userPortfolioAccount.publicKey,
               lamports: balanceNeeded,
               space: UserPortfolioLayout.span,
               programId: this.programId,
           }),
       );
 
       // const mintPublicKey = this.publicKey;
       transaction.add(
           nToken.createInitUserPortfolioInstruction(
               this.programId,
               userPortfolioAccount.publicKey,
               owner.publicKey,
               portfolioAddress,
               delegate,
               delegated_amount,
               valueAsset1,
               addressAsset1,
               valueAsset2,
               addressAsset2,
               valueAsset3,
               addressAsset3,
               valueAsset4,
               addressAsset4,
               valueAsset5,
               addressAsset5,
               valueAsset6,
               addressAsset6,
               valueAsset7,
               addressAsset7,
               valueAsset8,
               addressAsset8,
               valueAsset9,
               addressAsset9,
               // valueAsset10,
               // addressAsset10,
     
           ),
    );
 
       // Send the two instructions
       await sendAndConfirmTransaction(
           'createAccount and InitializeAccount',
           this.connection,
           transaction,
           owner,
           userPortfolioAccount,
       );
 
       return userPortfolioAccount;
   }
 
 
 
 
 
 
     /**
      * Create and initialize a new account.
      *
      * This account may then be used as a `transfer()` or `approve()` destination
      *
      * @param owner User account that will own the new account
      * @return Public key of the new empty account
      */
     async createAccount(owner: PublicKey): Promise < PublicKey > {
         // Allocate memory for the account
         const balanceNeeded = await nToken.getMinBalanceRentForExemptAccount(
             this.connection,
         );
 
         const newAccount = new Account();
         const transaction = new Transaction();
         transaction.add(
             SystemProgram.createAccount({
                 fromPubkey: this.payer.publicKey,
                 newAccountPubkey: newAccount.publicKey,
                 lamports: balanceNeeded,
                 space: AccountLayout.span,
                 programId: this.programId,
             }),
         );
 
         const mintPublicKey = this.publicKey;
         transaction.add(
             nToken.createInitAccountInstruction(
                 this.programId,
                 mintPublicKey,
                 newAccount.publicKey,
                 owner,
             ),
         );
 
         // Send the two instructions
         await sendAndConfirmTransaction(
             'createAccount and InitializeAccount',
             this.connection,
             transaction,
             this.payer,
             newAccount,
         );
 
         return newAccount.publicKey;
     }
 
   
 
 
     /**
      * Create and initialize a new account.
      *
      * This account may then be used as a `transfer()` or `approve()` destination
      *
      * @param owner User account that will own the new account
      * @return the new empty account
      */
     async createAccountNew(owner: PublicKey): Promise < Account > {
         // Allocate memory for the account
         const balanceNeeded = await nToken.getMinBalanceRentForExemptAccount(
             this.connection,
         );
 
         const newAccount = new Account();
         const transaction = new Transaction();
         transaction.add(
             SystemProgram.createAccount({
                 fromPubkey: this.payer.publicKey,
                 newAccountPubkey: newAccount.publicKey,
                 lamports: balanceNeeded,
                 space: AccountLayoutNew.span,
                 programId: this.programId,
             }),
         );
 
         const mintPublicKey = this.publicKey;
         transaction.add(
             nToken.createInitAccountInstruction(
                 this.programId,
                 mintPublicKey,
                 newAccount.publicKey,
                 owner,
             ),
         );
 
         // Send the two instructions
         await sendAndConfirmTransaction(
             'createAccount and InitializeAccount',
             this.connection,
             transaction,
             this.payer,
             newAccount,
         )
 
         return newAccount;
     }
 
 
 
     /**
      * Create and initialize the associated account.
      *
      * This account may then be used as a `transfer()` or `approve()` destination
      *
      * @param owner User account that will own the new account
      * @return Public key of the new associated account
      */
     async createAssociatedTokenAccount(owner: PublicKey): Promise < PublicKey > {
         const associatedAddress = await nToken.getAssociatedTokenAddress(
             this.associatedProgramId,
             this.programId,
             this.publicKey,
             owner,
         );
 
         return this.createAssociatedTokenAccountInternal(owner, associatedAddress);
     }
 
     async createAssociatedTokenAccountInternal(
         owner: PublicKey,
         associatedAddress: PublicKey,
     ): Promise < PublicKey > {
         await sendAndConfirmTransaction(
             'CreateAssociatedTokenAccount',
             this.connection,
             new Transaction().add(
                 nToken.createAssociatedTokenAccountInstruction(
                     this.associatedProgramId,
                     this.programId,
                     this.publicKey,
                     associatedAddress,
                     owner,
                     this.payer.publicKey,
                 ),
             ),
             this.payer,
         );
 
         return associatedAddress;
     }
 
     /**
      * Retrieve the associated account or create one if not found.
      *
      * This account may then be used as a `transfer()` or `approve()` destination
      *
      * @param owner User account that will own the new account
      * @return The new associated account
      */
     async getOrCreateAssociatedAccountInfo(
         owner: PublicKey,
     ): Promise < AccountInfo > {
         const associatedAddress = await nToken.getAssociatedTokenAddress(
             this.associatedProgramId,
             this.programId,
             this.publicKey,
             owner,
         );
 
         // This is the optimum logic, considering TX fee, client-side computation,
         // RPC roundtrips and guaranteed idempotent.
         // Sadly we can't do this atomically;
         try {
             return await this.getAccountInfo(associatedAddress);
         } catch (err) {
             // INVALID_ACCOUNT_OWNER can be possible if the associatedAddress has
             // already been received some lamports (= became system accounts).
             // Assuming program derived addressing is safe, this is the only case
             // for the INVALID_ACCOUNT_OWNER in this code-path
             if (
                 err.message === FAILED_TO_FIND_ACCOUNT ||
                 err.message === INVALID_ACCOUNT_OWNER
             ) {
                 // as this isn't atomic, it's possible others can create associated
                 // accounts meanwhile
                 try {
                     await this.createAssociatedTokenAccountInternal(
                         owner,
                         associatedAddress,
                     );
                 } catch (err) {
                     // ignore all errors; for now there is no API compatible way to
                     // selectively ignore the expected instruction error if the
                     // associated account is existing already.
                 }
 
                 // Now this should always succeed
                 return await this.getAccountInfo(associatedAddress);
             } else {
                 throw err;
             }
         }
     }
 
     /**
      * Create and initialize a new account on the special native token mint.
      *
      * In order to be wrapped, the account must have a balance of native tokens
      * when it is initialized with the token program.
      *
      * This function sends lamports to the new account before initializing it.
      *
      * @param connection A solana web3 connection
      * @param programId The token program ID
      * @param owner The owner of the new token account
      * @param payer The source of the lamports to initialize, and payer of the initialization fees.
      * @param amount The amount of lamports to wrap
      * @return {Promise<PublicKey>} The new token account
      */
     static async createWrappedNativeAccount(
         connection: Connection,
         programId: PublicKey,
         owner: PublicKey,
         payer: Account,
         amount: number,
     ): Promise < PublicKey > {
         // Allocate memory for the account
         const balanceNeeded = await nToken.getMinBalanceRentForExemptAccount(
             connection,
         );
 
         // Create a new account
         const newAccount = new Account();
         const transaction = new Transaction();
         transaction.add(
             SystemProgram.createAccount({
                 fromPubkey: payer.publicKey,
                 newAccountPubkey: newAccount.publicKey,
                 lamports: balanceNeeded,
                 space: AccountLayout.span,
                 programId,
             }),
         );
 
         // Send lamports to it (these will be wrapped into native tokens by the token program)
         transaction.add(
             SystemProgram.transfer({
                 fromPubkey: payer.publicKey,
                 toPubkey: newAccount.publicKey,
                 lamports: amount,
             }),
         );
 
         // Assign the new account to the native token mint.
         // the account will be initialized with a balance equal to the native token balance.
         // (i.e. amount)
         transaction.add(
             nToken.createInitAccountInstruction(
                 programId,
                 NATIVE_MINT,
                 newAccount.publicKey,
                 owner,
             ),
         );
 
         // Send the three instructions
         await sendAndConfirmTransaction(
             'createAccount, transfer, and initializeAccount',
             connection,
             transaction,
             payer,
             newAccount,
         );
 
         return newAccount.publicKey;
     }
 
     /**
      * Create and initialize a new multisig.
      *
      * This account may then be used for multisignature verification
      *
      * @param m Number of required signatures
      * @param signers Full set of signers
      * @return Public key of the new multisig account
      */
     async createMultisig(
         m: number,
         signers: Array < PublicKey > ,
     ): Promise < PublicKey > {
         const multisigAccount = new Account();
 
         // Allocate memory for the account
         const balanceNeeded = await nToken.getMinBalanceRentForExemptMultisig(
             this.connection,
         );
         const transaction = new Transaction();
         transaction.add(
             SystemProgram.createAccount({
                 fromPubkey: this.payer.publicKey,
                 newAccountPubkey: multisigAccount.publicKey,
                 lamports: balanceNeeded,
                 space: MultisigLayout.span,
                 programId: this.programId,
             }),
         );
 
         // create the new account
         let keys = [
             { pubkey: multisigAccount.publicKey, isSigner: false, isWritable: true },
             { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
         ];
         signers.forEach(signer =>
             keys.push({ pubkey: signer, isSigner: false, isWritable: false }),
         );
         const dataLayout = BufferLayout.struct([
             BufferLayout.u8('instruction'),
             BufferLayout.u8('m'),
         ]);
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 2, // InitializeMultisig instruction
                 m,
             },
             data,
         );
         transaction.add({
             keys,
             programId: this.programId,
             data,
         });
 
         // Send the two instructions
         await sendAndConfirmTransaction(
             'createAccount and InitializeMultisig',
             this.connection,
             transaction,
             this.payer,
             multisigAccount,
         );
 
         return multisigAccount.publicKey;
     }
 
     /**
      * Retrieve mint information
      */
     async getMintInfo(): Promise < MintInfo > {
         const info = await this.connection.getAccountInfo(this.publicKey);
         if (info === null) {
             throw new Error('Failed to find mint account');
         }
         if (!info.owner.equals(this.programId)) {
             throw new Error(`Invalid mint owner: ${JSON.stringify(info.owner)}`);
         }
         if (info.data.length != MintLayout.span) {
             throw new Error(`Invalid mint size`);
         }
 
         const data = Buffer.from(info.data);
         const mintInfo = MintLayout.decode(data);
 
         if (mintInfo.mintAuthorityOption === 0) {
             mintInfo.mintAuthority = null;
         } else {
             mintInfo.mintAuthority = new PublicKey(mintInfo.mintAuthority);
         }
 
         mintInfo.supply = u64.fromBuffer(mintInfo.supply);
         mintInfo.isInitialized = mintInfo.isInitialized != 0;
 
         if (mintInfo.freezeAuthorityOption === 0) {
             mintInfo.freezeAuthority = null;
         } else {
             mintInfo.freezeAuthority = new PublicKey(mintInfo.freezeAuthority);
         }
         return mintInfo;
     }
 
     /**
      * Retrieve account information
      *
      * @param account Public key of the account
      */
     async getAccountInfo(
         account: PublicKey,
         commitment ? : Commitment,
     ): Promise < AccountInfo > {
         const info = await this.connection.getAccountInfo(account, commitment);
         if (info === null) {
             throw new Error(FAILED_TO_FIND_ACCOUNT);
         }
         if (!info.owner.equals(this.programId)) {
             throw new Error(INVALID_ACCOUNT_OWNER);
         }
         if (info.data.length != AccountLayout.span) {
             throw new Error(`Invalid account size`);
         }
 
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
 
         if (!accountInfo.mint.equals(this.publicKey)) {
             throw new Error(
                 `Invalid account mint: ${JSON.stringify(
           accountInfo.mint,
         )} !== ${JSON.stringify(this.publicKey)}`,
             );
         }
         return accountInfo;
     }
 
 
     /**
      * Retrieve account information
      *
      * @param account Public key of the account
      */
     async getAccountPortfolioInfo(
         account: PublicKey,
         commitment ? : Commitment,
     ): Promise < AccountInfo > {
         const info = await this.connection.getAccountInfo(account, commitment);
         if (info === null) {
             throw new Error(FAILED_TO_FIND_ACCOUNT);
         }
        /* if (!info.owner.equals(this.programId)) {
             throw new Error(INVALID_ACCOUNT_OWNER);
         }*/
         if (info.data.length != UserPortfolioLayout.span) {
             throw new Error(`Invalid account size`);
         }
 
         const data = Buffer.from(info.data);
  
         const accountInfo = UserPortfolioLayout.decode(data);
         console.log ("accountInfo : ", JSON.stringify(accountInfo));
         accountInfo.address = account;
         //@ts-ignore
         console.log ("accountInfo.owner : ", owner);
 
         //accountInfo.mint = new PublicKey(accountInfo.mint);
         accountInfo.owner = new PublicKey(accountInfo.owner);
        // accountInfo.amount = u64.fromBuffer(accountInfo.amount);
       /*  if (accountInfo.delegateOption === 0) {
             accountInfo.delegate = null;
             accountInfo.delegatedAmount = new u64();
         } else {
           */
             accountInfo.delegate = new PublicKey(accountInfo.delegate);
             accountInfo.delegatedAmount = u64.fromBuffer(accountInfo.delegatedAmount);
        // }
 
         accountInfo.portfolioAddress = new PublicKey(accountInfo.portfolioAddress);
 
         // if (!accountInfo.mint.equals(this.publicKey)) {
         //     throw new Error(
         //         `Invalid account mint: ${JSON.stringify(
         //   accountInfo.mint,
         // )} !== ${JSON.stringify(this.publicKey)}`,
         //     );
         // }
         return accountInfo;
     }
 
 
     
     /**
      * Retrieve account information
      *
      * @param account Public key of the account
      */
     async getAccountInfoNew(
         account: PublicKey,
         commitment ? : Commitment,
     ): Promise < AccountInfo > {
         const info = await this.connection.getAccountInfo(account, commitment);
         if (info === null) {
             throw new Error(FAILED_TO_FIND_ACCOUNT);
         }
         if (!info.owner.equals(this.programId)) {
             throw new Error(INVALID_ACCOUNT_OWNER);
         }
         if (info.data.length != AccountLayoutNew.span) {
             throw new Error(`Invalid account size`);
         }
 
         const data = Buffer.from(info.data);
         const accountInfo = AccountLayoutNew.decode(data);
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
 
         if (!accountInfo.mint.equals(this.publicKey)) {
             throw new Error(
                 `Invalid account mint: ${JSON.stringify(
           accountInfo.mint,
         )} !== ${JSON.stringify(this.publicKey)}`,
             );
         }
         return accountInfo;
     }
 
 
 
       
 
 
 
 
     /**
      * Retrieve Multisig information
      *
      * @param multisig Public key of the account
      */
     async getMultisigInfo(multisig: PublicKey): Promise < MultisigInfo > {
         const info = await this.connection.getAccountInfo(multisig);
         if (info === null) {
             throw new Error('Failed to find multisig');
         }
         if (!info.owner.equals(this.programId)) {
             throw new Error(`Invalid multisig owner`);
         }
         if (info.data.length != MultisigLayout.span) {
             throw new Error(`Invalid multisig size`);
         }
 
         const data = Buffer.from(info.data);
         const multisigInfo = MultisigLayout.decode(data);
         multisigInfo.signer1 = new PublicKey(multisigInfo.signer1);
         multisigInfo.signer2 = new PublicKey(multisigInfo.signer2);
         multisigInfo.signer3 = new PublicKey(multisigInfo.signer3);
         multisigInfo.signer4 = new PublicKey(multisigInfo.signer4);
         multisigInfo.signer5 = new PublicKey(multisigInfo.signer5);
         multisigInfo.signer6 = new PublicKey(multisigInfo.signer6);
         multisigInfo.signer7 = new PublicKey(multisigInfo.signer7);
         multisigInfo.signer8 = new PublicKey(multisigInfo.signer8);
         multisigInfo.signer9 = new PublicKey(multisigInfo.signer9);
         multisigInfo.signer10 = new PublicKey(multisigInfo.signer10);
         multisigInfo.signer11 = new PublicKey(multisigInfo.signer11);
 
         return multisigInfo;
     }
 
     /**
      * Transfer tokens to another account
      *
      * @param source Source account
      * @param destination Destination account
      * @param owner Owner of the source account
      * @param multiSigners Signing accounts if `owner` is a multiSig
      * @param amount Number of tokens to transfer
      */
     async transfer(
         source: PublicKey,
         destination: PublicKey,
         owner: any,
         multiSigners: Array < Account > ,
         amount: number | u64,
     ): Promise < TransactionSignature > {
         let ownerPublicKey;
         let signers;
         if (isAccount(owner)) {
             ownerPublicKey = owner.publicKey;
             signers = [owner];
         } else {
             ownerPublicKey = owner;
             signers = multiSigners;
         }
         return await sendAndConfirmTransaction(
             'Transfer',
             this.connection,
             new Transaction().add(
                 nToken.createTransferInstruction(
                     this.programId,
                     source,
                     destination,
                     ownerPublicKey,
                     multiSigners,
                     amount,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Grant a third-party permission to transfer up the specified number of tokens from an account
      *
      * @param account Public key of the account
      * @param delegate Account authorized to perform a transfer tokens from the source account
      * @param owner Owner of the source account
      * @param multiSigners Signing accounts if `owner` is a multiSig
      * @param amount Maximum number of tokens the delegate may transfer
      */
     async approve(
         account: PublicKey,
         delegate: PublicKey,
         owner: any,
         multiSigners: Array < Account > ,
         amount: number | u64,
     ): Promise < void > {
         let ownerPublicKey;
         let signers;
         if (isAccount(owner)) {
             ownerPublicKey = owner.publicKey;
             signers = [owner];
         } else {
             ownerPublicKey = owner;
             signers = multiSigners;
         }
         await sendAndConfirmTransaction(
             'Approve',
             this.connection,
             new Transaction().add(
                 nToken.createApproveInstruction(
                     this.programId,
                     account,
                     delegate,
                     ownerPublicKey,
                     multiSigners,
                     amount,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Remove approval for the transfer of any remaining tokens
      *
      * @param account Public key of the account
      * @param owner Owner of the source account
      * @param multiSigners Signing accounts if `owner` is a multiSig
      */
     async revoke(
         account: PublicKey,
         owner: any,
         multiSigners: Array < Account > ,
     ): Promise < void > {
         let ownerPublicKey;
         let signers;
         if (isAccount(owner)) {
             ownerPublicKey = owner.publicKey;
             signers = [owner];
         } else {
             ownerPublicKey = owner;
             signers = multiSigners;
         }
         await sendAndConfirmTransaction(
             'Revoke',
             this.connection,
             new Transaction().add(
                 nToken.createRevokeInstruction(
                     this.programId,
                     account,
                     ownerPublicKey,
                     multiSigners,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Assign a new authority to the account
      *
      * @param account Public key of the account
      * @param newAuthority New authority of the account
      * @param authorityType Type of authority to set
      * @param currentAuthority Current authority of the account
      * @param multiSigners Signing accounts if `currentAuthority` is a multiSig
      */
     async setAuthority(
         account: PublicKey,
         newAuthority: PublicKey | null,
         authorityType: AuthorityType,
         currentAuthority: any,
         multiSigners: Array < Account > ,
     ): Promise < void > {
         let currentAuthorityPublicKey: PublicKey;
         let signers;
         if (isAccount(currentAuthority)) {
             currentAuthorityPublicKey = currentAuthority.publicKey;
             signers = [currentAuthority];
         } else {
             currentAuthorityPublicKey = currentAuthority;
             signers = multiSigners;
         }
         await sendAndConfirmTransaction(
             'SetAuthority',
             this.connection,
             new Transaction().add(
                 nToken.createSetAuthorityInstruction(
                     this.programId,
                     account,
                     newAuthority,
                     authorityType,
                     currentAuthorityPublicKey,
                     multiSigners,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Mint new tokens
      *
      * @param dest Public key of the account to mint to
      * @param authority Minting authority
      * @param multiSigners Signing accounts if `authority` is a multiSig
      * @param amount Amount to mint
      */
     async mintTo(
         dest: PublicKey,
         authority: any,
         multiSigners: Array < Account > ,
         amount: number | u64,
     ): Promise < void > {
         let ownerPublicKey;
         let signers;
         if (isAccount(authority)) {
             ownerPublicKey = authority.publicKey;
             signers = [authority];
         } else {
             ownerPublicKey = authority;
             signers = multiSigners;
         }
         console.log(" - " + this.programId + " - " + this.publicKey + " - " +
             dest + " - " + " - " + ownerPublicKey + " - " + multiSigners + " - " + amount);
         await sendAndConfirmTransaction(
             'MintTo',
             this.connection,
             new Transaction().add(
                 nToken.createMintToInstruction(
                     this.programId,
                     this.publicKey,
                     dest,
                     ownerPublicKey,
                     multiSigners,
                     amount,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
 
 
 
 
     /**
      * Burn tokens
      *
      * @param account Account to burn tokens from
      * @param owner Account owner
      * @param multiSigners Signing accounts if `owner` is a multiSig
      * @param amount Amount to burn
      */
     async burn(
         account: PublicKey,
         owner: any,
         multiSigners: Array < Account > ,
         amount: number | u64,
     ): Promise < void > {
         let ownerPublicKey;
         let signers;
         if (isAccount(owner)) {
             ownerPublicKey = owner.publicKey;
             signers = [owner];
         } else {
             ownerPublicKey = owner;
             signers = multiSigners;
         }
         await sendAndConfirmTransaction(
             'Burn',
             this.connection,
             new Transaction().add(
                 nToken.createBurnInstruction(
                     this.programId,
                     this.publicKey,
                     account,
                     ownerPublicKey,
                     multiSigners,
                     amount,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Close account
      *
      * @param account Account to close
      * @param dest Account to receive the remaining balance of the closed account
      * @param authority Authority which is allowed to close the account
      * @param multiSigners Signing accounts if `authority` is a multiSig
      */
     async closeAccount(
         account: PublicKey,
         dest: PublicKey,
         authority: any,
         multiSigners: Array < Account > ,
     ): Promise < void > {
         let authorityPublicKey;
         let signers;
         if (isAccount(authority)) {
             authorityPublicKey = authority.publicKey;
             signers = [authority];
         } else {
             authorityPublicKey = authority;
             signers = multiSigners;
         }
         await sendAndConfirmTransaction(
             'CloseAccount',
             this.connection,
             new Transaction().add(
                 nToken.createCloseAccountInstruction(
                     this.programId,
                     account,
                     dest,
                     authorityPublicKey,
                     multiSigners,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Freeze account
      *
      * @param account Account to freeze
      * @param authority The mint freeze authority
      * @param multiSigners Signing accounts if `authority` is a multiSig
      */
     async freezeAccount(
         account: PublicKey,
         authority: any,
         multiSigners: Array < Account > ,
     ): Promise < void > {
         let authorityPublicKey;
         let signers;
         if (isAccount(authority)) {
             authorityPublicKey = authority.publicKey;
             signers = [authority];
         } else {
             authorityPublicKey = authority;
             signers = multiSigners;
         }
         await sendAndConfirmTransaction(
             'FreezeAccount',
             this.connection,
             new Transaction().add(
                 nToken.createFreezeAccountInstruction(
                     this.programId,
                     account,
                     this.publicKey,
                     authorityPublicKey,
                     multiSigners,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Thaw account
      *
      * @param account Account to thaw
      * @param authority The mint freeze authority
      * @param multiSigners Signing accounts if `authority` is a multiSig
      */
     async thawAccount(
         account: PublicKey,
         authority: any,
         multiSigners: Array < Account > ,
     ): Promise < void > {
         let authorityPublicKey;
         let signers;
         if (isAccount(authority)) {
             authorityPublicKey = authority.publicKey;
             signers = [authority];
         } else {
             authorityPublicKey = authority;
             signers = multiSigners;
         }
         await sendAndConfirmTransaction(
             'ThawAccount',
             this.connection,
             new Transaction().add(
                 nToken.createThawAccountInstruction(
                     this.programId,
                     account,
                     this.publicKey,
                     authorityPublicKey,
                     multiSigners,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Transfer tokens to another account, asserting the token mint and decimals
      *
      * @param source Source account
      * @param destination Destination account
      * @param owner Owner of the source account
      * @param multiSigners Signing accounts if `owner` is a multiSig
      * @param amount Number of tokens to transfer
      * @param decimals Number of decimals in transfer amount
      */
     async transferChecked(
         source: PublicKey,
         destination: PublicKey,
         owner: any,
         multiSigners: Array < Account > ,
         amount: number | u64,
         decimals: number,
     ): Promise < TransactionSignature > {
         let ownerPublicKey;
         let signers;
         if (isAccount(owner)) {
             ownerPublicKey = owner.publicKey;
             signers = [owner];
         } else {
             ownerPublicKey = owner;
             signers = multiSigners;
         }
         return await sendAndConfirmTransaction(
             'TransferChecked',
             this.connection,
             new Transaction().add(
                 nToken.createTransferCheckedInstruction(
                     this.programId,
                     source,
                     this.publicKey,
                     destination,
                     ownerPublicKey,
                     multiSigners,
                     amount,
                     decimals,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Grant a third-party permission to transfer up the specified number of tokens from an account,
      * asserting the token mint and decimals
      *
      * @param account Public key of the account
      * @param delegate Account authorized to perform a transfer tokens from the source account
      * @param owner Owner of the source account
      * @param multiSigners Signing accounts if `owner` is a multiSig
      * @param amount Maximum number of tokens the delegate may transfer
      * @param decimals Number of decimals in approve amount
      */
     async approveChecked(
         account: PublicKey,
         delegate: PublicKey,
         owner: any,
         multiSigners: Array < Account > ,
         amount: number | u64,
         decimals: number,
     ): Promise < void > {
         let ownerPublicKey;
         let signers;
         if (isAccount(owner)) {
             ownerPublicKey = owner.publicKey;
             signers = [owner];
         } else {
             ownerPublicKey = owner;
             signers = multiSigners;
         }
 
         await sendAndConfirmTransaction(
             'ApproveChecked',
             this.connection,
             new Transaction().add(
                 nToken.createApproveCheckedInstruction(
                     this.programId,
                     account,
                     this.publicKey,
                     delegate,
                     ownerPublicKey,
                     multiSigners,
                     amount,
                     decimals,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Mint new tokens, asserting the token mint and decimals
      *
      * @param dest Public key of the account to mint to
      * @param authority Minting authority
      * @param multiSigners Signing accounts if `authority` is a multiSig
      * @param amount Amount to mint
      * @param decimals Number of decimals in amount to mint
      */
     async mintToChecked(
         dest: PublicKey,
         authority: any,
         multiSigners: Array < Account > ,
         amount: number | u64,
         decimals: number,
     ): Promise < void > {
         let ownerPublicKey;
         let signers;
         if (isAccount(authority)) {
             ownerPublicKey = authority.publicKey;
             signers = [authority];
         } else {
             ownerPublicKey = authority;
             signers = multiSigners;
         }
         await sendAndConfirmTransaction(
             'MintToChecked',
             this.connection,
             new Transaction().add(
                 nToken.createMintToCheckedInstruction(
                     this.programId,
                     this.publicKey,
                     dest,
                     ownerPublicKey,
                     multiSigners,
                     amount,
                     decimals,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Burn tokens, asserting the token mint and decimals
      *
      * @param account Account to burn tokens from
      * @param owner Account owner
      * @param multiSigners Signing accounts if `owner` is a multiSig
      * @param amount Amount to burn
      * @param decimals Number of decimals in amount to burn
      */
     async burnChecked(
         account: PublicKey,
         owner: any,
         multiSigners: Array < Account > ,
         amount: number | u64,
         decimals: number,
     ): Promise < void > {
         let ownerPublicKey;
         let signers;
         if (isAccount(owner)) {
             ownerPublicKey = owner.publicKey;
             signers = [owner];
         } else {
             ownerPublicKey = owner;
             signers = multiSigners;
         }
         await sendAndConfirmTransaction(
             'BurnChecked',
             this.connection,
             new Transaction().add(
                 nToken.createBurnCheckedInstruction(
                     this.programId,
                     this.publicKey,
                     account,
                     ownerPublicKey,
                     multiSigners,
                     amount,
                     decimals,
                 ),
             ),
             this.payer,
             ...signers,
         );
     }
 
     /**
      * Construct an InitializeMint instruction
      *
      * @param programId SPL Token program account
      * @param mint Token mint account
      * @param decimals Number of decimals in token account amounts
      * @param mintAuthority Minting authority
      * @param freezeAuthority Optional authority that can freeze token accounts
      */
     static createInitMintInstruction(
         programId: PublicKey,
         mint: PublicKey,
         decimals: number,
         mintAuthority: PublicKey,
         freezeAuthority: PublicKey | null,
         mintIdAsset: PublicKey | null,
         pubkeySwap: PublicKey | null,
 
     ): TransactionInstruction {
 
 
         let keys = [
             { pubkey: mint, isSigner: false, isWritable: true },
             { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
             { pubkey: mintIdAsset, isSigner: false, isWritable: false },
         ];
         const commandDataLayout = BufferLayout.struct([
             BufferLayout.u8('instruction'),
             BufferLayout.u8('decimals'),
             Layout.publicKey('mintAuthority'),
             BufferLayout.u8('option'),
             Layout.publicKey('freezeAuthority'),
             BufferLayout.u8('option1'),
             Layout.publicKey('mintIdAsset'),
             BufferLayout.u8('option2'),
             Layout.publicKey('pubkeySwap'),
         ]);
         let data = Buffer.alloc(2048); {
             const encodeLength = commandDataLayout.encode({
                     instruction: 0, // InitializeMint instruction
                     decimals,
                     mintAuthority: pubkeyToBuffer(mintAuthority),
                     option: freezeAuthority === null ? 0 : 1,
                     freezeAuthority: pubkeyToBuffer(freezeAuthority || new PublicKey(0)),
                     option1: mintIdAsset === null ? 0 : 1,
                     mintIdAsset: pubkeyToBuffer(mintIdAsset || new PublicKey(0)),
                     option2: pubkeySwap === null ? 0 : 1,
                     pubkeySwap: pubkeyToBuffer(pubkeySwap || new PublicKey(0)),
                 },
                 data,
             );
             data = data.slice(0, 154);
             console.log("###### sending data : " + encodeLength)
         }
 
         return new TransactionInstruction({
             //@ts-ignore
             keys,
             programId,
             data,
         });
     }
 
     /**
      * Construct an InitializeAccount instruction
      *
      * @param programId SPL Token program account
      * @param mint Token mint account
      * @param account New account
      * @param owner Owner of the new account
      */
     static createInitAccountInstruction(
         programId: PublicKey,
         mint: PublicKey,
         account: PublicKey,
         owner: PublicKey,
     ): TransactionInstruction {
         const keys = [
             { pubkey: account, isSigner: false, isWritable: true },
             { pubkey: mint, isSigner: false, isWritable: false },
             { pubkey: owner, isSigner: false, isWritable: false },
             { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
         ];
         const dataLayout = BufferLayout.struct([BufferLayout.u8('instruction')]);
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 1, // InitializeAccount instruction
             },
             data,
         );
 
         return new TransactionInstruction({
             keys,
             programId,
             data,
         });
     }
 
 
 
 
     /**
      * Construct an InitializePortfolio instruction
      *
      * @param programId SPL Token program account
      * @param mint Token mint account
      * @param portfolio New account
      * @param owner Owner of the new account
      */
     static createInitPortfolioInstruction(
         programId: PublicKey,
         //mint: PublicKey,
         owner: PublicKey,
         metaDataUrl: any,
         metaDataHash: number,
         creatorAccount: PublicKey| null,
         amountAsset1: number,
         addressAsset1: PublicKey| null,
         periodAsset1: any,
         assetToSoldIntoAsset1: PublicKey| null,
         amountAsset2: number | null,
         addressAsset2: PublicKey | null,
         periodAsset2: any | null,
         assetToSoldIntoAsset2: PublicKey | null,
         amountAsset3: number | null,
         addressAsset3: PublicKey | null,
         periodAsset3: any | null,
         assetToSoldIntoAsset3: PublicKey | null,
         amountAsset4: number | null,
         addressAsset4: PublicKey | null,
         periodAsset4: any | null,
         assetToSoldIntoAsset4: PublicKey | null,
         amountAsset5: number | null,
         addressAsset5: PublicKey | null,
         periodAsset5: any | null,
         assetToSoldIntoAsset5: PublicKey | null,
         amountAsset6: number | null,
         addressAsset6: PublicKey | null,
         periodAsset6: any | null,
         assetToSoldIntoAsset6: PublicKey | null,
         amountAsset7: number | null,
         addressAsset7: PublicKey | null,
         periodAsset7: any | null,
         assetToSoldIntoAsset7: PublicKey | null,
         amountAsset8: number | null,
         addressAsset8: PublicKey | null,
         periodAsset8: any | null,
         assetToSoldIntoAsset8: PublicKey | null,
         amountAsset9: number | null,
         addressAsset9: PublicKey | null,
         periodAsset9: any | null,
         assetToSoldIntoAsset9: PublicKey | null
         //,
         // amountAsset10: number | null,
         // addressAsset10: PublicKey | null,
         // periodAsset10: number | null,
         // assetToSoldIntoAsset10: PublicKey | null
 
     ): TransactionInstruction {
 
       console.log ("creatorAccount : ",creatorAccount , "addressAsset1 : ",addressAsset1,"assetToSoldIntoAsset1 : ",assetToSoldIntoAsset1);
       const keys = [
        { pubkey: creatorAccount, isSigner: false, isWritable: true },
        { pubkey: addressAsset1, isSigner: false, isWritable: false },
        { pubkey: assetToSoldIntoAsset1, isSigner: false, isWritable: false },
        { pubkey: addressAsset2, isSigner: false, isWritable: false },
        { pubkey: assetToSoldIntoAsset2, isSigner: false, isWritable: false },
        { pubkey: addressAsset3, isSigner: false, isWritable: false },
        { pubkey: assetToSoldIntoAsset3, isSigner: false, isWritable: false },
        { pubkey: addressAsset4, isSigner: false, isWritable: false },
        { pubkey: assetToSoldIntoAsset4, isSigner: false, isWritable: false },
        { pubkey: addressAsset5, isSigner: false, isWritable: false },
        { pubkey: assetToSoldIntoAsset5, isSigner: false, isWritable: false },
        { pubkey: addressAsset6, isSigner: false, isWritable: false },
        { pubkey: assetToSoldIntoAsset6, isSigner: false, isWritable: false },
        { pubkey: addressAsset7, isSigner: false, isWritable: false },
        { pubkey: assetToSoldIntoAsset7, isSigner: false, isWritable: false },
        { pubkey: addressAsset8, isSigner: false, isWritable: false },
        { pubkey: assetToSoldIntoAsset8, isSigner: false, isWritable: false },
        { pubkey: addressAsset9, isSigner: false, isWritable: false },
        { pubkey: assetToSoldIntoAsset9, isSigner: false, isWritable: false },
        // { pubkey: addressAsset10, isSigner: false, isWritable: false },
        // { pubkey: assetToSoldIntoAsset10, isSigner: false, isWritable: false },
        { pubkey: owner, isSigner: true, isWritable: false },
        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
    ];
 
         //@ts-ignore
         const conv = num => {
           let b = new ArrayBuffer(4);
           new DataView(b).setUint32(0, num);
           return Array.from(new Uint8Array(b));
         }
         
         const dataLayout = BufferLayout.struct([
             BufferLayout.u8('instruction'),
           //  BufferLayout.blob(128, 'metaDataUrl'),
             BufferLayout.u16('metaDataHash'),
             BufferLayout.u8('amountAsset1'),
             BufferLayout.u32('periodAsset1'),
             BufferLayout.u8('amountAsset2'),
             BufferLayout.u32('periodAsset2'),
             BufferLayout.u8('amountAsset3'),
             BufferLayout.u32('periodAsset3'),
             BufferLayout.u8('amountAsset4'),
             BufferLayout.u32('periodAsset4'),
             BufferLayout.u8('amountAsset5'),
             BufferLayout.u32('periodAsset5'),
             BufferLayout.u8('amountAsset6'),
             BufferLayout.u32('periodAsset6'),
             BufferLayout.u8('amountAsset7'),
             BufferLayout.u32('periodAsset7'),
             BufferLayout.u8('amountAsset8'),
             BufferLayout.u32('periodAsset8'),
             BufferLayout.u8('amountAsset9'),
             BufferLayout.u32('periodAsset9'),
             // BufferLayout.u8('amountAsset10'),
             // BufferLayout.u32('periodAsset10'),
         ]);
 
         console.log(JSON.stringify(metaDataUrl));
         const data = Buffer.alloc(dataLayout.span);
         /*    let metaBuffer = Buffer.alloc()
             metaBuffer.write(metaDataUrl, 0 , metaDataUrl.length , "ascii");*/
         console.log('====================================');
         console.log(metaDataHash, typeof metaDataHash );
         console.log('====================================');
         dataLayout.encode({
                 instruction: 19, // InitializeAccount portfolio
               //  metaDataUrl: Buffer.alloc(128, metaDataUrl, "ascii"),
                 metaDataHash :metaDataHash,
                 amountAsset1  ,
                 /*amountAsset1: new u16(amountAsset1).toBuffer(),*/
                 periodAsset1 : Buffer.from(periodAsset1),
                 amountAsset2,
                 periodAsset2 : Buffer.from(periodAsset2),
                 amountAsset3,
                 periodAsset3 : Buffer.from(periodAsset3),
                 amountAsset4,
                 periodAsset4 : Buffer.from(periodAsset4),
                 amountAsset5,
                 periodAsset5 : Buffer.from(periodAsset5),
                 amountAsset6,
                 periodAsset6 : Buffer.from(periodAsset6),
                 amountAsset7,
                 periodAsset7: Buffer.from(periodAsset7),
                 amountAsset8,
                 periodAsset8: Buffer.from(periodAsset8),
                 amountAsset9,
                 periodAsset9: Buffer.from(periodAsset9),
                 // amountAsset10,
                 // periodAsset10,
                 // periodAsset10: new u64(periodAsset10).toBuffer(),
             },
             data,
         );
 
 
         return new TransactionInstruction({
             //@ts-ignore
             keys,
             programId,
             data,
         });
     }
 
 
 
     /**
      * Construct an InitializeUserPortfolio instruction
      *
      * @param programId SPL Token program account
      * @param UserPortfolioAccount New account
      * @param PortfolioAddress Portfolio  
      */
 
     static createInitUserPortfolioInstruction(
         programId: PublicKey,
         userPortfolioAccount: PublicKey,
         owner: PublicKey,
         portfolioAddress: PublicKey,
 
         delegate: PublicKey | null,
         delegated_amount:any |null,
 
         valueAsset1: number,
         addressAsset1: PublicKey,
 
         valueAsset2: any | null,
         addressAsset2: PublicKey | null,
 
         valueAsset3: any | null,
         addressAsset3: PublicKey | null,
 
         valueAsset4: any | null,
         addressAsset4: PublicKey | null,
 
         valueAsset5: any | null,
         addressAsset5: PublicKey | null,
 
         valueAsset6: any | null,
         addressAsset6: PublicKey | null,
 
         valueAsset7: any | null,
         addressAsset7: PublicKey | null,
 
         valueAsset8: any | null,
         addressAsset8: PublicKey | null,
 
         valueAsset9: any | null,
         addressAsset9: PublicKey | null,
 
         // valueAsset10: number | null,
         // addressAsset10: PublicKey | null,
 
     
     ): TransactionInstruction {
 
         const keys = [
             { pubkey: userPortfolioAccount, isSigner: false, isWritable: true },
             { pubkey: portfolioAddress, isSigner: false, isWritable: false },
             { pubkey: owner, isSigner: true, isWritable: false },
             { pubkey: delegate, isSigner: false, isWritable: false },
             { pubkey: addressAsset1, isSigner: false, isWritable: false },
             { pubkey: addressAsset2, isSigner: false, isWritable: false },
             { pubkey: addressAsset3, isSigner: false, isWritable: false },
             { pubkey: addressAsset4, isSigner: false, isWritable: false },
             { pubkey: addressAsset5, isSigner: false, isWritable: false },
             { pubkey: addressAsset6, isSigner: false, isWritable: false },
             { pubkey: addressAsset7, isSigner: false, isWritable: false },
             { pubkey: addressAsset8, isSigner: false, isWritable: false },
             { pubkey: addressAsset9, isSigner: false, isWritable: false },
            // { pubkey: addressAsset10, isSigner: false, isWritable: false },
         ];
 
         const dataLayout = BufferLayout.struct([
             BufferLayout.u8('instruction'),
             Layout.uint64('delegated_amount'),
             Layout.uint64('valueAsset1'),
             Layout.uint64('valueAsset2'),
             Layout.uint64('valueAsset3'),
             Layout.uint64('valueAsset4'),
             Layout.uint64('valueAsset5'),
             Layout.uint64('valueAsset6'),
             Layout.uint64('valueAsset7'),
             Layout.uint64('valueAsset8'),
             Layout.uint64('valueAsset9'),
            // Layout.uint64('valueAsset10'),
         ]);
 
 
         const data = Buffer.alloc(dataLayout.span);
 
         dataLayout.encode({
                 instruction: 20, // Initialize Account user Portfolio
 
                 delegated_amount: new u64(delegated_amount).toBuffer(),
                 valueAsset1: new u64(valueAsset1).toBuffer(),
                 valueAsset2: new u64(valueAsset2).toBuffer(),
                 valueAsset3: new u64(valueAsset3).toBuffer(),
                 valueAsset4: new u64(valueAsset4).toBuffer(),
                 valueAsset5: new u64(valueAsset5).toBuffer(),
                 valueAsset6: new u64(valueAsset6).toBuffer(),
                 valueAsset7: new u64(valueAsset7).toBuffer(),
                 valueAsset8: new u64(valueAsset8).toBuffer(),
                 valueAsset9: new u64(valueAsset9).toBuffer(),
            //     valueAsset10: new u64(valueAsset10).toBuffer(),
             },
             data,
         );
 
 
         return new TransactionInstruction({
            //@ts-ignore
             keys,
             programId,
             data,
         });
     }
 
 
 
     /**
     * Construct a Deposit instruction version jawaher
     *
     * @param programId SPL Token program account
     * @param account Account 
     * @param payer Owner of the source account //jawaher
     // @ param owner Owner of the source account //becem
     * @param amount Number of tokens to transfer
     * @param volatility 90/10 or 50/50 underlying asset percentage / usdc. Please refer to github.com/NovaFi for more details 
     */
 
     /*static createDepositInstruction(
     programId,
     account,
     payer , //jawaher
     //owner,//becem
     amount,
     volatility,
    // programAddress //becem
   ): TransactionInstruction {
     const dataLayout = BufferLayout.struct([
       BufferLayout.u8('instruction'),
       Layout.uint64('amount'),
       Layout.uint64('volatility'),
     ]);
 
     const data = Buffer.alloc(dataLayout.span);
     dataLayout.encode(
       {
         instruction: 17, // deposit instruction
         amount: new u64(amount).toBuffer(),
         volatility: new u64(volatility).toBuffer(),
       },
       data,
     );
 
     const keys = [
       {pubkey: account, isSigner: false, isWritable: true},
       {pubkey: payer.publicKey, isSigner: true, isWritable: false}, //jawaher
      // {pubkey: owner, isSigner: false, isWritable: false},	//becem
       //{pubkey: programAddress ,isSigner: false, isWritable: false},	//becem
     //  {pubkey:  new PublicKey(pubkey_swap),isSigner: false, isWritable: false} //becem
     ];
 
     return new TransactionInstruction({
       keys,
       programId: programId,
       data,
     });
   }
  */
 
     /**
       * Construct a Deposit instruction version bacem
       *
       * @param programId SPL Token program account
       * @param account Account 
       //* @ param payer Owner of the source account //jawaher
       * @param owner Owner of the source account //becem
       * @param amount Number of tokens to transfer
       * @param volatility 90/10 or 50/50 underlying asset percentage / usdc. Please refer to github.com/NovaFi for more details 
       * @param nonce once used to create valid program address 
       */
 
     static createDepositInstruction(
         //@ts-ignore
         programId,owner, userAuthority,amount, volatility,nonce,programAddress, userSource,userDestination
     ): TransactionInstruction {
         
         const dataLayout = BufferLayout.struct([
             
             BufferLayout.u8('instruction'),
             Layout.uint64('amount'),
             Layout.uint64('volatility'),
             
             BufferLayout.u8('nonce'),
         ]);
 
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 17, // deposit instruction
                 amount: new u64(amount).toBuffer(),
                 volatility: new u64(volatility).toBuffer(),
                 nonce
                 // nonce
             },
             data,
         );
 
         let tokenSwap = new PublicKey("8vT1aMoP3Xdq6JyFfZXUhbjuVgoyR5fG68HGPibDridU");
         let poolSource = new PublicKey("4KD9CWqPDKpJ1LLYFeshVSDpjWkNs6TRSyL9VF2GG15h");
         let poolDestination = new PublicKey("ADdhWPE5ejxH3MkvD8ntLcTPHHxEVAGPhNbkAAdvpz1V");
         let poolMint = new PublicKey("A2gtqSo5Ky8YYT8kjaQixhAa5ExTnFbpynw16TqpZcVD");
         let feeAccount = new PublicKey("2TvgBAyknzy3rAKWZNsqELefKM8jrmWFggvpeNbN413B");
         let hostFeeAccount = new PublicKey("4TJsnqELjQ1WnJtR7F7qb2C8VZ4Zw3sSHMD6vwVAXBN5");
 
         const keys = [
             { pubkey: tokenSwap, isSigner: false, isWritable: false },
             { pubkey: owner, isSigner: false, isWritable: false },
             { pubkey: userAuthority, isSigner: true, isWritable: false },
             { pubkey: userSource, isSigner: false, isWritable: true },
             { pubkey: poolSource, isSigner: false, isWritable: true },
             { pubkey: poolDestination, isSigner: false, isWritable: true },
             { pubkey: userDestination, isSigner: false, isWritable: true },
             { pubkey: poolMint, isSigner: false, isWritable: true },
             { pubkey: feeAccount, isSigner: false, isWritable: true },
             { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
             { pubkey: programAddress, isSigner: false, isWritable: false },
             { pubkey: new PublicKey(pubkey_swap), isSigner: false, isWritable: false },
         ];
         if (hostFeeAccount != null) {
             keys.push({ pubkey: hostFeeAccount, isSigner: false, isWritable: true });
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
 
     /**
  * Construct a  Withdraw instruction
  *
  * @param programId SPL Token program account
  * @param account Account
  * @param payer Owner of the source account //jawaher
 // * @ param owner Owner of the source account // becem
  * @param amount Number of tokens to transfer
  */
 
     static createWithdrawInstruction(
         //@ts-ignore
         programId, account,  payer, amount,
     ): TransactionInstruction {
         const dataLayout = BufferLayout.struct([
             BufferLayout.u8('instruction'),
             Layout.uint64('amount'),
         ]);
 
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 18, // withdrow instruction
                  //@ts-ignore
                 amount: new u64(amount).toBuffer(),
             },
             data,
         );
 
         const keys = [
             { pubkey: account, isSigner: false, isWritable: true },
             { pubkey: payer.publicKey, isSigner: true, isWritable: false },
         ];
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
 
 
 
     /**
      * Construct a Transfer instruction
      *
      * @param programId SPL Token program account
      * @param source Source account
      * @param destination Destination account
      * @param owner Owner of the source account
      * @param multiSigners Signing accounts if `authority` is a multiSig
      * @param amount Number of tokens to transfer
      */
 
     static createTransferInstruction(
         programId: PublicKey,
         source: PublicKey,
         destination: PublicKey,
         owner: PublicKey,
         multiSigners: Array < Account > ,
         amount: any | u64,
     ): TransactionInstruction {
         
         const dataLayout = BufferLayout.struct([
             
             BufferLayout.u8('instruction'),
             Layout.uint64('amount'),
         ]);
 
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 3, // Transfer instruction
                 //@ts-ignore
                 amount: new u64(amount).toBuffer(),
             },
             data,
         );
 
         let keys = [
             { pubkey: source, isSigner: false, isWritable: true },
             { pubkey: destination, isSigner: false, isWritable: true },
         ];
         if (multiSigners.length === 0) {
             keys.push({
                 pubkey: owner,
                 isSigner: true,
                 isWritable: false,
             });
         } else {
             keys.push({ pubkey: owner, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct an Approve instruction
      *
      * @param programId SPL Token program account
      * @param account Public key of the account
      * @param delegate Account authorized to perform a transfer of tokens from the source account
      * @param owner Owner of the source account
      * @param multiSigners Signing accounts if `owner` is a multiSig
      * @param amount Maximum number of tokens the delegate may transfer
      */
     static createApproveInstruction(
         programId: PublicKey,
         account: PublicKey,
         delegate: PublicKey,
         owner: PublicKey,
         multiSigners: Array < Account > ,
         amount: any | u64,
     ): TransactionInstruction {
         const dataLayout = BufferLayout.struct([
             BufferLayout.u8('instruction'),
             Layout.uint64('amount'),
         ]);
 
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 4, // Approve instruction
                 //@ts-ignore
                 amount: new u64(amount).toBuffer(),
             },
             data,
         );
 
         let keys = [
             { pubkey: account, isSigner: false, isWritable: true },
             { pubkey: delegate, isSigner: false, isWritable: false },
         ];
         if (multiSigners.length === 0) {
             keys.push({ pubkey: owner, isSigner: true, isWritable: false });
         } else {
             keys.push({ pubkey: owner, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct a Revoke instruction
      *
      * @param programId SPL Token program account
      * @param account Public key of the account
      * @param owner Owner of the source account
      * @param multiSigners Signing accounts if `owner` is a multiSig
      */
     static createRevokeInstruction(
         programId: PublicKey,
         account: PublicKey,
         owner: PublicKey,
         multiSigners: Array < Account > ,
     ): TransactionInstruction {
         
         const dataLayout = BufferLayout.struct([BufferLayout.u8('instruction')]);
 
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 5, // Approve instruction
             },
             data,
         );
 
         let keys = [{ pubkey: account, isSigner: false, isWritable: true }];
         if (multiSigners.length === 0) {
             keys.push({ pubkey: owner, isSigner: true, isWritable: false });
         } else {
             keys.push({ pubkey: owner, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct a SetAuthority instruction
      *
      * @param programId SPL Token program account
      * @param account Public key of the account
      * @param newAuthority New authority of the account
      * @param authorityType Type of authority to set
      * @param currentAuthority Current authority of the specified type
      * @param multiSigners Signing accounts if `currentAuthority` is a multiSig
      */
     static createSetAuthorityInstruction(
         programId: PublicKey,
         account: PublicKey,
         newAuthority: PublicKey | null,
         authorityType: AuthorityType,
         currentAuthority: PublicKey,
         multiSigners: Array < Account > ,
     ): TransactionInstruction {
         const commandDataLayout = BufferLayout.struct([
             BufferLayout.u8('instruction'),
             BufferLayout.u8('authorityType'),
             BufferLayout.u8('option'),
             Layout.publicKey('newAuthority'),
         ]);
 
         let data = Buffer.alloc(1024); {
             const encodeLength = commandDataLayout.encode({
                     instruction: 6, // SetAuthority instruction
                     authorityType: AuthorityTypeCodes[authorityType],
                     option: newAuthority === null ? 0 : 1,
                     newAuthority: pubkeyToBuffer(newAuthority || new PublicKey(0)),
                 },
                 data,
             );
             data = data.slice(0, encodeLength);
         }
 
         let keys = [{ pubkey: account, isSigner: false, isWritable: true }];
         if (multiSigners.length === 0) {
             keys.push({ pubkey: currentAuthority, isSigner: true, isWritable: false });
         } else {
             keys.push({ pubkey: currentAuthority, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct a MintTo instruction
      *
      * @param programId SPL Token program account
      * @param mint Public key of the mint
      * @param dest Public key of the account to mint to
      * @param authority The mint authority
      * @param multiSigners Signing accounts if `authority` is a multiSig
      * @param amount Amount to mint
      */
     static createMintToInstruction(
         programId: PublicKey,
         mint: PublicKey,
         dest: PublicKey,
         authority: PublicKey,
         multiSigners: Array < Account > ,
         amount: any | u64,
     ): TransactionInstruction {
         
         const dataLayout = BufferLayout.struct([
             
             BufferLayout.u8('instruction'),
             Layout.uint64('amount'),
         ]);
 
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 7, // MintTo instruction
                 amount: new u64(amount).toBuffer(),
             },
             data,
         );
 
         let keys = [
             { pubkey: mint, isSigner: false, isWritable: true },
             { pubkey: dest, isSigner: false, isWritable: true },
         ];
         if (multiSigners.length === 0) {
             keys.push({
                 pubkey: authority,
                 isSigner: true,
                 isWritable: false,
             });
         } else {
             keys.push({ pubkey: authority, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct a Burn instruction
      *
      * @param programId SPL Token program account
      * @param mint Mint for the account
      * @param account Account to burn tokens from
      * @param owner Owner of the account
      * @param multiSigners Signing accounts if `authority` is a multiSig
      * @param amount amount to burn
      */
     static createBurnInstruction(
         programId: PublicKey,
         mint: PublicKey,
         account: PublicKey,
         owner: PublicKey,
         multiSigners: Array < Account > ,
         amount: any | u64,
     ): TransactionInstruction {
         const dataLayout = BufferLayout.struct([
             BufferLayout.u8('instruction'),
             Layout.uint64('amount'),
         ]);
 
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 8, // Burn instruction
                 amount: new u64(amount).toBuffer(),
             },
             data,
         );
 
         let keys = [
             { pubkey: account, isSigner: false, isWritable: true },
             { pubkey: mint, isSigner: false, isWritable: true },
         ];
         if (multiSigners.length === 0) {
             keys.push({
                 pubkey: owner,
                 isSigner: true,
                 isWritable: false,
             });
         } else {
             keys.push({ pubkey: owner, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct a Close instruction
      *
      * @param programId SPL Token program account
      * @param account Account to close
      * @param dest Account to receive the remaining balance of the closed account
      * @param authority Account Close authority
      * @param multiSigners Signing accounts if `owner` is a multiSig
      */
     static createCloseAccountInstruction(
         programId: PublicKey,
         account: PublicKey,
         dest: PublicKey,
         owner: PublicKey,
         multiSigners: Array < Account > ,
     ): TransactionInstruction {
         
         const dataLayout = BufferLayout.struct([BufferLayout.u8('instruction')]);
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 9, // CloseAccount instruction
             },
             data,
         );
 
         let keys = [
             { pubkey: account, isSigner: false, isWritable: true },
             { pubkey: dest, isSigner: false, isWritable: true },
         ];
         if (multiSigners.length === 0) {
             keys.push({ pubkey: owner, isSigner: true, isWritable: false });
         } else {
             keys.push({ pubkey: owner, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct a Freeze instruction
      *
      * @param programId SPL Token program account
      * @param account Account to freeze
      * @param mint Mint account
      * @param authority Mint freeze authority
      * @param multiSigners Signing accounts if `owner` is a multiSig
      */
     static createFreezeAccountInstruction(
         programId: PublicKey,
         account: PublicKey,
         mint: PublicKey,
         authority: PublicKey,
         multiSigners: Array < Account > ,
     ): TransactionInstruction {
         const dataLayout = BufferLayout.struct([BufferLayout.u8('instruction')]);
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 10, // FreezeAccount instruction
             },
             data,
         );
 
         let keys = [
             { pubkey: account, isSigner: false, isWritable: true },
             { pubkey: mint, isSigner: false, isWritable: false },
         ];
         if (multiSigners.length === 0) {
             keys.push({ pubkey: authority, isSigner: true, isWritable: false });
         } else {
             keys.push({ pubkey: authority, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct a Thaw instruction
      *
      * @param programId SPL Token program account
      * @param account Account to thaw
      * @param mint Mint account
      * @param authority Mint freeze authority
      * @param multiSigners Signing accounts if `owner` is a multiSig
      */
     static createThawAccountInstruction(
         programId: PublicKey,
         account: PublicKey,
         mint: PublicKey,
         authority: PublicKey,
         multiSigners: Array < Account > ,
     ): TransactionInstruction {
         
         const dataLayout = BufferLayout.struct([BufferLayout.u8('instruction')]);
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 11, // ThawAccount instruction
             },
             data,
         );
 
         let keys = [
             { pubkey: account, isSigner: false, isWritable: true },
             { pubkey: mint, isSigner: false, isWritable: false },
         ];
         if (multiSigners.length === 0) {
             keys.push({ pubkey: authority, isSigner: true, isWritable: false });
         } else {
             keys.push({ pubkey: authority, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct a TransferChecked instruction
      *
      * @param programId SPL Token program account
      * @param source Source account
      * @param mint Mint account
      * @param destination Destination account
      * @param owner Owner of the source account
      * @param multiSigners Signing accounts if `authority` is a multiSig
      * @param amount Number of tokens to transfer
      * @param decimals Number of decimals in transfer amount
      */
     static createTransferCheckedInstruction(
         programId: PublicKey,
         source: PublicKey,
         mint: PublicKey,
         destination: PublicKey,
         owner: PublicKey,
         multiSigners: Array < Account > ,
         amount: any | u64,
         decimals: number,
     ): TransactionInstruction {
         
         const dataLayout = BufferLayout.struct([
             
             BufferLayout.u8('instruction'),
             Layout.uint64('amount'),
             
             BufferLayout.u8('decimals'),
         ]);
 
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 12, // TransferChecked instruction
                 amount: new u64(amount).toBuffer(),
                 decimals,
             },
             data,
         );
 
         let keys = [
             { pubkey: source, isSigner: false, isWritable: true },
             { pubkey: mint, isSigner: false, isWritable: false },
             { pubkey: destination, isSigner: false, isWritable: true },
         ];
         if (multiSigners.length === 0) {
             keys.push({
                 pubkey: owner,
                 isSigner: true,
                 isWritable: false,
             });
         } else {
             keys.push({ pubkey: owner, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct an ApproveChecked instruction
      *
      * @param programId SPL Token program account
      * @param account Public key of the account
      * @param mint Mint account
      * @param delegate Account authorized to perform a transfer of tokens from the source account
      * @param owner Owner of the source account
      * @param multiSigners Signing accounts if `owner` is a multiSig
      * @param amount Maximum number of tokens the delegate may transfer
      * @param decimals Number of decimals in approve amount
      */
     static createApproveCheckedInstruction(
         programId: PublicKey,
         account: PublicKey,
         mint: PublicKey,
         delegate: PublicKey,
         owner: PublicKey,
         multiSigners: Array < Account > ,
         amount: any | u64,
         decimals: number,
     ): TransactionInstruction {
         const dataLayout = BufferLayout.struct([
             BufferLayout.u8('instruction'),
             Layout.uint64('amount'),
             BufferLayout.u8('decimals'),
         ]);
 
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 13, // ApproveChecked instruction
                 amount: new u64(amount).toBuffer(),
                 decimals,
             },
             data,
         );
 
         let keys = [
             { pubkey: account, isSigner: false, isWritable: true },
             { pubkey: mint, isSigner: false, isWritable: false },
             { pubkey: delegate, isSigner: false, isWritable: false },
         ];
         if (multiSigners.length === 0) {
             keys.push({ pubkey: owner, isSigner: true, isWritable: false });
         } else {
             keys.push({ pubkey: owner, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct a MintToChecked instruction
      *
      * @param programId SPL Token program account
      * @param mint Public key of the mint
      * @param dest Public key of the account to mint to
      * @param authority The mint authority
      * @param multiSigners Signing accounts if `authority` is a multiSig
      * @param amount Amount to mint
      * @param decimals Number of decimals in amount to mint
      */
     static createMintToCheckedInstruction(
         programId: PublicKey,
         mint: PublicKey,
         dest: PublicKey,
         authority: PublicKey,
         multiSigners: Array < Account > ,
         amount: any | u64,
         decimals: number,
     ): TransactionInstruction {
         const dataLayout = BufferLayout.struct([
             BufferLayout.u8('instruction'),
             Layout.uint64('amount'),
             BufferLayout.u8('decimals'),
         ]);
 
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 14, // MintToChecked instruction
                 amount: new u64(amount).toBuffer(),
                 decimals,
             },
             data,
         );
 
         let keys = [
             { pubkey: mint, isSigner: false, isWritable: true },
             { pubkey: dest, isSigner: false, isWritable: true },
         ];
         if (multiSigners.length === 0) {
             keys.push({
                 pubkey: authority,
                 isSigner: true,
                 isWritable: false,
             });
         } else {
             keys.push({ pubkey: authority, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Construct a BurnChecked instruction
      *
      * @param programId SPL Token program account
      * @param mint Mint for the account
      * @param account Account to burn tokens from
      * @param owner Owner of the account
      * @param multiSigners Signing accounts if `authority` is a multiSig
      * @param amount amount to burn
      */
     static createBurnCheckedInstruction(
         programId: PublicKey,
         mint: PublicKey,
         account: PublicKey,
         owner: PublicKey,
         multiSigners: Array < Account > ,
         amount: any | u64,
         decimals: number,
     ): TransactionInstruction {
         const dataLayout = BufferLayout.struct([
             BufferLayout.u8('instruction'),
             Layout.uint64('amount'),
             BufferLayout.u8('decimals'),
         ]);
 
         const data = Buffer.alloc(dataLayout.span);
         dataLayout.encode({
                 instruction: 15, // BurnChecked instruction
                 amount: new u64(amount).toBuffer(),
                 decimals,
             },
             data,
         );
 
         let keys = [
             { pubkey: account, isSigner: false, isWritable: true },
             { pubkey: mint, isSigner: false, isWritable: true },
         ];
         if (multiSigners.length === 0) {
             keys.push({
                 pubkey: owner,
                 isSigner: true,
                 isWritable: false,
             });
         } else {
             keys.push({ pubkey: owner, isSigner: false, isWritable: false });
             multiSigners.forEach(signer =>
                 keys.push({
                     pubkey: signer.publicKey,
                     isSigner: true,
                     isWritable: false,
                 }),
             );
         }
 
         return new TransactionInstruction({
             keys,
             programId: programId,
             data,
         });
     }
 
     /**
      * Get the address for the associated token account
      *
      * @param associatedProgramId SPL Associated Token program account
      * @param programId SPL Token program account
      * @param mint Token mint account
      * @param owner Owner of the new account
      * @return Public key of the associated token account
      */
     static async getAssociatedTokenAddress(
         associatedProgramId: PublicKey,
         programId: PublicKey,
         mint: PublicKey,
         owner: PublicKey,
     ): Promise < PublicKey > {
         return (
             await PublicKey.findProgramAddress(
                 [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
                 associatedProgramId,
             )
         )[0];
     }
 
     /**
      * Construct the AssociatedTokenProgram instruction to create the associated
      * token account
      *
      * @param associatedProgramId SPL Associated Token program account
      * @param programId SPL Token program account
      * @param mint Token mint account
      * @param associatedAccount New associated account
      * @param owner Owner of the new account
      * @param payer Payer of fees
      */
     static createAssociatedTokenAccountInstruction(
         associatedProgramId: PublicKey,
         programId: PublicKey,
         mint: PublicKey,
         associatedAccount: PublicKey,
         owner: PublicKey,
         payer: PublicKey,
     ): TransactionInstruction {
         const data = Buffer.alloc(0);
 
         let keys = [
             { pubkey: payer, isSigner: true, isWritable: true },
             { pubkey: associatedAccount, isSigner: false, isWritable: true },
             { pubkey: owner, isSigner: false, isWritable: false },
             { pubkey: mint, isSigner: false, isWritable: false },
             { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
             { pubkey: programId, isSigner: false, isWritable: false },
             { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
         ];
 
         return new TransactionInstruction({
             keys,
             programId: associatedProgramId,
             data,
         });
     }
 }