import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import Disqus from 'disqus-react'
import { initPost, loadingPost, failedPost, setPost } from '../../actions/postDetail'
import EncoreLoader from '../EncoreLoader'
import postQuery from '../../queries/postQuery'
import PostItem from './PostItem'

class Post extends Component {

    constructor(props){
        super(props);
        this.state = {
            postDetail: this.props.postDetail.postDetail,
            locale: this.props.locales.locales
          }
    }

	componentWillMount(){
        this.props.loadingPost();
        this.props.client.query({query: postQuery, fetchPolicy: 'network-only', variables: {id: this.props.match.params.id}}).then(
            (res) => {
                this.props.setPost(res.data.postDetail);
                this.setState({post: res.data.postDetail})
            },
            (err) => {
                this.props.failedPost(err.data);
            }
        );        
    }

    render() {

        const disqusShortname = 'encore-2';
        const disqusConfig = {
            url: window.location.href,
            identifier: this.props.postDetail.post.id,
            title: this.props.postDetail.post.title,
        };

        return (
            <div> { this.props.postDetail.loading 
                ? 
                    <EncoreLoader />

                : this.props.postDetail.error ? <h1>Error...</h1> : 
                    <div>

                        <PostItem post={this.props.postDetail.post} />

                        <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
                            Comments
                        </Disqus.CommentCount>
                        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                    </div> 
                }
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        postDetail: state.postDetail,
        locales: state.locales
     };
};

const mapDispatchToProps = dispatch => {
    return {
        initPost: () => dispatch(initPost()),
        loadingPost: () => dispatch(loadingPost()),
        failedPost: (message) => dispatch(failedPost(message)),
        setPost: (post) => dispatch(setPost(post))
    };
};

export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Post) );
