 import { withApollo } from 'react-apollo'
import React, {Component} from 'react';
import {AppBar, Toolbar, ToolbarGroup, Menu, MenuItem, Popover} from 'material-ui';
import {connect} from 'react-redux';
import {logout} from '../app/components/Devise/views/Actions';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {Notice} from '../shared';
import Drawer from 'material-ui/Drawer';
import strings from '../app/locales/strings'
import { setLocales } from '../app/actions/locales'
import { initDevise } from '../app/devisesetup'
import { StyledFooter } from '../shared'
import updateUserMutation from '../app/mutations/updateUser'
import Badge from 'material-ui/Badge';
// import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
// import IconButton from 'material-ui/IconButton'
import notificationsSubscription from '../app/subscriptions/notificationsSubscription'
import UserNotificationsQuery from '../app/queries/UserNotificationsSchema'
import Flag from 'react-world-flags'
// import { initUserProfile, loadingUserProfile, failedUserProfile, setUserProfile } from '../app/actions/userProfile'
import { setUserProfile } from '../app/actions/userProfile'
// import { initUserReviews, loadingUserReviews, failedUserReviews, setUserReviews, updateUserReview, deleteUserReview, selectUserReview} from '../app/actions/reviews'
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Hamburger from 'material-ui/svg-icons/image/dehaze';
import Typography from '@material-ui/core/Typography';
import CookieConsent, { Cookies } from "react-cookie-consent";
import theme from "../app/theme"
import UserProfileQuery from '../app/queries/UserProfileSchema'
import { SocialIcon } from 'react-social-icons';
// import Mailto from 'react-mailto'
import _ from 'underscore'
import MessengerMessageUs from 'react-messenger-message-us';
import Bandeau1 from './bandeau.jpg'
import Bandeau from './bandeau_2.jpg'

const StyledSocialIcon = styled(SocialIcon)`
   background: #ececec;
   border-radius: 50%;
   &:hover {
    background: white;
   }
`;

const MainAppBar = styled(AppBar)`
  &:hover {
    cursor: pointer;
  }
`;

const MainToolbar = styled(Toolbar)`
  background-color: transparent !important;
  margin-top: 4px;
`;

const MainContainer = styled.div`
  padding-top: 0px;
  padding-left: 0px; 
  padding-right: 0px;
  width: 100%;
  height: 100%;
`;

const Main = styled.div`
  min-height: 100vh;
  height: 100%;
`;


class UserMenuItem extends Component {

  // constructor(props){
  //   super(props)
  // }

  state = {
    open: false
  }

  handleTouchTap = event => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

capitalizeTxt(txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

  navigateToProfile = () => {
    this.props.history.push("/user/" + this.props.currentUser.user_id)
    this.props.client.networkInterface.query({query: UserProfileQuery, variables: {id: this.props.currentUser.user_id }, fetchPolicy: 'network-only'})
    .then(
        (res) => {
            this.props.setUserProfile(res.data.user)
        },
        (err) => {
        }
    );
  }

  render() {
    const {currentUser, logout, textColor} = this.props;

    const navbarElem = {
      color: textColor,
      fontSize: 12,
      // letterSpacing: '1px',
      // textTransform: 'uppercase',
    }

    if (currentUser && currentUser.isLoggedIn) {
      return (
        <div>
          <MenuItem
            primaryText={this.capitalizeTxt(currentUser.first_name || currentUser.email)}
            onTouchTap={this.handleTouchTap}
            // leftIcon={<DropDownArrow color={textColor}/>}
            style={navbarElem}
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu style={{padding: '0px'}}>
              <MenuItem onTouchTap={this.handleRequestClose} onClick={this.navigateToProfile}>{strings.profile}</MenuItem>
              <MenuItem primaryText={strings.logout} onTouchTap={logout}/>
            </Menu>
          </Popover>
        </div>
      );
    }

    return (
      <div>
      <MenuItem
        containerElement={<Link to="/users/hello"/>}
        primaryText={strings.login}
        style={navbarElem}
      />
      </div>
    );
  }
}

class MainLayout extends Component {

