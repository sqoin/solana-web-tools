const pairItem = (state =[], action: any) => {
    switch (action.type) {
      case "SET_PAIR_ITEM":
        return  action.pair;
      default:
        return state;
    }
  };
  export default pairItem;