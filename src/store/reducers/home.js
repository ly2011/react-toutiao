import * as types from '@/store/types';

const initialState = {
  topics: [],
  loading: false
};

const homeState = (state = initialState, action) => {
  switch (action.type) {
    case types.HOME_GET_ARTICLES: {
      return {
        ...state,
        ...{ topics: action.data }
      };
    }

    default: {
      return state;
    }
  }
};

export default homeState;
