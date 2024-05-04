import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from "redux-persist";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {usersReducer} from "../features/Users/usersSlice";
import {categoriesReducer} from "../features/Categories/categoriesSlice";
import {productsReducer} from "../features/Products/productsSlice";

const userPersistConfig = {
  key: 'store:Test11',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(userPersistConfig, usersReducer),
  categories: categoriesReducer,
  products: productsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
