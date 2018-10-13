import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { initUserReviews, loadingUserReviews, failedUserReviews, setUserReviews, updateUserReview, deleteUserReview, selectUserReview} from '../../actions/reviews'
import { initUserProfile, loadingUserProfile, failedUserProfile, setUserProfile } from '../../actions/userProfile'
import { handleUpdateChange, handleModalUpdateShow, handleModalUpdateClose, onUpdate, onDelete } from '../Reviews/Utils'

import UserProfileQuery from '../../queries/UserProfileSchema'
import ReviewList from '../Reviews/ReviewList'
import ReviewForm from '../Reviews/ReviewForm'

const style = {
    objectFit: 'cover',
    width: 100,
    height: 100,
    borderRadius: 50,
}

class Profile extends Component {
    constructor(props){
        super(props);
        this.update = onUpdate.bind(this)
        this.delete = onDelete.bind(this)
        this.change = handleUpdateChange.bind(this)
        this.closeUpdate = handleModalUpdateClose.bind(this)
        this.showUpdate = handleModalUpdateShow.bind(this)

        this.state = {
            showModalUpdate: false,
            selected:null,
            newReviewBody:'',
            newReviewScore:''
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

    render() {
        const user = this.onCurrentUserProfile() ? this.props.userInfo : this.props.userProfile.userProfile
        console.log('reviews in user profile', this.props.reviews.reviews)
        return (
            <div>
            {this.state.loading ? <h1>Loading...</h1> : this.props.reviews.error ? <h1>Error...</h1> :
                <div>                
                    <div>
                        <img alt='meaningful text' style={style} src={user.profile_picture?user.profile_picture:''}/>
                        <div>{user.display_name?user.display_name:''}</div>
                        <div>{user.email?user.email:''}</div>
                    </div>
                    <div>
                        <div>
                            {this.onCurrentUserProfile() ? 
                                <h1>Your Reviews</h1>    
                            :
                                <h1>{user.first_name + "'s Reviews"}</h1>                                        
                            }
                            <div>
                                <ReviewList
                                    onReviewSelect={selectedReview =>this.showUpdate(selectedReview, this)}
                                    reviews={this.props.reviews.reviews}
                                    user={this.props.userInfo}
                                    match={this.props.match.url}
                                />
                            </div>
                        </div>
                        <div>
                            <form>
                                <ReviewForm
                                    onShow={this.state.showModalUpdate}
                                    onHide={(e) => this.closeUpdate(this) }
                                    editable={true}
                                    formValue={this.state.selected!==null?this.state.selected.body:''}
                                    formScore={this.state.selected!==null?this.state.selected.score:''}
                                    onChange={(e)=>this.change(e,this)}
                                    onClickDelete={(e)=>this.delete(e, this)}
                                    onClickUpdate={(e)=>this.update(e, this)}
                                    onClickClose={(e) => this.closeUpdate(this) }/>
                            </form>
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
             userInfo: state.currentUser,
             selectedUserReview: state.reviews.selected
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initUserProfile: () => dispatch(initUserProfile()),
        loadingUserProfile: () => dispatch(loadingUserProfile()),
        failedUserProfile: (message) => dispatch(failedUserProfile(message)),
        setUserProfile: (user) => dispatch(setUserProfile(user)),
        updateUserReview: (review) => dispatch(updateUserReview(review)),
        deleteUserReview: (review) => dispatch(deleteUserReview(review)),
        initUserReviews: () => dispatch(initUserReviews()),
        loadingUserReviews: () => dispatch(loadingUserReviews()),
        failedUserReviews: (message) => dispatch(failedUserReviews(message)),
        setUserReviews: (reviews) => dispatch(setUserReviews(reviews)),
        selectUserReview: (review) => dispatch(selectUserReview(review))
    };
};
  
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Profile) );
