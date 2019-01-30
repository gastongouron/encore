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
import MessengerCustomerChat from 'react-messenger-customer-chat';

import styled, { keyframes } from 'styled-components'
import BackgroundImage from './images/header2.jpg'
import BackgroundImageFooter from './images/header.jpg'
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
import Bandeau from './images/bandeau.jpg'
import Prefooter from './images/footer.jpg'
import Face from './icons/user.png'
import Camera from './icons/camera.png'
import Stars from './icons/stars.png'


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
  fontFamily: 'Raleway',
  marginTop: 5,
  fontWeight: 300,
  textAlign: 'center',
  color: theme.palette.textColor,
}

const boldLegend = {
  fontFamily: 'Raleway',
  fontWeight: 500,
  textAlign: 'center',
  color: theme.palette.textColor,
}

const scoreLegend = {
  color: theme.palette.textColor,
  fontFamily: 'Raleway',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 300,
}

const artistLegend = {
  fontFamily: 'Raleway',
  fontWeight: 500,
  fontSize: 14,
  marginBottom: 0,
  textAlign: 'center',
  color: theme.palette.textColor,
}


const subLegend = {
  fontFamily: 'Raleway',
  fontWeight: 300,
  fontSize: 10,
  fontVariant: 'uppercase',
  textAlign: 'center',
  color: theme.palette.textColor,
}

const hello = {
  maxWidth: 500,
  fontFamily: 'Raleway',
  fontWeight: 100,
}

const encore = {
  color: 'white',
  fontWeight:700, 
  fontFamily: 'Raleway',
  fontVariant: 'none'
}

const hashtag = {
  color: 'white' ,
  fontFamily: 'Raleway',
  fontVariant: 'uppercase',
  fontWeight: 900,
  letterSpacing: 3,
  marginBottom: 0,
}

const baseline = {
  color: 'white',
  marginTop: 0,
  paddingTop: 0,
  paddingBottom: 20,
  fontFamily: 'Raleway',
  fontWeight: 300,
}

const baseline2 = {
  color: 'white',
  marginTop: 0,
  paddingTop: 5,
  paddingBottom: 30,
  fontFamily: 'Raleway',
  fontWeight: 300,
  // textAlign: "center",
  // align: "center",
  // margin: "0 auto",
  maxWidth: 300,
}

const header = {
  color: theme.palette.secondaryTextColor,
  marginTop: -70,
  paddingTop: 160,
  paddingBottom: 150,
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
  background: "url("+Prefooter+") no-repeat center fixed",
  backgroundSize: "cover",
  objectFit: 'cover',
  backgroundSize: 'cover',
  minheight: '600px',
}

const headerBlock = {maxWidth: 840, margin: '0 auto', textAlign: 'left', marginBottom: 20, padding: 20}

const prefooterBlock = {color: "white", maxWidth: 840, margin: '0 auto', textAlign: 'left', marginBottom: 20, padding: 20, textAlign: "center"}

const features = {
  paddingTop: 40,
  paddingBottom: 60,
  background: "white"
}

const featuresBlock = {maxWidth: 840, margin: '0 auto', padding: 20, paddingBottom: 5}
const artistsBlock = {maxWidth: 840, margin: '0 auto', padding: 20, paddingBottom: 40}

const featureItem = {height: 80, marginRight: '0px'}
const featureItem2 = {marginTop: 50, height: 30, marginRight: '0px'}

const artistImage = {borderRadius: '50%', maxWidth: 95}
const artistImageLoggedIn = {borderRadius: '50%', maxWidth: 80}
const artistsBlockLoggedIn = {maxWidth: 840, margin: '0 auto', paddingBottom: 10, paddingTop: 0}

const block2 = {
  padding: 20,
  paddingTop: 50,
  paddingBottom: 50,
  fontSize: "2em",
  color: "white",
  fontWeight: "200",
  fontFamily: 'Raleway',
  lineHeight: "1.4em",
  // maxWidth: 840, 
  margin: '0 auto',
  backgroundImage: "url(" + Bandeau + ")",
      objectFit: 'cover',
    backgroundSize: 'cover',
  backgroundPosition: 'top', /* Position the image to the top center of the div */
}

