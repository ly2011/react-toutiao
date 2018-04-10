import * as types from '@/store/types';

const initialState = {
  topics: [],
  newsList: [],
  newsIndex: 0
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
