import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'

import artistDetailQuery from '../../queries/ReviewsSchema'
import newReviewMutation from '../../mutations/newReview'
import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'

import { initArtistDetail, loadingArtistDetail, failedArtistDetail, setArtistDetail, addUserReview, selectUserReview, updateUserReview, deleteUserReview } from '../../actions/artistDetail'
import { onUpdate, onDelete, onSave, handleUpdateChange, handleNewChange, handleModalNewShow, handleModalNewClose, handleModalUpdateShow, handleModalUpdateClose} from '../Reviews/Utils'

import RaisedButton from 'material-ui/RaisedButton';
import ReviewForm from '../Reviews/ReviewForm'
import ReviewList from '../Reviews/ReviewList'

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
        this.changeNew = handleNewChange.bind(this)
        this.closeNew = handleModalNewClose.bind(this)
        this.showNew = handleModalNewShow.bind(this)
        this.changeUpdate = handleUpdateChange.bind(this)
        this.showUpdate = handleModalUpdateShow.bind(this)
        this.closeUpdate = handleModalUpdateClose.bind(this)

        this.state = {
            showModalNew: false,
            showModalUpdate: false,
            enabledButton: true,
            selected:null,
            newReviewBody:'',
            newReviewScore:''
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

    checkEnableNewReview(reviews){
        for (var i = 0; i < reviews.length; i++) {
            if(reviews[i].user_id == this.props.userInfo.user_id){
                this.setState({enabledButton: false});
            }
        }
    }

    render() {
        const {enabledButton} = this.state
        return (
            <div>
                {this.props.artistDetail.loading ? <hi>Loading...</hi> : this.props.artistDetail.error ? <h1>Error...</h1> :

                <div style={gridStyle}>    
                    <div style={detailStyle}>
                        <h1>{this.props.artistDetail.artistDetail.name}</h1>
                        <p>{this.props.artistDetail.artistDetail.description}</p>
                    </div>
                    <div style={actionsStyle}>{ enabledButton 
                        ?  <RaisedButton label='New review' secondary={true} onClick={(e) => this.showNew(this)} />
                        : <RaisedButton label='New review' secondary={true} onClick={(e) => this.showNew(this)} disabled/> }                               
                    </div>    
                    <br />
                </div>
                
                } 
                
                <div>
                    <ReviewList
                            onReviewSelect={selectedReview => this.showUpdate(selectedReview, this)}
                            reviews={this.props.artistDetail.artistDetail.reviews}
                            user={this.props.userInfo}
                            match={this.props.match.url}
                    />
                </div>

                <form>
                    <div>
                        <ReviewForm 
                            onShow={this.state.showModalNew}
                            onHide={(e) => this.setState({ showModalNew: false })}
                            editable={true}
                            formValue={this.state.newReviewBody}
                            formScore={this.state.newReviewScore}
                            onChange={(e)=>this.changeNew(e, this)}
                            onClickSave={(e)=>this.save(e, this)}
                            onClickClose={(e) => this.closeNew(this)}
                        />
                        <ReviewForm
                            onShow={this.state.showModalUpdate}
                            onHide={(e) => this.closeUpdate(this)}
                            editable={true}
                            formValue={this.state.selected!==null?this.state.selected.body:''}
                            formScore={this.state.selected!==null?this.state.selected.score:''}
                            onChange={(e)=>this.changeUpdate(e, this)}
                            onClickDelete={(e)=>this.delete(e, this)}
                            onClickUpdate={(e)=>this.update(e, this)}
                            onClickClose={(e) => this.closeUpdate(this)}
                        />
                    </div>
                </form>
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
