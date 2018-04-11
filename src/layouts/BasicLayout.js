import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { childRoutes } from '@/router';
import styles from './BasicLayout.scss';
import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';

class BasicLayout extends Component {
  render() {
    return (
      <div className={styles['app-wrapper']}>
        <HeaderBar />
        <div className={styles['main-container']}>
          {childRoutes.map((route, index) => (
            <Route key={index} path={route.path} component={route.component} exact={route.exactly} />
          ))}
        </div>
        <FooterBar />
      </div>
    );
  }
}

export default BasicLayout;
