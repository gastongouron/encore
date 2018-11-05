import { connect } from "react-redux";
import React, { Component } from 'react';
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

const padded = {
    padding: 20,
    // color: 'white',
}


class Policy extends Component {

    render() {
        return (
            <Paper zDepth={1}>
                <div style={padded}>
                    <h2>{this.props.locales.locales.policy.title}</h2>
                </div>
                <Divider />
                <div style={padded}>
                    <p>{this.props.locales.locales.policy.p1}</p>
                    <p>{this.props.locales.locales.policy.p2}</p>
                    <p>{this.props.locales.locales.policy.p3}</p>
                    <p>{this.props.locales.locales.policy.p4}</p>
                </div>
            </Paper>
        )
    }
}

const mapStateToProps = state => {
  return {
    locales: state.locales
  };
};

export default connect(mapStateToProps, null)(Policy);
