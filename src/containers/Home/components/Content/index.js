import React, { Component } from 'react';
import Swiper from 'react-id-swiper';

import styles from './style.scss';

const NoneImages = ({ item }) => (
  <div>
    <h4>{item.title}</h4>
    <p className="wes-3">{item.intro}</p>
    <div className="df-sb">
      <div className="small-box">
        <span>{item.source}</span>
        <span>评论：{item.comment}</span>
        <span>{item.time}</span>
      </div>
    </div>
  </div>
);

const ImagesOne = ({ item }) => (
  <div className="df-sb">
    <div className="item-l">
      <h4>{item.title}</h4>
      <p className="wes-2">{item.intro}</p>
      <div className="df-sb">
        <div className="small-box">
          <span>{item.source}</span>
          <span>评论：{item.comment}</span>
        </div>
      </div>
    </div>
    <div className="item-r">
      <img src={item.images[0]} alt="" />
    </div>
  </div>
);

const ImagesMore = ({ item }) => (
  <div>
    <div className="item-t">
      <h4>{item.title}</h4>
      <p className="wes-1">{item.intro}</p>
    </div>
    <div className="item-b df-sb">
      {item.images.map((img, index) => (
        <img key={index} src={img} alt={img} style={{ width: item.images.length === 2 ? '40%' : '25%' }} />
      ))}
    </div>
    <div className="df-sb">
      <div className="small-box">
        <span>{item.source}</span>
        <span>评论：{item.comment}</span>
      </div>
    </div>
  </div>
);

class Content extends Component {
  constructor(props) {
    super(props);
    this.swiper = null;
  }

  // componentDidMount() {
  //   const index = this.props.newsIndex;
  //   if (this.swiper) this.swiper.slideTo(index - 2 >= 0 ? index - 2 : 0, 500, false);
  // }
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
    this.getListOfNews(index);
  }

  slideChangeTransitionEnd() {
    this.active(this.swiper.activeIndex);
  }

  render() {
    const { newsList = [], newsIndex } = this.props;
    this.swiper && this.swiper.slideTo(newsIndex);
    return (
      <div className={styles['content-wrapper']}>
        <Swiper
          ref={node => (node ? (this.swiper = node.swiper) : '')}
          on={{
            slideChangeTransitionEnd: this.slideChangeTransitionEnd.bind(this)
          }}
        >
          {newsList.map((news, index) => (
            <div key={index}>
              <section className={styles['swiper-box']}>
                <ul>
                  {news.list &&
                    news.list.map((item, key) => (
                      <li key={key} className={styles['item']}>
                        {item.images.length === 0 ? (
                          <NoneImages item={item} />
                        ) : item.images.length === 1 ? (
                          <ImagesOne item={item} />
                        ) : (
                          <ImagesMore item={item} />
                        )}
                      </li>
                    ))}
                </ul>
              </section>
            </div>
          ))}
        </Swiper>
      </div>
    );
  }
}

export default Content;
