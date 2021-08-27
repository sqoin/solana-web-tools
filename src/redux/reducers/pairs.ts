const checkExist = function(v: any, state: any) {
  for (var i = 0; i < state.length; i++)
    if (
      state &&
      state[i] &&
      state[i].adressPair &&
      /*&& (v)
          && (v.car)*/
      state[i].adressPair === v.adressPair
    )
      return true;

  return false;
};
const pairs = (
  state = [{ nameToken0: "", nameToken1: "", adressPair: "" }],
  action: any
) => {
  switch (action.type) {
    case "SET_PAIRS":
      if (checkExist(action.pairs, state)) return state;

      return [
        ...state,
        {
          nameToken0: action.pairs.nameToken0,
          nameToken1: action.pairs.nameToken1,
          adressPair: action.pairs.adressPair,
        },
      ];
    default:
      return state;
  }
};
export default pairs;
