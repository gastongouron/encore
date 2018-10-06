import React, { Component } from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import {connect} from "react-redux"
// import { Query, Mutation } from 'react-apollo';
import { withApollo } from 'react-apollo'
import artistDetailQuery from '../queries/ReviewsSchema'
import newReviewMutation from '../mutations/newReview'
import {Button,Modal,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';
import './modal.css';
import {initArtistDetail, loadingArtistDetail, failedArtistDetail, setArtistDetail} from '../actions/artistDetail'
class ArtistDetail extends Component {
    static val1;
    constructor(props){
        console.log(props)
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false
          };
    };
    
    componentWillMount(){
        console.log(" artist componentWillMount=================", this.props);
        if(this.props.artistDetail.artistDetail.length > 0)
            return;
        this.props.loadingArtistDetail();
        console.log(" artist componentWillMount^^^^^^^^^^^^^^^^^", this.props.match.params.id);
        this.props.client.query({query: artistDetailQuery, variables: {id: this.props.match.params.id}, fetchPolicy: 'network-only'})
        .then(
            (res) => {
                console.log("artistDetail componentwillMount+++++++++++++++++", res);
                this.props.setArtistDetail(res.data.artist);

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
                    console.log("newreview !!!!!!!!!!!!!!!!!!!!!!!!", res);
                    
                    // this.props.setArtistDetail(res.data.artist);
    
                },
                (err) => {
                    console.log("newreview !!!!!!!!!!!!!!!!!!!!!!!!", err)
                    // this.props.failedArtistDetail(err.data);
                }
            );
            // <Mutation mutation = {newReviewMutation} variables = {{user_id: 1, artist_id: 1, body: "nice artist"}}>
            // {({loading, error, data}) => {
            //     if(loading) return <h1>creating new review...</h1>;
            //     if(error) return <h1>`Error! ${error.message}`</h1>;
            //     console.log("Mutation review----------", data);
            // }

            // }

            // </Mutation>
        }

    }
    render() {
        console.log("render id--------", this.props.match.params.id)
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
                                                <Button  onClick={this.handleShow} bsStyle="primary" >New review</Button>
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
                {/* <Query query={reviewListQuery} variables={{id: this.props.match.params.id}} fetchPolicy='network-only'>
                    {({ loading, error, data }) => {

                        if (loading) return <h1>"Loading..."</h1>;
                        if (error) return <h1>`Error! ${error.message}`</h1>;
                        console.log("Query ----------", data);
                        return (
                            <div className="col-md-3">
                            <h2>{data.artist.name}</h2>
                                <form>
                                    <div className="formGroup">
                                        <label>{data.artist.name}</label>
                                    </div>
                                    <div>
                                        <div className="formGroup" style={{float:"left"}}>
                                            <label>{data.artist.description}</label>
                                        </div>
                                        <div style={{float:"right", marginBottom: "10px"}}>
                                            <Button  onClick={this.handleShow} bsStyle="primary" >New review</Button>
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
                                        {this.renderReviews(data.artist.reviews)}
                                    </ListGroup>
                                </div>
                                
        
                            </div>
                        );
                    }}
                </Query> */}
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
        setArtistDetail : (artistDetail) => dispatch(setArtistDetail(artistDetail))
    };
};
// export default ArtistDetail;
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(ArtistDetail));
