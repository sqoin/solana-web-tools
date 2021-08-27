const networkName = (state = {  networkName: "" }, action: any) => {
    switch (action.type) {
      case "SET_NETWORK_NAME":
        return  {  networkName: action.networkName };;
      default:
        return state;
    }
  };
  export default networkName;