import React from 'react';
import { connect } from "react-redux";
import { withAuth } from 'react-devise';
import { ViewHeading } from '../shared';
import { initArtists } from '../app/actions/artists'
import { initUserReviews } from '../app/actions/reviews'

const Home = ({currentUser, auth: {AuthLinks}, initArtists, initMyReviews}) => {
  
  return (
    <div>
      <ViewHeading>Welcome!</ViewHeading>
      <AuthLinks />
    </div>
  );
};

const mapStateToProps = state => {
  initArtists();
  initUserReviews();
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
      initArtists: () => dispatch(initArtists()),
      initUserReviews: () => dispatch(initUserReviews())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Home));
