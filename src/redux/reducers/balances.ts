const balances = (state = { key: "", value: "" }, action: any) => {
    switch (action.type) {
      case "SET_BALANCE":
        var getBalanceFloat = parseFloat(action.balances.value);
        var balance=(getBalanceFloat / 1000000000000000000).toFixed(3);
        return { key:action.balances.key,value: balance };
      default:
        return state;
    }
  };
  export default balances;