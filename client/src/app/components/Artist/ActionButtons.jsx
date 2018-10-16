import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const floatRight = {
  float: 'right'
}

const ActionButtons = (props) => {

	if (props.connected) {
		if(props.enabled){
			return(<RaisedButton style={floatRight} label='New review' secondary={true} onClick={props.new}/>)
		}else{
			return(<RaisedButton style={floatRight} label='New review' secondary={true} onClick={props.new} disabled/>)
		}
	} else {
		return (<RaisedButton style={floatRight} label='Wanna leave a review ?' primary={true} onClick={props.redirect}/>)
	}

}

export default ActionButtons