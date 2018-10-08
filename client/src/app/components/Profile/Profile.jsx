import React, { Component } from 'react';
import {connect} from "react-redux"
import { withApollo } from 'react-apollo'
import Avatar from 'react-avatar';
import SmartDataTable from 'react-smart-data-table'
import myReveiwsQuery from '../../queries/MyReviewsSchema'
import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'
import {
    initMyReviews, 
    loadingMyReviews, 
    failedMyReviews, 
    setMyReviews, 
    selectMyReview, 
    updateMyReview, 
    deleteMyReview} from '../../actions/reviews'
import {Button,Modal,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';
import './modal.css';

const sematicUI = {
    segment: 'ui basic segment',
    message: 'ui message',
    input: 'ui icon input',
    searchIcon: 'search icon',
    table: 'ui compact selectable table',
    select: 'ui dropdown',
    refresh: 'ui labeled primary icon button',
    refreshIcon: 'sync alternate icon',
    change: 'ui labeled secondary icon button',
    changeIcon: 'exchange icon',
    checkbox: 'ui toggle checkbox',
    loader: 'ui active text loader',
    deleteIcon: 'trash red icon',
  }

class Profile extends Component {
    constructor(props){
        super(props);
        console.log("profile page props ```````````````````````````````", this.props)
        this.handleModalUpdateShow = this.handleModalUpdateShow.bind(this);
        this.handleModalUpdateClose = this.handleModalUpdateClose.bind(this);
        this.state = {
           showModalUpdate: false,
           showOnRowClick: true,
           seletedReview: null
          }

    }

	componentWillMount(){
        if (this.props.reviews.reviews.length > 0)
            return;
        this.props.loadingMyReviews();
        this.props.client.networkInterface.query({query: myReveiwsQuery, variables: {id: this.props.userInfo.user_id}, fetchPolicy: 'network-only'})
        .then(
            (res) => {
                console.log("profile my reviews componentWillMount query result-----------------", res.data.user.reviews);
                this.props.setMyReviews(res.data.user.reviews);
            },
            (err) => {
                console.log("profile my reviews componentWillMount query componentWillMount errrr", err);
                this.props.failedMyReviews(err.data);
            }
        );
        
    }
    onRowClick = (event, { rowData, rowIndex, tableData }) => {
        const { showOnRowClick } = this.state
        if (showOnRowClick) {
          console.log("rowdata-------------", rowData)
          console.log("table index is", tableData[rowIndex])
          this.handleModalUpdateShow(rowData);
        } else {
          // The following results should be identical
          console.log(rowData, tableData[rowIndex])
        }
    }
    handleUpdateChange(e){
        this.setState({seletedReview:{...this.state.seletedReview, body:e.target.value}})
    }
    handleModalUpdateClose() {
        this.setState({ showModalUpdate: false });
    }
    
    handleModalUpdateShow(review){
        console.log('selected review', review);
        this.props.selectMyReview(review);
        this.setState({seletedReview:review});
        this.setState({ showModalUpdate: true });
    }
    onUpdate(e) {
        this.setState({ showModalUpdate: false });
        let {seletedReview} = this.state;
        const val = seletedReview.body;
        if(val===''){
            console.log("length is 0----------------------")
        } else {
            this.props.client.mutate(
                {mutation: updateMutation,
                 variables: {id: seletedReview.id, body:val}})
            .then(
                (res) => {
                    const updatedArr = res.data.editReview.review
                    console.log("updated review !!!!!!!!!!!!!!!!!!!!!!!!", updatedArr);
                    this.props.updateMyReview(updatedArr)
                },
                (err) => {
                    console.log("newreview !!!!!!!!!!!!!!!!!!!!!!!!", err);
                }
            );
        }
    }
    onDelete(e) {
        this.setState({ showModalUpdate: false });
        let {seletedReview} = this.state;
        console.log("current seletedReview is@@@@@@@@@@@@@@@@@@@@@@@@", seletedReview)
        this.props.client.mutate(
            {mutation: deleteMutation,
             variables: {id: seletedReview.id}})
        .then(
            (res) => {
                console.log("delete review result is !!!!!!!!!!!!!!!!!!!!!!!!", res);
                this.props.deleteMyReview(seletedReview)
                this.setState({enabledButton: true})
            },
            (err) => {
                console.log("delete review error msg is !!!!!!!!!!!!!!!!!!!!!!!!", err);
            }
        );

    }
    getHeaders() {
        return {
        
        'id': {
            text: 'ID',
            invisible: true,
            transform: value => `Row #${value + 1}`,
            },

          'artist_id': {
            text: 'ART_ID',
            invisible: true
          },
          'artist_name': {
            text: 'Artist Name',
          },
          'body': {
            text: 'My review',
          },
          'user_id': {
            text: 'User ID',
            sortable: false,
            filterable: false,
            invisible: true,
          },
          '__typename': {
            text: 'TypeName',
            sortable: false,
            filterable: false,
            invisible: true,
          },
        }
      }
    render() {
        const headers = this.getHeaders()
        return (
            <div>
                <div className="text-center">
                    <Avatar size="100" round={true} src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"/>
                    <div>{this.props.userInfo.displayName || this.props.userInfo.email}</div>
                    <div>{this.props.userInfo.email}</div>
                </div>
                <div>
                    {
                        this.props.reviews.loading ?
                            <h1>Loading...</h1>
                        :
                            this.props.reviews.error ?
                                <h1>Error...</h1>
                            :
                                <div>
                                    <h1>My reviews</h1>
                                    <SmartDataTable
                                        data={this.props.reviews.reviews}
                                        name='reviews-table'
                                        dataKey=''
                                        className={sematicUI.table}
                                        sortable
                                        headers={headers}
                                        loader={(
                                            <div className={sematicUI.loader}>
                                                Loading...
                                            </div>
                                            )}
                                        onRowClick={this.onRowClick}
                                        perPage = {10}
                                    />

                                    <Modal id="review_detail_modal" show={this.state.showModalUpdate} onHide={this.handleModalUpdateClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Your Review</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <form>
                                            <FormGroup
                                                controlId="formBasicText"
                                                
                                                >
                                                <ControlLabel>{this.state.seletedReview!==null?this.state.seletedReview.artist_name:''}</ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    value = {this.state.seletedReview!==null?this.state.seletedReview.body:''}
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
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { reviews: state.reviews,
            userInfo: state.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initMyReviews : () => dispatch(initMyReviews()),
        loadingMyReviews : () => dispatch(loadingMyReviews()),
        failedMyReviews : (message) => dispatch(failedMyReviews(message)),
        setMyReviews : (reviews) => dispatch(setMyReviews(reviews)),
        selectMyReview: (review) => dispatch(selectMyReview(review)),
        updateMyReview: (review) => dispatch(updateMyReview(review)),
        deleteMyReview: (review) => dispatch(deleteMyReview(review))
    };
};
  
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Profile) );