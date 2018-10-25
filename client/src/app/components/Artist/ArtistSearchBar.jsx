import { connect } from 'react-redux'
import React, { Component } from 'react'
import TextField from 'material-ui/TextField';

// const style = {
// 	color: "white",
// }

const underlineStyle = {
    borderColor: '#F1F1F1',
}

const underlineFocusStyle = {
    borderColor: 'white',
}

const hintStyle = {
    color: 'white',
}


class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.state = { term: '', tag: '' }
		this.props.onRef(this)
	}

	componentDidMount() {
	  this.props.onRef(this)
	}
	
	componentWillUnmount() {
	  this.props.onRef(null)
	}
	
	method(tagname) {
	  this.setState({tag: tagname.tag.trim()})
	}

	render() {
		return (
	        <TextField
				hintStyle={hintStyle}
				inputStyle={hintStyle}
	        	underlineStyle={underlineStyle}
				underlineFocusStyle={underlineFocusStyle}
				onChange={event => this.onInputChange(event.target.value)}
	            hintText={this.props.locales.locales.search} // artist sample
	            fullWidth={true}
				value={this.state.tag ? this.state.tag : this.state.term}
	            name='filterValue'
	        />
		)
	}

	onInputChange(term) {
		this.setState({tag: ''})
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
