import { connect } from "react-redux";
import React, { Component } from 'react';

const style = {
    paddingTop: 20,
    // color: 'white',
}

class Policy extends Component {

    render() {
        return (
            <div style={style}> 
                <h2>{this.props.locales.locales.policy.title}</h2>
                <hr />
                <br />
                <p>{this.props.locales.locales.policy.p1}</p>
                <p>{this.props.locales.locales.policy.p2}</p>
                <p>{this.props.locales.locales.policy.p3}</p>
                <p>{this.props.locales.locales.policy.p4}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    locales: state.locales
  };
};

export default connect(mapStateToProps, null)(Policy);
