import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* actions*/
import * as comActions from '@/store/actions/com';
import * as homeActions from '@/store/actions/home';

import TopBar from './components/TopBar/index';
import Content from './components/Content';

import styles from './style.scss';

class Home extends Component {
  async componentDidMount() {
    // const { fetchTopics } = this.props.actions;
    // try {
    //   const result = await fetchTopics();
    //   if (result.success) {
    //     console.log('topics: ', result);
    //   } else {
    //     console.log('请求失败');
    //   }
    // } catch (error) {}
  }
  // async getListOfNew(newsIndex) {
  //   const { fetchListOfNews } = this.props.actions;
  //   const { newsList } = this.props.home;
  //   try {
  //     await fetchListOfNews(newsList[newsIndex], { newsList, newsIndex });
  //   } catch (error) {}
  // }
  render() {
    const { newsList, newsIndex } = this.props.home;
    const { fetchListOfNews, setNewsIndex } = this.props.actions;
    return (
      <div className={`${styles['home-container']} ${styles['home-wrapper']}`}>
        <TopBar
          newsIndex={newsIndex}
          newsList={newsList}
          fetchListOfNews={fetchListOfNews}
          setNewsIndex={setNewsIndex}
        />
        <Content
          newsIndex={newsIndex}
          newsList={newsList}
          fetchListOfNews={fetchListOfNews}
          setNewsIndex={setNewsIndex}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  com: state.settingState,
  home: state.homeState
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators({ ...comActions, ...homeActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
