import React from 'react';
import {connect} from 'react-redux';
import {getConfig} from 'react-devise/lib/config/index';
import {withRouter} from 'react-router-dom';

const AuthLinksComponent = ({currentUser, locales, location, resourceName, AuthLinksList, AuthLinksListItem}) => {
  if (currentUser.isLoggingIn) {
    return <div></div>;
  }
  if (currentUser.isLoggedIn) {
    return null;
  }

  const {routes} = getConfig();
  const linkableRouteNames = Object.keys(routes).filter(routeName => Boolean(routes[routeName].linkText));

  return (
    <AuthLinksList>
      {linkableRouteNames.map(routeName => {
        const route = routes[routeName];
        const path = `/${resourceName}${route.path}`;
        return (
          <AuthLinksListItem
            key={path}
            path={path}
            route={route}
            location={location}
          />
        );
      })}
    </AuthLinksList>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    locales: state.locales
  };
};

const AuthLinks = withRouter(connect(mapStateToProps)(AuthLinksComponent));

export {
  AuthLinks as default,
  AuthLinksComponent
};