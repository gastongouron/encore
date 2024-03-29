import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, change} from 'redux-form';
import {Redirect} from 'react-router-dom';
import {signUp, formAction} from 'react-devise/lib/actions';
import {required, email} from './Validation';
import FileBase64 from './FileBase64';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import strings from '../../../locales/strings'
// import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Grid from '@material-ui/core/Grid'
import {
  DatePicker
} from 'redux-form-material-ui'


const styles = {
  uploadButton: {
    verticalAlign: 'middle',
    backgroundColor: 'black'
  }
};

const rootz = {
    flexGrow: 1,
  }

const paperStyle = {
  padding: 20,
  maxWidth: 300,
  display: 'flex', 
  justifyContent: 'center'
 };

const coolParent = {
  display: 'flex', 
  paddingTop: 40,
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

const renderDatePicker = ({ input, ...rest }) =>

  <DatePicker
    {...input}
    {...rest}
    // valueSelected={input.value}
    // defaultValue={null}
    // onChange={(event, value) => input.onChange(value)}
    value = {input.value !== ''? new Date(input.value) : null}
    onChange = {(event, value) => {console.log(value); input.onChange(value)}}
    // value={input.value && new Date(input.value) || null}
    // value={input.value !== '' ? input.value : null}
  />

const renderRadioGroup = ({ input, ...rest }) =>
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />

const renderCheckbox = ({ input, label }) =>
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />

// const FileInput = ({ 
//   input: { value: omitValue, onChange, onBlur, ...inputProps }, 
//   meta: omitMeta, 
//   ...props 
// }) => {
//   return (
//       <FileBase64
//         style={styles.uploadButton}
//         onChange={adaptFileEventToValue(onChange)}
//         onBlur={adaptFileEventToValue(onBlur)}
//         multiple={ false }
//         onDone={adaptFileEventToValue(onChange)} />
//     )
// };

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
})(({error, valid, submitting, submitSucceeded, locales, handleSubmit, onSubmit, auth: {messages: {signUpSucceeded: signUpSucceededMessage}, viewPlugin: {renderInput, datePicker, SubmitButton, Form, FormError}}}) => {
  
  // const url = new URLSearchParams(window.location.search).get("email")
  // { url != null ? console.log(url) : console.log('no URL buddy') }


  if (submitSucceeded) {
    return <Redirect to={{
      pathname: '/artists',
      state: {
        // notice: signUpSucceededMessage
        // notice: strings.welcome
      }}}
    />;
  }

  return (
    <Form style={rootz} onSubmit={handleSubmit(formAction(onSubmit))}>
  
      <Field name="gender" component={renderRadioGroup} validate={required}>
        <RadioButton value="male" label={strings.male} />
        <RadioButton value="female" label={strings.female} />
      </Field>

      <Field
        name="birth_date"
        component={DatePicker} hintText={strings.birthDate}
        validate={required}
        autoOk={true} 
        format={null}
        // defaultValue={null}
      />
      
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
      <br/>


{/*      

      <Field name="tos" component={renderCheckbox} label={strings.tos} validate={required}/>

      <Field
        name="city"
        type="city"
        component={renderInput}
        label="City"
        validate={required}
      />

      <Field
        name="gender"
        type="gender"
        component={renderInput}
        label="Gender"
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

*/}

      <SubmitButtonCustom
        label={ submitting ? locales.locales.logging : locales.locales.sign }
        disabled={!valid || submitting}
      />
      {error && <FormError>{error}</FormError>}
    </Form>
  );
});


const SignUp = ({doSignUp, locales, ...rest}) => {

  const {auth: {AuthLinks, viewPlugin: {View, Heading}}} = rest;
  return (
  <div>
  <div style={coolParent}>
    <Paper
        style={paperStyle} zDepth={0} 
        rounded={true}>
    <View>
      <div style={{textAlign: "center"}}>
        <span style={{fontWidth: 100, fontSize: 24, paddingTop:10, fontFamilly: 'Raleway' }}>
        {locales.locales.signup}
      </span>
      <br/>
      <br/>
      </div>
      <SignUpForm initialValues={{locale: strings.getLanguage()}} locales={locales} onSubmit={doSignUp} {...rest} />
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
    doSignUp: form => signUp(form, dispatch)
  };
};

const SignUpForm = connect(mapStateToProps, mapDispatchToProps)(SignUpFormz);
const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export {
  SignUpForm,
  SignUp,
  SignUpContainer as default
};