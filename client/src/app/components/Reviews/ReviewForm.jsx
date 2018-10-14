
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'


// import React from 'react'
// import { Field, reduxForm } from 'redux-form'

// const required = value => value ? undefined : 'Required'

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
//   <div>
//     <label>{label}</label>
//     <div>
//       <input {...input} placeholder={label} type={type}/>
//       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// )

// const FieldLevelValidationForm = (props) => {
//   const { onClickUpdate, pristine, reset, submitting } = props
//   return (
//     <form onSubmit={onClickUpdate}>
//       <Field name="body" type="text"
//         component={renderField} label="Review"
//         validate={required}
//       />
//       <Field name="score" type="text"
//         component={renderField} label="Score"
//         validate={required}
//       />
//       <div>
//         <button type="submit" disabled={submitting}>Submit</button>
//         <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
//       </div>
//     </form>
//   )
// }

// export default reduxForm({
//   form: 'fieldLevelValidation' // a unique identifier for this form
// })(FieldLevelValidationForm)




const CustomForm = (props) => {

    const newActions = [
        <RaisedButton
          label="Cancel"
          default={true}
          onClick={props.onClickClose}
        />,
        <RaisedButton
          label="Save"
          primary={true}
          keyboardFocused={true}
          onClick={props.onClickSave}
        />,
    ];

    const updateActions = [
        <RaisedButton
          label="Update"
          primary={true}
          keyboardFocused={true}
          onClick={props.onClickUpdate}
        />,
        <RaisedButton
          label="Delete"
          secondary={true}
          onClick={props.onClickDelete}
        />,
        <RaisedButton
          label="Cancel"
          default={true}
          onClick={props.onClickClose}
        />,
    ];


    const actions = props.onClickDelete ? updateActions : newActions

	return (
         <Dialog
          open={props.onShow}
          title="Review"
          modal={false}
          actions={actions}
          autoScrollBodyContent={true}
        >
            <TextField
                hintText="Review"
                id="body"
                value={props.formValue ? props.formValue : ''}
                onChange={props.onChange}        
            />
            <br />
            <TextField
                hintText="Score"
                id="score"
                value={props.formScore ? props.formScore : ''}
                onChange={props.onChange}        
            />

        </Dialog>
		)

}

export default CustomForm;









  // <div hidden={!props.onShow}>
  //               <Alert bsStyle="info">
  //                   <FormGroup controlId="body">
  //                       <ControlLabel>Enter your review for this artist</ControlLabel>
  //                       <FormControl
  //                           readOnly={props.editable?false:true}
  //                           type="text"
  //                           placeholder="Enter review"
  //                           value={props.formValue ? props.formValue : ''}
  //                           onChange={props.onChange} />  
  //                   </FormGroup>
  //                   <FormGroup controlId="score">
  //                       <ControlLabel>Enter your score for this artist</ControlLabel>
  //                       <FormControl
  //                           readOnly={props.editable?false:true}
  //                           type="text"
  //                           placeholder="Enter score"
  //                           value={props.formScore ? props.formScore : ''}
  //                           onChange={props.onChange} />  
  //                   </FormGroup>

  //                   <div>
  //                       { props.onClickSave ? 
  //                           <div>
  //                               <RaisedButton label='Save' primary={true} onClick={props.onClickSave}/>
  //                               <RaisedButton label='Close' onClick={props.onClickClose}/>
  //                           </div>
  //                       : props.onClickDelete ? 
  //                          <div>
  //                               <RaisedButton label='Delete' secondary={true} onClick={props.onClickDelete}/>
  //                               <RaisedButton label='Update' primary={true} onClick={props.onClickUpdate}/>
  //                               <RaisedButton label='Close' onClick={props.onClickClose}/>
  //                           </div>
  //                       : 
  //                           undefined 
  //                       }
  //                   </div>
  //               </Alert>
  //           </div> 