  constructor(props){
    super(props)
    this.state = {
       drawerOpen: false,
       open: false,
       width: 0,
       height: 0,
       observable: null,
       subscription: null,
       counter: 0,
       scrolled: false,
    }

    this.props.setLocales(strings)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    // this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    // window.addEventListener('scroll', this.handleScroll);
    this.setState({scrollHeight: document.getElementById('root').scrollHeight })
    this.updateWindowDimensions();
    if (this.props.currentUser.isLoggedIn){
      const ctx = this
      const subscription = this.state.observable.subscribe({
          next(data) {
              if(data){
                let counter = data.notificationsTicker.notifications.filter(function(x){return x["read"]==="false"}).length
                ctx.setState({counter: counter})
              }
          },
          error(err) { console.error('err', err); },
        });
      this.setState({subscription: subscription})
    }
  }

  componentWillMount(){
      window.removeEventListener('resize', this.updateWindowDimensions);
      strings.setLanguage(strings.getLanguage()) 
    if (this.props.currentUser.isLoggedIn){
      let observable = this.props.client.subscribe({ query: notificationsSubscription, variables: {user_id: this.props.currentUser.user_id}})
      this.setState({observable: observable})

      this.props.client.networkInterface.query({query: UserNotificationsQuery, variables: {id: this.props.currentUser.user_id }, fetchPolicy: 'network-only'}).then(
          (res) => {
                let counter = res.data.user.notifications.filter(function(x){return x["read"]==="false"}).length
                this.setState({counter: counter})
          },
          (err) => {
            console.log(err)
          }
      );      
    }
  }

  // handleScroll(event) {
  //   if(window.pageYOffset > 0){
  //     this.setState({scrolled: true})
  //   } else {
  //     this.setState({scrolled: false})      
  //   }
      
  // };

