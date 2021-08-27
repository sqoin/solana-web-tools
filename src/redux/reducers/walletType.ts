const walletType = (state = {  name: "" }, action: any) => {
    switch (action.type) {
      case "SET_WALLET_TYPE":
        return  {  name: action.walletType };;
      default:
        return state;
    }
  };
  export default walletType;