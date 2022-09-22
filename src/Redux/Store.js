import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import { rootreducer } from './Reducer/Index';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counter','cartpro'] 
  }
   
  const persistedReducer = persistReducer(persistConfig, rootreducer)
 


export const counterStore = () => {
    let store = createStore(persistedReducer , applyMiddleware(thunk))
    let persistor = persistStore(store)
    return {store, persistor } ;
}



