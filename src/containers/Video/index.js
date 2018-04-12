import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactPullToRefresh from 'react-pull-to-refresh';
import ReactPullLoad, { STATS } from 'react-pullload';
import 'react-pullload/dist/ReactPullLoad.css';

/* actions*/
import * as videoActions from '@/store/actions/video';

import IconSvg from '@/components/IconSvg';
import styles from './style.scss';

class Video extends Component {
  state = {
    pageindex: 1,
    hasMore: true,
    action: STATS.init
  };
  componentWillMount() {
    this.getVideoList(this.state.pageindex);
  }
  async getVideoList(pageindex) {
    const { fetchVideoList } = this.props.actions;
    await fetchVideoList({
      pageindex: pageindex
    });
  }
  handleRefresh = (resolve, reject) => {
    let { pageindex } = this.state;
    pageindex++;
    this.setState({ pageindex });
    const { fetchVideoList } = this.props.actions;
    fetchVideoList({
      pageindex: pageindex
    })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  };
  handleAction = action => {
    console.info(action, this.state.action, action === this.state.action);
    //new action must do not equel to old action
    if (action === this.state.action) {
      return false;
    }
    if (action === STATS.refreshing) {
      // 刷新
      this.handleRefresh();
    } else if (action === STATS.loading) {
      // 加载更多
      this.handLoadMore();
    } else {
      this.setState({
        action: action
      });
    }
  };
  handRefreshing = () => {
    if (STATS.refreshing === this.state.action) {
      return false;
    }
    this.loadData(() => {
      // refreshing complete
      this.setState({
        hasMore: true,
        action: STATS.refreshed
      });
    });
    this.setState({
      action: STATS.refreshing
    });
  };

  handLoadMore = () => {
    if (STATS.loading === this.state.action) {
      return false;
    }
    //无更多内容则不执行后面逻辑
    if (!this.state.hasMore) {
      return;
    }
    this.loadData(() => {
      // loadMore complete
      this.setState({
        hasMore: false,
        action: STATS.reset
      });
    });
    this.setState({
      action: STATS.loading
    });
  };

  loadData = callback => {
    let { pageindex } = this.state;
    pageindex++;
    this.setState({ pageindex });
    const { fetchVideoList } = this.props.actions;
    fetchVideoList({
      pageindex: pageindex
    })
      .then(() => {
        callback && callback();
      })
      .catch(() => {
        callback && callback();
      });
  };
  // canvas 绘制
  dragVideo(index) {
    let video = document.querySelectorAll('video')[index],
      ctx = document.querySelectorAll('canvas')[index].getContext('2d');
    video.play();
    let fps = 1000 / 30,
      w = document.querySelectorAll('.video')[index].clientWidth,
      h = document.querySelectorAll('.video')[index].clientHeight;

    video.addEventListener('play', () => {
      setInterval(() => {
        ctx.drawImage(video, 0, 0, 320, 176);
      }, fps);
    });
  }
  // 播放
  play(index, item) {
    item.playBol = true;
    this.dragVideo(index);
    // 添加playBol属性,重新渲染
    this.props.actions.renderVideoList();
  }
  // 暂停
  pause(index, item) {
    if (!item.playBol) return;
    document.querySelectorAll('video')[index].pause();
    this.attrReverse(item, 'playBol');
  }
  //属性置反
  attrReverse(item, attr) {
    item[attr] = !item[attr];
    this.props.actions.renderVideoList();
  }
  render() {
    const { videoList } = this.props.video;
    const { hasMore } = this.state;
    return (
      <div className={`${styles['video-container']} ${styles['video-wrapper']}`}>
        <ReactPullLoad
          downEnough={150}
          action={this.state.action}
          handleAction={this.handleAction}
          hasMore={hasMore}
          style={{ paddingTop: 50 }}
          distanceBottom={1000}
        >
          <div className={`${styles['video-container']} ${styles['video-wrapper']}`}>
            {videoList.map((item, index) => (
              <section key={index} className={styles['item']}>
                <div className={styles['video']}>
                  <video src={item.video} />
                  <div
                    className={`${styles['canvas-video']} bg-cover`}
                    style={{
                      backgroundImage: `url(${item.images})`
                    }}
                  >
                    <canvas
                      onClick={e => {
                        this.pause(index, item);
                      }}
                    />
                  </div>
                  {!item.playBol ? (
                    <div className={styles['title']}>
                      <h4>{item.title}</h4>
                      <small>{item.video_num}次播放</small>
                    </div>
                  ) : (
                    ''
                  )}
                  {!item.playBol ? (
                    <div
                      className={styles['play']}
                      onClick={e => {
                        this.play(index, item);
                      }}
                    >
                      <IconSvg name="play" />
                    </div>
                  ) : (
                    ''
                  )}
                  {!item.playBol ? <time>{item.time}</time> : ''}
                  {!item.playBol ? (
                    <div
                      className={`${styles['avatar']} bg-cover-all`}
                      style={{
                        backgroundImage: `url(${item.image})`
                      }}
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div className={`${styles['intro']} df-sb`}>
                  <div className={styles['source']}>{item.source}</div>
                  <div className={`${styles['box']} df-c`}>
                    <div
                      onClick={e => {
                        this.attrReverse(item, 'attention');
                      }}
                    >
                      {item.attention ? (
                        <div>已关注</div>
                      ) : (
                        <div>
                          <IconSvg name="attention" />
                          <span>关注</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <IconSvg name="custom-comment" />
                      <span>{item.comment_num || '评论'}</span>
                    </div>
                    <div>
                      <IconSvg name="More" />
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </ReactPullLoad>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  video: state.videoState
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators({ ...videoActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
