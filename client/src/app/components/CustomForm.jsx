import React, { Component } from 'react'
import {Modal,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';

const CustomForm = (props) => {

		return (
			<Modal show={props.onShow} onHide={props.onHide}>
                <Modal.Header closeButton>
                <Modal.Title>New review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                    <FormGroup controlId="formBasicText">
                        <ControlLabel>Enter your review for this artist</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter review"
                            value={props.formValue ? props.formValue : undefined}
                            onChange={props.onChange} />   
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                	
                	{props.onClickSave ? 
                    	<RaisedButton primary={true} onClick={props.onClickSave}>Save</RaisedButton>
					: 
					props.onClickDelete ? 
					
					<div>
                    	<RaisedButton primary={true} onClick={props.onClickDelete}>Delete</RaisedButton>
                    	<RaisedButton primary={true} onClick={props.onClickUpdate}>Update</RaisedButton>
                    </div>

                    : undefined }

                    <RaisedButton onClick={props.onClickClose}>Close</RaisedButton>
                </Modal.Footer>
            </Modal>

		)

}

export default CustomForm;