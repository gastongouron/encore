import { connect } from 'react-redux'
import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import theme from '../app/theme'
import Search from 'material-ui/svg-icons/action/search';

const style = {
	color: theme.palette.secondaryTextColor,
}

const underlineStyle = {
    borderColor: theme.palette.secondaryTextColor,
}

const underlineFocusStyle = {
    borderColor: theme.palette.secondaryTextColor,
}

const hintStyle = {
    color: theme.palette.secondaryTextColor,
}


class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.state = { term: ''}
		this.props.onRef(this)
	}

	componentDidMount() {
	  this.props.onRef(this)
	}
	
	componentWillUnmount() {
	  this.props.onRef(null)
	}
	

	render() {
		return (
	        <TextField
				hintStyle={hintStyle}
				inputStyle={hintStyle}
	        	underlineStyle={underlineStyle}
				underlineFocusStyle={underlineFocusStyle}
				onChange={event => this.onInputChange(event.target.value)}
	            hintText={<div><Search color={theme.palette.secondaryTextColor} viewBox="0 -10 28 28"/>{this.props.locales.locales.userSearch}</div>} // artist sample
	            fullWidth={true}
				value={this.state.tag ? this.state.tag : this.state.term}
	            name='filterValue'
	        />
		)
	}

	onInputChange(term) {
		this.setState({term})
		this.props.onSearchTermChange(term)
	}

}


const mapStateToProps = state => {
    return { 
        locales: state.locales
    };
};

export default connect(mapStateToProps, null)(SearchBar);
