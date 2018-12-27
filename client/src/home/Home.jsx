import React, { Component } from 'react';
import { connect } from "react-redux";
// import { withAuth } from 'react-devise';
import { withApollo } from 'react-apollo';
// import { ViewContainer } from '../shared';
import { initLocales } from '../app/actions/locales'
import { initArtists, setArtists, failedArtists, loadingArtists } from '../app/actions/artists'
// import { initUserReviews } from '../app/actions/reviews'
import Notifications from '../app/components/Notifications/notifications'
import AuthLinks from '../app/components/Devise/views/AuthLinks'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom' 
// import Slide from 'react-reveal/Slide';
import Grid from '@material-ui/core/Grid'
// import FaceIcon from 'material-ui/svg-icons/action/face';
// import StarRate from 'material-ui/svg-icons/toggle/star';
import Camera from './icons/camerazzz.png';
import Face from './icons/facezz.png';
import Star from './icons/starzz.png';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import styled, { keyframes } from 'styled-components'
import BackgroundImage from './images/header.jpg'
// import BackgroundImage2 from './images/prefooter.jpg'
import theme from '../app/theme'
import artistHomeQuery from '../app/queries/ArtistHomeQuery'

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
  fontFamily: 'Roboto',
  marginTop: 0,
  fontWeight: 300,
  textAlign: 'center',
  color: theme.palette.textColor,
}

const boldLegend = {
  fontFamily: 'Roboto',
  fontWeight: 500,
  textAlign: 'center',
  color: theme.palette.primary1Color,
}


const hello = {
  fontFamily: 'Roboto',
  fontWeight: 100,
}

const encore = {
  fontWeight:700, 
  fontFamily: 'Roboto',
  fontVariant: 'none'
}

const hashtag = {
  fontFamily: 'Roboto',
  fontVariant: 'uppercase',
  fontWeight: 900,
  letterSpacing: 3,
  marginBottom: 10
}

const baseline = {
  marginTop: 0,
  paddingTop: 0,
  fontFamily: 'Roboto',
  fontWeight: 300,
}

const header = {
  marginTop: -70,
  paddingTop: 120,
  paddingBottom: 130,
  background: "url("+BackgroundImage+") no-repeat center fixed",
  backgroundSize: "cover",
  objectFit: 'cover',
  backgroundSize: 'cover',
  minheight: '600px',
}

const prefooter = {
  marginTop: -70,
  paddingTop: 100,
  paddingBottom: 100,
  background: "url("+BackgroundImage+") no-repeat center fixed",
  backgroundSize: "cover",
  objectFit: 'cover',
  backgroundSize: 'cover',
  minheight: '600px',
}

const headerBlock = {maxWidth: 840, margin: '0 auto', textAlign: 'left', marginBottom: 20, padding: 20}

const prefooterBlock = {maxWidth: 840, margin: '0 auto', textAlign: 'left', marginBottom: 20, padding: 20, textAlign: "center"}

const features = {
  paddingTop: 40,
  paddingBottom: 60,
  background: "white"
}

const featuresBlock = {maxWidth: 840, margin: '0 auto', padding: 20}

const featureItem = {marginRight: '0px'}

const artistImage = {padding: '20px', borderRadius: '50%', maxWidth: 105}

const block2 = {
  padding: 40,
  paddingTop: 50,
  paddingBottom: 50,
  fontSize: "2em",
  color: "white",
  fontWeight: "200",
  fontFamily: 'Roboto',
  lineHeight: "1.4em",
  maxWidth: 840, 
  margin: '0 auto'
}

class Home extends Component {

  constructor(props){
    super(props);
      this.state = {
          artists: this.props.artists.artistsHome
        }
  }

  componentWillMount(){
      this.props.initArtists();
      this.props.loadingArtists();
      this.props.client.query({query: artistHomeQuery, fetchPolicy: 'network-only'}).then(
          (res) => {
              this.props.setArtists(res.data.artistsHome)
              this.setState({artists: res.data.artistsHome})
            },
          (err) => {
              this.props.failedArtists(err.data);
          }
      );
  }


