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


import UserProfileQuery from '../app/queries/UserProfileSchema'
import { SocialIcon } from 'react-social-icons';
// import Mailto from 'react-mailto'
import _ from 'underscore'


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
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
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
      letterSpacing: '1px',
      textTransform: 'uppercase',
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
              <MenuItem primaryText={strings.logout} onTouchTap={logout} />
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
    }

    this.props.setLocales(strings)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
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


  componentWillUnmount(){
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
      letterSpacing: '1px',
      textTransform: 'uppercase',
    }
    return (
      <div>
      <Main style={{maxWidth: 840, margin: '0 auto'}}>
        <MainAppBar
          // style={{background: '#283593', boxShadow: 'none', position: 'sticky', top: 0}}
          style={{ background: 'transparent', boxShadow: 'none', top: 0, color: '#ffffff'}}
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
                    secondary={true}
                    badgeStyle={{top: -24, right: -35}}
                    >
                    <MenuItem
                      containerElement={<Link to="/hot" />}
                      primaryText={strings.hot}
                      style={navbarElem}
                    />
                    </Badge>

                  :
              <MenuItem
                containerElement={<Link to="/hot" />}
                primaryText={strings.hot}
                style={navbarElem}
              />

                } 
                </div>
                :
                null 
              }

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
                currentUser={currentUser}
                textColor={palette.alternateTextColor}
              />
              <MenuItem
                onClick={this.onSwitchLanguage}
                // primaryText={strings.getLanguage() === 'en' ? }
                // style={{color: palette.alternateTextColor}}
              >
                <div style={{marginTop: 3}}>
                  {strings.getLanguage() === 'en' ? <Flag code="usa" height="16" /> : <Flag code="fra" height="16" />}
                </div>           
              </MenuItem>
            </ToolbarGroup>
          </MainToolbar>        
        : 
         <div>
        <Drawer open={this.state.open} docked={false} onRequestChange={(e) => this.closeDrawer(e)}>
        {this.props.currentUser.isLoggedIn ? 
          
          <MenuItem
            onClick={this.drawerToggleProfile}
            primaryText={currentUser.first_name || currentUser.email}
          />
          :
          <MenuItem
            onClick={this.drawerToggleLogin}
            primaryText={strings.login}
          />

          }
          <MenuItem
            onClick={this.drawerToggleArtists}
            primaryText={strings.artists}
          />
          <MenuItem
            onClick={this.drawerToggleFanzine}
            primaryText="Fanzine"
          />
          {this.props.currentUser.isLoggedIn ? <MenuItem primaryText={strings.logout} onClick={doLogout} /> : null }
          <MenuItem
            onClick={this.drawerSwitchLanguage}
          >
            <div style={{marginTop: 3}}>
                  {strings.getLanguage() === 'en' ? <Flag code="usa" height="16" /> : <Flag code="fra" height="16" />}
            </div>           
          </MenuItem>
        </Drawer> 
          {this.props.currentUser.isLoggedIn ? 
            <div>
              
               { (this.state.counter > 0) && (this.props.match.path !== "/hot") ? 
                    <Badge
                    badgeContent={this.state.counter}
                    default={true}
                    badgeStyle={{top: 5, right: 5}}
                    >
                      <IconButton style={{top: 10, right: 7, position: 'absolute'}} linkButton={true} containerElement={<Link to="/hot" />} tooltip="Notifications">
                        <NotificationsIcon color='#ffffff'/>
                      </IconButton>
                 
                    </Badge>

                  :
                      <IconButton style={{top: 10, right: 30, position: 'absolute'}} linkButton={true} containerElement={<Link to="/hot" />} tooltip="Notifications">
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
      </Main>
      {currentUser.isLoggedIn ? 
        null
      :
      <StyledFooter>
        <div className="footer">
          { this.props.locales.locales.policy !== undefined ? 
            <Link to='/policy'>{this.props.locales.locales.policy.link}</Link>
          : 
            undefined
          }
          &nbsp;—&nbsp;
          <a href="mailto:gastongouron@gmail.com">Contact</a>
          <div style={{float: 'right', marginTop: -4}}>
            <StyledSocialIcon color="white" style={{background: "radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)", height: 28, color:"red", width: 28, marginLeft: "6px"}} network="instagram" url="https://www.instagram.com/tentsile" />
            <StyledSocialIcon color="white" style={{background:"#00aced", height: 28, color:"red", width: 28, marginLeft: "6px" }} network="twitter" url="https://twitter.com/gastongouron" />
            <StyledSocialIcon color="white" style={{background:"#3b5998", height: 28, color:"red", width: 28, marginLeft: "6px"}} network="facebook" url="https://www.facebook.com/gastongouron" />
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
