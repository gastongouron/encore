import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { initUserReviews, loadingUserReviews, failedUserReviews, setUserReviews, updateUserReview, deleteUserReview, selectUserReview} from '../../actions/reviews'
import { initUserProfile, loadingUserProfile, failedUserProfile, setUserProfile } from '../../actions/userProfile'

import followUserMutation from '../../mutations/followUser'

import { onUpdate, onDelete, setPerformanceScore, setGenerosityScore, setTechnicsScore, setAmbiantScore, setBody, setMedia, unsetMedia, handleModalShow, handleModalClose} from '../Reviews/Utils'

import UserProfileQuery from '../../queries/UserProfileSchema'
import ReviewList from '../Reviews/ReviewList'
import ReviewForm from '../Reviews/ReviewForm'

import SocialList from './SocialList'

import EncoreLoader from '../EncoreLoader'
import Paper from 'material-ui/Paper'
// import strings from '../../locales/strings'
import RaisedButton from 'material-ui/RaisedButton';
// import Grid from '@material-ui/core/Grid'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader';
import _ from 'underscore'

import socialSubscription from '../../subscriptions/socialSubscription'

const style = {
    objectFit: 'cover',
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
    background: 'white',
}

const paperStyle = {
  height: 120,
  width: 120,
  marginTop: -70,
  textAlign: 'center',
  display: 'inline-block',
};

const right = {
    float: 'right'
}

class Profile extends Component {
    constructor(props){
        super(props);

        this.update = onUpdate.bind(this)
        this.delete = onDelete.bind(this)
        this.body = setBody.bind(this)
        this.performanceScore = setPerformanceScore.bind(this)
        this.generosityScore = setGenerosityScore.bind(this) 
        this.technicsScore = setTechnicsScore.bind(this)  
        this.ambiantScore = setAmbiantScore.bind(this)                     
        this.show = handleModalShow.bind(this)
        this.close = handleModalClose.bind(this)
        this.media = setMedia.bind(this)
        this.removeMedia = unsetMedia.bind(this)

        this.onClickFollow.bind(this)
        this.getUser.bind(this)

        this.state = {
            showModal: false,
            enabledButton: true,
            review:null,
            isUpdate:false,
            followers: null,
            following_users: null,
            disabled: false,
            observable: null,
            subscription: null,
        };
    }

    getUser(id){
        this.props.client.networkInterface.query({query: UserProfileQuery, variables: {id: id }, fetchPolicy: 'network-only'})
        .then(
            (res) => {
                this.props.setUserReviews(res.data.user.reviews);
                this.props.setUserProfile(res.data.user)
            },
            (err) => {
                this.props.failedUserReviews(err.data);
                this.props.failedUserProfile(err.data);
            }
        );
    }

    componentWillMount(){
        this.props.loadingUserReviews();
        this.props.loadingUserProfile();
        let observable = this.props.client.subscribe({ query: socialSubscription, variables: {user_id: this.props.match.params.id} })
        this.setState({observable: observable})
        this.getUser(this.props.match.params.id)
    }
 
    componentDidMount(){
        const ctx = this
        const subscription = this.state.observable.subscribe({
            next(data) {
                if(data){
                    ctx.props.setUserProfile(data.userWasChanged);
                    ctx.props.setUserReviews(data.userWasChanged.reviews)
                }
            },
            error(err) { console.error('err', err); },
          });
        this.setState({subscription: subscription})
    }

    componentWillUnmount(){
        this.state.subscription.unsubscribe()
    }

    onClickFollow(){
        this.setState({disabled: true})
        this.props.client.mutate({mutation: followUserMutation, variables: {follower_id: this.props.userInfo.user_id, followee_id: this.props.userProfile.userProfile.id}}).then(
        (res) => {
              this.props.setUserProfile(res.data.followUser.user)
              this.setState({disabled: false})
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

        const user = this.props.userProfile.userProfile

        return (
            <div>
                {this.state.loading ? <EncoreLoader /> : this.props.reviews.error ? <h1>Error...</h1> : 
                <div>                
                    <Paper>
                        <div style={{padding: 16, paddingBottom: 4, marginTop: 60, textAlign: 'center'}}>
                            <Paper style={paperStyle} zDepth={1} circle={true}>
                                <img alt='...' style={style} src={user.profile_picture?user.profile_picture:''}/>
                            </Paper>
                            <h2 style={{marginTop:16, marginBottom: 0}}>
                                {user.display_name}
                                {/* strings.formatString(this.props.locales.locales.reviews, {username: user.display_name})*/}
                             </h2>
                            { user.email?user.email:'' }
                        </div>
                        <div style={{padding: 16, paddingBottom: 0}}>
                             {this.props.userInfo.isLoggedIn ? 
                                this.onCurrentUserProfile() ? null : <RaisedButton style={right} disabled={this.state.disabled} default={this.alreadyFollows() ? true : false} primary={!this.alreadyFollows() ? true : false} onClick={ (e) => this.onClickFollow(e) } label={this.alreadyFollows() ? this.props.locales.locales.unfollow : this.props.locales.locales.follow}/> 
                            : 
                                <RaisedButton style={right} secondary={true} onClick={ () => this.props.history.push('/users/getstarted') } label={this.props.locales.locales.follow}/>
                            } 

                            <Subheader style={{paddingLeft: 0}}>{ user !== null ? Object.keys(this.props.reviews.reviews).length + " experiences" : ""}</Subheader>
                        </div>

                        <Divider />
                        <div>
                            <SocialList 
                                followingUsers={user !== null ? user.following_users : undefined}
                                updateUser={userId => this.getUser(userId)}
                                followers={user !== null ? user.followers : undefined}/>
                        </div>
                    </Paper>
                    <br />
                    <div>
                        <div>
                            <div>
                                <ReviewList
                                    current={this.onCurrentUserProfile()}
                                    onReviewSelect={selectedReview =>this.show(selectedReview, this)}
                                    reviews={this.props.reviews.reviews}
                                    onCurrentUserProfile={this.onCurrentUserProfile()}
                                    match={this.props.match}
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
                                formPerformanceScore={this.state.review!=null?this.state.review.score:''}
                                formGenerosityScore={this.state.review!=null?this.state.review.generosity:''}
                                formTechnicsScore={this.state.review!=null?this.state.review.technics:''}
                                formAmbiantScore={this.state.review!=null?this.state.review.ambiant:''}
                                formMedia={this.state.review!=null?this.state.review.media:null}
                                setBody={(e)=>this.body(e, this)}
                                setPerformanceScore={(value)=>this.performanceScore(value, this)}
                                setGenerosityScore={(value)=>this.generosityScore(value, this)}
                                setTechnicsScore={(value)=>this.technicsScore(value, this)}
                                setAmbiantScore={(value)=>this.ambiantScore(value, this)}
                                setMedia={(value)=>this.media(value, this)}
                                unsetMedia={(value) => this.removeMedia(this)}
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
