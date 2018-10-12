import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {Redirect} from 'react-router-dom';
import {signUp, formAction} from 'react-devise/lib/actions';
import {required, email} from 'react-devise/lib/views/validation';
import FileBase64 from './FileBase64';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
    backgroundColor: 'black'
  }
};

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

const adaptFileEventToValue = delegate => files => {
  delegate(files.base64);
}

const FileInput = ({ 
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  meta: omitMeta, 
  ...props 
}) => {
  return (
      <FileBase64
        style={styles.uploadButton}
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        multiple={ false }
        onDone={adaptFileEventToValue(onChange)} />
    )
};


const SubmitButtonCustom = ({label, disabled}) => (
  <RaisedButton
    type="submit"
    primary={true} 
    label={label}
    style={style}
    disabled={disabled}
  />
);

const SignUpForm = reduxForm({
  form: 'signUp'
})(({error, valid, submitting, submitSucceeded, handleSubmit, onSubmit, auth: {messages: {signUpSucceeded: signUpSucceededMessage}, viewPlugin: {renderInput, SubmitButton, Form, FormError}}}) => {
  if (submitSucceeded) {
    return <Redirect to={{
      pathname: '/artists',
      state: {
        notice: signUpSucceededMessage
      }}}
    />;
  }



  return (
    <Form onSubmit={handleSubmit(formAction(onSubmit))}>
      <Field
        name="first_name"
        component={renderInput}
        label="First name"
        validate={[required]}
      />
      <Field
        name="last_name"
        component={renderInput}
        label="Last Name"
        validate={[required]}
      />
      <Field
        name="email"
        component={renderInput}
        label="Email"
        validate={[required, email]}
      />
      <Field
        name="password"
        type="password"
        component={renderInput}
        label="Password"
        validate={required}
      />
      <Field
        name="password_confirmation"
        type="password"
        component={renderInput}
        label="Password Again"
        validate={required}
      />

      <br />
      <Field 
        name="profile_picture" 
        component={FileInput} 
        type="file"
        label="Avatar"
        validate={required}/>

      <br />
      <br />
      <SubmitButtonCustom
        label={submitting ? 'Signing Up...' : 'Sign Up'}
        disabled={!valid || submitting}
      />
      {error && <FormError>{error}</FormError>}
    </Form>
  );
});

const SignUp = ({doSignUp, ...rest}) => {
  const {auth: {AuthLinks, viewPlugin: {View, Heading}}} = rest;
  return (
<div style={coolParent}>
    <Paper
        style={paperStyle} zDepth={1} 
        rounded={false}>
    <View>
      <Heading>
        Sign Up
      </Heading>
      <SignUpForm onSubmit={doSignUp} {...rest} />
      <AuthLinks />
    </View>
    </Paper>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    doSignUp: form => signUp(form, dispatch)
  };
};

const SignUpContainer = connect(null, mapDispatchToProps)(SignUp);

export {
  SignUpForm,
  SignUp,
  SignUpContainer as default
};