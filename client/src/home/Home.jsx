import React from 'react';
import { connect } from "react-redux";
import { withAuth } from 'react-devise';
import { ViewContainer } from '../shared';
import { initArtists } from '../app/actions/artists'
import { initUserReviews } from '../app/actions/reviews'

const Home = ({currentUser, auth: {AuthLinks}, initArtists, initMyReviews}) => {
  
  return (
    <div>
      <ViewContainer>
        <h1>Welcome!</h1>
        <AuthLinks />
      </ViewContainer>
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