const block3 = {
  padding: 20,
  paddingTop: 50,
  paddingBottom: 50,
  fontSize: "2em",
  color: theme.palette.textColor,
  fontWeight: "200",
  fontFamily: 'Raleway',
  lineHeight: "1.4em",
  // maxWidth: 840, 
  margin: '0 auto',
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
              console.log(res.data)
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
          <div style={{paddingTop: 10, maxWidth: 840, margin: '0 auto'}}>
            {/* <Artists /> */}   
            <div style={{padding:10}}>
              <h1 style={{marginTop: 20, fontWeight: "100", fontFamilly: "Raleway"}}>{this.state.searchTerm !== "" ? this.state.searchTerm : this.props.locales.locales.contributor}</h1>
              <SearchBar 
                  onRef={ref => (this.child = ref)} 
                  onSearchTermChange={this.userSearch}
              />
            

              <Grid style={{paddingLeft: 10, paddingRight: 10}} alignItems="flex-end" container style={artistsBlockLoggedIn}>
                {this.state.users.length > 0 ? 
                 this.props.users.users.map((user, index) => (
                    <Grid key={index} item xs={6} sm={4} md={3} lg={3}>

          <ListItem key={user.id} innerDivStyle={{ textDecoration: 'none', padding: 0, margin: 0}}>
            <Link to={'/user/'+ user.id}  style={{ textDecoration: 'none' }}>
              <Paper zDepth={0} rounded={false}>

              <ListItem 
                  primaryText={<div style={{fontSize: 12, paddingLeft: 8, paddingBottom: 0}}><b>{user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1) + " " + user.first_name.charAt(0) + "."}</b></div>}
                  secondaryText={<div style={{fontSize: 12, paddingLeft: 8, paddingBottom: 38, lineHeight: 1.4}}>{user.reviews.length} {user.reviews.length > 1 ? this.props.locales.locales.reviewsLabel : this.props.locales.locales.reviewLabel}<br/>{user.followers.length} {user.followers.length > 1 ? this.props.locales.locales.followers : this.props.locales.locales.follower}</div>}
                  leftAvatar={
                     <Avatar style={{marginRight: 10}} size={58} src={user.profile_picture} />
                  }/>
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
              <h1 style={{paddingTop: 10, marginTop: 0, fontWeight: "100", fontFamilly: "Raleway"}}>{this.props.locales.locales.artistsHome}</h1>
              </div>
                <Grid container style={artistsBlockLoggedIn}>
                   {this.props.artists.artists.map((artist, index) => (
                      <Grid key={index} item xs={4} sm={2} md={2} lg={2}>
                        <div style={{textAlign: "center", color: "black", padding: 10}}>
                        <Link to={'/artists/'+artist.id}>
                          <img style={artistImageLoggedIn} src={artist.cover_url} /><br/>
                        </Link>
                        <span style={artistLegend}>{artist.name}</span><br/>
                        <Star color={theme.palette.starColor} viewBox="-5 -10 30 30"/>
                        <span style={scoreLegend}>{artist.score}</span><br/>
                        </div>
                      </Grid>
                    ))}
                </Grid>
              </div>
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
                <Link to="/users/getstarted" style={{float: "left", paddingTop: 40}}>
                  <RaisedButton primary={true} label={this.props.locales.locales.getStarted}></RaisedButton>
                </Link>
              </Grid>
            </Grid>
            <div style={features}>              
              <Grid container style={featuresBlock}>

                <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                  <div style={{paddingTop: 10, textAlign: "center"}}>
                    <img style={featureItem2} src={Stars}/><br/>
                    <h4 style={legend}> <span style={boldLegend}>{this.props.locales.locales.feature1Bold}</span>{this.props.locales.locales.feature1Light1}<br/>{this.props.locales.locales.feature1Light2}<br/>{this.props.locales.locales.feature1Light3}</h4>

                  </div>
                </Grid>

                <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                  <div style={{paddingTop: 10, textAlign: "center"}}>
                    <img style={featureItem} src={Camera}/><br/>
                    <h4 style={legend}> <span style={boldLegend}>{this.props.locales.locales.feature2Bold1}<br/>{this.props.locales.locales.feature2Bold2}</span>{this.props.locales.locales.feature2Light1}<br/>{this.props.locales.locales.feature2Light2}</h4>
                  </div>
                </Grid>

                <Grid style={{paddingTop: 20}} item xs={12} sm={4} md={4}>
                  <div style={{paddingTop: 10, textAlign: "center"}}>
                    <img style={featureItem} src={Face}/><br/>
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
                    <Grid key={index} item xs={4} sm={2} md={2} lg={2}>
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
                <h1 style={{fontFamily: 'Raleway', fontSize: 50, fontWeight: 800}}>Ready to share the vibe?</h1>
                <Link to="/users/getstarted" style={{float: "center"}}>
                  <RaisedButton default={true} label={this.props.locales.locales.getStarted}></RaisedButton>
                </Link>
              </Grid>
            </Grid>

            <Grid container style={block3}>     
              <Grid item style={{textAlign: 'center', margin: '0 auto'}}>
                <h1><b>encore!</b></h1>
                <h3 style={hello}>{this.props.locales.locales.lorem}</h3>
                <h3 style={hello}><b>{this.props.locales.locales.lorem2}</b></h3>
              </Grid>
            </Grid>

        <MessengerCustomerChat
            minimized={true}
            pageId="2079915298988137"
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