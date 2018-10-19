import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {Redirect} from 'react-router-dom';
import url from 'url';
import {resetPassword, formAction} from 'react-devise/lib/actions';
import {required} from './Validation';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const paperStyle = {
  padding: 20,
  maxWidth: 280,
  display: 'flex', 
  justifyContent: 'center'
 };

const coolParent = {
  display: 'flex', 
  justifyContent: 'center'
}

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

const ResetPasswordForm = reduxForm({
  form: 'requestResetPassword'
})(({handleSubmit, locales, valid, submitting, error, onSubmit, query, submitSucceeded, auth: {resourceName, messages, viewPlugin: {renderInput, SubmitButton, Form, FormError}}}) => {
  const submitWithQuery = form => {
    return onSubmit({
      ...form,
      ...query
    });
  };
  if (submitSucceeded) {
    return <Redirect to={`/${resourceName}/login`} />;
  }
  return (
    <Form onSubmit={handleSubmit(formAction(submitWithQuery))}>
      <Field
        name="password"
        type="password"
        component={renderInput}
        label={locales.locales.password}
        validate={required}
      />
      <Field
        name="password_confirmation"
        type="password"
        component={renderInput}
        label={locales.locales.passwordConfirmation}
        validate={required}
      />
      <SubmitButtonCustom
        label={submitting ? locales.locales.resetting : locales.locales.reset}
        disabled={!valid || submitting}
      />
      {error && <FormError>{error}</FormError>}
    </Form>
  );
});

const ResetPassword = ({doResetPassword, locales, location, ...rest}) => {
  const {query} = url.parse(location.search, true);
  const {auth: {AuthLinks, viewPlugin: {View, Heading}}} = rest;
  return (
  <div style={coolParent}>
    <Paper
      style={paperStyle} zDepth={1} 
      rounded={false}>
      <View>
        <Heading>
          {locales.locales.reset} 
        </Heading>
        <ResetPasswordForm locales={locales} onSubmit={doResetPassword} query={query} {...rest} />
        <AuthLinks locales={locales} />
      </View>
    </Paper>
  </div>

  );
};

const mapStateToProps = state => {
  return {
    locales: state.locales
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doResetPassword: form => resetPassword(form, dispatch)
  };
};

const ResetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

export {
  ResetPasswordForm,
  ResetPassword,
  ResetPasswordContainer as default
};