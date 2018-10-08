import React, { Component } from 'react';
import { connect } from "react-redux";
import { withAuth } from 'react-devise';
import { ViewHeading } from '../shared';
import { initArtists } from '../app/actions/artists'
import { initMyReviews } from '../app/actions/reviews'

const Home = ({currentUser, auth: {AuthLinks}, initArtists, initReviews}) => {
  // console.log("--------- Home");          
  initArtists();
  initMyReviews();
  return (
    <div>
      <ViewHeading>Welcome to encore</ViewHeading>
      <AuthLinks />
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state.currentUser)
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
      initArtists : () => dispatch(initArtists()),
      initMyReviews : () => dispatch(initMyReviews())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Home));
