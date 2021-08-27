const loadFromPage = (state = {  fromPage: "" }, action: any) => {
    switch (action.type) {
      case "SET_LOAD_FROM_PAGE":
        return  {  fromPage: action.fromPage };;
      default:
        return state;
    }
  };
  export default loadFromPage;