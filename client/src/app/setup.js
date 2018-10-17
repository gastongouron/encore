import {compose, createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import {persistStore, autoRehydrate} from 'redux-persist';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDeviseMaterialUI from 'react-devise-material-ui';
import {initReactDevise} from 'react-devise';
import {Alert, UnstyledList, ViewHeading} from '../shared';
import styled from 'styled-components';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import reducers from './reducers';

import SignUpContainer from './components/Devise/views/SignUp'
import LoginContainer from './components/Devise/views/LogIn'

injectTapEventPlugin();

const apolloClient = new ApolloClient({
  ssrMode: false,
  link: new HttpLink({ uri: '/graphql', fetch }),
  cache: new InMemoryCache()
}); 

const history = createBrowserHistory();
const middlewares = [routerMiddleware(history), apolloClient.middleware()];
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
  padding: 20px;
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
  // Internationalize
  messages: {
    loginFailed: 'Whoa there. Bad login!'
  },
  routes: {
    signup: {
      component: SignUpContainer,     
      path: '/getstarted',
      linkText: 'Create an account'
    },
    login: { 
      component: LoginContainer, 
      path: '/hello',
      linkText: 'Log-in'
    },
    requestReconfirm: { 
      linkText: ''
    }    
  }
});

export {
  initStore,
  store,
  history,
  apolloClient
};
