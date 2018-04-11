import request from '@/utils/request';

const BASE_URL = 'https://cnodejs.org/api/v1';
export const getTopics = ({ page = 1, tab = 'share', limit = 12, mdrender = 'false' } = {}) =>
  request({
    baseURL: BASE_URL,
    method: 'get',
    url: '/topics',
    params: {
      page,
      tab,
      limit,
      mdrender
    }
  });

const TOU_TIAO_BASE_URL = 'https://easy-mock.com/mock/5a6fe597a52f145df7e8a38a/apis';
export const getListOfNews = ({ id, title } = {}) => {
  return request({
    baseURL: TOU_TIAO_BASE_URL,
    method: 'get',
    url: '/home/list',
    params: {
      id,
      title
    }
  });
};
