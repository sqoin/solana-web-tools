const account = (state = {  adress: "" }, action: any) => {
    switch (action.type) {
      case "SET_ACCOUNT":
        return  {  adress: action.account };;
      default:
        return state;
    }
  };
  export default account;