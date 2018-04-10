import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* actions*/
import * as comActions from '@/store/actions/com';
import * as homeActions from '@/store/actions/home';

class Home extends Component {
  componentDidMount() {
    const { loading, fetchTopics } = this.props.actions;
    console.log('loading: ', loading);
    fetchTopics();
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
