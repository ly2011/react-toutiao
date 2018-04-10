import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  // ConnectedRouter,
  // routerReducer,
  routerMiddleware
  // push
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
// import { composeWithDevTools } from 'redux-devtools-extension';
/* import {
  persistStore,
  autoRehydrate
  // createTransform
} from 'redux-persist';
// import { localStorage, sessionStorage } from 'redux-persist/storages';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native */

// import localForage from 'localforage';
import rootReducer from './reducers';

const history = createHistory();
const middleware = routerMiddleware(history);
// thunk 允许我们dispatch()函数
/* const buildStore = compose(applyMiddleware(thunk, middleware))(createStore);
const configureStore = (initialState) => {
  const store = buildStore(rootReducer, initialState);
  return store;
};*/
const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(thunk, middleware))
  // compose(applyMiddleware(thunk, middleware), autoRehydrate())
  // composeWithDevTools(applyMiddleware(thunk, middleware), autoRehydrate())
);

/* const persistConfig = {
  blacklist: [''], // 过滤不缓存的reducer, 如 blacklist: ['homeState']
  storage: storage, // 白名单数组，一旦设置，其他的 key 都会被忽略
  keyPrefix: 'ly2011',
  transforms: [], // 在 rehydration 和 storage 阶段被调用的转换器
  debounce: 100 // storage 操作被调用的频度
}; */

// begin periodically persisting the store
// persistStore(store, persistConfig);

export default store;
// export default configureStore;
