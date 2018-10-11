import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'

import artistDetailQuery from '../../queries/ReviewsSchema'
import newReviewMutation from '../../mutations/newReview'
import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'
import { initArtistDetail, loadingArtistDetail, failedArtistDetail, setArtistDetail, addNewReview,selectReview, updateReview, deleteReview } from '../../actions/artistDetail'

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import CustomForm from '../CustomForm'

const paperStyle = {
  display: 'block',
  marginBottom: 20,
  padding: 20,
};

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
        console.log(props)
        super(props);
        this.handleModalNewShow = this.handleModalNewShow.bind(this);
        this.handleModalNewClose = this.handleModalNewClose.bind(this);
        this.handleModalUpdateShow = this.handleModalUpdateShow.bind(this);
        this.handleModalUpdateClose = this.handleModalUpdateClose.bind(this);
        this.state = {
            showModalNew: false,
            showModalUpdate: false,
            enabledButton: true,
            selected:null
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

    handleChange(e){ ArtistDetail.val1 = e.target.value; }

    handleUpdateChange(e){ this.setState({selected:{...this.state.selected, body:e.target.value}}) }

    handleModalNewClose() { this.setState({ showModalNew: false });}
    
    handleModalNewShow() { this.setState({ showModalNew: true });}

    handleModalUpdateClose() { this.setState({ showModalUpdate: false });}
    
    handleModalUpdateShow(review){
        this.props.selectReview(review);
        this.setState({selected:review});
        this.setState({ showModalUpdate: true });
    }
    
    checkEnableNewReview = (reviews) => {
        for (var i = 0; i < reviews.length; i++) {
            if(reviews[i].user_id == this.props.userInfo.user_id){
                this.setState({enabledButton: false});
            }
        }
    }
   
    renderReviews = (reviews) => {
        if (reviews !== undefined) {
            return reviews.map((review, index) => (
            <Paper
                key={index}
                onClick={review.user_id == this.props.userInfo.user_id?()=>this.handleModalUpdateShow(review):null} 
                disabled={review.user_id == this.props.userInfo.user_id?false:true}
                rounded={false} 
                style={paperStyle} zDepth={1}>
                <div>
                    {review.body}
                </div>
                <br />
                <div>
                    {review.score}
                </div>
            </Paper>
            ));
        }
        else return null;
    }

    onSave(e){        
        this.setState({ showModalNew: false });
        if(ArtistDetail.val1===undefined||ArtistDetail.val1.trim()===''){
            console.log("Handle empty/similar comment")
        } else {
            this.props.client.mutate({mutation: newReviewMutation, variables: {user_id: this.props.userInfo.user_id, artist_id: this.props.match.params.id, body: ArtistDetail.val1}}).then(
                (res) => {
                    const newArr = res.data.newReview.review
                    this.props.addNewReview(newArr)
                    this.setState({enabledButton: false});},
                (err) => {
                    console.log("newreview !!!!!!!!!!!!!!!!!!!!!!!!", err);
                }
            );
        }
    }

    onUpdate(e) {
        this.setState({ showModalUpdate: false });
        let {selected} = this.state;
        const val = selected.body;
        if(val===''){
            console.log("Handle nothing to update here")
        } else {
            this.props.client.mutate({mutation: updateMutation, variables: {id: selected.id, body:val}}).then(
                (res) => {
                    const updatedArr = res.data.editReview.review
                    this.props.updateReview(updatedArr)},
                (err) => {
                    console.log("newreview !!!!!!!!!!!!!!!!!!!!!!!!", err);
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
            (err) => { console.log("delete review error msg is:", err); }
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

                    <form>
                        <div>
                            <CustomForm 
                                onShow={this.state.showModalNew}
                                onHide={this.handleModalNewClose}
                                onChange={(e)=>this.handleChange(e)}
                                onClickSave={(e)=>this.onSave(e)}
                                onClickClose={this.handleModalNewClose}/>

                            <CustomForm
                                onShow={this.state.showModalUpdate}
                                onHide={this.handleModalUpdateClose}
                                formValue={this.state.selected!==null?this.state.selected.body:''}
                                onChange={(e)=>this.handleUpdateChange(e)}
                                onClickDelete={(e)=>this.onDelete(e)}
                                onClickUpdate={(e)=>this.onUpdate(e)}
                                onClickClose={this.handleModalUpdateClose}/>
                        </div>
                    </form>
                </div>
            } 
                <div>
                    <div>
                        {this.renderReviews(this.props.artistDetail.artistDetail.reviews)}
                    </div>
                </div>
                       
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
