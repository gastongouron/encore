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
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader';
import _ from 'underscore'
import socialSubscription from '../../subscriptions/socialSubscription'

import RaisedButton from 'material-ui/RaisedButton'
import ReactS3Uploader from 'react-s3-uploader'
import FileAttachment from 'material-ui/svg-icons/file/attachment';
import ContentEdit from 'material-ui/svg-icons/image/edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const style = {
    objectFit: 'cover',
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
    background: 'white',
    padding: -10
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
            profilePicture: null,
        };
    }

    getUser(id){
        this.props.client.networkInterface.query({query: UserProfileQuery, variables: {id: id }, fetchPolicy: 'network-only'})
        .then(
            (res) => {
                this.props.setUserReviews(res.data.user.reviews);
                this.props.setUserProfile(res.data.user)
                this.setState({profilePicture: res.data.user.profile_picture})
            },
            (err) => {
                this.props.failedUserReviews(err.data);
                this.props.failedUserProfile(err.data);
            }
        );
    }

    componentWillMount(){
        this.getUser(this.props.match.params.id)        
        this.props.loadingUserReviews();
        this.props.loadingUserProfile();
        let observable = this.props.client.subscribe({ query: socialSubscription, variables: {user_id: this.props.match.params.id} })
        this.setState({observable: observable})
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

    onUploadFinish(context, obj){
        this.setState({profilePicture: obj.public})
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

    toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    render() {

        const user = this.props.userProfile.userProfile

        return (
            <div>
                {(this.state.loading || this.props.userProfile.loading) ? <EncoreLoader /> : this.props.reviews.error ? <h1>Error...</h1> : 
                <div>                
                    <Paper>
                        <div style={{padding: 16, paddingBottom: 4, marginTop: 60, textAlign: 'center'}}>
                            <Paper style={paperStyle} zDepth={1} circle={true}>
                                <img alt='...' style={style} src={this.state.profilePicture}/>
                            </Paper>

                            <h2 style={{marginTop:16, marginBottom: 0}}>
                                {this.toTitleCase(this.props.userProfile.userProfile.display_name)}
                                {/* strings.formatString(this.props.locales.locales.reviews, {username: this.props.userProfile.userProfile.display_name})*/}
                             </h2>
                            { this.props.userProfile.userProfile.email?this.props.userProfile.userProfile.email:'' }
                        </div>
                        <div style={{padding: 16, paddingBottom: 0}}>
                             {this.props.userInfo.isLoggedIn ? 
                                this.onCurrentUserProfile() ?  
                                    <RaisedButton
                                       style={right}
                                       default={true}
                                       icon={<ContentEdit />}
                                       containerElement='label'
                                       label={this.props.locales.locales.picture}
                                       >
                                      <ReactS3Uploader
                                        style={{display:"none"}}
                                        className="btn"
                                        htmlFor="flat-button-file"
                                        signingUrl={`/s3/sign`}
                                        signingUrlMethod="GET"
                                        accept="*"
                                        s3path={"/user_profile/" + this.props.userInfo.user_id}
                                        getSignedUrl={this.getSignedUrl}
                                        // onSignedUrl={(resp) => this.onSignedUrl(this, resp)}
                                        // onProgress={(val) => this.onUploadProgress(this, val)}
                                        // onError={(msg) => this.onUploadError(this, msg)}
                                        onFinish={(obj) => this.onUploadFinish(this, obj)}
                                        signingUrlHeaders={ this.headers }
                                        signingUrlQueryParams={{ user_id: this.props.userInfo.user_id }}
                                        signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
                                        contentDisposition="auto"
                                        scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                                        // inputRef={cmp => this.uploadInput = cmp}
                                        autoUpload={true}
                                        /> 
                                    </RaisedButton>                                
                                : 
                                <RaisedButton style={right} disabled={this.state.disabled} default={this.alreadyFollows() ? true : false} primary={!this.alreadyFollows() ? true : false} onClick={ (e) => this.onClickFollow(e) } label={this.alreadyFollows() ? this.props.locales.locales.unfollow : this.props.locales.locales.follow}/> 
                            : 
                                <RaisedButton style={right} secondary={true} onClick={ () => this.props.history.push('/users/getstarted') } label={this.props.locales.locales.follow}/>
                            } 

                            <Subheader style={{paddingLeft: 0}}>{ user !== null ? Object.keys(this.props.reviews.reviews).length + " experiences" : ""}</Subheader>
                        </div>

                        <Divider />
                        <div>
                            <SocialList 
                                followingUsers={user !== null ? this.props.userProfile.userProfile.following_users : undefined}
                                updateUser={userId => this.getUser(userId)}
                                followers={user !== null ? this.props.userProfile.userProfile.followers : undefined}/>
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
