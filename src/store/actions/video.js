import * as types from '@/store/types';
import { getVideoList } from '@/api';
import { loading } from '@/store/actions/com';

const receiveVideoList = list => ({
  type: types.GET_VIDEO_LIST,
  payload: list
});

export const fetchVideoList = params => dispatch => {
  dispatch(loading(true));
  return new Promise((resolve, reject) =>
    getVideoList(params)
      .then(res => {
        const list = res.data.list;
        dispatch(loading(false));
        dispatch(receiveVideoList(list));
        resolve(res);
      })
      .catch(error => {
        dispatch(loading(false));
        reject(error);
      })
  );
};
