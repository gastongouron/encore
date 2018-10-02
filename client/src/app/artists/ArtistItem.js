import React, { Component } from 'react';

class Artist extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.description} min</td>
            </tr>
        );
    }
}

export default Artist;