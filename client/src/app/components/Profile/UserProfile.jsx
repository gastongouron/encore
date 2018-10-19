import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { initUserReviews, loadingUserReviews, failedUserReviews, setUserReviews, updateUserReview, deleteUserReview, selectUserReview} from '../../actions/reviews'
import { initUserProfile, loadingUserProfile, failedUserProfile, setUserProfile } from '../../actions/userProfile'
import { onUpdate, onDelete, setScore, setBody, handleModalShow, handleModalClose} from '../Reviews/Utils'

import UserProfileQuery from '../../queries/UserProfileSchema'
import ReviewList from '../Reviews/ReviewList'
import ReviewForm from '../Reviews/ReviewForm'

import EncoreLoader from '../EncoreLoader'
import Paper from 'material-ui/Paper'
import strings from '../../locales/strings'

const paddedAndMarginBottom = {
    padding: 20,
    marginBottom: 20,
}

const style = {
    objectFit: 'cover',
    width: 44,
    height: 44,
    borderRadius: 22,
}

const inline = {
    display: 'inline-block'
}

const marginRight = {
    display: 'inline-block',
    marginRight: 16,
}

class Profile extends Component {
    constructor(props){
        super(props);

        this.update = onUpdate.bind(this)
        this.delete = onDelete.bind(this)
        this.body = setBody.bind(this)
        this.score = setScore.bind(this)
        this.show = handleModalShow.bind(this)
        this.close = handleModalClose.bind(this)

        this.state = {
            showModal: false,
            enabledButton: true,
            review:null,
            isUpdate:false,
        };
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
        return Number(this.props.userInfo.user_id) === Number(this.props.match.params.id)
    }

    render() {
        const user = this.onCurrentUserProfile() ? this.props.userInfo : this.props.userProfile.userProfile
        return (
            <div>
                {this.state.loading ? <EncoreLoader /> : this.props.reviews.error ? <h1>Error...</h1> :

                <div>                
                    <Paper style={paddedAndMarginBottom}>
                        <div style={marginRight}>
                            <img alt='...' style={style} src={user.profile_picture?user.profile_picture:''}/>
                        </div>
                        <div style={inline}>
                            <h1>
                                {strings.formatString(this.props.locales.locales.reviews, {username: user.display_name})}
                             </h1>
                            {user.email?user.email:''}
                        </div>
                    </Paper>

                    <div>
                        <div>
                            <div>
                                <ReviewList
                                    current={this.onCurrentUserProfile()}
                                    onReviewSelect={selectedReview =>this.show(selectedReview, this)}
                                    reviews={this.props.reviews.reviews}
                                    user={this.props.userInfo}
                                    match={this.props.match.url}
                                />
                            </div>
                        </div>
                        <div>
                            <form>
                            <ReviewForm
                                isUpdate={this.state.isUpdate}
                                onShow={this.state.showModal}
                                onHide={(e) => this.close(this)}
                                editable={true}
                                formValue={this.state.review!==null?this.state.review.body:''}
                                formScore={this.state.review!==null?this.state.review.score:''}
                                setBody={(e)=>this.body(e, this)}
                                setScore={(value)=>this.score(value, this)}
                                onClickDelete={(e)=>this.delete(e, this)}
                                onClickUpdate={(e)=>this.update(e, this)}
                                onClickClose={(e) => this.close(this)}
                            />
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
             selectedUserReview: state.reviews.review,
             locales: state.locales
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
