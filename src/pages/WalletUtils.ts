import Wallet from "@project-serum/sol-wallet-adapter";
import { PublicKey } from "@solana/web3.js"
import { useMemo } from "react";


// export const NETWORK_URL: any ="https://devnet.solana.com";
export const NETWORK_URL: any ="https://api.devnet.solana.com";

export const WalletsTypes = {
  METAMASK: "metamask",
  SOLANA: "solana",
  PHANTOM: "phantom"
}

export const TOKEN_PROGRAM_ID: PublicKey = new PublicKey(
 // 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
 '2VogHps5hYygRpYGEgpbpZCinBcFo7vfZWaZxB1t6uPv'
);
export const ASSOCIATED_TOKEN_PROGRAM_ID: PublicKey = new PublicKey(
  // 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  '2VogHps5hYygRpYGEgpbpZCinBcFo7vfZWaZxB1t6uPv'
);


export const ORIGINE_PROGRAMM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
export const ORIGINE_MINT_ADDRESS = "AFqVJyXLaEXDfhsh4UGr171qRnErpVXgNiyou79TgS4r"
export const ORIGINE_ACCOUNT_ADDRESS = "G4wMN8YCYRPHrbdW3HcT1s2noXYBvAoYNzWHugwtW5Rr"


export const ADAPTABLE_PROGRAMM_ID = "CxUSh8EJmP7q5MWf94sTZNThAUxMHU9Y37YqUcGRCZca"
export const ASSOCIATED_PROGRAMM_ID = "Fxer83fa7cJF3CBS8EDtbKEbkM1gqnPqLZbRQZZae4Cf"
export const ACCOUNT_ADDRESS = "ATj3MDMcwFzDgWQ1yUKXdkcDnJxy1eQauDvy8QjHZD4c"
export const MINT_ADDRESS = "CpBNkGgTXNUXCAT983x6cB5JuusTH7XW6kJpcikjHxEE"

export const OLD_ACCOUNT_ADDRESS = "GDfZsGKYJzzvozREB7ByEo44HBeATF69TFiVEadN3NEK"



export const TOKEN_ORIGIN = "ORIGIN"
export const TOKEN_ADAPTABALE = "ADAPTABLE"

/*************portfolios requirement*/
export const PORTFOLIO_PROGRAMM_ID = "5i1ivuYoZmCaaPuBeMDr4cobJFPKJ2inzeuST7X6Dsji"//"AKpyxcb1JgLesBcW6h1CWG1Lw1T4gWYzjbCvi2uDGs3D"
export const PORTFOLIO_ASSOCIATED_PROGRAMM_ID = "5i1ivuYoZmCaaPuBeMDr4cobJFPKJ2inzeuST7X6Dsji"//"AKpyxcb1JgLesBcW6h1CWG1Lw1T4gWYzjbCvi2uDGs3D"
export const PORTFOLIO_MINT_ADDRESS = "2oY1YoyBBVdKhBLaCLvWkZGsBU2DNvLKjuCUa26y53Pg"
export const PORTFOLIO_ACCOUNT_SIZE=660;
export const SENTINEL_ACCOUNT_ADDRESS = "FBo4spZ4qN6xQ9qg223Z5z8f5M9udb2QepLHfz6U4Kdv"

