import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* actions*/
import * as comActions from '@/store/actions/com';
import * as homeActions from '@/store/actions/home';

class Home extends Component {
  componentDidMount() {
    const { fetchTopics } = this.props.actions;
    fetchTopics();
  }
  render() {
    console.log(this.props);
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
