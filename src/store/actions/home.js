import * as types from '@/store/types';
import { getTopics, getListOfNews } from '@/api';
import { loading } from '@/store/actions/com';

const receiveTopics = topics => ({
  type: types.HOME_GET_ARTICLES,
  data: topics
});

const receiveListOfNews = (list, newsIndex) => ({
  type: types.GET_LIST_OF_NEWS,
  payload: { list, newsIndex }
});

// 获取话题
export const fetchTopics = () => dispatch => {
  dispatch(loading(true));
  return new Promise((resolve, reject) =>
    getTopics()
      .then(res => {
        dispatch(loading(false));
        dispatch(receiveTopics(res.data));
        resolve(res);
      })
      .catch(error => {
        dispatch(loading(false));
        reject(error);
      })
  );
};

export const fetchListOfNews = ({ list, params }, { newsIndex, newsList, hasMore }) => dispatch => {
  if (!hasMore) {
    const obj = newsList.find(v => v.id === newsList[newsIndex].id);
    if (obj.list) {
      return;
    }
  }

  dispatch(loading(true));
  return new Promise((resolve, reject) =>
    getListOfNews(params)
      .then(res => {
        const list = res.data.list;
        dispatch(loading(false));
        dispatch(receiveListOfNews(list, newsIndex));
        resolve(res);
      })
      .catch(error => {
        dispatch(loading(false));
        reject(error);
      })
  );
};

// 设置当前 news 的下标
export const setNewsIndex = newsIndex => dispatch => {
  dispatch({
    type: types.SET_NEWS_INDEX,
    payload: newsIndex
  });
};
