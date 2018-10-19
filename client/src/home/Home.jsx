import React from 'react';
import { connect } from "react-redux";
import { withAuth } from 'react-devise';
import { ViewContainer } from '../shared';
import { initLocales } from '../app/actions/locales'
import { initArtists } from '../app/actions/artists'
import { initUserReviews } from '../app/actions/reviews'

const Home = ({currentUser, locales, auth: {AuthLinks}, initLocales, initArtists, initMyReviews}) => {

  return (
    <div>
      <ViewContainer>
        <h1>{locales.locales.welcome}</h1>
        <AuthLinks />
      </ViewContainer>
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
