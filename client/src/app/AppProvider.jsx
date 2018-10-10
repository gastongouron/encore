import React, {Component} from 'react';
import {initStore} from './setup';
import App from './App';

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
  }
  render() {
    return this.state.rehydrated && <App store={this.state.store} />;
  }
}

export default AppProvider;