import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import moviesReducer from "./slices/movieSlice";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import historyReducer from "./slices/historySlice";
import profileReducer from "./slices/profileSlice";
import adminReducer from "./slices/adminSlice";
import {
  persistReducer,
  persistStore,
  REGISTER,
  FLUSH,
  PERSIST,
  PAUSE,
  PURGE,
  REHYDRATE,
} from "redux-persist";

const persistConfig = {
  key: "koda3:tickitz-app",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    movies: moviesReducer,
    auth: authReducer,
    order: orderReducer,
    history: historyReducer,
    profile: profileReducer,
    admin: adminReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [REGISTER, FLUSH, PERSIST, PAUSE, PURGE, REHYDRATE],
      },
    });
  },
  // devTools: import.meta.env.VITE_ENVIRONTMENT === "development",
});

export const persistedStore = persistStore(store);
