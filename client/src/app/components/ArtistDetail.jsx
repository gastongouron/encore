import React, { Component } from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import {graphql} from 'react-apollo';
import { Query } from 'react-apollo';
import {Button} from 'react-bootstrap';

class ArtistDetail extends Component {

    render() {
        return (
            <div className="row" style={{margin: "20px"}}>
                <div className="col-md-3">
                    <h2>Artist</h2>
                        <form>
                            <div className="formGroup">
                                <label>Name</label>
                            </div>
                            <div>
                                <div className="formGroup" style={{float:"left"}}>
                                    <label>Description</label>
                                </div>
                                <div style={{float:"right", marginBottom: "10px"}}>
                                    <Button bsStyle="primary" >New review</Button>
                                </div>
                            </div>
                    
                            <br/>
                        </form>
                        <div style={{width:"100%",float:"left"}}>
                            <ListGroup>
                                <ListGroupItem>Review 1</ListGroupItem>
                                <ListGroupItem>Review 2</ListGroupItem>
                                <ListGroupItem>...</ListGroupItem>
                            </ListGroup>
                        </div>
                    

                </div>
            </div>
        );
    }
}
export default (ArtistDetail);