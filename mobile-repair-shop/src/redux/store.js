import { createStore, combineReducers } from 'redux'; // Import combineReducers
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage is localStorage for web
import repairReducer from './reducer'; // Import your repairReducer

// Redux Persist configuration
const persistConfig = {
  key: 'root', // Key for the persisted state in storage
  storage,     // LocalStorage
};

// Combine your reducers
const rootReducer = combineReducers({
  repairs: repairReducer, // Include repairReducer
  // Add other reducers here if needed
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Redux DevTools support
);

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
