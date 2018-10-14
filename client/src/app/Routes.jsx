import React        from 'react';
import {Switch}     from 'react-router-dom';
import MainLayout   from '../layouts/MainLayout';
import Home         from '../home/Home';
import NotFound     from '../app/NotFound';
import Artists      from './components/Artist/Artists';
import {authRoutes, PrivateRoute} from 'react-devise';
import WithMainLayout from './WithMainLayout';
import ArtistDetail from './components/Artist/ArtistDetail';
import Policy       from '../app/PrivatePolicy';
import Profile      from './components/Profile/UserProfile';

// <PrivateRoute   exact path="/reviews/:id" layout={MainLayout} component={ReviewEdit} />
const AuthNotFound = () => <MainLayout><NotFound/></MainLayout>;

const Routes = () => {
  return (

    <Switch>
      {authRoutes({wrapper: WithMainLayout, notFoundComponent: AuthNotFound})}

      <WithMainLayout exact path="/policy"      component={Policy} />
      <WithMainLayout exact path="/"            component={Home} />
      <WithMainLayout exact path="/artists/:id" component={ArtistDetail} />
      {/* <PrivateRoute   exact path="/artists/:id" layout={MainLayout} component={ArtistDetail} /> */}

      <PrivateRoute   exact path="/artists"     layout={MainLayout} component={Artists} />
      <PrivateRoute   exact path="/user/:id"    layout={MainLayout} component={Profile} />

      <WithMainLayout component={NotFound} />

    </Switch>
  );
};

export default Routes;
