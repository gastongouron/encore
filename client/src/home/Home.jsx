import React from 'react';
import { connect } from "react-redux";
import { withAuth } from 'react-devise';
// import { ViewContainer } from '../shared';
import { initLocales } from '../app/actions/locales'
import { initArtists } from '../app/actions/artists'
import { initUserReviews } from '../app/actions/reviews'
import Notifications from '../app/components/Notifications/notifications'
import AuthLinks from '../app/components/Devise/views/AuthLinks'

const Home = ({currentUser, locales, auth: {AuthLinks}, initLocales, initArtists, initMyReviews}) => {

  return (
    <div>
      <br/>Home text component
      <br/>Manual authlinks: login / signup / forgotten password?
      <br/>Features: Donne ton avis, Partage les temps forts, Découvre artistes et autres fans
      <br/>Top ranked artists
      <br/>Last reviews
      <br/>Last Blog post: titre
    </div>
  );
};

const mapStateToProps = state => {
  initLocales();
  initArtists();
  initUserReviews();
  return {
    currentUser: state.currentUser,
    locales: state.locales
  };
};

const mapDispatchToProps = dispatch => {

  return {
      initLocales: () => dispatch(initLocales()),
      initArtists: () => dispatch(initArtists()),
      initUserReviews: () => dispatch(initUserReviews())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Home));