  render () {
    console.log(this.props)
    if(this.props.currentUser && this.props.currentUser.isLoggedIn){
        return (
          <div>
            user search
            <br/>Last Blog post: titre
            <br/>Top rated artists
            <br/>Top rated users
          </div>
        );
      } else {
    return (
      <div style={rootz}>

            <Grid container style={header}>              
              <Grid style={headerBlock} item xs={12} sm={12} md={12}>
                <h1 style={hashtag}>🤟#SHARETHEVIBE</h1>
                <h2 style={baseline}>every show should end with an <b>encore!</b></h2>
                <h3 style={baseline}>{this.props.locales.locales.homeHello}<br/> {this.props.locales.locales.homeHello}</h3>
                <Link to="/users/getstarted" style={{float: "left", paddingTop: 15}}>
                  <RaisedButton primary={true} label={this.props.locales.locales.getStarted}></RaisedButton>
                </Link>
              </Grid>
            </Grid>
            <div style={features}>              
              <Grid container style={featuresBlock}>
                <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                  <div style={{textAlign: "center"}}>
                    <img style={featureItem} src={Star} /><br/>

                    <h4 style={legend}> <span style={boldLegend}>Donne et consulte</span> des avis<br/> sur des shows du moment <br/>et les artistes à découvrir</h4>

                  </div>
                </Grid>

                <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                  <div style={{textAlign: "center"}}>
                    <img style={featureItem} src={Camera} /><br/>
                    <h4 style={legend}> <span style={boldLegend}>Partage les temps forts du<br/> concert en images</span> avec les plus <br/>belles photos et vidéos</h4>
                  </div>
                </Grid>

                <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                  <div style={{textAlign: "center"}}>
                    <img style={featureItem} src={Face}/><br/>
                    <h4 style={legend}> <span style={boldLegend}>Découvre des artistes</span><br/> grâce aux contenus de la <br/>communauté</h4>
                  </div>
                </Grid>
              </Grid>
            </div>

            <Grid container style={block2}>     
              <Grid item style={{textAlign: 'center', margin: '0 auto'}}>
                <h1><b>encore!</b></h1>
                <h3 style={hello}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</h3>
                <h2><b>Some meaningfull text</b></h2>
              </Grid>
            </Grid>

            <div style={features}>              
              <Grid container style={featuresBlock}>
                <Grid style={{textAlign: 'center', color: theme.palette.textColor}} item xs={12} sm={12} md={12}>
                  <h2>Découvrez les meilleurs artistes du moment recommandés par la communauté encore</h2>
                </Grid>
                 {this.props.artists.artists.map((artist, index) => (
                    <Grid key={index} style={{paddingTop: 20}} item xs={6} sm={4} md={3} lg={2}>
                      <div style={{textAlign: "center", color: "black", padding: 20}}>
                        <img style={artistImage} src={artist.cover_url} /><br/>
                        <h4 style={legend}>{artist.name}</h4>
                        <span style={legend}>{artist.score}</span><br/>
                        <span style={legend}>{artist.tags.split(',').shift()}</span>
                      </div>
                    </Grid>
                  ))}
              </Grid>
            </div>

            <Grid container style={prefooter}>              
              <Grid style={prefooterBlock} item xs={12} sm={12} md={12}>
                <h1 style={{fontSize: 60, fontWeight: 900}}>Ready to share the vibe?</h1>
                <Link to="/users/getstarted" style={{float: "center"}}>
                  <RaisedButton secondary={true} label={this.props.locales.locales.getStarted}></RaisedButton>
                </Link>
              </Grid>
            </Grid>

        <MessengerCustomerChat
            pageId="826064754401701"
            appId="1351728908291385"
            language={this.props.locales.locales._language === 'en' ? "en_US" : "fr_FR"}
          />

      </div>

      )
    }
  }
}


const mapStateToProps = state => { 
  return {
    artists: state.artists,
    currentUser: state.currentUser,
    locales: state.locales
  };
};

const mapDispatchToProps = dispatch => {

  return {
      initLocales: () => dispatch(initLocales()),
      initArtists: () => dispatch(initArtists()),
      loadingArtists: () => dispatch(loadingArtists()),
      setArtists: (artists) => dispatch(setArtists(artists)),
      failedArtists: (message) => dispatch(failedArtists(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(Home));