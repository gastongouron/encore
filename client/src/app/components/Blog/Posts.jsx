import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import {Link} from 'react-router-dom';

class Artists extends Component {

    // Fetch all posts and display a list such as
    // Date -> Title -> Body -> Author -> Image
    // Add a onclick event to navigate to specific post route :)

    constructor(props){
        super(props);
        this.state = {

          }

    }

	componentWillMount(){

    }

    render() {
        return (
            <div> Post list<br/>
                <Link to='/posts/1'>Post1</Link>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        locales: state.locales
     };
};
  
export default withApollo( connect(mapStateToProps, null)(Artists) );
