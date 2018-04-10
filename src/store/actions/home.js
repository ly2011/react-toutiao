import * as types from '@/store/types';
import { getTopics } from '@/api';
const receiveTopics = topics => ({
  type: types.HOME_GET_ARTICLES,
  data: topics
});

export const fetchTopics = () => dispatch => {
  getTopics().then(res => {
    dispatch(receiveTopics(res.data));
  });
};
