import { createStore, applyMiddleware, compose, Reducer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { rootReducer } from './reducers';
import authMiddleware from '../utils/middleware';

// const middleware: any = [thunk];
const initialState = {};
const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['errors'], // Specify reducers to be excluded from persisting
};

const persistedReducer = persistReducer(persistConfig, rootReducer) as Reducer;

const configureStore = () => {
  const store = createStore(persistedReducer, initialState, compose(applyMiddleware(thunk, authMiddleware), devTools));
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
