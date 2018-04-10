import * as types from '@/store/types';

const initialState = {
  title: '今日头条',
  loading: 0
};

const settingState = (state = initialState, action) => {
  switch (action.type) {
    case types.COM_CONF: {
      return { ...state, ...action.settings };
    }
    case types.COM_LOADINGS_STATUS: {
      return {
        ...state,
        ...{ loading: action.loading }
      };
    }
    default: {
      return state;
    }
  }
};

export default settingState;