import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import React, { Component } from 'react';
import CustomForm from '../CustomComponent/CustomForm'

import { 
    selectUserReview, 
    updateUserReview, 
    deleteUserReview} from '../../actions/reviews'

import {handleUpdateChange, 
    handleModalUpdateClose, 
    onUpdate,
    onDelete,
    commonValues} from './Utils'

class ReviewEdit extends Component {
	
	constructor(props){
		super(props);
        this.close = handleModalUpdateClose.bind(this)
        this.change = handleUpdateChange.bind(this)
        this.update = onUpdate.bind(this);
        this.delete = onDelete.bind(this)

		this.state = {
            showModalUpdate: false,
            selected: this.props.selectedUserReview
        };
	}

	render(){
		return(
			<div>
                <form>
                    <CustomForm
                        onShow={true}
                        editable={this.props.userInfo.user_id == this.state.selected.user_id?true:false}
                        formValue={this.state.selected!==null?this.state.selected.body:''}
                        formScore={this.state.selected!==null?this.state.selected.score:''}
                        onChange={(e)=>this.change(e, this)}
                        onClickDelete={(e)=>this.delete(e, this)}
                        onClickUpdate={(e)=>this.update(e, this)}
                        onClickClose={(e)=>this.close(e, this)}/>
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