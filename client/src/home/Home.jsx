import React from 'react';
import { connect } from "react-redux";
import { withAuth } from 'react-devise';
// import { ViewContainer } from '../shared';
import { initLocales } from '../app/actions/locales'
import { initArtists } from '../app/actions/artists'
import { initUserReviews } from '../app/actions/reviews'
import Notifications from '../app/components/Notifications/notifications'
import AuthLinks from '../app/components/Devise/views/AuthLinks'
import RaisedButton from 'material-ui/RaisedButton';

const content = {
  color: "#ffffff",
  margin: "auto",
  width: '50%',
  padding: 10,
  textAlign: 'center',
}

const Home = ({currentUser, locales, auth: {AuthLinks}, initLocales, initArtists, initMyReviews}) => {

  console.log(currentUser)
  if(currentUser && currentUser.isLoggedIn){
    return (
      <div style={content}>
        <br/>Last Blog post: titre
        <br/>Top rated artists
        <br/>Top rated users
      </div>
    );
  }else{
    return (
      <div style={content}>
        <h1>Welcome</h1>
        <br/>
        <RaisedButton label="Partagez votre avis" />
        <br/>
        <br/>Features: Donne ton avis, Partage les temps forts, Découvre artistes et autres fans
      </div>
    );
  }


};

const mapStateToProps = state => {
  initLocales();
  // initArtists();
  // initUserReviews();
  return {
    currentUser: state.currentUser,
    locales: state.locales
  };
};

const mapDispatchToProps = dispatch => {

  return {
      initLocales: () => dispatch(initLocales()),
      // initArtists: () => dispatch(initArtists()),
      // initUserReviews: () => dispatch(initUserReviews())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Home));
