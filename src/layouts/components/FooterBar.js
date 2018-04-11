/* 底部bar */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './FooterBar.scss';
import IconSvg from '@/components/IconSvg';

import { footerBarList } from '@/config';

@withRouter
class FooterBar extends Component {
  skipView = path => {
    this.props.history.push(path);
  };
  render() {
    const { location: { pathname } } = this.props;
    return (
      <footer className={`${styles['footer-wrapper']} df-c`}>
        <ul className="cf">
          {footerBarList.map((item, index) => (
            <li key={index} className={item.path === pathname ? 'active' : ''} onClick={() => this.skipView(item.path)}>
              <IconSvg name={item.icon} />
              <div>{item.title}</div>
            </li>
          ))}
        </ul>
      </footer>
    );
  }
}

export default FooterBar;
