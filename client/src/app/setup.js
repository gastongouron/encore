import {compose, createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import {persistStore, autoRehydrate} from 'redux-persist';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import styled from 'styled-components';
import reducers from './reducers';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { initDevise } from './devisesetup'
import ActionCable from 'actioncable'
import addGraphQLSubscriptions from './cable/subscriptions/addGraphQLSubscriptions'

import $ from 'jquery'

injectTapEventPlugin();

const cable = ActionCable.createConsumer()
window.cable = cable

const RailsNetworkInterface = createNetworkInterface({
 uri: '/graphql',
 opts: {
   credentials: 'include',
 },
 headers: {
   'X-CSRF-Token': $("meta[name=csrf-token]").attr("content"),
 }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(RailsNetworkInterface, {cable: cable})

const apolloClient = new ApolloClient({
  ssrMode: false,
  link: new HttpLink({ uri: '/graphql', fetch }),
  cache: new InMemoryCache(),
  networkInterface: networkInterfaceWithSubscriptions
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

initDevise();

export {
  initStore,
  store,
  history,
  apolloClient
};
