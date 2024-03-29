import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { initPosts, loadingPosts, failedPosts, setPosts } from '../../actions/posts'
import postsQuery from '../../queries/postsQuery'
import EncoreLoader from '../EncoreLoader'
import PostsList from './PostsList'
// import {Link} from 'react-router-dom';

class Posts extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts: this.props.posts.posts,
            locales: this.props.locales.locales,
          }
          console.log(props)

    }

	componentWillMount(){
        this.props.loadingPosts();
        this.props.client.query({query: postsQuery, fetchPolicy: 'network-only'}).then(
            (res) => {
                this.props.setPosts(res.data.posts);
                this.setState({posts: res.data.posts})
            },
            (err) => {
                this.props.failedPosts(err.data);
            }
        );
    }

    render() {
        return (
            <div> { this.props.posts.loading 
                ? 
                    <EncoreLoader />

                : this.props.posts.error ? <h1>Error...</h1> : 
                    <div>
                        <PostsList posts={this.props.posts.posts}/>
                    </div> 
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        posts: state.posts,
        locales: state.locales
     };
};

const mapDispatchToProps = dispatch => {
    return {
        initPosts: () => dispatch(initPosts()),
        loadingPosts: () => dispatch(loadingPosts()),
        failedPosts: (message) => dispatch(failedPosts(message)),
        setPosts: (posts) => dispatch(setPosts(posts))
    };
};
  
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Posts) );
