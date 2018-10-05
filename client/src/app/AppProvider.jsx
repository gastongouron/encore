import React, {Component} from 'react';
import { connect } from 'react-redux'
import {initStore} from './setup';
import App from './App';
import { initArtists } from './actions/artists'

// NOTE: Funny things happen if we don't wait for store rehydration before rendering.
class AppProvider extends Component {
  state = {
    rehydrated: false
  };
  componentDidMount() {
    const store = initStore({
      onRehydrationComplete: () => {
        this.setState({
          rehydrated: true
        });
      }
    });
    this.setState({
      store: store
    });

    console.log("AppProvider ----", store);
    // this.props.initArtists();
  }
  render() {
    return this.state.rehydrated && <App store={this.state.store} />;
  }
}

// const mapDispatchToProps = {initArtists}

// export default connect(undefined, mapDispatchToProps)(AppProvider)

export default AppProvider;