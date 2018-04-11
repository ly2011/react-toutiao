import React, { Component } from 'react';
import Swiper from 'react-id-swiper';

import styles from './style.scss';

class TopBar extends Component {
  state = {
    isTopBarBox: false
  };
  constructor(props) {
    super(props);
    this.swiper = null;
  }
  componentWillMount = () => {
    const { newsIndex } = this.props;
    this.getListOfNews(newsIndex);
  };

  componentDidMount() {
    const index = this.props.newsIndex;
    if (this.swiper) this.swiper.slideTo(index - 2 >= 0 ? index - 2 : 0, 500, false);
  }
  async getListOfNews(newsIndex) {
    const { fetchListOfNews } = this.props;
    const { newsList } = this.props;
    try {
      await fetchListOfNews(newsList[newsIndex], { newsList, newsIndex });
    } catch (error) {}
  }
  active(index) {
    const { setNewsIndex } = this.props;
    setNewsIndex(index);
    if (this.swiper) this.swiper.slideTo(index - 2 >= 0 ? index - 2 : 0, 500, false);
    this.getListOfNews(index);
  }

  toggleTopBarBox(show) {
    this.setState({
      isTopBarBox: show
    });
  }
  render() {
    const { newsList = [], newsIndex } = this.props;

    return (
      <div className={styles['topbar-wrapper']}>
        <div className={styles['top-menu-bar']}>
          <Swiper slidesPerView={6} ref={node => (node ? (this.swiper = node.swiper) : '')}>
            {newsList.map((news, index) => (
              <div key={index} className={`${newsIndex === index ? 'active' : ''}`} onClick={() => this.active(index)}>
                {news.title}
              </div>
            ))}
          </Swiper>
        </div>

        <a
          href="javascript:;"
          className={`${styles['top-menu-more-btn']} df-c`}
          onClick={() => this.toggleTopBarBox(true)}
        >
          <i className={styles['list-shadow']} />
          <span className={styles['cross']} />
        </a>
      </div>
    );
  }
}

export default TopBar;
