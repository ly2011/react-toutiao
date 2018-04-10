import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* actions*/
import * as comActions from '@/store/actions/com';
import * as homeActions from '@/store/actions/home';

class Home extends Component {
  async componentDidMount() {
    const { fetchTopics } = this.props.actions;
    try {
      const result = await fetchTopics();
      if (result.success) {
        console.log('topics: ', result);
      } else {
        console.log('请求失败');
      }
    } catch (error) {}
  }
  render() {
    return (
      <div>
        <h2 className="title">Home Page</h2>
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

// export default Home
