import {compose, createStore, combineReducers, applyMiddleware} from 'redux';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import {persistStore, autoRehydrate} from 'redux-persist';
import {reducer as formReducer} from 'redux-form';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import ApolloClient, {createNetworkInterface} from 'apollo-client';
import ReactDeviseMaterialUI from 'react-devise-material-ui';
// import {initReactDevise, addAuthorizationHeaderToRequest} from 'react-devise';
import {initReactDevise} from 'react-devise';
import reactDeviseReducers from 'react-devise/lib/reducers';
import {Alert, UnstyledList, ViewHeading} from '../shared';
import styled, {injectGlobal} from 'styled-components';


import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    fontFamily: Roboto, sans-serif;
    margin: 0;
  }
`;

injectTapEventPlugin();

// const networkInterface = createNetworkInterface({
//   uri: '/graphql'
// });

// networkInterface.use([{
//   applyMiddleware: addAuthorizationHeaderToRequest
// }]);

// const defaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'network-only',
//     errorPolicy: 'all',
//   },
//   query: {
//     fetchPolicy: 'network-only',
//     errorPolicy: 'all',
//   },
// }

const apolloClient = new ApolloClient({
  // networkInterface: networkInterface,
  // ssrMode: true,
  // shouldBatch: true,
  // defaultOptions: defaultOptions,
  link: new HttpLink({ uri: '/graphql', fetch }),
  cache: new InMemoryCache()
});

const history = createBrowserHistory();

let store;

const initStore = ({onRehydrationComplete}) => {
  store = createStore(
    combineReducers({
      ...reactDeviseReducers,
      form: formReducer,
      router: routerReducer,
      apollo: apolloClient.reducer()
    }),
    {},
    compose(
      applyMiddleware(
        routerMiddleware(history),
        apolloClient.middleware()
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
  }
});

export {
  initStore,
  store,
  history,
  apolloClient
};
