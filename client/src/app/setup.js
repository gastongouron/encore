import {compose, createStore, combineReducers, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import {persistStore, autoRehydrate} from 'redux-persist';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDeviseMaterialUI from 'react-devise-material-ui';
import {initReactDevise} from 'react-devise';
import {Alert, UnstyledList, ViewHeading} from '../shared';
import styled, {injectGlobal} from 'styled-components';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import reducers from './reducers';

import SignUpContainer from './components/devise/SignUp'
import LoginContainer from './components/devise/LogIn'

injectGlobal`
  body {
    fontFamily: Roboto, sans-serif;
    margin: 0;
  }
`;

injectTapEventPlugin();

const apolloClient = new ApolloClient({
  ssrMode: false,
  link: new HttpLink({ uri: '/graphql', fetch }),
  cache: new InMemoryCache()
}); 

const middlewares = [routerMiddleware(history), apolloClient.middleware()];

const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;

const initStore = ({onRehydrationComplete}) => {
  store = createStore(
    reducers(apolloClient),
    {},
    composeEnhancers(
      applyMiddleware(
        ...middlewares
      ),
      autoRehydrate()
    )
  );

  persistStore(store, {
    blacklist: [
      'form'
    ]
  }, onRehydrationComplete);
  
  return store;
};

const AuthAlert = styled(Alert)`
  margin-top: 10px;
`;

initReactDevise({
  viewPlugins: [
    ReactDeviseMaterialUI.plugin(),
    {
      Alert: AuthAlert,
      AuthLinksList: UnstyledList,
      Heading: ViewHeading
    }
  ],
  messages: {
    loginFailed: 'Whoa there. Bad login!'
  },
  routes: {
    signup: { component: SignUpContainer },
    login: { component: LoginContainer }
  }
});

export {
  initStore,
  store,
  history,
  apolloClient
};
