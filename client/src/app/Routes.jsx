import React        from 'react';
import {Switch}     from 'react-router-dom';
import MainLayout   from '../layouts/MainLayout';
import Hot          from '../home/Hot';
import Home         from '../home/Home';
import NotFound     from '../app/NotFound';
import Artists      from './components/Artist/Artists';
import {authRoutes, PrivateRoute} from 'react-devise';
import WithMainLayout from './WithMainLayout';
import Artist from  './components/Artist/Artist';
import Posts from   './components/Blog/Posts'
import Post from    './components/Blog/Post'
import Policy       from '../app/PrivatePolicy';
import Profile      from './components/Profile/UserProfile';

// todo add home component...

const AuthNotFound = () => <MainLayout><NotFound/></MainLayout>;

const Routes = () => {
  return (

    <Switch>
      {authRoutes({wrapper: WithMainLayout, notFoundComponent: AuthNotFound})}

      <WithMainLayout exact path="/policy"      component={Policy} />
      <WithMainLayout exact path="/"            component={Home} />      
      <WithMainLayout exact path="/artists/:id" component={Artist} />
      <WithMainLayout exact path="/fanzine/posts"       component={Posts} />
      <WithMainLayout exact path="/fanzine/posts/:id"   component={Post} />

      <PrivateRoute   exact path="/hot"         layout={MainLayout} component={Hot} />
      <PrivateRoute   exact path="/artists"     layout={MainLayout} component={Artists} />
      <PrivateRoute   exact path="/user/:id"    layout={MainLayout} component={Profile} />

      <WithMainLayout component={NotFound} />

    </Switch>
  );
};

export default Routes;
