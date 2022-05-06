import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import {persistReducer,persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,
}
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})
const persistedReducer = persistReducer(persistConfig, reducer);
 
let store = configureStore({reducer:persistedReducer,middleware:customizedMiddleware,devTools:composeWithDevTools() as any});
let persistedStore = persistStore(store)
export default store;

export {persistedStore};