import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import React, { Component } from 'react';
import CustomForm from '../CustomComponent/CustomForm'
import { initUserReviews, loadingUserReviews, failedUserReviews, setUserReviews, 
	selectUserReview, updateUserReview, deleteUserReview} from '../../actions/reviews'

class ReviewEdit extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
            showModalUpdate: false,
        };

	}
	handleUpdateChange(e){
		//  this.setState({selected:{...this.state.selected, body:e.target.value}}) 
		}
	handleModalUpdateClose() {
		//  this.setState({ showModalUpdate: false });
		}
	onUpdate(e) {
        // this.setState({ showModalUpdate: false });
        // let {selected} = this.state;
        // const val = selected.body;
        // if(val!==''){
        //     this.props.client.mutate({mutation: updateMutation, variables: {id: selected.id, body:val}}).then(
        //         (res) => {
        //             const updatedArr = res.data.editReview.review
        //             this.props.updateReview(updatedArr)},
        //         (err) => {

        //         }
        //     );
        // }
    }

    onDelete(e) {
        // this.setState({ showModalUpdate: false });
        // let {selected} = this.state;
        // this.props.client.mutate({mutation: deleteMutation, variables: {id: selected.id}}).then(
        //     (res) => {
        //         this.props.deleteReview(selected)
        //         this.setState({enabledButton: true})},
        //     (err) => { }
        // );
    }
	render(){
		console.log("edit review========", this.props.selectedUserReview)
		return(
			<div>
				<CustomForm
					formValue={this.props.selectedUserReview!==null?this.props.selectedUserReview.name:''}
					onChange={this.handleUpdateChange}
					onClickDelete={this.onDelete}
					onClickUpdate={this.onUpdate}
					onClickClose={this.handleModalUpdateClose}/>
					
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