import React from 'react';
import {Switch} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../home/Home';
import NotFound from '../app/NotFound';
import ArtistsList from './components/ArtistsList';
// import NewArtist from './artists/NewArtist';
import {authRoutes, PrivateRoute} from 'react-devise';
import WithMainLayout from './WithMainLayout';
import ArtistDetail from './components/ArtistDetail';
import Policy from './components/Policy'

const AuthNotFound = () => <MainLayout><NotFound/></MainLayout>;

const Routes = () => {
  console.log("Routes")
  return (
    <Switch>
      {authRoutes({wrapper: WithMainLayout, notFoundComponent: AuthNotFound})}
      <PrivateRoute exact path="/artists" layout={MainLayout} component={ArtistsList} />
      <WithMainLayout exact path="/policy" component={Policy} />
      <WithMainLayout exact path="/" component={Home} />
      <WithMainLayout exact path="/artists/:id"  component={ArtistDetail} />
      <WithMainLayout component={NotFound} />
    </Switch>
  );
};

export default Routes;
