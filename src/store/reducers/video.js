import * as types from '@/store/types';

const initialState = {
  videoList: [],
  hasMore: true
};

const videoState = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_VIDEO_LIST: {
      const list = action.payload;
      if (list.length < 5) {
        state.hasMore = false;
      }
      state.videoList = state.videoList.concat(list);
      return { ...state };
    }
    case types.REFRESH_VIDEO_LIST: {
      state.videoList = action.payload;
      state.hasMore = true;
      return { ...state };
    }
    case types.RENDER_VIDEO_LIST: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
};

export default videoState;
