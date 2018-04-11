import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactPullToRefresh from 'react-pull-to-refresh';

/* actions*/
import * as videoActions from '@/store/actions/video';

import IconSvg from '@/components/IconSvg';
import styles from './style.scss';

class Video extends Component {
  state = {
    pageindex: 1
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
    return (
      <ReactPullToRefresh onRefresh={this.handleRefresh}>
        <div className={styles['video-container']}>
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
                    <IconSvg iconName="play" />
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
                        <IconSvg iconName="attention" />
                        <span>关注</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </ReactPullToRefresh>
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
