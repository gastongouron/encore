import { combineReducers } from 'redux';
import reactDeviseReducers from 'react-devise/lib/reducers';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';

import artists from './artists';

export default apolloClient => combineReducers({
  ...reactDeviseReducers,
  form: formReducer,
  router: routerReducer,
  apollo: apolloClient.reducer(),
  artists
});
