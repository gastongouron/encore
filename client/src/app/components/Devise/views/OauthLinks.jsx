import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {providerLogin} from './Actions';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';
// import {Flex, Box} from 'grid-styled';
// import {Redirect} from 'react-router-dom';


// const LoginContainer = styled(Flex)`
// const LoginContainer = styled.div`
//   margin-top: 100px;
// `;

// const LoginButtonContainer = styled.div`
//   margin-bottom: 5px;
// `;

const buttonStyles = `
  font-family: Helvetica, sans-serif;
  font-weight: 700;
  font-smoothing: antialiased;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: calc(.27548vw + 12.71074px);
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color .3s, border-color .3s;
  padding: calc(.34435vw + 3.38843px) calc(.34435vw + 8.38843px);
  width: 255px;
`;

const MyFacebookLogin = ({className, ...props}) => {
  return (
    <FacebookLogin cssClass={className} {...props} />
  );
};

const StyledFacebookLogin = styled(MyFacebookLogin)`
  ${buttonStyles}
  background-color: #4c69ba;
  border: calc(.06887vw + .67769px) solid #4c69ba;
`;

const SocialIcon = styled(FontAwesome)`
  margin-right: 10px;
  font-size: 1.3em;
`;

// const Alert = styled(Box)`
// const Alert = styled.div`
//   background-color: #f3c4c9;
//   margin-bottom: 10px;
//   color: #aa2833;
//   font-weight: bold;
//   border: 1px solid #aa2833;
//   border-radius: 3px;
//   padding: 3px 10px;
// `;

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const providerLoginroute = {
    method: 'POST',
    path: 'facebook'
  }

const mapDispatchToProps = dispatch => {
  return {
    providerLogin: (data) => {
      // return providerLogin(data, dispatch);
      return providerLogin(data, dispatch, providerLoginroute);
    }
  };
};

const withProviderAuth = (provider, Button) => {
  const ProviderAuth = ({providerLogin}) => {
    const login = accessToken => {
      return providerLogin({
        provider,
        accessToken
      });
    };
    const authenticate = response => {
      const accessToken = response.accessToken;

      console.log(response)
      console.log(accessToken)

      // return login(response.accessToken);
      return login(response);
    };
    const authenticateFailed = response => {
      console.log(`Authentication failed with ${provider}. ${response}`);
    };
    return <Button
      authenticate={authenticate}
      authenticateFailed={authenticateFailed}
    />;
  };
  return connect(mapStateToProps, mapDispatchToProps)(ProviderAuth);
};


const OauthFacebook = withProviderAuth('facebook', ({authenticate}) => {
  console.log(authenticate)
  return (
    <StyledFacebookLogin
      // appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      cookie={true}
      appId="1351728908291385"
      autoLoad={true}
      fields="email,first_name,last_name,picture"
      callback={authenticate}
      icon={<SocialIcon name="facebook" />}
    />
  );
});

let OauthView = ({currentUser, location: {state: {flash, from: {pathname: returnTo} = {}} = {}} = {}}) => {
  // if (currentUser) {
  //   console.log(currentUser)
  //   if (currentUser.isLoggedIn) {
  //     return <Redirect to={returnTo || '/artists'} />;
  //   }
  //   if (currentUser.isLoggingIn) {
  //     return (
  //       <div>Logging in...</div>
  //     );
  //   }
  // }
  return (
    <div>
      <OauthFacebook />
    </div>
  );
};

OauthView = connect(mapStateToProps, mapDispatchToProps)(OauthView);

export {
  OauthView,
  OauthFacebook
};
