import ReactDeviseMaterialUI from 'react-devise-material-ui';
import {initReactDevise} from 'react-devise';
import SignUpContainer from './components/Devise/views/SignUp'
import LoginContainer from './components/Devise/views/LogIn'
import RequestResetPasswordContainer from './components/Devise/views/RequestResetPassword'
import ResetPasswordContainer from './components/Devise/views/ResetPassword'
import {Alert, UnstyledList, ViewHeading} from '../shared';
import styled from 'styled-components';

import strings from '../app/locales/strings'

const AuthAlert = styled(Alert)`
  padding: 10px;
  text-align: center;
  border: none;
`;

export const initDevise = () => {

  initReactDevise({
    viewPlugins: [
      ReactDeviseMaterialUI.plugin(),
      {
        Alert: AuthAlert,
        AuthLinksList: UnstyledList,
        Heading: ViewHeading
      }
    ],
    // Internationalize
    messages: {
      loginFailed: strings.failed,
      mustLoginMessage: strings.mustLogin
  //  reqeustReconfirmSucceeded: 'Your request to re-confirm your account was received. You should receive an email shortly with a link to confirm your account.',
  //   requestResetPasswordSucceeded: 'Your request to reset you password was received. You should receive an email shortly with a link to reset your password.',
  //   mustLoginMessage: 'Please log in or sign up.',
  //   confirmSucceeded: 'Your account has been confirmed.',
  //   confirmContinueLinkText: 'Continue to the Site',
  //   confirmFailed: 'There was a problem confirming your account.',
  //   signUpSucceeded: 'Sucessfuly signed up. A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.',
  //   updateSucceeded: 'Your account has been updated successfully.',
  //   updateNeedsConfirmation: 'You updated your account successfully, but we need to verify your new email address. Please check your email and follow the confirm link to confirm your new email address.'
    },
    routes: {
      signup: {
        component: SignUpContainer,     
        path: '/getstarted',
        linkText: strings.signup
      },
      login: { 
        component: LoginContainer, 
        path: '/hello',
        linkText: strings.login
      },
      // user: {
      //   component: User,
      //   path: '/edituser'
      // },
      requestResetPassword: { 
        component: RequestResetPasswordContainer,
        linkText: strings.resetPassword
      }, 
      resetPassword: { 
        component: ResetPasswordContainer
      },
      requestReconfirm: { 
        linkText: ''
      }    
    }
  })

}
