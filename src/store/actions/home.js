import * as types from '@/store/types';
import { getTopics } from '@/api';
const receiveTopics = topics => ({
  type: types.HOME_GET_ARTICLES,
  topics: topics
});

export const fetchTopics = () => dispatch => {
  getTopics().then(topics => {
    dispatch(receiveTopics(topics));
  });
};
