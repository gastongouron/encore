import React, { Component } from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import { Query, Mutation } from 'react-apollo';
import reviewListQuery from '../queries/ReviewsSchema'
import newReviewMutation from '../mutations/newReview'
import {Button,Modal,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';
import './modal.css';
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
    
    handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
        
      }
    
   
    renderReviews = (reviews) => {
        console.log("renderReviews", reviews);
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
            <Mutation mutation = {newReviewMutation} variables = {{user_id: 1, artist_id: 1, body: "nice artist"}}>
            {({loading, error, data}) => {
                if(loading) return <h1>creating new review...</h1>;
                if(error) return <h1>`Error! ${error.message}`</h1>;
                console.log("Mutation review----------", data);
            }

            }

            </Mutation>
        }

    }
    render() {
        console.log("render id--------", this.props.match.params.id)
        return (
            <div className="row" style={{margin: "20px"}}>
                                
                <Query query={reviewListQuery} variables={{id: this.props.match.params.id}} fetchPolicy='network-only'>
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
                </Query>
            </div>
        );
    }
}
export default ArtistDetail;