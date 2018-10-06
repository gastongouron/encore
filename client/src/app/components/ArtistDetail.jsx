import React, { Component } from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import {connect} from "react-redux"
// import { Query, Mutation } from 'react-apollo';
import { withApollo } from 'react-apollo'
import artistDetailQuery from '../queries/ReviewsSchema'
import newReviewMutation from '../mutations/newReview'
import {Button,Modal,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';
import './modal.css';
import {initArtistDetail, loadingArtistDetail, failedArtistDetail, setArtistDetail, addNewReview} from '../actions/artistDetail'
class ArtistDetail extends Component {
    static val1;
    constructor(props){
        console.log(props)
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            enabledButton: true
          };
    };
    
    componentWillMount(){
        console.log(" artist componentWillMount=================", this.props);
        // if(this.props.artistDetail.artistDetail.length > 0)
        //     return;
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
    handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
        
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
                    <ListGroupItem key={index}>{review.body}</ListGroupItem>
                    
            ));
        }
        else return null;
    }
    handleChange(e){
        ArtistDetail.val1 = e.target.value;
        console.log("this is onChange",ArtistDetail.val1);
    }
    onSave(e){
        
        this.setState({ show: false });

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
                                                        <Button  onClick={this.handleShow} bsStyle="primary">New review</Button>
                                                        :
                                                        <Button  onClick={this.handleShow} bsStyle="primary" disabled>New review</Button>
                                                    }                                               
                                                    <Modal  show={this.state.show} onHide={this.handleClose}>
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
                                                            <Button onClick={this.handleClose}>Close</Button>
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
        addNewReview : (newReview) => dispatch(addNewReview(newReview))
    };
};
// export default ArtistDetail;
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(ArtistDetail));
