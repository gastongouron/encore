import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {Redirect} from 'react-router-dom';
import {signUp, formAction} from 'react-devise/lib/actions';
import {required, email} from 'react-devise/lib/views/validation';
import FileBase64 from 'react-file-base64';


const adaptFileEventToValue = delegate => files => {
  console.log(files)
  delegate(files.base64);
}

 // <input
 //     onChange={adaptFileEventToValue(onChange)}
 //     onBlur={adaptFileEventToValue(onBlur)}
 //     type="file"
 //     {...props.input}
 //     {...props}
 //   /> 


const FileInput = ({ 
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  meta: omitMeta, 
  ...props 
}) => {
  return (
      <FileBase64
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        multiple={ false }
        onDone={adaptFileEventToValue(onChange)} />
    )
};

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
  
  // const customFileInput = (field) => {
  //   console.log('in customfileinput')
  //   console.log(field)
  //   delete field.input.value; // <-- just delete the value property
  //   console.log(field)
  //   return <input type="file" id="profile_picture" {...field.input} />;

  // };
  //   <Field 
  //   name="profile_picture"
  //   type="file"
  //   validate={required}
  //   component={customFileInput}/>

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
      
      <Field 
        name="profile_picture" 
        component={FileInput} 
        type="file"
        label="Avatar"
        validate={required}/>
  
      <SubmitButton
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
    <View>
      <Heading>
        Sign Up
      </Heading>
      <SignUpForm onSubmit={doSignUp} {...rest} />
      <AuthLinks />
    </View>
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