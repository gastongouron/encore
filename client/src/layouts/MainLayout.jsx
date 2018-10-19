import React, {Component} from 'react';
import {AppBar, Toolbar, ToolbarGroup, Menu, MenuItem, Popover} from 'material-ui';
import {connect} from 'react-redux';
import {logout} from '../app/components/Devise/views/Actions';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
// import LogoIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {Notice} from '../shared';

import strings from '../app/locales/strings'
import { setLocales } from '../app/actions/locales'
import { initDevise } from '../app/devistsetup'

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
  padding: 20px;
`;

const Main = styled.div`
  background-color: #F1F1F1;
  min-height: 100vh;
  height: 100%;
`;

// const Logo = styled(LogoIcon)`
//   height: 32px !important;
//   width: 32px !important;
//   color: ${({theme}) => theme.palette.alternateTextColor} !important;
//   padding: 6px !important;
// `;


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
       drawerOpen: false
    }
  }

  componentWillMount(){
      strings.setLanguage(this.props.currentUser.locale || strings.getLanguage())   
  }
  
  setDrawer = open => {
    this.setState({
      drawerOpen: open
    });
  }

  goHome = () => {
    this.props.history.push('/');
  }

  onSwitchLanguage = (event) => {
    console.log(event)
    if(event){
      let lang = (strings.getLanguage() == 'en') ? 'fr' : 'en'
      // if current user, do mutation then...
      strings.setLanguage(lang);
      initDevise(strings)
      this.props.setLocales(strings)
      this.setState({});
    }
  }

  render() {
    const {currentUser, doLogout, children, location: {state: {notice} = {}}, muiTheme: {palette}} = this.props;
    return (
      <Main>
        <MainAppBar
          style={{ boxShadow: 'none', position: 'sticky', top: 0}}
          // style={{ background: 'transparent', boxShadow: 'none', position: 'sticky', top: 0}}
          showMenuIconButton={false}
          title={<b>encore!</b>}
          titleStyle={{fontSize: 28, fontWeight: 900}}
          onTitleTouchTap={this.goHome}
        >
          <MainToolbar>
            <ToolbarGroup>
              <MenuItem
                containerElement={<Link to="/artists"/>}
                primaryText={strings.artists}
                style={{color: palette.alternateTextColor}}
              />
              <UserMenuItem
                logout={doLogout}
                currentUser={currentUser}
                textColor={palette.alternateTextColor}
              />
              <MenuItem
                onClick={this.onSwitchLanguage}
                primaryText={strings.getLanguage()}
                style={{color: palette.alternateTextColor}}
              />
            </ToolbarGroup>
          </MainToolbar>
        </MainAppBar>
        <MainContainer>


          {notice && <Notice>{notice}</Notice>}
          {children}
        </MainContainer>
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
    // initLocales: () => dispatch(initLocales()),
    // loadingLocales: () => dispatch(loadingLocales()),
    // failedLocales: (message) => dispatch(failedLocales(message)),
    setLocales: (locales) => dispatch(setLocales(locales)),
    doLogout: () => logout(dispatch)
  };
};

const MainLayoutContainer = connect(mapStateToProps, mapDispatchToProps)(MainLayout);

export default MainLayoutContainer;



