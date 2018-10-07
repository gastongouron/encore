import React from 'react';
import {Switch} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../home/Home';
import NotFound from '../app/NotFound';
import ArtistsList from './components/Artist/ArtistsList';
// import NewArtist from './artists/NewArtist';
import {authRoutes, PrivateRoute} from 'react-devise';
import WithMainLayout from './WithMainLayout';
import ArtistDetail from './components/Artist/ArtistDetail';
import Policy from './components/public/Policy'
import Profile from './components/Profile/Profile'

const AuthNotFound = () => <MainLayout><NotFound/></MainLayout>;

const Routes = () => {
  console.log("Routes")
  return (
    <Switch>
      {authRoutes({wrapper: WithMainLayout, notFoundComponent: AuthNotFound})}
      <WithMainLayout exact path="/policy" component={Policy} />
      <WithMainLayout exact path="/" component={Home} />
      <PrivateRoute exact path="/artists" layout={MainLayout} component={ArtistsList} />
      <PrivateRoute exact path="/artists/:id" layout={MainLayout} component={ArtistDetail} />
      <PrivateRoute exact path="/profile" layout={MainLayout} component={Profile} />
      <WithMainLayout component={NotFound} />
    </Switch>
  );
};

export default Routes;
