import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

/* reducers*/
import settingState from './com';
import homeState from './home';

const rootReducer = combineReducers({
  routing,
  settingState,
  homeState
});

export default rootReducer;