  componentWillUnmount(){
    // window.removeEventListener('scroll', this.handleScroll);
    if (this.state.subscription){
      this.state.subscription.unsubscribe()
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  drawerToggleHome = () => {
    this.handleToggle()
    this.props.history.push('/');
  }

  drawerToggleProfile = () => {
    this.handleToggle()
    this.props.history.push("/user/" + this.props.currentUser.user_id)
  }

  drawerToggleHot = () => {
    this.handleToggle()
    this.props.history.push("/hot")
  }

  drawerToggleArtists = () => {
    this.handleToggle()
    this.props.history.push("/artists")
  }  

  drawerToggleLogin = () => {
    this.handleToggle()
    this.props.history.push("/users/hello")
  }  

  drawerToggleFanzine = () => {
    this.handleToggle()
    this.props.history.push("/fanzine/posts")
  }  


  goHome = () => {
    this.props.history.push('/');
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  drawerSwitchLanguage = () => {
    this.handleToggle()
    this.onSwitchLanguage()
  }

  onSwitchLanguage = (event) => {
    let lang = (strings.getLanguage() === 'en') ? 'fr' : 'en'
    if (this.props.currentUser) {
      this.props.client.mutate({mutation: updateUserMutation, variables: {user_id: this.props.currentUser.user_id, locale: lang}}).then(
        (res) => {

        },
        (err) => {
          console.log('Handle this error, N@W!')
        })
      }
    strings.setLanguage(lang);
    initDevise()
    this.props.setLocales(strings)
    this.setState({});
  }

  closeDrawer() { this.setState({ open: false }) }

  render() {
    const {currentUser, doLogout, children, location: {state: {notice} = {}}, muiTheme: {palette}} = this.props;

    const navbarElem = {
      color: palette.alternateTextColor,
      fontSize: 12,
      // letterSpacing: '1px',
      // textTransform: 'uppercase',
    }

    const navbarMobileElem = {
      fontSize: 12,
      // letterSpacing: '1px',
      // textTransform: 'uppercase',
    }

    const imageBackground = {
        backgroundImage: "url(" + Bandeau1 + ")",
      width: '100%',
      margin: '0 auto', 
      padding: 20,
      paddingBottom: 50,
      paddingTop: 50,
       backgroundSize: '100%', /* Always size the image to the width of the div */
      backgroundPosition: 'top', /* Position the image to the top center of the div */
 
    }

    const defaultNavbarStyle = {
      align: 'center', 
      margin: '0 auto', 
      width: '100%', 
      transition: 'background 0.5s ease', 
      // background:'rgba(0,0,0,0.0)', 
       backgroundImage: "url(" + Bandeau + ")",
       backgroundSize: '100%', /* Always size the image to the width of the div */
      backgroundPosition: 'top', /* Position the image to the top center of the div */
      boxShadow: 'none', 
      position: 'sticky', 
      top: 0, 
      color: '#ffffff'
    }

    const scrolledNavbarStyle = {
      align: 'center', 
      margin: '0auto', 
      width: '100%', 
      transition: 'background 0.5s ease', 
      background:'rgba(0,0,0,0.4)', 
      boxShadow: 'none', 
      position: 'sticky', 
      top: 0, 
      color: '#ffffff'
    }

    // const testNav = {
    //    backgroundImage: "url(" + Bandeau + ")",

    //    boxShadow: 'none',
    //    position: 'sticky',
    //    top: 0
    // }
    console.log(this.props.match.path.includes("fanzine"))
    return (
      <div>
      <Main style={this.props.currentUser.isLoggedIn ? {margin: '0 auto'} : {margin: '0 auto'} }>
        <MainAppBar
          style={(!this.props.match.path.includes("fanzine") && (this.props.match.path !== "/" || this.props.currentUser.isLoggedIn) ? defaultNavbarStyle : scrolledNavbarStyle)}
          // style={defaultNavbarStyle}
          showMenuIconButton={ this.state.width < 500 ? true : false}
          iconStyleLeft={{color: "#ffffff"}}
          iconElementLeft={<Hamburger color="#ffffff" style={{marginLeft: 10, marginTop: 13}}/>}
          title={<div>
                  <b>encore!</b>
                </div>}
          titleStyle={{fontSize: 28, fontWeight: 900, color: palette.alternateTextColor}}
          onTitleTouchTap={this.goHome}
          onLeftIconButtonTouchTap={this.handleToggle}
        >

        {
          this.state.width > 500 
        ? 
        
          <MainToolbar style={{paddingRight:0}}>
            <ToolbarGroup>
              {this.props.currentUser.isLoggedIn ? 
                <div>
                { (this.state.counter > 0) && (this.props.match.path !== "/hot") ? 
                    <Badge
                    style={{display: 'inline'}}
                    badgeContent={this.state.counter}
                    default={true}
                    badgeStyle={{top: 0, right: 0}}
                    >
                  <IconButton style={{top: 0, right: -20}} containerElement={<Link to="/hot" />} tooltip="Notifications">
                        <NotificationsIcon color='#ffffff'/>
                      </IconButton>

                    </Badge>

                  :

               <IconButton style={{top: 0, right: 0}} containerElement={<Link to="/hot" />} tooltip="Notifications">
                        <NotificationsIcon color='#ffffff'/>
                      </IconButton>

                } 
                </div>
                :
                null 
              }

              { this.props.currentUser.isLoggedIn ? 
              <MenuItem
                containerElement={<Link to="/" />}
                primaryText={strings.hot}
                style={navbarElem}
              />
                : null }

              <MenuItem
                containerElement={<Link to="/artists"/>}
                primaryText={strings.artists}
                style={navbarElem}
              />

              <MenuItem
                containerElement={<Link to="/fanzine/posts"/>}
                primaryText="Fanzine"
                style={navbarElem}
              />

              <UserMenuItem
                history={this.props.history}
                setUserProfile={this.props.setUserProfile}
                client={this.props.client}
                logout={doLogout}
                style={navbarElem}
                currentUser={currentUser}
                textColor={palette.alternateTextColor}
              />
              <MenuItem
                onClick={this.onSwitchLanguage}
                primaryText={strings.getLanguage() === 'en' ? "En" : "Fr"}
                style={navbarElem}
              />
        

            </ToolbarGroup>
          </MainToolbar>        
        : 
         <div>
        <Drawer open={this.state.open} docked={false} onRequestChange={(e) => this.closeDrawer(e)}>
        {this.props.currentUser.isLoggedIn ? 
          
          <MenuItem
            onClick={this.drawerToggleProfile}
            primaryText={currentUser.first_name || currentUser.email}
            style={navbarMobileElem}
          />
          :
          <MenuItem
            onClick={this.drawerToggleLogin}
            primaryText={strings.login}
            style={navbarMobileElem}
          />

          }
          <MenuItem
            onClick={this.drawerToggleHome}
            primaryText={strings.hot}
            style={navbarMobileElem}
          />
          <MenuItem
            onClick={this.drawerToggleArtists}
            primaryText={strings.artists}
            style={navbarMobileElem}
          />
          <MenuItem
            onClick={this.drawerToggleFanzine}
            primaryText="Fanzine"
            style={navbarMobileElem}
          />
          {this.props.currentUser.isLoggedIn ? <MenuItem primaryText={strings.logout} onClick={doLogout} style={navbarMobileElem} /> : null }
          <MenuItem
            onClick={this.drawerSwitchLanguage}
            primaryText={strings.getLanguage() === 'en' ? "Version française" : "Switch to english"}
            style={navbarMobileElem}
          />
        </Drawer> 
          {this.props.currentUser.isLoggedIn ? 
            <div>
              
               { (this.state.counter > 0) && (this.props.match.path !== "/hot") ? 
                    <Badge
                    badgeContent={this.state.counter}
                    default={true}
                    badgeStyle={{top: 5, right: 5}}
                    >
                      <IconButton style={{top: 10, right: 7, position: 'absolute'}} containerElement={<Link to="/hot" />} tooltip="Notifications">
                        <NotificationsIcon color='#ffffff'/>
                      </IconButton>
                 
                    </Badge>

                  :
                      <IconButton style={{top: 10, right: 30, position: 'absolute'}} containerElement={<Link to="/hot" />} tooltip="Notifications">
                        <NotificationsIcon color='#ffffff'/>
                      </IconButton>

                } 

            </div>

            :
            null
          }

          </div>
        }

        </MainAppBar>
        <MainContainer style={{margin: '0 auto'}}>
          {notice && <Notice>{notice}</Notice>}
          {children}
        </MainContainer>          

        <CookieConsent
          location="bottom"
          buttonText={strings.cookie.accept}
          cookieName="encoreCookie"
          style={{background: "#2B373B", display: "block"}}
          buttonStyle={{ color: "white", background:"transparent", border: "1px solid white", fontSize: "13px" }}
          expires={150}>
          {strings.cookie.text}
        </CookieConsent>

      </Main>
      {currentUser.isLoggedIn || this.props.match.path.includes("fanzine") ? 
        null
      :
      <StyledFooter style={imageBackground}>
        <div className="footer">
          <span style={{fontWeight: 800, fontSize: 40, fontFamily: 'Raleway', float: 'left'}}><b>encore!</b></span>
          <div style={{float: "right"}}>
            <StyledSocialIcon color="white" style={{background:"transparent", height: 28, color:"red", width: 28, marginLeft: "6px", marginRight: 5, height: 28, width: 28}} network="instagram" url="https://www.instagram.com/encoreapp.co" />
            <StyledSocialIcon color="white" style={{background:"transparent", marginRight: 5, height: 28, width: 28}} network="facebook" url="https://www.facebook.com/Encore-2079915298988137/" />
            <StyledSocialIcon color="white" style={{background:"transparent", marginRight: 5, height: 28, width: 28}} network="twitter" url="https://www.facebook.com/Encore-2079915298988137/" />
            <br/>
            <br/>
            <br/>
            {/* <MessengerMessageUs pageId="2079915298988137" appId="1351728908291385" />*/}
          </div>

          <br/>
          <br/>          
          <br/>           
          <br/>                             
          <div style={{ marginTop: -4}}>
          { this.props.locales.locales.policy !== undefined ? 
            <Link to='/policy'>{this.props.locales.locales.policy.link}</Link>
          : 
            undefined
            // insta
            // radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)", height: 28, color:"red", width: 28, marginLeft: "6px"}}
          }
          </div>
        </div>
      </StyledFooter>
      }
      </div>
    );
  }
}

MainLayout = muiThemeable()(MainLayout);

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    locales: state.locales
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserProfile: (user) => dispatch(setUserProfile(user)),
    setLocales: (locales) => dispatch(setLocales(locales)),
    doLogout: () => logout(dispatch)
  };
};

const MainLayoutContainer = withApollo(connect(mapStateToProps, mapDispatchToProps)(MainLayout));

export default MainLayoutContainer;
