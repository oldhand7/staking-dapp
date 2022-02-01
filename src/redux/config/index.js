import {
  applyMiddleware, createStore, compose, combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import { combinedReducer, combinedEffect } from '../features';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
];

// eslint-disable-next-line no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (initialState = {}) => {
  const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleware))(createStore);

  // Only persist settings(language, walletId,...)
  const persistedReducer = persistReducer({
    key: 'root',
    stateReconciler: autoMergeLevel1,
    storage,
    whitelist: ['settings'],
  }, combineReducers(combinedReducer));

  const store = createStoreWithMiddleware(persistedReducer, initialState);
  const persistor = persistStore(store);

  sagaMiddleware.run(combinedEffect);

  return { persistor, store };
};
