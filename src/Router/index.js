import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

// import asyncComponent from '../utils/AsyncComponent'
import Loadable from 'react-loadable';
import createHistory from 'history/createBrowserHistory';

import Loading from '../components/Loading';

// import Home from '../containers/Home'
// import About from '../containers/About'
// import Topics from '../containers/Topics'

// 懒加载的第一种方式：
// const Home = asyncComponent(() => import(/* webpackChunkName: "home" */ '../containers/Home'))
// const About = asyncComponent(() => import(/* webpackChunkName: "about" */ '../containers/About'))
// const Topics = asyncComponent(() => import(/* webpackChunkName: "topics" */ '../containers/Topics'))

// 懒加载的第二中方式：Loadable
const Home = Loadable({
  loader: () => import('../containers/Home'),
  loading: Loading
});
const About = Loadable({
  loader: () => import('../containers/About'),
  loading: Loading
});
const Topics = Loadable({
  loader: () => import('../containers/Topics'),
  loading: Loading
});

const Login = Loadable({
  loader: () => import('../containers/Login'),
  loading: Loading
});

const Video = Loadable({
  loader: () => import('../containers/Video'),
  loading: Loading
});

const BasicLayout = Loadable({
  loader: () => import('../layouts/BasicLayout'),
  loading: Loading
});

const NotFound = () => (
  <div className="not-found">
    <h2 className="title">页面不存在</h2>
  </div>
);

const history = createHistory();
// const location = history.location;

// childRoutes
export const childRoutes = [
  {
    path: '/index',
    component: Home,
    exactly: true
  },
  {
    path: '/about',
    component: About,
    exactly: true
  },
  {
    path: '/topics',
    component: Topics,
    exactly: true
  },
  {
    path: '/video',
    component: Video,
    exactly: true
  }
];

const routes = () => {
  return (
    <HashRouter history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={BasicLayout} />
        <Route path="/404" component={NotFound} />
        {/* {location.hash === '#/' ? <Redirect to="/login" /> : ''} */}
      </Switch>
    </HashRouter>
  );
};

export default routes;
