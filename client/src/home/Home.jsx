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
// import Camera from './icons/camera.png';
// import Face from './icons/face.png';
// import Star from './icons/star.png';

  const rootz = {
    flexGrow: 1,
  }

const boss = {
  userSelect: 'none',
  display:'table', 
  width:'100%',
  height: '65vh'
}

const content = {
  display: 'table-cell', 
  verticalAlign: 'middle', 
  color: "#ffffff",
  // verticalAlign: "middle",
  // margin: "0 auto",
  textAlign: 'left',
}

const iconStyle = {

}

const legend = {
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
              
              <Grid style={{textAlign: 'left', marginBottom: 10}} item xs={12} sm={12} md={12}>
                <h1 style={{fontFamily: 'Roboto' , fontWeight: 300}}>Bienvenue sur <span style={{fontWeight:700, fontFamily: 'Roboto', fontVariant: 'none'}}>encore!</span> la communauté qui partage ses expériences de concert et vous fait découvrir les meilleurs artistes sur scène.</h1>
              </Grid>
              {/*
              <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                <div>
                  <img style={{float: 'left', display: 'block', marginRight: '5px', marginTop: '-6px'}} src={Star} />
                  <span style={legend}> Donne et consulte des<br/> avis sur des shows</span>
                </div>
              </Grid>

              <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                <div>
                  <img style={{float: 'left', display: 'block', marginRight: '5px', marginTop: '-6px'}} src={Camera} />
                  <span style={legend}> Donne et consulte des<br/> avis sur des shows</span>
                </div>
              </Grid>

              <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                <div>
                  <img style={{float: 'left', display: 'block', marginRight: '5px', marginTop: '-6px'}} src={Face} />
                  <span style={legend}> Donne et consulte des<br/> avis sur des shows</span>
                </div>
              </Grid>
          */}
              <Grid style={{textAlign: 'left', marginTop: 10}} item xs={12} sm={12} md={12}>
                <Link to="/users/getstarted">
                  <RaisedButton label="Commencer"></RaisedButton>
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
