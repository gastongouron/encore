import { connect } from 'react-redux'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import theme from '../../theme'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

const floatRight = {
  float: 'right'
}

const ActionButtons = (props) => {
	console.log(props)
	if (props.connected) {
		if(props.enabled){
			return(
			<div>
				<RaisedButton style={floatRight} label={props.locales.locales.new} primary={true} onClick={props.new}/>
		
		      <Button variant="fab" color="primary" aria-label="Add">
		        <AddIcon />
		      </Button>
		      <Button variant="fab" color="secondary" aria-label="Edit">
		        <Icon>edit_icon</Icon>
		      </Button>

		     </div>

				)


		}else{
			return(<RaisedButton style={floatRight} label={props.locales.locales.new} primary={true} onClick={props.new} disabled/>)
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
