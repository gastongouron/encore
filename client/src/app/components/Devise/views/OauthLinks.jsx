import React from 'react';
// import FacebookLogin from 'react-facebook-login';
import {providerLogin} from './Actions';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import strings from '../../../locales/strings'
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

const style = {
    fontFamily: 'Helvetica',
    fontWeight: 700,
    fontSmoothing: 'antialiased',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block',
    backgroundColor: '#4c69ba',
    width: '255px',
    textDecoration: 'none',
    padding: '7px',
    fontSize: 'calc(.27548vw + 12.71074px)',
    // padding: 'calc(.34435vw + 3.38843px) calc(.34435vw + 8.38843px)',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    border: 'solid #4c69ba'
}

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
    currentUser: state.currentUser,
    locales: state.locales
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
  strings.getLanguage()
  return (
    <FacebookLogin
      // appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      cookie={true}
      appId="1351728908291385"
      autoLoad={true}
      fields="email,first_name,last_name,picture,location"
      callback={authenticate}
      render={renderProps => (
          <button style={style} onClick={renderProps.onClick}>{strings.facebook}</button>
        )}
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
// import React from 'react';
// // import FacebookLogin from 'react-facebook-login';
// // import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

// import {providerLogin} from './Actions';
// import styled from 'styled-components';
// import FontAwesome from 'react-fontawesome';
// import {connect} from 'react-redux';
// import strings from '../../../locales/strings'

// // import {Flex, Box} from 'grid-styled';
// // import {Redirect} from 'react-router-dom';


// // const LoginContainer = styled(Flex)`
// // const LoginContainer = styled.div`
// //   margin-top: 100px;
// // `;

// // const LoginButtonContainer = styled.div`
// //   margin-bottom: 5px;
// // `;

// const style = {
//     fontFamily: 'Helvetica',
//     fontWeight: 700,
//     fontSmoothing: 'antialiased',
//     color: 'white',
//     cursor: 'pointer',
//     display: 'inline-block',
//     backgroundColor: '#4c69ba',
//     width: '255px',
//     textDecoration: 'none',
//     padding: '7px',
//     fontSize: 'calc(.27548vw + 12.71074px)',
//     // padding: 'calc(.34435vw + 3.38843px) calc(.34435vw + 8.38843px)',
//     letterSpacing: 0.6,
//     textTransform: 'uppercase',
//     border: 'solid #4c69ba'
// }

// const buttonStyles = `
//   font-family: Helvetica, sans-serif;
//   font-weight: 700;
//   font-smoothing: antialiased;
//   color: #fff;
//   cursor: pointer;
//   display: inline-block;
//   font-size: calc(.27548vw + 12.71074px);
//   text-decoration: none;
//   text-transform: uppercase;
//   transition: background-color .3s, border-color .3s;
//   padding: calc(.34435vw + 3.38843px) calc(.34435vw + 8.38843px);
//   width: 255px;
// `;

// const SocialIcon = styled(FontAwesome)`
//   margin-right: 10px;
//   font-size: 1.3em;
// `;

// // const Alert = styled(Box)`
// // const Alert = styled.div`
// //   background-color: #f3c4c9;
// //   margin-bottom: 10px;
// //   color: #aa2833;
// //   font-weight: bold;
// //   border: 1px solid #aa2833;
// //   border-radius: 3px;
// //   padding: 3px 10px;
// // `;

// const providerLoginroute = {
//     method: 'POST',
//     path: 'facebook'
//   }



// const withProviderAuth = (provider, Button, locales) => {
//   const ProviderAuth = ({providerLogin}) => {
//     const login = accessToken => {
//       return providerLogin({
//         provider,
//         accessToken
//       });
//     };
//     const authenticate = response => {
//       const accessToken = response.accessToken;

//       // console.log(response)
//       // console.log(accessToken)

//       // return login(response.accessToken);
//       return login(response);
//     };
//     const authenticateFailed = response => {
//       // console.log(`Authentication failed with ${provider}. ${response}`);
//     };
//     return <Button
//       locales={locales}
//       authenticate={authenticate}
//       authenticateFailed={authenticateFailed}
//     />;
//   };
//   return connect(mapStateToProps, mapDispatchToProps)(ProviderAuth);
// };

// const OauthFacebook = withProviderAuth('facebook', ({authenticate}) => {
//   strings.getLanguage()
//   return (
//     <FacebookLogin
//       // appId={process.env.REACT_APP_FACEBOOK_APP_ID}
//       cookie={true}
//       appId="1351728908291385"
//       autoLoad={true}
//       fields="email,first_name,last_name,picture"
//       callback={authenticate}
//       render={renderProps => (
//           <button style={style} onClick={renderProps.onClick}>{strings.facebook}</button>
//         )}
//       icon={<SocialIcon name="facebook"/>}
//     />
//   );
// });

// let OauthView = ({currentUser, locales, location: {state: {flash, from: {pathname: returnTo} = {}} = {}} = {}}) => {
//   // console.log(locales)
//   // if (currentUser) {
//   //   console.log(currentUser)
//   //   if (currentUser.isLoggedIn) {
//   //     return <Redirect to={returnTo || '/artists'} />;
//   //   }
//   //   if (currentUser.isLoggingIn) {
//   //     return (
//   //       <div>Logging in...</div>
//   //     );
//   //   }
//   // }
//   return (
//     <div>
//       <OauthFacebook locales={locales} />
//     </div>
//   );
// };


// const mapStateToProps = state => {
//   return {
//     currentUser: state.currentUser,
//     locales: state.locales
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     providerLogin: (data) => {
//       // return providerLogin(data, dispatch);
//       return providerLogin(data, dispatch, providerLoginroute);
//     }
//   };
// };

// OauthView = connect(mapStateToProps, mapDispatchToProps)(OauthView);

// export {
//   OauthView,
//   OauthFacebook
// };
