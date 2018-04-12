import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'nprogress/nprogress.css';
import './global.scss';
import './styles/index.scss';
import './styles/css/swiper.css';
import App from './App';

/* 工具类 */
import './utils/iconfont';
import './utils/rem';

import initReactFastclick from 'react-fastclick';
initReactFastclick(); // 解决IOS onClick不生效

ReactDOM.render(<App />, document.getElementById('app'));
