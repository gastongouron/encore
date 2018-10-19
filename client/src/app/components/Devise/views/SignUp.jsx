import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {Redirect} from 'react-router-dom';
import {signUp, formAction} from 'react-devise/lib/actions';
import {required, email} from './Validation';
import FileBase64 from './FileBase64';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import strings from '../../../locales/strings'

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

const SignUpFormz = reduxForm({
  form: 'signUp',
  // initialValues: {
  //   "locale": strings.getLanguage()
  // }
})(({error, valid, submitting, submitSucceeded, locales, handleSubmit, onSubmit, auth: {messages: {signUpSucceeded: signUpSucceededMessage}, viewPlugin: {renderInput, SubmitButton, Form, FormError}}}) => {
  console.log(strings)
  if (submitSucceeded) {
    return <Redirect to={{
      pathname: '/artists',
      state: {
        // notice: signUpSucceededMessage
        notice: strings.welcome
      }}}
    />;
  }
  console.log('WHEN ARE YOU RENDERING?')
  console.log(locales)

  return (
    <Form onSubmit={handleSubmit(formAction(onSubmit))}>

      <Field
        name="first_name"
        component={renderInput}
        label={strings.firstName}
        validate={[required]}
      />
      <Field
        name="last_name"
        component={renderInput}
        label={strings.lastName}
        validate={[required]}
      />
      <Field
        name="email"
        component={renderInput}
        label={strings.email}
        validate={[required, email]}
      />
      <Field
        name="password"
        type="password"
        component={renderInput}
        label={strings.password}
        validate={required}
      />
      <Field
        name="password_confirmation"
        type="password"
        component={renderInput}
        label={strings.passwordConfirmation}
        validate={required}
      />

      <br />
      <Field 
        name="profile_picture" 
        component={FileInput} 
        type="file"
        label={strings.avatar}
        validate={required}/>

      <br />
      <br />
      <SubmitButtonCustom
        label={ submitting ? locales.locales.logging : locales.locales.sign }
        disabled={!valid || submitting}
      />
      {error && <FormError>{error}</FormError>}
    </Form>
  );
});

const SignUpForm = connect(mapStateToProps, mapDispatchToProps)(SignUpFormz);


const SignUp = ({doSignUp, locales, ...rest}) => {
  console.log(strings.getLanguage())

  const {auth: {AuthLinks, viewPlugin: {View, Heading}}} = rest;
  return (
  <div style={coolParent}>
    <Paper
        style={paperStyle} zDepth={1} 
        rounded={false}>
    <View>
      <Heading>
        {locales.locales.signup}
      </Heading>
      <SignUpForm initialValues={{locale: strings.getLanguage()}} locales={locales} onSubmit={doSignUp} {...rest} />
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
    doSignUp: form => signUp(form, dispatch)
  };
};

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export {
  SignUpForm,
  SignUp,
  SignUpContainer as default
};