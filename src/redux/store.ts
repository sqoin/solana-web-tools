import { createStore } from "redux";
import { persistReducer, createTransform } from "redux-persist";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
// import JSOG from "jsog";

import { JsogService } from "jsog-typescript";

const jsog = new JsogService();

export const JSOGTransform = createTransform(
  (inboundState, key) => jsog.serialize(inboundState),
  (outboundState, key) => jsog.deserialize(outboundState)
);

// const persistConfig = {
//   key: "myapp",
//   storage: storage
// };

const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [JSOGTransform]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default createStore(persistedReducer);
