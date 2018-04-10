import * as types from '@/store/types';

// newList: [
//   {id: 1, list:[], title: '推荐'},
//   {id: 2, list: [], title: '视频'},
//   {id: 3, list: [], title: '热点'}
// ]
const initialState = {
  topics: [],
  newsList: [], // 首页全部数据存储
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

    default: {
      return state;
    }
  }
};

export default homeState;
