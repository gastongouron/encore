import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import StarRatingComponent from 'react-star-rating-component'

import StarIcon from 'react-material-icons/icons/toggle/star';
import StarBorder from 'react-material-icons/icons/toggle/star-border';
import StarHalf from 'react-material-icons/icons/toggle/star-half';
import theme from '../../theme'

class CustomForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rating: parseInt(this.props.formScore)
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    this.props.setScore(nextValue)
  }

  render(){

    const style = {
      marginLeft: 10
    }

    const create = [ <RaisedButton style={style} label="Cancel" default={true} onClick={this.props.onClickClose}/>,
                     <RaisedButton style={style} label="Save" primary={true} keyboardFocused={true} onClick={this.props.onClickSave}/>]
    const update = [ <RaisedButton style={style} label="Update" primary={true} keyboardFocused={true} onClick={this.props.onClickUpdate}/>,
                     <RaisedButton style={style} label="Delete" secondary={true} onClick={this.props.onClickDelete}/>,
                     <RaisedButton style={style} label="Cancel" default={true} onClick={this.props.onClickClose}/>]

    const actions = this.props.isUpdate ? update : create

    const starStyle = {
      padding: 30,
      letterSpacing: 16,
      display: 'flex', 
      fontSize: 28,
      margin: 10,
      justifyContent: 'center'
    }

    return (
           <Dialog
            open={this.props.onShow}
            title="Review"
            modal={false}
            actions={actions}
            autoScrollBodyContent={true}
          >
            <div style={starStyle}>
              <StarRatingComponent 
                name="score" 
                id="score"
                starCount={5}
                value={parseInt(this.props.formScore)}
                onStarClick={this.onStarClick.bind(this)}
                // onStarClick={Function(nextValue, prevValue, name)} /* on icon click handler */
                // onStarHover={Function(nextValue, prevValue, name)} /* on icon hover handler */
                // onStarHoverOut={Function(nextValue, prevValue, name)} /* on icon hover out handler */
                // renderStarIcon={Function(nextValue, prevValue, name)} /* it should return string or react component */
                // renderStarIconHalf={Function(nextValue, prevValue, name)} /* it should return string or react component */
                // renderStarIcon={(index, value) => {return (<span><StarIcon color={ index <= value ? "#f44336" : "#F1F1F1"}/></span>);}}
                starColor={theme.palette.accent1Color} /* color of selected icons, default `#ffb400` */
                emptyStarColor={theme.palette.primary3Color} /* color of non-selected icons, default `#333` */
                editing={true} /* is component available for editing, default `true` */
              />
            </div>

            <TextField
              floatingLabelText="Review body"
              hintText="Something meaningful you'd like to share with the world"
              id="body"
              type="text"
              label="Review"
              multiLine={true}
              rows={3}
              value={this.props.formValue}
              onChange={this.props.setBody}      
              fullWidth={true}       
            />
            <br />

          </Dialog>
     )

  }

}

export default CustomForm 

// // import DatePicker from 'material-ui/DatePicker'
// import Slider from 'material-ui/Slider'

    //      {/* <Slider
    //           label="Score"
    //           id="score"
    //           min={0}
    //           max={100}
    //           type="range"
    //           value={this.props.formScore}
    //           onChange={this.props.onChange}        
    //       />

    //        <DatePicker hintText="When was it?" /> */}








// // import React from 'react'
// import { Field, reduxForm } from 'redux-form'

// const required = value => value ? undefined : 'Required'
// const maxLength = max => value =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined
// const maxLength15 = maxLength(15)
// const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
// const minValue = min => value =>
//   value && value < min ? `Must be at least ${min}` : undefined
// const minValue18 = minValue(18)
// const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
//   'Invalid email address' : undefined
// const tooOld = value =>
//   value && value > 65 ? 'You might be too old for this' : undefined
// const aol = value =>
//   value && /.+@aol\.com/.test(value) ?
//   'Really? You still use AOL for your email?' : undefined

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
//   <div>
//     <label>{label}</label>
//     <div>
//       <input {...input} placeholder={label} type={type}/>
//       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// )

