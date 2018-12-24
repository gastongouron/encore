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
// import FaceIcon from 'material-ui/svg-icons/action/face';
// import StarRate from 'material-ui/svg-icons/toggle/star';
import Camera from './icons/camera.png';
import Face from './icons/face.png';
import Star from './icons/star.png';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import styled, { keyframes } from 'styled-components'
import BackgroundImage from './images/header.jpg'
import theme from '../app/theme'

  const rootz = {
    flexGrow: 1,
  }

const boss = {
  userSelect: 'none',
  display:'table', 
  width:'100%',
  // height: '65vh'
}

const iconStyle = {

}

const legend = {
  textAlign: 'left',
  color: theme.palette.textColor,
}

const hello = {
  fontFamily: 'Roboto', 
  fontWeight: 300,
}

const encore = {
  fontWeight:700, 
  fontFamily: 'Roboto',
  fontVariant: 'none'
}

const hashtag = {
  fontVariant: "uppercase",
  fontSize: '3em',
}

const baseline = {
  fontSize: '2em'
}

const header = {
  marginTop: -70,
  paddingTop: 140,
  background: "url("+BackgroundImage+") no-repeat center fixed",
  backgroundSize: "cover",
  objectFit: 'cover',
  backgroundSize: 'cover',
  height: 500,
}

const block = {
  paddingTop: 100,
  paddingBottom: 110,
  background: "white"
}

const block2 = {
  paddingTop: 50,
  paddingBottom: 50,
  color: "white",
  fontWeight: "200",
  fontFamily: 'Roboto',
  lineHeight: "1.4em",
  fontSize: "1.8em",
  maxWidth: 840, 
  margin: '0 auto'
}

const Home = ({currentUser, locales, auth: {AuthLinks}, initLocales}) => {

  if(currentUser && currentUser.isLoggedIn){
    return (
      <div>
        <br/>Last Blog post: titre
        <br/>Top rated artists
        <br/>Top rated users
      </div>
    );
  }else{
    return (  
          <div style={rootz}>
            <Grid container style={header}>              
              <Grid style={{maxWidth: 840, margin: '0 auto', textAlign: 'left', marginBottom: 10}} item xs={12} sm={12} md={12}>
                <h1 style={hashtag}>#Hashtag</h1>
                <h1 style={baseline}>baseline</h1>
                <h1 style={hello}>{locales.locales.homeHello}</h1>
                <Link to="/users/getstarted">
                  <RaisedButton label={locales.locales.getStarted}></RaisedButton>
                </Link>

              </Grid>
            </Grid>

            <div style={block}>              
              <Grid container style={{maxWidth: 840, margin: '0 auto'}}>

              <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                <div>
                  <img style={{float: 'left', display: 'block', marginRight: '5px', marginTop: '-6px'}} src={Star} />
                  <span style={legend}> Donne et consulte des<br/> avis sur des shows</span>
                </div>
              </Grid>

              <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                <div>
                  <img style={{color: "black", float: 'left', display: 'block', marginRight: '5px', marginTop: '-6px'}} src={Camera} />
                  <span style={legend}> Donne et consulte des<br/> avis sur des shows</span>
                </div>
              </Grid>

              <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                <div>
                  <img style={{color: "black", float: 'left', display: 'block', marginRight: '5px', marginTop: '-6px'}} src={Face} />
                  <span style={legend}> Donne et consulte des<br/> avis sur des shows</span>
                </div>
              </Grid>
              </Grid>
            </div>

            <Grid container style={block2}>     
              <Grid item style={{textAlign: 'center', margin: '0 auto'}}>
                <span>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</span>
              </Grid>
            </Grid>

        
        <MessengerCustomerChat
            pageId="826064754401701"
            appId="1351728908291385"
            language={locales.locales._language === 'en' ? "en_US" : "fr_FR"}
          />

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
