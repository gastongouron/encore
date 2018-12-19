import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {requestResetPassword, formAction} from 'react-devise/lib/actions';
import {required, email} from './Validation';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const coolParent = {
  display: 'flex', 
  justifyContent: 'center'
}

const paperStyle = {
  padding: 20,
  paddingTop:5,
  maxWidth: 300,
  display: 'flex', 
  justifyContent: 'center'
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

const RequestResetPasswordForm = reduxForm({
  form: 'requestResetPassword'
})(({locales, handleSubmit, valid, submitting, submitSucceeded, error, onSubmit, auth: {messages, viewPlugin: {renderInput, SubmitButton, Form, FormError}}}) => {
  if (submitSucceeded) {
    return <p>
      <br/>
      <br/>
      {locales.locales.requestResetPasswordSucceeded}
    </p>;
  }
  return (
    <Form onSubmit={handleSubmit(formAction(onSubmit))}>
      <Field
        name="email"
        label={locales.locales.email}
        component={renderInput}
        validate={[required, email]}
      />
      <SubmitButtonCustom
        label={submitting ? locales.locales.requesting : locales.locales.request}
        disabled={!valid || submitting}
        display='block'
      />
      {error && <FormError>{error}</FormError>}
    </Form>
  );
});

const RequestResetPassword = ({doRequestResetPassword, locales, ...rest}) => {
  const {auth: {AuthLinks, viewPlugin: {View, Heading}}} = rest;
  return (
  <div>
  <div style={coolParent}>
    <Paper
        style={paperStyle} zDepth={1} 
        rounded={true}>
      <View>
{/*        <Heading>
          {locales.locales.request}
        </Heading>*/}
        <RequestResetPasswordForm locales={locales} onSubmit={doRequestResetPassword} {...rest} />
      </View>
    </Paper>
  </div>
  <AuthLinks locales={locales} />
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
    doRequestResetPassword: data => requestResetPassword(data, dispatch)
  };
};

const RequestResetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(RequestResetPassword);

export {
  RequestResetPasswordForm,
  RequestResetPassword,
  RequestResetPasswordContainer as default
};