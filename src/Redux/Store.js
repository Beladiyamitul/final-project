import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import { rootreducer } from './Reducer/Index';
import { rootSaga } from "./ReduxSaga/Rootsaga";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cartpro','product', 'login' ] 
  }
   
  const persistedReducer = persistReducer(persistConfig, rootreducer)
 
  const middlewares = [thunk , sagaMiddleware]


export const counterStore = () => {
    let store = createStore(persistedReducer , applyMiddleware(...middlewares))

    sagaMiddleware.run(rootSaga)
    return store ;
}


export const store = counterStore() ;

export let persistor = persistStore(store);


