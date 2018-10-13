import React, { Component } from 'react'
import {FormControl,FormGroup,ControlLabel, Alert} from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';

const CustomForm = (props) => {

		return (
            <div hidden={!props.onShow}>
                <Alert bsStyle="info">
                    <FormGroup controlId="body">
                        <ControlLabel>Enter your review for this artist</ControlLabel>
                        <FormControl
                            readOnly={props.editable?false:true}
                            type="text"
                            placeholder="Enter review"
                            value={props.formValue ? props.formValue : ''}
                            onChange={props.onChange} />  
                    </FormGroup>

                    <FormGroup controlId="score">
                        <ControlLabel>Enter your score for this artist</ControlLabel>
                        <FormControl
                            readOnly={props.editable?false:true}
                            type="text"
                            placeholder="Enter score"
                            value={props.formScore ? props.formScore : ''}
                            onChange={props.onChange} />  
                    </FormGroup>

                    <div>
                    {props.onClickSave ? 
                    <div>
                        <RaisedButton primary={true} onClick={props.onClickSave}>Save</RaisedButton>
                        <RaisedButton onClick={props.onClickClose}>Close</RaisedButton>
                    </div>
					: 
					props.onClickDelete ? 
					<div>
                        <RaisedButton primary={true} onClick={props.onClickDelete}>Delete</RaisedButton>
                        <RaisedButton primary={true} onClick={props.onClickUpdate}>Update</RaisedButton>
                        <RaisedButton onClick={props.onClickClose}>Close</RaisedButton>
                    </div>

                    : undefined }

                    </div>
                </Alert>
            </div>
		)

}

export default CustomForm;