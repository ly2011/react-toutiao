import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';

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

const history = createHistory();

const RouterConfig = () => {
  return (
    <Router history={history}>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </Switch>
      </div>
    </Router>
  );
};

export default RouterConfig;
