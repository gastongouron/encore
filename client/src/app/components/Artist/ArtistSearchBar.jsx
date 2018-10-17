import React, { Component } from 'react'
import TextField from 'material-ui/TextField';

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
	  this.setState({tag: tagname.tag})
	}

	render() {
		return (
	        <TextField
				onChange={event => this.onInputChange(event.target.value)}
	            hintText={"Search..."} // artist sample
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

export default SearchBar;