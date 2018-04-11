import * as types from '@/store/types';

import { news } from '@/config';

// newList: [
//   {id: 1, list:[], title: '推荐'},
//   {id: 2, list: [], title: '视频'},
//   {id: 3, list: [], title: '热点'}
// ]
const initialState = {
  topics: [],
  newsList: news.slice(0, 12), // 首页全部数据存储
  newsIndex: 0, // 当前的tab栏 0-推荐，1-视频，2-热点...
  newsPrevIndex: 0,
  newsLoading: false,
  end: false // 是否已经加载完毕
};

const homeState = (state = initialState, action) => {
  switch (action.type) {
    case types.HOME_GET_ARTICLES: {
      return {
        ...state,
        ...{ topics: action.data }
      };
    }

    case types.GET_LIST_OF_NEWS: {
      const { list, newsIndex } = action.payload;
      let news = state.newsList[newsIndex] ? state.newsList[newsIndex].list : [];
      if (list.length < 5) {
        state.newsList[newsIndex].hasMore = false;
      } else {
        state.newsList[newsIndex].hasMore = true;
      }
      if (news && news.length > 0) {
        state.newsList[newsIndex].list = news.concat(list);
      } else {
        state.newsList[newsIndex].list = list;
      }

      return {
        ...state
      };
    }

    case types.SET_NEWS_INDEX: {
      state.newsIndex = action.payload;
      return { ...state };
    }

    default: {
      return state;
    }
  }
};

export default homeState;
