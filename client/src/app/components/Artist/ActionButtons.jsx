import { connect } from 'react-redux'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentEdit from 'material-ui/svg-icons/image/edit';

const floatRight = {
  float: 'right'
}

const action = {
	float: 'right',
	marginTop: -30,
	marginRight: 15,
}

const ActionButtons = (props) => {
	console.log(props)
	if (props.connected) {
		if(props.enabled){
			return (
			<FloatingActionButton style={action} onClick={props.new}><ContentAdd /></FloatingActionButton>)

		}else{
			return(<FloatingActionButton style={action} onClick={props.new} disabled><ContentAdd /></FloatingActionButton>)
		}
	} else {
		return (<FloatingActionButton style={action} secondary={true} onClick={props.redirect}><ContentAdd /></FloatingActionButton>)
	}

}

const mapStateToProps = state => {
    return { 
        locales: state.locales
    };
};

export default connect(mapStateToProps, null)(ActionButtons);
