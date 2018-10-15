import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'

import artistDetailQuery from '../../queries/ReviewsSchema'

import { initArtistDetail, loadingArtistDetail, failedArtistDetail, setArtistDetail, addUserReview, selectUserReview, updateUserReview, deleteUserReview } from '../../actions/artistDetail'
import { onUpdate, onDelete, onSave, handleChange, handleModalShow, handleModalClose} from '../Reviews/Utils'

import RaisedButton from 'material-ui/RaisedButton';
import ReviewForm from '../Reviews/ReviewForm'
import ReviewList from '../Reviews/ReviewList'

import EncoreLoader from '../EncoreLoader'

const gridStyle = {
   display: 'grid',
}

const detailStyle = {
    gridColumn: 1,
    textAlign: 'left',
}

const actionsStyle = {
    gridColumn: 2,
    textAlign: 'right',
}


class ArtistDetail extends Component {
    constructor(props){
        super(props);
        this.save = onSave.bind(this)
        this.update = onUpdate.bind(this)
        this.delete = onDelete.bind(this)
        this.change = handleChange.bind(this)
        this.show = handleModalShow.bind(this)
        this.close = handleModalClose.bind(this)

        this.state = {
            showModal: false,
            enabledButton: true,
            review:null,
            isUpdate:false,
        };
    };
    
    componentWillMount(){
        this.props.loadingArtistDetail();
        this.props.client.query({query: artistDetailQuery, variables: {id: this.props.match.params.id}, fetchPolicy: 'network-only'}).then(
            (res) => {
                this.props.setArtistDetail(res.data.artist);
                this.checkEnableNewReview(res.data.artist.reviews)},
            (err) => {
                this.props.failedArtistDetail(err.data);
            }
        );
    }

    isConnected() {
        return this.props.userInfo.isLoggedIn ? true : false
    }

    checkEnableNewReview(reviews){
        if (this.props.userInfo.user_id) {
            for (var i = 0; i < reviews.length; i++) {
                if(reviews[i].user_id == this.props.userInfo.user_id){
                    this.setState({enabledButton: false});
                }
            }
        } else {
            this.setState({enabledButton: false});            
        }
    }

    render() {
        const {enabledButton} = this.state
        return (
            <div>
                {this.props.artistDetail.loading 

                ? 
                    <EncoreLoader />
                : 
                    this.props.artistDetail.error 
                ? 
                    <h1>Error...</h1> 
                :
                <div>
                    <div style={gridStyle}>    
                        <div style={detailStyle}>
                            <h1>{this.props.artistDetail.artistDetail.name}</h1>
                            <p>{this.props.artistDetail.artistDetail.description}</p>
                        </div>
                        <div style={actionsStyle}>
                        { this.isConnected() ? 
                            <div>{ enabledButton 
                                ? <RaisedButton label='New review' secondary={true} onClick={(e) => this.show(null, this)} />
                                : <RaisedButton label='New review' secondary={true} onClick={(e) => this.show(null, this)} disabled/> }                               
                            </div>
                        :
                            <div>
                                <RaisedButton label='Wanna leave a review ?' primary={true} onClick={() => this.props.history.push('/users/getstarted') } />
                            </div>
                        }                        
                        </div>
                        <br />
                    </div>
                    

                    <div>
                        <ReviewList
                                onReviewSelect={reviewReview => this.show(reviewReview, this)}
                                reviews={this.props.artistDetail.artistDetail.reviews}
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
                                formValue={this.state.review!==null?this.state.review.body:''}
                                formScore={this.state.review!==null?this.state.review.score:''}
                                onChange={(e)=>this.change(e, this)}
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
        userInfo: state.currentUser
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
