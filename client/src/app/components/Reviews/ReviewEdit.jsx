import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import React, { Component } from 'react';
import CustomForm from '../CustomComponent/CustomForm'
import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'
import { initUserReviews, loadingUserReviews, failedUserReviews, setUserReviews, 
	selectUserReview, updateUserReview, deleteUserReview} from '../../actions/reviews'

class ReviewEdit extends Component {
	
	constructor(props){
		super(props);
        this.handleModalUpdateClose = this.handleModalUpdateClose.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
		this.state = {
            showModalUpdate: false,
            selectedReview: this.props.selectedUserReview
        };

	}
	handleUpdateChange(e){
        this.setState({selectedReview:{...this.state.selectedReview, body:e.target.value}})
		}
	handleModalUpdateClose(e) {
        this.props.history.goBack()

		}
	onUpdate(e) {
        let {selectedReview} = this.state;
        const val = selectedReview.body;
        if(val!==''){
            this.props.client.mutate({mutation: updateMutation, variables: {id: selectedReview.id, body:val}}).then(
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
        let {selectedReview} = this.state;
        
        this.props.client.mutate({mutation: deleteMutation, variables: {id: selectedReview.id}}).then(
            (res) => {
                this.props.deleteUserReview(selectedReview)
                this.props.history.goBack()
            },
            (err) => { }
        );
    }
	render(){
		return(
			<div>
                <form>
                    <CustomForm
                        onShow={true}
                        formValue={this.state.selectedReview!==null?this.state.selectedReview.body:''}
                        onChange={(e)=>this.handleUpdateChange(e)}
                        onClickDelete={(e)=>this.onDelete(e)}
                        onClickUpdate={(e)=>this.onUpdate(e)}
                        onClickClose={this.handleModalUpdateClose}/>
                </form>
			</div>
			
		);
	}
}

const mapStateToProps = state => {
    return {
		userInfo: state.currentUser,
		selectedUserReview: state.reviews.selected
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectUserReview: (review) => dispatch(selectUserReview(review)),
        updateUserReview: (review) => dispatch(updateUserReview(review)),
        deleteUserReview: (review) => dispatch(deleteUserReview(review))
    };
};
export default withApollo(connect(mapStateToProps, mapDispatchToProps)(ReviewEdit));