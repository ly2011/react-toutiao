/* 顶部bar */

import React, { Component } from 'react';

import styles from './HeaderBar.scss';

import logoImg from '@/assets/images/logo.png';

import IconSvg from '@/components/IconSvg';

class HeaderBar extends Component {
  render() {
    return (
      <div className={`${styles['header-wrapper']} df-sb`}>
        <div className={`${styles['logo']} df-c`}>
          <img src={logoImg} alt="LOGO" />
        </div>
        <div className={styles['search']}>
          <IconSvg name="2fangdajing" className="search-icon" />
          <input type="text" placeholder="搜索些啥呢..." />
        </div>
      </div>
    );
  }
}

export default HeaderBar;
