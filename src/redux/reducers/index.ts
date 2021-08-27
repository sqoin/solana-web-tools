import { combineReducers } from "redux";
import connection from "./connection";
import jeton from "./jeton";
import balances from "./balances";
import pairs from "./pairs";
import pairItem from "./pairItem"
import account from "./account"
import loadFromPage from "./loadFromPage"
import walletType from "./walletType"
import networkName from "./networkName"
export default combineReducers({
  connection,
  jeton,
  balances,
  pairs,
  pairItem,
  account,
  loadFromPage,
  walletType,
  networkName
});
