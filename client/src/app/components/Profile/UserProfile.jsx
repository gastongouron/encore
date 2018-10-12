import React, { Component } from 'react';
import {connect} from "react-redux"
import { withApollo } from 'react-apollo'
// import Avatar from 'react-avatar';
import UserProfileQuery from '../../queries/UserProfileSchema'
import { 
    initUserReviews, 
    loadingUserReviews, 
    failedUserReviews, 
    setUserReviews,
    selectUserReview} from '../../actions/reviews'

import { 
    initUserProfile, 
    loadingUserProfile, 
    failedUserProfile, 
    setUserProfile 
} from '../../actions/userProfile'

import ReviewList from '../Reviews/ReviewList'

const style = {
    objectFit: 'cover',
    width: 100,
    height: 100,
    borderRadius: 50,
}

class Profile extends Component {
    constructor(props){
        super(props);
        this.gotoReviewDetail = this.gotoReviewDetail.bind(this);

        this.state = {
           seletedReview: null,
           enabledButton: true,
          }
    }

    componentWillMount(){
        this.props.loadingUserReviews();
        this.props.loadingUserProfile();
        this.props.client.networkInterface.query({query: UserProfileQuery, variables: {id: this.props.match.params.id }, fetchPolicy: 'network-only'})
        .then(
            (res) => {
                this.props.setUserReviews(res.data.user.reviews);
                this.props.setUserProfile(res.data.user)
                this.setState({ loading: false });
            },
            (err) => {
                this.props.failedUserReviews(err.data);
                this.props.failedUserProfile(err.data);
            }
        );
    }

    onCurrentUserProfile(){
        return this.props.userInfo.user_id == this.props.match.params.id  
    }

    gotoReviewDetail(review){
        if (review.user_id == this.props.userInfo.user_id){
            this.props.selectUserReview(review);

            let id = review.id
            this.props.history.push(`/reviews/${id}`)
        }
    }

    render() {
        const user = this.onCurrentUserProfile() ? this.props.userInfo : this.props.userProfile.userProfile
        console.log('in RENDER LOOP')
        console.log(user.profile_picture)
        return (
            <div>
            {this.state.loading ? <h1>Loading...</h1> : this.props.reviews.error ? <h1>Error...</h1> :
                <div>                
                    <div>
                    {/* {this.onCurrentUserProfile() ? <div>Current user</div>: <div>Other user</div>} */}
                    </div>
                    <div>
                        <img alt='meaningful text' style={style} src={user.profile_picture?user.profile_picture:''}/>
                        <div>{user.display_name?user.display_name:''}</div>
                        <div>{user.email?user.email:''}</div>
                    </div>
                    <div>
                            <div>
                                <h1>Reviews</h1>
                                <div>
                                    <ReviewList
                                        onReviewSelect={selectedReview =>this.gotoReviewDetail(selectedReview)}
                                        reviews={this.props.reviews.reviews}/>
                                </div>
                            </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { reviews: state.reviews,
             userProfile: state.userProfile,
             userInfo: state.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initUserProfile: () => dispatch(initUserProfile()),
        loadingUserProfile: () => dispatch(loadingUserProfile()),
        failedUserProfile: (message) => dispatch(failedUserProfile(message)),
        setUserProfile: (user) => dispatch(setUserProfile(user)),
        initUserReviews: () => dispatch(initUserReviews()),
        loadingUserReviews: () => dispatch(loadingUserReviews()),
        failedUserReviews: (message) => dispatch(failedUserReviews(message)),
        setUserReviews: (reviews) => dispatch(setUserReviews(reviews)),
        selectUserReview: (review) => dispatch(selectUserReview(review))
    };
};
  
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Profile) );
