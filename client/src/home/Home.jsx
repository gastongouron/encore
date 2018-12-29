import React, { Component } from 'react';
import { connect } from "react-redux";
import { withApollo } from 'react-apollo';
import { initLocales } from '../app/actions/locales'
import { initArtists, setArtists, failedArtists, loadingArtists } from '../app/actions/artists'
import { initUsers, setUsers, failedUsers, loadingUsers } from '../app/actions/users'
// import { initUserReviews } from '../app/actions/reviews'
import Notifications from '../app/components/Notifications/notifications'
import AuthLinks from '../app/components/Devise/views/AuthLinks'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom' 
import Grid from '@material-ui/core/Grid'
import Star from 'material-ui/svg-icons/toggle/star';
// import MessengerCustomerChat from 'react-messenger-customer-chat';

import styled, { keyframes } from 'styled-components'
import BackgroundImage from './images/header.jpg'
// import BackgroundImage2 from './images/prefooter.jpg'
import Divider from 'material-ui/Divider';
import theme from '../app/theme'
import artistHomeQuery from '../app/queries/ArtistHomeQuery'
import usersHomeQuery from '../app/queries/UsersHomeQuery'
import userSearchQuery from '../app/queries/UserSearch'
import { SocialIcon } from 'react-social-icons';
import SearchBar from './UserSearchBar'
import Paper from 'material-ui/Paper'
// import Artists from '../app/components/Artist/Artists'
import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import EncoreLoader from '../app/components/EncoreLoader'

const StyledSocialIcon = styled(SocialIcon)`
   background: #ececec;
   border-radius: 50%;
   &:hover {
    background: white;
   }
`;

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
  marginTop: 5,
  fontWeight: 300,
  textAlign: 'center',
  color: theme.palette.textColor,
}

const boldLegend = {
  fontFamily: 'Roboto',
  fontWeight: 500,
  textAlign: 'center',
  color: theme.palette.textColor,
}

const scoreLegend = {
  color: theme.palette.textColor,
  fontFamily: 'Roboto',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 300,
}

const artistLegend = {
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: 14,
  textAlign: 'center',
  color: theme.palette.textColor,
}


const subLegend = {
  fontFamily: 'Roboto',
  fontWeight: 300,
  fontSize: 10,
  fontVariant: 'uppercase',
  textAlign: 'center',
  color: theme.palette.textColor,
}

const hello = {
  maxWidth: 500,
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
  marginBottom: 0,
}

const baseline = {
  marginTop: 0,
  paddingTop: 0,
  paddingBottom: 20,
  fontFamily: 'Roboto',
  fontWeight: 300,
}

const baseline2 = {
  marginTop: 0,
  paddingTop: 5,
  paddingBottom: 30,
  fontFamily: 'Roboto',
  fontWeight: 300,
  textAlign: "center",
  align: "center",
  margin: "0 auto",
  maxWidth: 300,
}

