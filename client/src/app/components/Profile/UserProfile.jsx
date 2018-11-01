import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { initUserReviews, loadingUserReviews, failedUserReviews, setUserReviews, updateUserReview, deleteUserReview, selectUserReview} from '../../actions/reviews'
import { initUserProfile, loadingUserProfile, failedUserProfile, setUserProfile } from '../../actions/userProfile'

import followUserMutation from '../../mutations/followUser'

import { onUpdate, onDelete, setScore, setBody, setMedia, unsetMedia, handleModalShow, handleModalClose} from '../Reviews/Utils'

import UserProfileQuery from '../../queries/UserProfileSchema'
import ReviewList from '../Reviews/ReviewList'
import ReviewForm from '../Reviews/ReviewForm'

import SocialList from './SocialList'

import EncoreLoader from '../EncoreLoader'
import Paper from 'material-ui/Paper'
import strings from '../../locales/strings'
import RaisedButton from 'material-ui/RaisedButton';
import Grid from '@material-ui/core/Grid'
import Divider from 'material-ui/Divider'
import _ from 'underscore'

const padded = {
    padding: 20,
}

const style = {
    objectFit: 'cover',
    width: 80,
    height: 80,
    borderRadius: 40,
}

const inline = {
    display: 'inline-block'
}

const clear = {
    clear: 'both'
}

// const circle = {
//   height: 100,
//   width: 100,

// };

const right = {
    float: 'right'
}

const marginRight = {
    display: 'inline-block',
    marginRight: 16,
}

const rootz = {
    flexGrow: 1,
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
        this.media = setMedia.bind(this)
        this.removeMedia = unsetMedia.bind(this)

        this.onClickFollow.bind(this)

        this.state = {
            showModal: false,
            enabledButton: true,
            review:null,
            isUpdate:false,
            followers: null,
            following_users: null
        };
    }

    componentWillMount(){
        this.props.loadingUserReviews();
        this.props.loadingUserProfile();

        this.props.client.networkInterface.query({query: UserProfileQuery, variables: {id: this.props.match.params.id }, fetchPolicy: 'network-only'})
        .then(
            (res) => {
                console.log(res)
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
 
    onClickFollow(){
        this.props.client.mutate({mutation: followUserMutation, variables: {follower_id: this.props.userInfo.user_id, followee_id: this.props.userProfile.userProfile.id}}).then(
        (res) => {
              this.props.setUserProfile(res.data.followUser.user)
              // this.setState({ loading: false });
        },
        (err) => { }
        );
    }

    alreadyFollows(){
        let followeeId = this.props.userInfo.user_id
        let exists = _.find( this.props.userProfile.userProfile.followers, function( follower, followee ){
          return Number(follower.id) === Number(followeeId);
        } );
        return exists ? true : false
    }

    onCurrentUserProfile(){
        return Number(this.props.userInfo.user_id) === Number(this.props.match.params.id)
    }

    render() {
        const user = this.onCurrentUserProfile() ? this.props.userInfo : this.props.userProfile.userProfile

        console.log(user)

        return (
            <div>
                {this.state.loading ? <EncoreLoader /> : this.props.reviews.error ? <h1>Error...</h1> : 

                <div>                

                    <div style={rootz}>
                      <Grid container spacing={24}>
                        <Grid item xs={12} sm={5} md={3} style={{textAlign: 'center'}}>

                            <Paper>

                                <div style={padded}>
                                    <img alt='...' style={style} src={user.profile_picture?user.profile_picture:''}/>
                                    <h2 style={{marginTop:3}}>
                                        {user.display_name}
                                        {/* strings.formatString(this.props.locales.locales.reviews, {username: user.display_name})*/}
                                     </h2>
                                    { this.props.userProfile.userProfile !== null ? Object.keys(this.props.reviews.reviews).length + " experiences" : ""}
                                    {/* user.email?user.email:'' */}
                                </div>

                                <Divider />


                                    <div style={{textAlign: 'left'}}>
                                        <SocialList 
                                            followingUsers={this.props.userProfile.userProfile !== null ? this.props.userProfile.userProfile.following_users : undefined}
                                            followers={this.props.userProfile.userProfile !== null ? this.props.userProfile.userProfile.followers : undefined}/>

                                    <br />
                                {

                                    this.onCurrentUserProfile() ? 
                                    null
                                    :
                                    <RaisedButton 
                                        onClick={ (e) => this.onClickFollow(e) }
                                        // onClick={ (e) => this.alreadyFollows(e) }
                                        default={true}
                                        label={this.alreadyFollows() ? "unfollow" : "follow"}/> 
                                }

                                    </div>

                            </Paper>

                        </Grid>
                        <Grid item xs={12} sm={7} md={9}>

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
                                        formTitle={this.state.review!=null?this.state.review.artist_name:''}
                                        formValue={this.state.review!==null?this.state.review.body:''}
                                        formScore={this.state.review!==null?this.state.review.score:''}
                                        formMedia={this.state.review!=null?this.state.review.media:null}
                                        setBody={(e)=>this.body(e, this)}
                                        setScore={(value)=>this.score(value, this)}
                                        setMedia={(value)=>this.media(value, this)}
                                        unsetMedia={(value) => this.removeMedia(this)}
                                        onClickDelete={(e)=>this.delete(e, this)}
                                        onClickUpdate={(e)=>this.update(e, this)}
                                        onClickClose={(e) => this.close(this)}
                                    />
                                    </form>
                                </div>
                            </div>

                        </Grid>
                      </Grid>
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
