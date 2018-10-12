import React, { Component } from 'react';
import {connect} from "react-redux"
import { withApollo } from 'react-apollo'
import Avatar from 'react-avatar';
import UserProfileQuery from '../../queries/UserProfileSchema'
import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'
import { initUserReviews, loadingUserReviews, failedUserReviews, setUserReviews, 
         selectUserReview, updateUserReview, deleteUserReview} from '../../actions/reviews'

import { initUserProfile, loadingUserProfile, failedUserProfile, setUserProfile } from '../../actions/userProfile'

import ReviewList from '../Reviews/ReviewList'
import CustomForm from '../CustomComponent/CustomForm'
import '../CustomComponent/modal.css';

class Profile extends Component {
    constructor(props){
        super(props);
        this.handleModalUpdateShow = this.handleModalUpdateShow.bind(this);
        this.handleModalUpdateClose = this.handleModalUpdateClose.bind(this);

        this.state = {
           showModalUpdate: false,
           showOnRowClick: true,
           seletedReview: null,
           enabledButton: true,
          }
    }

	componentWillMount(){
        if (this.props.reviews.reviews.length > 0)
            return;
        this.props.loadingUserReviews();
        this.props.loadingUserProfile();
        this.props.client.networkInterface.query({query: UserProfileQuery, variables: {id: this.props.match.params.id }, fetchPolicy: 'network-only'})
        .then(
            (res) => {
                this.props.setUserReviews(res.data.user.reviews);
                this.props.setUserProfile(res.data.user)
                this.setState({ loading: false });
            },
            (err) => {
                this.props.failedUserReviews(err.data);
                this.props.failedUserProfile(err.data);
            }
        );
    }

    onCurrentUserProfile(){
        return this.props.userInfo.user_id == this.props.match.params.id  
    }

    onRowClick = (event, { rowData, rowIndex, tableData }) => {
        const { showOnRowClick } = this.state
        if (showOnRowClick) {
          this.handleModalUpdateShow(rowData);
        }
    }
    handleUpdateChange(e){
        this.setState({seletedReview:{...this.state.seletedReview, body:e.target.value}})
    }
    handleModalUpdateClose() {
        this.setState({ showModalUpdate: false });
    }
    
    handleModalUpdateShow(review){

        if (review.user_id == this.props.userInfo.user_id){
            this.props.selectUserReview(review);
            // this.setState({seletedReview:review});
            // this.setState({ showModalUpdate: true });

            let id = review.id
            this.props.history.push(`/reviews/${id}`)
        }
    }
    onUpdate(e) {
        this.setState({ showModalUpdate: false });
        let {seletedReview} = this.state;
        const val = seletedReview.body;
        if(val!==''){
            this.props.client.mutate(
                {mutation: updateMutation,
                 variables: {id: seletedReview.id, body:val}})
            .then(
                (res) => {
                    const updatedArr = res.data.editReview.review
                    this.props.updateUserReview(updatedArr)
                },
                (err) => {

                }
            );
        }
    }
    onDelete(e) {
        this.setState({ showModalUpdate: false });
        let {seletedReview} = this.state;
        this.props.client.mutate(
            {mutation: deleteMutation,
             variables: {id: seletedReview.id}})
        .then(
            (res) => {
                this.props.deleteUserReview(seletedReview)
                this.setState({enabledButton: true})
            },
            (err) => {

            }
        );

    }
    render() {
        return (
            <div>
            {this.state.loading ? <h1>Loading...</h1> : this.props.reviews.error ? <h1>Error...</h1> :
                <div>                
                    <div>
                        <Avatar size="100" round={true} src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"/>
                        <div>{this.props.userProfile.userProfile.display_name || this.props.userProfile.userProfile.email}</div>
                        <div>{this.props.userProfile.userProfile.email}</div>
                    </div>

                    <div>
                            <div>
                                <h1>Reviews</h1>
                                <div>
                                    <ReviewList
                                        onReviewSelect={selectedReview =>this.handleModalUpdateShow(selectedReview)}
                                        reviews={this.props.reviews.reviews}/>
                                </div>
                                
                                <form>
                                    <div>
                                        <CustomForm 
                                            onShow={this.state.showModalNew}
                                            onHide={this.handleModalNewClose}
                                            onChange={this.handleChange}
                                            onClickSave={this.onSave}
                                            onClickClose={this.handleModalNewClose}/>

                                        <CustomForm
                                            onShow={this.state.showModalUpdate}
                                            onHide={this.handleModalUpdateClose}
                                            formValue={this.state.seletedReview!==null?this.state.seletedReview.body:''}
                                            onChange={this.handleUpdateChange}
                                            onClickDelete={this.onDelete}
                                            onClickUpdate={this.onUpdate}
                                            onClickClose={this.handleModalUpdateClose}/>
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { reviews: state.reviews,
             userProfile: state.userProfile,
             userInfo: state.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initUserProfile: () => dispatch(initUserProfile()),
        loadingUserProfile: () => dispatch(loadingUserProfile()),
        failedUserProfile: (message) => dispatch(failedUserProfile(message)),
        setUserProfile: (user) => dispatch(setUserProfile(user)),
        initUserReviews: () => dispatch(initUserReviews()),
        loadingUserReviews: () => dispatch(loadingUserReviews()),
        failedUserReviews: (message) => dispatch(failedUserReviews(message)),
        setUserReviews: (reviews) => dispatch(setUserReviews(reviews)),
        selectUserReview: (review) => dispatch(selectUserReview(review)),
        updateUserReview: (review) => dispatch(updateUserReview(review)),
        deleteUserReview: (review) => dispatch(deleteUserReview(review))
    };
};
  
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Profile) );
