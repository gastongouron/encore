import React, { Component } from 'react';
import { connect } from "react-redux";

class NotFound extends Component {
	render() {
	  return (
	    <div>
	      {this.props.locales.locales.notFound}
	    </div>
	  );
	}
};

const mapStateToProps = state => { return { locales: state.locales } };

export default connect(mapStateToProps, null)(NotFound);
