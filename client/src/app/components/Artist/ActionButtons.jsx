import { connect } from 'react-redux'
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentEdit from 'material-ui/svg-icons/image/edit';

const action = {
	float: 'right',
	display: 'inline-block',
	marginTop: -32,
	marginRight: 20,
}

const ActionButtons = (props) => {
	if (props.connected) {
		if(props.enabled){
			return (
			<FloatingActionButton style={action} onClick={props.new}><ContentAdd /></FloatingActionButton>)

		}else{
			return(<FloatingActionButton style={action} onClick={props.edit} ><ContentEdit /></FloatingActionButton>)
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
