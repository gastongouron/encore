import React, { Component } from 'react'
import TextField from 'material-ui/TextField';

class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.state = { term: '' }
	}

	render() {
		return (
	        <TextField
				onChange={event => this.onInputChange(event.target.value)}
	            hintText="Search..." // artist sample
	            fullWidth={true}
				value={this.state.term}
	            name='filterValue'
	        />
		)
	}

	onInputChange(term) {
		this.setState({term})
		this.props.onSearchTermChange(term)
	}

}

export default SearchBar;