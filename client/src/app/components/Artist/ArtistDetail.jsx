import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'

import artistDetailQuery from '../../queries/ReviewsSchema'
import newReviewMutation from '../../mutations/newReview'
import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'

import { initArtistDetail, loadingArtistDetail, failedArtistDetail, setArtistDetail, addUserReview, selectUserReview, updateUserReview, deleteUserReview } from '../../actions/artistDetail'

import RaisedButton from 'material-ui/RaisedButton';
import CustomForm from '../CustomComponent/CustomForm'
import ReviewList from '../Reviews/ReviewList'

import {handleUpdateChange, 
    handleModalUpdateClose, 
    onUpdate,
    onDelete,
    onSave,
    commonValues} from '../Reviews/Utils'

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

        this.handleModalNewShow = this.handleModalNewShow.bind(this);
        this.handleModalNewClose = this.handleModalNewClose.bind(this);
        this.handleModalUpdateShow = this.handleModalUpdateShow.bind(this);
        this.handleModalUpdateClose = this.handleModalUpdateClose.bind(this);

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

    handleChange(e){ 
        switch(e.target.id) {
            case 'body':
                this.setState({ newReviewBody:e.target.value })
                break;
            case 'score':
                this.setState({ newReviewScore:e.target.value })
                break;
        }
    }


    handleUpdateChange(e){
        switch(e.target.id) {
            case 'body':
                this.setState({selected:{...this.state.selected, body:e.target.value}})
                break;
            case 'score':
                this.setState({selected:{...this.state.selected, score:e.target.value}})
                break;
        }
    }


    handleModalNewClose() { this.setState({ showModalNew: false });}
    
    handleModalNewShow() { this.setState({ showModalNew: true });}

    handleModalUpdateClose() { this.setState({ showModalUpdate: false });}
    
    handleModalUpdateShow(review){
        if (review.user_id == this.props.userInfo.user_id){
            this.props.selectUserReview(review);
            this.setState({selected:review});
            this.setState({ showModalUpdate: true });
        } 
    }
    
    checkEnableNewReview = (reviews) => {
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
                        ?  <RaisedButton label='New review' secondary={true} onClick={this.handleModalNewShow} />
                        : <RaisedButton label='New review' secondary={true} onClick={this.handleModalNewShow} disabled/> }                               
                    </div>    
                    <br />
                </div>
                
                } 
                
                <div>
                    <ReviewList
                            onReviewSelect={selectedReview =>this.handleModalUpdateShow(selectedReview)}
                            reviews={this.props.artistDetail.artistDetail.reviews}
                            user={this.props.userInfo}
                    />
                </div>

                <form>
                    <div>
                        <CustomForm 
                            onShow={this.state.showModalNew}
                            onHide={this.handleModalNewClose}
                            editable={true}
                            formValue={this.state.newReviewBody}
                            formScore={this.state.newReviewScore}
                            onChange={(e)=>this.handleChange(e)}
                            onClickSave={(e)=>this.save(e, this)}
                            onClickClose={this.handleModalNewClose}/>

                        <CustomForm
                            onShow={this.state.showModalUpdate}
                            onHide={this.handleModalUpdateClose}
                            editable={true}
                            formValue={this.state.selected!==null?this.state.selected.body:''}
                            formScore={this.state.selected!==null?this.state.selected.score:''}
                            onChange={(e)=>this.handleUpdateChange(e)}
                            onClickDelete={(e)=>this.delete(e, this)}
                            onClickUpdate={(e)=>this.update(e, this, this.props.updateReview)}
                            onClickClose={this.handleModalUpdateClose}/>

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