const header = {
  color: theme.palette.secondaryTextColor,
  marginTop: -70,
  paddingTop: 120,
  paddingBottom: 50,
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

const headerBlock = {maxWidth: 840, margin: '0 auto', textAlign: 'center', marginBottom: 20, padding: 20}

const prefooterBlock = {maxWidth: 840, margin: '0 auto', textAlign: 'left', marginBottom: 20, padding: 20, textAlign: "center"}

const features = {
  paddingTop: 40,
  paddingBottom: 60,
  background: "white"
}

const featuresBlock = {maxWidth: 840, margin: '0 auto', padding: 20, paddingBottom: 5}
const artistsBlock = {maxWidth: 840, margin: '0 auto', padding: 20, paddingBottom: 40}

const featureItem = {marginRight: '0px'}

const artistImage = {borderRadius: '50%', maxWidth: 105}
const artistImageLoggedIn = {borderRadius: '50%', maxWidth: 50, marginRight: 10}
const artistsBlockLoggedIn = {maxWidth: 840, margin: '0 auto', paddingBottom: 10, paddingTop: 0}

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
          artists: this.props.artists,
          users: this.props.users,
          searchTerm: "",
        }
        this.userSearch = this.userSearch.bind(this);
  }

  componentWillMount(){
      this.props.initArtists();
      this.props.initUsers();
      this.props.loadingArtists();
      this.props.loadingUsers();

      this.props.client.query({query: artistHomeQuery, fetchPolicy: 'network-only'}).then(
          (res) => {
              this.props.setArtists(res.data.artistsHome)
              this.setState({artists: res.data.artistsHome})
            },
          (err) => {
              this.props.failedArtists(err.data);
          }
      );

      this.props.client.query({query: userSearchQuery, fetchPolicy: 'network-only', variables: {first:100}}).then(
          (res) => {
              this.props.setUsers(res.data.allUsers)
              this.setState({users: res.data.allUsers})
            },
          (err) => {
              this.props.failedUsers(err.data);
          }
      );      
  }

    userSearch(term) {
        this.setState({searchTerm: term.toLowerCase()})
        this.props.client.query({query: userSearchQuery, fetchPolicy: 'network-only', variables: {input: term.toLowerCase() }}).then(
            (res) => {
                this.props.setUsers(res.data.allUsers)
                this.setState({users: res.data.allUsers})
            },
            (err) => {
                this.props.failedUsers(err.data);
            }
        )
    }

  render () {
    if(this.props.currentUser && this.props.currentUser.isLoggedIn){
        return (
          this.props.artists.loading ? <EncoreLoader /> : this.props.artists.error ? <h1>Error...</h1> : 
          <div style={{paddingTop: 10}}>
            {/* <Artists /> */}   
            <div style={{padding:10}}>
              <SearchBar 
                  onRef={ref => (this.child = ref)} 
                  onSearchTermChange={this.userSearch}
              />
            <h1 style={{marginTop: 0, fontWeight: "100", fontFamilly: "Roboto"}}>{this.state.searchTerm !== "" ? this.state.searchTerm : this.props.locales.locales.contributor}</h1>
            </div>

              <Grid alignItems="flex-end" container style={artistsBlockLoggedIn}>
                {this.state.users.length > 0 ? 
                 this.props.users.users.map((user, index) => (
                    <Grid style={{padding: 10}} key={index} item xs={12} sm={6} md={4} lg={3}>

          <ListItem key={user.id} innerDivStyle={{ textDecoration: 'none', padding: 0, margin: 0}}>
            <Link to={'/user/'+ user.id}  style={{ textDecoration: 'none' }}>
                      <Paper zDepth={1} rounded={true}>

              <ListItem
                  primaryText={user.last_name}
                  secondaryText={user.first_name}
                  leftAvatar={<Avatar src={user.profile_picture} />}/>
                       </Paper>

                 </Link>
               </ListItem>
 
                    </Grid>
                  ))
                  :
                    <div style={{textAlign: "center", margin: "0 auto", paddingTop:10}}>
                    <h2 >{this.props.locales.locales.sorry}</h2>
                    </div>
                }
              </Grid>
            <div style={{padding:10}}>
              <Divider />
              <h1 style={{paddingTop: 10, marginTop: 0, fontWeight: "100", fontFamilly: "Roboto"}}>{this.props.locales.locales.artistsHome}</h1>
              </div>
                <Grid container style={artistsBlockLoggedIn}>
                   {this.props.artists.artists.map((artist, index) => (
                      <Grid key={index} item xs={3} sm={2} md={1} lg={1}>
                        <div style={{textAlign: "center", color: "black", padding: 10}}>
                        <Link to={'/artists/'+artist.id}>
                          <img style={artistImageLoggedIn} src={artist.cover_url} /><br/>
                        </Link>
                        </div>
                      </Grid>
                    ))}
                </Grid>

          </div>
        );





      } else {
    return (
      <div style={rootz}>

            <Grid container style={header}>              
              <Grid style={headerBlock} item xs={12} sm={12} md={12}>
                <h1 style={hashtag}><b>#SHARETHEVIBE</b></h1>
                <h3 style={baseline}>{this.props.locales.locales.baseline} <b>encore!</b></h3>
                <h4 style={baseline2}>{this.props.locales.locales.homeHello}</h4>
                <Link to="/users/getstarted" style={{float: "center", paddingTop: 40}}>
                  <RaisedButton primary={true} label={this.props.locales.locales.getStarted}></RaisedButton>
                </Link>
                <br/>
                <div style={{paddingTop: 40}}>
                  <StyledSocialIcon color="black" style={{background:"white", marginRight: 20, height: 28, width: 28}} network="instagram" url="https://www.instagram.com/encoreapp.co" />
                  <StyledSocialIcon color="black" style={{background:"white", height: 28, width: 28}} network="facebook" url="https://www.facebook.com/Encore-2079915298988137/" />
                </div>
              </Grid>
            </Grid>
            <div style={features}>              
              <Grid container style={featuresBlock}>

                <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                  <div style={{paddingTop: 10, textAlign: "center"}}>
                    <span style={{fontSize: "40px"}}>⭐</span>
                    <h4 style={legend}> <span style={boldLegend}>{this.props.locales.locales.feature1Bold}</span>{this.props.locales.locales.feature1Light1}<br/>{this.props.locales.locales.feature1Light2}<br/>{this.props.locales.locales.feature1Light3}</h4>

                  </div>
                </Grid>

                <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                  <div style={{paddingTop: 10, textAlign: "center"}}>
                    <span style={{fontSize: "40px"}}>📸</span>
                    <h4 style={legend}> <span style={boldLegend}>{this.props.locales.locales.feature2Bold1}<br/>{this.props.locales.locales.feature2Bold2}</span>{this.props.locales.locales.feature2Light1}<br/>{this.props.locales.locales.feature2Light2}</h4>
                  </div>
                </Grid>

                <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                  <div style={{paddingTop: 10, textAlign: "center"}}>
                    {/* <img style={featureItem} src={Face}/><br/> */}
                    <span style={{fontSize: "40px"}}>🤩</span>
                    <h4 style={legend}> <span style={boldLegend}>{this.props.locales.locales.feature3Bold}</span><br/>{this.props.locales.locales.feature3Light1}<br/>{this.props.locales.locales.feature3Light2}</h4>
                  </div>
                </Grid>
              </Grid>
            </div>

            <Grid container style={block2}>     
              <Grid item style={{textAlign: 'center', margin: '0 auto'}}>
                <h1><b>encore!</b></h1>
                <h3 style={hello}>{this.props.locales.locales.lorem}</h3>
                <h3 style={hello}><b>{this.props.locales.locales.lorem2}</b></h3>
              </Grid>
            </Grid>

            <div style={features}>              
              <Grid container style={featuresBlock}>
                <Grid style={{textAlign: 'center', color: theme.palette.textColor}} item xs={12} sm={12} md={12}>
                  <h3>{this.props.locales.locales.community}</h3>
                </Grid>
              </Grid>
              <Grid container style={artistsBlock}>
                 {this.props.artists.artists.map((artist, index) => (
                    <Grid key={index} item xs={6} sm={4} md={3} lg={3}>
                      <div style={{textAlign: "center", color: "black", padding: 10}}>
                        <img style={artistImage} src={artist.cover_url} /><br/>
                        <span style={artistLegend}>{artist.name}</span><br/>
                        <span style={subLegend}>{artist.tags.split(',').shift().toUpperCase()}</span><br/>
                        <Star color={theme.palette.starColor} viewBox="-5 -10 30 30"/>
                        <span style={scoreLegend}>{artist.score}</span><br/>
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
{/*        <MessengerCustomerChat
            minimized={true}
            pageId="2079915298988137"
            appId="1351728908291385"
            language={this.props.locales.locales._language === 'en' ? "en_US" : "fr_FR"}
          /> */}
      </div>

      )
    }
  }
}


const mapStateToProps = state => { 
  return {
    users: state.users,
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
      failedArtists: (message) => dispatch(failedArtists(message)),
      initUsers: () => dispatch(initUsers()),
      loadingUsers: () => dispatch(loadingUsers()),
      setUsers: (users) => dispatch(setUsers(users)),
      failedUsers: (message) => dispatch(failedUsers(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(Home));