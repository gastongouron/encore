import React, {Component} from 'react';
import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'
import newReviewMutation from '../../mutations/newReview'

export const doSomethingWithInput = (theInput) => {
    return theInput;
};

export const onUpdate = (e, context) => {  
    let {review} = context.state;
    const body= review.body;
    const score = review.score;
    if(body!=='' && score !==''){
        context.props.client.mutate({mutation: updateMutation, variables: {id: review.id, body:body, score:score }}).then(
            (res) => {
                const updatedArr = res.data.editReview.review
                context.props.updateUserReview(updatedArr)
				context.setState({showModal:false})
            },
            (err) => {
            	console.log('HANDLE ERROR!!!')
            }
        );
    } else {
    	console.log('HANDLE VALIDATIONS!!!')
    }
}

export const onDelete = (e, context) => {
    context.setState({ showModal: false });
    let {review} = context.state;
    context.props.client.mutate({mutation: deleteMutation, variables: {id: review.id}}).then(
        (res) => {
            context.props.deleteUserReview(review)
			context.setState({ enabledButton: true })
            context.setState({ isUpdate:false});   
        },
        (err) => { }
    );
}

export const onSave = (e, context) => {        
    const body = context.state.review.body;
    const score = context.state.review.score;
    if(body!=='' && score !==''){
    	context.props.client.mutate({mutation: newReviewMutation, variables: {user_id: context.props.userInfo.user_id, artist_id: context.props.match.params.id, body: body, score: score }}).then(
    	    (res) => {
    	        const newArr = res.data.newReview.review
    	        context.props.addUserReview(newArr)
			    context.setState({ showModal: false })
				context.setState({ enabledButton: false })
    	    },
    	    (err) => { 
            	console.log('HANDLE ERROR!!!')
    	    }
    	);
    } else {
    	console.log('HANDLE VALIDATIONS!!!')    	
    }
}

export const handleChange = (e, context) => {
    switch(e.target.id) {
        case 'body':
            context.setState({review:{...context.state.review, body:e.target.value }})
            break;
        case 'score':
            context.setState({review:{...context.state.review, score:e.target.value }})
            break;
    }
}

export const handleModalClose = (context) => { 
	context.setState({ showModal: false });
}

export const handleModalShow = (review, context) => {
    if (review) {
        context.props.selectUserReview(review);
        context.setState({review:review});
        context.setState({isUpdate:true});        
    }
    context.setState({ showModal: true });
}
