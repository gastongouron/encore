import React, { Component } from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import {connect} from "react-redux"
// import { Query, Mutation } from 'react-apollo';
import { withApollo } from 'react-apollo'
import artistDetailQuery from '../../queries/ReviewsSchema'
import newReviewMutation from '../../mutations/newReview'
import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'
import {Button,Modal,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';
import './modal.css';
import {
    initArtistDetail, 
    loadingArtistDetail, 
    failedArtistDetail, 
    setArtistDetail, 
    addNewReview,
    selectReview,
    updateReview,
    deleteReview
} from '../../actions/artistDetail'
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
        console.log(" artist componentWillMount=================", this.props);
        this.props.loadingArtistDetail();
        console.log(" artist componentWillMount^^^^^^^^^^^^^^^^^", this.props.match.params.id);
        this.props.client.query({query: artistDetailQuery, variables: {id: this.props.match.params.id}, fetchPolicy: 'network-only'})
        .then(
            (res) => {
                console.log("artistDetail componentwillMount+++++++++++++++++", res);
                this.props.setArtistDetail(res.data.artist);
                this.checkEnableNewReview(res.data.artist.reviews)
            },
            (err) => {
                console.log("artistDetail componentwillMount****************", err)
                this.props.failedArtistDetail(err.data);
            }
        );
    }
    
    handleModalNewClose() {
        this.setState({ showModalNew: false });
    }
    
    handleModalNewShow() {
        this.setState({ showModalNew: true });
        
    }

    handleModalUpdateClose() {
        this.setState({ showModalUpdate: false });
    }
    
    handleModalUpdateShow(review){
        console.log('selected', review);
        this.props.selectReview(review);
        this.setState({selected:review});
        this.setState({ showModalUpdate: true });
    }
    
    checkEnableNewReview = (reviews) => {
        console.log("length ++++++++++++",  reviews.length)
        for (var i = 0; i < reviews.length; i++) {
            console.log("user id for this artist is ^^^^^^^^^^^^^^^", reviews[i].user_id)
            if(reviews[i].user_id == this.props.userInfo.user_id){
                this.setState({enabledButton: false});
            }
        }
    }
   
    renderReviews = (reviews) => {
        console.log("renderReviews**************", reviews);
        if (reviews.length > 0) {
            return reviews.map((review, index) => (
                <ListGroupItem key={index} 
                onClick={
                    review.user_id==this.props.userInfo.user_id
                    ?()=>this.handleModalUpdateShow(review)
                    :null} disabled={review.user_id==this.props.userInfo.user_id?false:true}>{review.body}</ListGroupItem>
                
            ));
        }
        else return null;
    }
    handleChange(e){
        ArtistDetail.val1 = e.target.value;
    }

    handleUpdateChange(e){
        this.setState({selected:{...this.state.selected, body:e.target.value}})
    }
    onSave(e){
        
        this.setState({ showModalNew: false });

        if(ArtistDetail.val1===undefined||ArtistDetail.val1.trim()===''){
            console.log("length is 0----------------------")
        } else {
            console.log("this is onSave",ArtistDetail.val1);
            console.log("current user id is@@@@@@@@@@@@@@@@@@@@@@@@", this.props.userInfo.user_id)
            this.props.client.mutate({mutation: newReviewMutation, variables: {user_id: this.props.userInfo.user_id, artist_id: this.props.match.params.id, body: ArtistDetail.val1}})
            .then(
                (res) => {
                    const newArr = res.data.newReview.review
                    console.log("newreview !!!!!!!!!!!!!!!!!!!!!!!!", newArr);

                    this.props.addNewReview(newArr)
                    // this.props.artistDetail.artistDetail.reviews = [...this.props.artistDetail.artistDetail.reviews, newArr]
                    
                    console.log("newreview ****************************", this.props.artistDetail.artistDetail.reviews);
                    this.setState({enabledButton: false});
                },
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
            console.log("length is 0----------------------")
        } else {
            console.log("current selectedis@@@@@@@@@@@@@@@@@@@@@@@@", selected)
            this.props.client.mutate(
                {mutation: updateMutation,
                 variables: {id: selected.id, body:val}})
            .then(
                (res) => {
                    const updatedArr = res.data.editReview.review
                    console.log("updatedreview !!!!!!!!!!!!!!!!!!!!!!!!", updatedArr);
                    this.props.updateReview(updatedArr)
                },
                (err) => {
                    console.log("newreview !!!!!!!!!!!!!!!!!!!!!!!!", err);
                }
            );
        }
    }
    onDelete(e) {
        this.setState({ showModalUpdate: false });
        let {selected} = this.state;
        console.log("current selectedis@@@@@@@@@@@@@@@@@@@@@@@@", selected)
        this.props.client.mutate(
            {mutation: deleteMutation,
             variables: {id: selected.id}})
        .then(
            (res) => {
                console.log("delete review result is !!!!!!!!!!!!!!!!!!!!!!!!", res);
                this.props.deleteReview(selected)
                this.setState({enabledButton: true})
            },
            (err) => {
                console.log("delete review error msg is !!!!!!!!!!!!!!!!!!!!!!!!", err);
            }
        );

    }
    render() {
        const {enabledButton} = this.state
        console.log("render id--------", this.props.match.params.id, enabledButton)
        return (
            <div className="row" style={{margin: "20px"}}>

                {
                    this.props.artistDetail.loading ?
                        <hi>Loading...</hi>
                        :
                            this.props.artistDetail.error ?
                                <h1>Error...</h1>
                                :

                                <div className="col-md-3">
                                
                                <h2>{this.props.artistDetail.artistDetail.name}</h2>
                                    <form>
                                        <div className="formGroup">
                                            <label>{this.props.artistDetail.artistDetail.name}</label>
                                        </div>
                                        <div>
                                            <div className="formGroup" style={{float:"left"}}>
                                                <label>{this.props.artistDetail.artistDetail.description}</label>
                                            </div>
                                            <div style={{float:"right", marginBottom: "10px"}}>
                                                    { enabledButton ?
                                                        <Button  onClick={this.handleModalNewShow} bsStyle="primary">New review</Button>
                                                        :
                                                        <Button  onClick={this.handleModalNewShow} bsStyle="primary" disabled>New review</Button>
                                                    }                                               
                                                    <Modal  show={this.state.showModalNew} onHide={this.handleModalNewClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>New review</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <form>
                                                            <FormGroup
                                                                controlId="formBasicText"
                                                                
                                                                >
                                                                <ControlLabel>Enter your review for this artist</ControlLabel>
                                                                <FormControl
                                                                    type="text"
                                                                    
                                                                    placeholder="Enter review"
                                                                    onChange = {(e)=>this.handleChange(e)}
                                                                />
                                                                
                                                                </FormGroup>
                                                            </form>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button bsStyle="primary" onClick={(e)=>this.onSave(e)}>Save</Button>
                                                            <Button onClick={this.handleModalNewClose}>Close</Button>
                                                        </Modal.Footer>
                                                    </Modal>

                                                    <Modal  show={this.state.showModalUpdate} onHide={this.handleModalUpdateClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Edit Review</Modal.Title>
                                                        </Modal.Header>

                                                        <Modal.Body>
                                                            <form>
                                                            <FormGroup
                                                                controlId="formBasicText"
                                                                
                                                                >
                                                                <ControlLabel>Edit your for this artist</ControlLabel>
                                                                <FormControl
                                                                    type="text"
                                                                    value = {this.state.selected!==null?this.state.selected.body:''}
                                                                    placeholder="Enter review"
                                                                    onChange = {(e)=>this.handleUpdateChange(e)}
                                                                />
                                                                
                                                                </FormGroup>
                                                            </form>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button bsStyle="danger" onClick={(e)=>this.onDelete(e)}>Delete</Button>
                                                            <Button bsStyle="primary" onClick={(e)=>this.onUpdate(e)}>Update</Button>
                                                            <Button onClick={this.handleModalUpdateClose}>Close</Button>
                                                        </Modal.Footer>
                                                    </Modal>

                                            </div>
                                        </div>
                                
                                        <br/>
                                    </form>
                                    <div style={{width:"100%",float:"left"}}>
                                        <ListGroup>
                                            {this.renderReviews(this.props.artistDetail.artistDetail.reviews)}
                                        </ListGroup>
                                    </div>
                                </div>

                }        
                
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~", state.currentUser)
    return { artistDetail: state.artistDetail,
            userInfo: state.currentUser
    };
};
const mapDispatchToProps = dispatch => {
    return {
        initArtistDetail : () => dispatch(initArtistDetail()),
        loadingArtistDetail : () => dispatch(loadingArtistDetail()),
        failedArtistDetail : (message) => dispatch(failedArtistDetail(message)),
        setArtistDetail : (artistDetail) => dispatch(setArtistDetail(artistDetail)),
        addNewReview : (newReview) => dispatch(addNewReview(newReview)),
        selectReview: (review) =>  dispatch(selectReview(review)),
        updateReview: (review) => dispatch(updateReview(review)),
        deleteReview: (review) => dispatch(deleteReview(review))
    };
};
// export default ArtistDetail;
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(ArtistDetail));
