import * as types from '@/store/types';

export function loading(status) {
  return {
    type: types.COM_LOADING_STATUS,
    loading: status
  };
}

export function conf(settings) {
  return {
    type: types.COM_CONF,
    settings
  };
}
