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
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import IconButton from 'material-ui/IconButton'

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
  background-color: #F1F1F1;
  min-height: 100vh;
  height: 100%;
`;

class UserMenuItem extends Component {
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

  render() {
    const {currentUser, logout, textColor} = this.props;
    if (currentUser && currentUser.isLoggedIn) {
      return (
        <div>
          <MenuItem
            primaryText={currentUser.first_name || currentUser.email}
            onTouchTap={this.handleTouchTap}
            // leftIcon={<DropDownArrow color={textColor}/>}
            style={{color: textColor}}
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText={strings.profile}
                containerElement={<Link to={"/user/" + currentUser.user_id}/>
              }
              onTouchTap={this.handleRequestClose}
              />
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
        style={{color: textColor}}
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
       height: 0
    }

    this.props.setLocales(strings)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    // window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillMount(){
      // console.log('meeee')      
      // this.updateWindowDimensions();
      window.removeEventListener('resize', this.updateWindowDimensions);
      // console.log(strings.getLanguage())
      strings.setLanguage(strings.getLanguage()) 
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

  drawerToggleArtists = () => {
    this.handleToggle()
    this.props.history.push("/artists")
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
    // console.log(!Object.keys(this.props.currentUser).length === 0)
    if (this.props.currentUser) {
      this.props.client.mutate({mutation: updateUserMutation, variables: {user_id: this.props.currentUser.user_id, locale: lang}}).then(
        (res) => {
          console.log(res.data)
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
    return (
      <Main style={{maxWidth: 840, margin: '0 auto'}}>
        <MainAppBar
          style={{background: '#F1F1F1', boxShadow: 'none', position: 'sticky', top: 0}}
          // style={{ background: 'white', boxShadow: 'none', position: 'sticky', top: 0}}
          showMenuIconButton={ this.props.currentUser.isLoggedIn && (this.state.width < 500) ? true : false}
          title={<div>
                  <b>encore!</b>
                  { 1 > 0 ? 
                    <Badge
                    badgeContent={1}
                    secondary={true}
                    badgeStyle={{top: 0, right: 8}}
                    />
                  : 
                    null
                  }

                </div>}
          titleStyle={{fontSize: 28, fontWeight: 900}}
          onTitleTouchTap={this.goHome}
          onLeftIconButtonTouchTap={this.handleToggle}
        >

        {
          this.state.width > 500 
        ? 
        
          <MainToolbar style={{paddingRight:0}}>
            <ToolbarGroup>

              <MenuItem
                containerElement={<Link to="/artists"/>}
                primaryText={strings.artists}
                style={{color: palette.textColor}}
              />
              <UserMenuItem
                logout={doLogout}
                currentUser={currentUser}
                textColor={palette.textColor}
              />
              <MenuItem
                onClick={this.onSwitchLanguage}
                primaryText={strings.getLanguage()}
                style={{color: palette.textColor}}
              />
            </ToolbarGroup>
          </MainToolbar>        
        : 
         
         this.props.currentUser.isLoggedIn 

         ?
        <Drawer open={this.state.open} docked={false} onRequestChange={(e) => this.closeDrawer(e)}>
          <MenuItem 
            onClick={this.drawerToggleHome}
            primaryText="Hot"
            />
          <MenuItem
            onClick={this.drawerToggleProfile}
            primaryText={currentUser.first_name || currentUser.email}
          />
          <MenuItem
            onClick={this.drawerToggleArtists}
            primaryText={strings.artists}
          />
          <MenuItem
            onClick={this.drawerSwitchLanguage}
            primaryText={strings.getLanguage()}
          />
          {this.props.currentUser.isLoggedIn ? 
            <MenuItem primaryText={strings.logout} onClick={doLogout} />
          :
            null
         }
        </Drawer> 

         :
          null
        }
        </MainAppBar>
        <MainContainer style={{margin: '0 auto'}}> 


          {notice && <Notice>{notice}</Notice>}
          {children}
        </MainContainer>

          {currentUser.isLoggedIn ? 
            null
          :
          <StyledFooter>
          { this.props.locales.locales.policy != undefined ? <Link to='/policy'>{this.props.locales.locales.policy.link}</Link> : undefined}
          </StyledFooter>
          }
          
      </Main>
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
    setLocales: (locales) => dispatch(setLocales(locales)),
    doLogout: () => logout(dispatch)
  };
};

const MainLayoutContainer = withApollo(connect(mapStateToProps, mapDispatchToProps)(MainLayout));

export default MainLayoutContainer;



