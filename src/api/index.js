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
