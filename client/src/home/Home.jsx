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
import {Link} from 'react-router-dom' 
// import Slide from 'react-reveal/Slide';
import Grid from '@material-ui/core/Grid'

  const rootz = {
    flexGrow: 1,
  }

const boss = {
  userSelect: 'none',
  display:'table', 
  width:'100%',
  height: '75vh'
}

const content = {
  display: 'table-cell', 
  verticalAlign: 'middle', 
  color: "#ffffff",
  // verticalAlign: "middle",
  // margin: "0 auto",
  padding: 10,
  textAlign: 'left',
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

      <div style={boss}>      
        <div style={content}>
          <div style={rootz}>
            <Grid container>
       
                <Grid item xs={12} sm={12} md={12}>
                    <h1><span>Bienvenue sur encore: la communauté qui partage ses expériences de concert et vous fait découvrir les meilleurs artistes sur scène.</span></h1>
                      <div>Donne et consulte des avis sur des shows</div>
                      <div>Partage les temps forts du concert en images</div>
                      <div>Découvre des artistes avec les contenus de la communauté</div>
                    <br/>
                    <Link to="/users/getstarted">
                      <RaisedButton label="C'est parti"></RaisedButton>
                    </Link>
                 </Grid>
              </Grid>
            </div>
          </div>
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
