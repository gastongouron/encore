import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'

import artistDetailQuery from '../../queries/ReviewsSchema'
import newReviewMutation from '../../mutations/newReview'
import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'
import { initArtistDetail, loadingArtistDetail, failedArtistDetail, setArtistDetail, addNewReview, selectReview, updateReview, deleteReview } from '../../actions/artistDetail'

import RaisedButton from 'material-ui/RaisedButton';
import CustomForm from '../CustomComponent/CustomForm'
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
    static val1;
    constructor(props){
        super(props);
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
            this.props.selectReview(review);
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

    onSave(e){        
        this.setState({ showModalNew: false });
        console.log(this.state)
        // if(ArtistDetail.val1===undefined||ArtistDetail.val1.trim()===''){

        // } else {
            this.props.client.mutate({mutation: newReviewMutation, variables: {user_id: this.props.userInfo.user_id, artist_id: this.props.match.params.id, body: this.state.newReviewBody, score: this.state.newReviewScore }}).then(
                (res) => {
                    const newArr = res.data.newReview.review
                    this.props.addNewReview(newArr)
                    this.setState({enabledButton: false});},
                (err) => { }
            );
        // }
    }

    onUpdate(e) {
        this.setState({ showModalUpdate: false });
        let {selected} = this.state;
        console.log(selected)
        console.log('UPDATINGGGGG')
        const val = selected.body;
        const score = selected.score;
        if(val!==''){
            this.props.client.mutate({mutation: updateMutation, variables: {id: selected.id, body:val, score:score }}).then(
                (res) => {
                    const updatedArr = res.data.editReview.review
                    this.props.updateReview(updatedArr)
                },
                (err) => {

                }
            );
        }
    }

    onDelete(e) {
        this.setState({ showModalUpdate: false });
        let {selected} = this.state;
        this.props.client.mutate({mutation: deleteMutation, variables: {id: selected.id}}).then(
            (res) => {
                this.props.deleteReview(selected)
                this.setState({enabledButton: true})},
            (err) => { }
        );
    }

    render() {
        const {enabledButton} = this.state
        return (
            <div>
                {this.props.artistDetail.loading ? <hi>Loading...</hi> : this.props.artistDetail.error ? <h1>Error...</h1> :

                <div style={gridStyle}>    
                    <div style={detailStyle}>
                        <h2>{this.props.artistDetail.artistDetail.name}</h2>
                        <label>{this.props.artistDetail.artistDetail.description}</label>
                    </div>
                    <div style={actionsStyle}>{ enabledButton 
                        ?  <RaisedButton secondary={true} onClick={this.handleModalNewShow} >New review</RaisedButton>
                        : <RaisedButton secondary={true} onClick={this.handleModalNewShow} disabled>New review</RaisedButton> }                               
                    </div>    
                    <br />
                </div>
            } 
                <div>
                    <ReviewList
                            onReviewSelect={selectedReview =>this.handleModalUpdateShow(selectedReview)}
                            reviews={this.props.artistDetail.artistDetail.reviews}
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
                                onClickSave={(e)=>this.onSave(e)}
                                onClickClose={this.handleModalNewClose}/>

                            <CustomForm
                                onShow={this.state.showModalUpdate}
                                onHide={this.handleModalUpdateClose}
                                editable={true}
                                formValue={this.state.selected!==null?this.state.selected.body:''}
                                formScore={this.state.selected!==null?this.state.selected.score:''}
                                onChange={(e)=>this.handleUpdateChange(e)}
                                onClickDelete={(e)=>this.onDelete(e)}
                                onClickUpdate={(e)=>this.onUpdate(e)}
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
        addNewReview: (newReview) => dispatch(addNewReview(newReview)),
        selectReview: (review) =>  dispatch(selectReview(review)),
        updateReview: (review) => dispatch(updateReview(review)),
        deleteReview: (review) => dispatch(deleteReview(review))
    };
};

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(ArtistDetail));
