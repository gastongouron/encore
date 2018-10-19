import React from 'react';
import {connect} from 'react-redux';
import {login} from 'react-devise/lib/actions';
import {UnauthorizedError} from 'react-devise/lib/errors';
import {Redirect} from 'react-router-dom';
import {reduxForm, Field, SubmissionError} from 'redux-form';
// import {required, email} from 'react-devise/lib/views/validation';
import {required, email} from './Validation';
import {OauthView} from './OauthLinks'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AuthLinks from './AuthLinks'

const LoginForm = reduxForm({
  form: 'login'
})(({handleSubmit, locales, valid, submitting, error, onSubmit, auth: {messages, viewPlugin: {renderInput, SubmitButton, Form, FormError}}}) => {

  const submit = data => {
    return onSubmit(data).catch(UnauthorizedError, () => {
      throw new SubmissionError({
        _error: locales.locales.failed
      });
    });
  };

  const style = {
    marginTop: 10,
    display: 'flex', 
    justifyContent: 'center', 
    alignSelf: 'stretch',
  }

  const SubmitButtonCustom = ({label, disabled}) => (
    <RaisedButton
      type="submit"
      primary={true} 
      label={label}
      style={style}
      disabled={disabled}
    />
  );

  return (
      <Form onSubmit={handleSubmit(submit)}>
        <Field
          name="email"
          component={renderInput}
          label={locales.locales.email}
          validate={[required, email]}
        />
        <Field
          name="password"
          type="password"
          component={renderInput}
          label={locales.locales.password}
        />
        <SubmitButtonCustom
          label={submitting ? locales.locales.logging : locales.locales.login}
          disabled={!valid || submitting}
          display='block'
        />
        {error && <FormError>{error}</FormError>}
      </Form>
  );
});

const Login = ({currentUser, locales, doLogin, location: {state: {alert, from: {pathname: returnTo} = {}} = {}} = {}, ...rest} = {}) => {
  const submit = data => {
    return doLogin(data);
  };

  const paperStyle = {
    padding: 20,
    maxWidth: 300,
    display: 'flex', 
    justifyContent: 'center'
   };

  const coolParent = {
    display: 'flex', 
    justifyContent: 'center'
  }

  if (currentUser.isLoggedIn) {
    return <Redirect to={returnTo || '/artists'} />;
  }
  const {auth: {AuthLinks, viewPlugin: {View, Heading, Alert}}} = rest;
  return (
    <div>
    <div style={coolParent}>
    <Paper
        style={paperStyle} zDepth={3} 
        rounded={true}>
      <View>
        <Heading>
          {locales.locales.login}
        </Heading>
        {alert && <Alert>{alert}</Alert>}
        <LoginForm locales={locales} onSubmit={submit} {...rest} />
        <br />
        <OauthView locales={locales}/>
      </View>
    </Paper>
    </div>
    <AuthLinks locales={locales}/>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    locales: state.locales
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doLogin: data => login(data, dispatch)
  };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export {
  Login,
  LoginContainer as default
};