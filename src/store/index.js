import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice.ts';
import publicDataReducer from './publicDataSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // key to identify the persist store
  storage,     // storage method (localStorage in this case)
};

// Combine your reducers
const rootReducer = combineReducers({
  user: userReducer,
  publicData: publicDataReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from being checked
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create a persistor
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };
