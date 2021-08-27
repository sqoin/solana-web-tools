const checkExist = function(v: any, state: any) {
  for (var i = 0; i < state.length; i++)
    if (
      state &&
      state[i] &&
      state[i].idPrefer &&
      /*&& (v)
            && (v.car)*/
      state[i].idPrefer === v.idPrefer
    )
      return true;

  return false;
};
const connection = (
  state = { networkId: 0, link: "" },
  action: any
) => {
 // console.info(action);
  switch (action.type) {
    case "SET_NETWORDK_ID":
      return {
        networkId: action.networkId,
        link: state.link
      };
    case "SET_LINK":
      return {
        networkId: state.networkId,
        link: action.link,
        
        
      };
    case "SET_WEB_ACCOUNT":
      return {
        networkId: state.networkId,
        link: state.link,
      };
    default:
      return state;
  }
};
export default connection;
