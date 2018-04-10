import * as types from '@/store/types';
import { getTopics } from '@/api';
import { loading } from '@/store/actions/com';

const receiveTopics = topics => ({
  type: types.HOME_GET_ARTICLES,
  data: topics
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
