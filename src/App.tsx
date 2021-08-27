import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserHistory } from "history";
import { HashRouter, Route, Switch } from "react-router-dom";
import store from "./redux/store";
import SolanaTest from "./pages/solanaTest";

export const history = createBrowserHistory();
function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <Switch>
          <Route exact path="/">
              <SolanaTest />
            </Route>
            <Route path="/SolanaTest">
              <SolanaTest />
            </Route>

            </Switch>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
}


export default App;

//Nova Finance app
