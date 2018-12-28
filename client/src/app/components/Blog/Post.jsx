import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { initPost, loadingPost, failedPost, setPost } from '../../actions/postDetail'
import EncoreLoader from '../EncoreLoader'
import postQuery from '../../queries/postQuery'
import PostItem from './PostItem'

class Post extends Component {

    constructor(props){
        super(props);
        this.state = {
            postDetail: this.props.postDetail,
            locale: this.props.locales.locales
          }
    }

	componentWillMount(){
        this.props.loadingPost();
        this.props.client.query({query: postQuery, fetchPolicy: 'network-only', variables: {id: this.props.match.params.id}}).then(
            (res) => {
                console.log('RES ->', res.data.postDetail)
                this.props.setPost(res.data.postDetail);
                this.setState({postDetail: res.data.postDetail})
            },
            (err) => {
                this.props.failedPost(err.data);
            }
        );     
    }

    render() {
        return (
            <div> { this.props.postDetail.loading 
                ? 
                    <EncoreLoader />

                : this.props.postDetail.error ? <h1>Error...</h1> : 
                    <div style={{margin: '0 auto', maxWidth: 840, padding: 0}}>
                        <PostItem post={this.props.postDetail.postDetail} />
                    </div> 
                }
            <br/>
            <br/>
            <br/>
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
        setPost: (postDetail) => dispatch(setPost(postDetail))
    };
};

export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Post) );
