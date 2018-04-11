import * as types from '@/store/types';
import { getVideoList } from '@/api';
import { loading } from '@/store/actions/com';

// 获取videoList
export const fetchVideoList = params => dispatch => {
  dispatch(loading(true));
  return new Promise((resolve, reject) =>
    getVideoList(params)
      .then(res => {
        const list = res.data.list;
        dispatch(loading(false));
        dispatch({
          type: types.GET_VIDEO_LIST,
          payload: list
        });
        resolve(res);
      })
      .catch(error => {
        dispatch(loading(false));
        reject(error);
      })
  );
};

// 刷新当前videoList 的内容
export const refreshVideoList = params => dispatch => {
  dispatch(loading(true));
  return new Promise((resolve, reject) =>
    getVideoList(params)
      .then(res => {
        const list = res.data.list;
        dispatch(loading(false));
        dispatch({
          type: types.REFRESH_VIDEO_LIST,
          payload: list
        });
        resolve(res);
      })
      .catch(error => {
        dispatch(loading(false));
        reject(error);
      })
  );
};

// 重新渲染
export const renderVideoList = () => dispatch => {
  dispatch({
    type: types.RENDER_VIDEO_LIST
  });
};
