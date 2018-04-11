import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

/* reducers*/
import settingState from './com';
import homeState from './home';
import videoState from './video';

const rootReducer = combineReducers({
  routing,
  settingState,
  homeState,
  videoState
});

export default rootReducer;
