import React, {Component} from 'react';
import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'
import newReviewMutation from '../../mutations/newReview'

export const doSomethingWithInput = (theInput) => {
    return theInput;
};

export const onUpdate = (e, context) => {  
    let {selected} = context.state;
    const body= selected.body;
    const score = selected.score;
    if(body!=='' && score !==''){
        context.props.client.mutate({mutation: updateMutation, variables: {id: selected.id, body:body, score:score }}).then(
            (res) => {
                const updatedArr = res.data.editReview.review
                context.props.updateUserReview(updatedArr)
				context.setState({showModalUpdate:false})
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
    context.setState({ showModalUpdate: false });
    let {selected} = context.state;
    context.props.client.mutate({mutation: deleteMutation, variables: {id: selected.id}}).then(
        (res) => {
            context.props.deleteUserReview(selected)
			context.setState({ enabledButton: true })
        },
        (err) => { }
    );
}

export const onSave = (e, context) => {        
    const body = context.state.newReviewBody;
    const score = context.state.newReviewScore;
    if(body!=='' && score !==''){
    	context.props.client.mutate({mutation: newReviewMutation, variables: {user_id: context.props.userInfo.user_id, artist_id: context.props.match.params.id, body: body, score: score }}).then(
    	    (res) => {
    	        const newArr = res.data.newReview.review
    	        context.props.addUserReview(newArr)
			    context.setState({ showModalNew: false })
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

export const handleUpdateChange = (e, context) => {
    switch(e.target.id) {
        case 'body':
            context.setState({selected:{...context.state.selected, body:e.target.value }})
            break;
        case 'score':
            context.setState({selected:{...context.state.selected, score:e.target.value }})
            break;
    }
}

export const handleNewChange = (e, context) => { 
    switch(e.target.id) {
        case 'body':
            context.setState({ newReviewBody:e.target.value })
            break;
        case 'score':
            context.setState({ newReviewScore:e.target.value })
            break;
    }
}

export const handleModalNewClose = (context) => { 
	context.setState({ showModalNew: false });
}

export const handleModalNewShow = (context) => { 
	context.setState({ showModalNew: true });
}

export const handleModalUpdateClose = (context) => { 
	context.setState({ showModalUpdate: false });
}

export const handleModalUpdateShow = (review, context) => {
    if (review.user_id == context.props.userInfo.user_id){
        context.props.selectUserReview(review);
        context.setState({selected:review});
        context.setState({ showModalUpdate: true });
    } 
}