// // const CustomForm = (props) => {
// //   const { handleSubmit, pristine, reset, submitting } = props
// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <Field name="username" type="text"
// //         component={renderField} label="Username"
// //         validate={[ required, maxLength15 ]}
// //       />
// //       <Field name="email" type="email"
// //         component={renderField} label="Email"
// //         validate={email}
// //         warn={aol}
// //       />
// //       <Field name="age" type="number"
// //         component={renderField} label="Age"
// //         validate={[ required, number, minValue18 ]}
// //         warn={tooOld}
// //       />
// //       <div>
// //         <button type="submit" disabled={submitting}>Submit</button>
// //         <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
// //       </div>
// //     </form>
// //   )
// // }

// const style = {
//   marginLeft: 10,
// }

// class CustomForm extends Component {

//   constructor(props) {
//     super(props)
//     console.log(props)
//     const { handleSubmit, pristine, reset, submitting } = props
//   }

//   render(){

//     const create = [ <RaisedButton style={style} label="Cancel" default={true} onClick={this.props.onClickClose}/>,
//                      <RaisedButton style={style} label="Save" disabled={this.props.submitting} primary={true} keyboardFocused={true} onClick={this.props.onClickSave}/>,
//                      <RaisedButton style={style} disabled={this.props.pristine || this.props.submitting} onClick={this.props.reset}>CLEAR</RaisedButton>]

//     const update = [ <RaisedButton style={style} label="Update" primary={true} keyboardFocused={true} onClick={this.props.onClickUpdate}/>,
//                      <RaisedButton style={style} label="Delete" secondary={true} onClick={this.props.onClickDelete}/>,
//                      <RaisedButton style={style} label="Cancel" default={true} onClick={this.props.onClickClose}/>]

//     const actions = this.props.isUpdate ? update : create

//     return (
//            <Dialog
//             open={this.props.onShow}
//             title="Review"
//             modal={false}
//             actions={actions}
//             autoScrollBodyContent={true}
//           >
//               {/*<TextField
//                 floatingLabelText="Review body"
//                 hintText="Something meaningful you'd like to share with the world"
//                 id="body"
//                 type="text"
//                 label="Review"
//                 multiLine={true}
//                 rows={3}
//                 value={this.props.formValue}
//                 onChange={this.props.onChange}      
//                 fullWidth={true}       
//               />
//               <br />
//               <TextField
//                   floatingLabelText="Review score"
//                   hintText="on a scale from 0 to 100"
//                   id="score"
//                   min={0}
//                   max={100}
//                   type="number"
//                   label="Score"
//                   value={this.props.formScore}
//                   onChange={this.props.onChange}      
//                   fullWidth={true}  
//               /> */}

//             <Field name="body" type="text"
//               component={renderField} label="Description"
//               validate={[ required ]}
//             />
//             <Field name="score" type="number"
//               component={renderField} label="Score"
//               validate={[ required, number, minValue18 ]}
//             />




//           {/* <TextField
//                 floatingLabelText="Review body"
//                 hintText="Something meaningful you'd like to share with the world"
//                 id="body"
//                 type="text"
//                 label="Review"
//                 multiLine={true}
//                 rows={3}
//                 value={this.props.formValue}
//                 onChange={this.props.onChange}      
//                 fullWidth={true}       
//               />
//               <br />
//               <TextField
//                   floatingLabelText="Review score"
//                   hintText="on a scale from 0 to 100"
//                   id="score"
//                   min={0}
//                   max={100}
//                   type="number"
//                   label="Score"
//                   value={this.props.formScore}
//                   onChange={this.props.onChange}      
//                   fullWidth={true}  
//               /> */}

//           </Dialog>
//      )

//   }

// }

// // export default CustomForm 



// export default reduxForm({
//   form: 'fieldLevelValidation' // a unique identifier for this form
// })(CustomForm)