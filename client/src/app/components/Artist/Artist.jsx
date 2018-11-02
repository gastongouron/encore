import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { initArtistDetail, loadingArtistDetail, failedArtistDetail, setArtistDetail, addUserReview, selectUserReview, updateUserReview, deleteUserReview } from '../../actions/artistDetail'
import { onUpdate, onDelete, onSave, setBody, setScore, setMedia, unsetMedia, handleModalShow, handleModalClose} from '../Reviews/Utils'
import artistDetailQuery from '../../queries/ReviewsSchema'
import ReviewForm from '../Reviews/ReviewForm'
import ReviewList from '../Reviews/ReviewList'
import ActionButtons from './ActionButtons'
import EncoreLoader from '../EncoreLoader'
// import Taglist from './Taglist'
import Paper from 'material-ui/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from 'material-ui/Divider';

import reviewSubscription from '../../subscriptions/reviewSubscription'

const coverStyle = {
    objectFit: 'cover',
    backgroundSize: 'cover',
    width: '100%',
    height: 200,
}

const rootz = {
    flexGrow: 1,
}

const padded = {
    padding: 20,
}

const marginBottom = {
    marginBottom: 20,
}

class ArtistDetail extends Component {

    constructor(props){

        super(props);

        this.save = onSave.bind(this)
        this.update = onUpdate.bind(this)
        this.delete = onDelete.bind(this)
        this.body = setBody.bind(this)
        this.score = setScore.bind(this)
        this.media = setMedia.bind(this)
        this.removeMedia = unsetMedia.bind(this)
        this.show = handleModalShow.bind(this)
        this.close = handleModalClose.bind(this)

        this.state = {
            showModal: false,
            enabledButton: true,
            review:null,
            isUpdate:false,
        };
    };
    
    testSubscription(data){
        console.log(data)
    }

    componentWillMount(){
        this.props.loadingArtistDetail();

        let observable = this.props.client.subscribe({ query: reviewSubscription })
        this.setState({observable: observable})

        this.props.client.query({query: artistDetailQuery, variables: {id: this.props.match.params.id}, fetchPolicy: 'network-only'}).then(
            (res) => {
                this.props.setArtistDetail(res.data.artist);
                this.checkEnableNewReview(res.data.artist.reviews)},
            (err) => {
                this.props.failedArtistDetail(err.data);
            }
        );
    }

    componentDidMount(){
        const ctx = this
        this.state.observable.subscribe({
            next(data) {
                if(data){
                    ctx.props.setArtistDetail(data.reviewWasAdded);
                    ctx.checkEnableNewReview(data.reviewWasAdded.reviews)
                }
            },
            error(err) { console.error('err', err); },
          });
    }
    
    isConnected() {
        return this.props.userInfo.isLoggedIn ? true : false
    }

    toggleEditFromArtist(){
        let review = this.props.artistDetail.artistDetail.reviews.find(x => Number(x.user_id) === Number(this.props.userInfo.user_id)) 
        this.show(review, this)
    }

    checkEnableNewReview(reviews){
        if (this.props.userInfo.user_id) {
            for (var i = 0; i < reviews.length; i++) {
                if(Number(reviews[i].user_id) === Number(this.props.userInfo.user_id)){
                    this.setState({enabledButton: false});
                }
            }
        } else {
            this.setState({enabledButton: false});            
        }
    }

    render() {
        const artist = this.props.artistDetail.artistDetail
        return (
            <div>
                {this.props.artistDetail.loading ? <EncoreLoader /> : 
                 this.props.artistDetail.error ? <h1>Error...</h1> :
                <div>

                        <Paper style={marginBottom} zDepth={1} rounded={true} >
                            <img alt="" style={coverStyle} src={artist.cover_url}/>
                           <ActionButtons
                                edit={(e) => this.toggleEditFromArtist()} 
                                connected={this.isConnected()} 
                                new={(e) => this.show(null, this)}
                                enabled={this.state.enabledButton}
                                redirect={() => this.props.history.push('/users/getstarted')}
                            />
                            <div style={rootz}>

                                <Grid style={padded} container>
                                    <Grid item xs={12}>
                                        <h1><span style={{float:'left'}}>{artist.name}</span><span style={{float:'right'}}>{ Number(artist.reviews_count) != 0 ? (Math.round( artist.score * 10 ) / 10) : ""}</span></h1>
                                        <br />
                                        <span><b>
                                        {
                                            Number(artist.reviews_count) > 1 
                                        ? 
                                            artist.reviews_count + " " + this.props.locales.locales.reviewsLabel 
                                        : 
                                            Number(artist.reviews_count) === 1 ? artist.reviews_count + " " + this.props.locales.locales.reviewLabel : this.props.locales.locales.beTheFirst
                                        }
                                        </b></span>

                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid style={padded} container>
                                    <Grid style={marginBottom} item xs={12} sm={12}>
                                        {this.props.locales.locales._language === 'en' ? 
                                            <p>{artist.description_en}</p>
                                        :
                                            <p>{artist.description_fr}</p>
                                        }

                                    </Grid>
                                {/*
                                    <Grid item xs={12} sm={12}>
                                        <Taglist onClickTag={() => console.log('cool')} tags={artist.tags} />
                                    </Grid> 
                                */}
                                </Grid>

                            </div>
                        </Paper>

                    
                    <div>
                        <ReviewList
                            onReviewSelect={reviewReview => this.show(reviewReview, this)}
                            reviews={artist.reviews}
                            user={this.props.userInfo}
                            match={this.props.match.url}
                        />
                    </div>

                    <form>
                        <div>
                            <ReviewForm
                                isUpdate={this.state.isUpdate}
                                onShow={this.state.showModal}
                                onHide={(e) => this.close(this)}
                                editable={true}
                                formTitle={this.state.review!=null?this.state.review.artist_name:''}
                                formValue={this.state.review!=null?this.state.review.body:''}
                                formScore={this.state.review!=null?this.state.review.score:''}
                                formMedia={this.state.review!=null?this.state.review.media:null}
                                setBody={(e)=>this.body(e, this)}
                                setScore={(value)=>this.score(value, this)}
                                setMedia={(value)=>this.media(value, this)}
                                unsetMedia={(value) => this.removeMedia(this)}
                                onClickSave={(e)=>this.save(e, this)}
                                onClickDelete={(e)=>this.delete(e, this)}
                                onClickUpdate={(e)=>this.update(e, this)}
                                onClickClose={(e) => this.close(this)}
                            />
                        </div>
                    </form>
                </div>
                } 
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        artistDetail: state.artistDetail,
        userInfo: state.currentUser,
        locales: state.locales,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initArtistDetail: () => dispatch(initArtistDetail()),
        loadingArtistDetail: () => dispatch(loadingArtistDetail()),
        failedArtistDetail: (message) => dispatch(failedArtistDetail(message)),
        setArtistDetail: (artistDetail) => dispatch(setArtistDetail(artistDetail)),
        addUserReview: (newReview) => dispatch(addUserReview(newReview)),
        selectUserReview: (review) => dispatch(selectUserReview(review)),
        updateUserReview: (review) => dispatch(updateUserReview(review)),
        deleteUserReview: (review) => dispatch(deleteUserReview(review))
    };
};

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(ArtistDetail));
