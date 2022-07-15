import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import { chatsReducer } from "./chats";
import { dashboardReducer } from "./dashboard";

// const persistConfig = {
//   key: "root",
//   storage,
// };

const rootReducer = combineReducers({ 
    chats: chatsReducer,
    dashboard: dashboardReducer
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
