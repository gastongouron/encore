import { connect } from 'react-redux'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const floatRight = {
  float: 'right'
}

const ActionButtons = (props) => {
	console.log(props)
	if (props.connected) {
		if(props.enabled){
			return(<RaisedButton style={floatRight} label='New review' primary={true} onClick={props.new}/>)
		}else{
			return(<RaisedButton style={floatRight} label='New review' primary={true} onClick={props.new} disabled/>)
		}
	} else {
		return (<RaisedButton style={floatRight} label='Wanna leave a review ?' secondary={true} onClick={props.redirect}/>)
	}

}

const mapStateToProps = state => {
    return { 
        locales: state.locales
    };
};

export default connect(mapStateToProps, null)(ActionButtons);
