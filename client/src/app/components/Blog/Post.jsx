import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import Disqus from 'disqus-react'
import __ from 'lodash';

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
        const disqusShortname = 'encore-2';
        const disqusConfig = {
            url: '/posts/1',
            identifier: 1,
            title: 'cool',
        };
        return (
            <div> cool
                <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
                    Comments
                </Disqus.CommentCount>
                 <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                 <br />
                <br />
                <br />
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
