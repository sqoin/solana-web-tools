const wellatConnect = (state = { name: "" }, action: any) => {
    switch (action.type) {
      case "SET_WELLAT_CONNECT":
        return { name: action.name };
      default:
        return state;
    }
  };
  export default wellatConnect;