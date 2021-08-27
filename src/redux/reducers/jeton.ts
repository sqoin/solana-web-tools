const checkExist = function(v: any, state: any) {
  for (var i = 0; i < state.length; i++)
    if (
      state &&
      state[i] &&
      state[i].jeton.adress &&
      /*&& (v)
          && (v.car)*/
      state[i].jeton.adress === v
    )
      return true;

  return false;
};

const jeton = (state = [/*{ name: "", adress: "" }*/], action: any) => {
  switch (action.type) {
    case "SET_JETON":
    if (checkExist(action.jeton.adress, state)) return state;
      return [...state,{ name: action.jeton.name, adress: action.jeton.adress }]
    default:
      return state;
  }
};
export default jeton;
