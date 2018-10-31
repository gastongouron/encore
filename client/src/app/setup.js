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
import { initDevise } from './devistsetup'
import ActionCable from 'actioncable'
import $ from 'jquery'
// import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

injectTapEventPlugin();



const cable = ActionCable.createConsumer()
window.cable = cable

// console.log("cable", cable)

const RailsNetworkInterface = createNetworkInterface({
 uri: '/graphql',
 opts: {
   credentials: 'include',
 },
 headers: {
   'X-CSRF-Token': $("meta[name=csrf-token]").attr("content"),
 }
});

const addGraphQLSubscriptions = require("graphql-ruby-client/subscriptions/addGraphQLSubscriptions")
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(RailsNetworkInterface, {cable: cable})

// const wsClient = new SubscriptionClient(`ws://localhost:3000/cable`, {
//   reconnect: true
// });

// const networkInterface = createNetworkInterface({
//   uri: '/graphql'
// });

// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   networkInterface,
//   wsClient
// );

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
